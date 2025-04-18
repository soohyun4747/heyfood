import { ICategory, IMenu } from '@/components/LandingMenusTab';
import { MenuCard } from '@/components/MenuCard';
import { TabMenu } from '@/components/TabMenu';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useMenuStore } from '@/stores/menuStore';
import { fetchCollectionData, fetchImageUrls } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

function MenuPage() {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [menus, setMenus] = useState<IMenu[]>([]);
	const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);

	const { setMenu } = useMenuStore();
	const router = useRouter();

	// 초기 데이터 로드
	useEffect(() => {
		fetchCollectionData('menuCategories', setCategories);
		const getSetMenus = async () => {
			const fetchedMenus =
				((await fetchCollectionData('menus')) as IMenu[] | undefined) ??
				[];
			// 이미지 URL들은 병렬 처리합니다.
			const updatedMenus = await Promise.all(
				fetchedMenus.map(async (menu) => {
					const urls = await fetchImageUrls(menu.imagePaths);
					if (urls) {
						menu.imagePaths = urls;
					}
					return menu;
				})
			);
			setMenus(updatedMenus);
		};
		getSetMenus();
	}, []);

	// 선택된 카테고리에 해당하는 메뉴 필터링 (useMemo로 메모이제이션)
	const filteredCategoryMenus = useMemo(() => {
		if (!categories[selectedCategoryIdx]) return [];
		const selectedCategory = categories[selectedCategoryIdx];
		return menus.filter((menu) => menu.categoryId === selectedCategory.id);
	}, [menus, categories, selectedCategoryIdx]);

	const onClickCategory = (i: number) => {
		setSelectedCategoryIdx(i);
	};

	const onClickMenu = (menu: IMenu) => {
		setMenu(menu);
		router.push('/menu/detail');
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] px-[120px] pt-[100px] pb-40 bg-white'>
				<div className='flex flex-col justify-start items-center self-stretch  gap-2'>
					<p className=' text-5xl font-bold text-center text-[#0f0e0e]'>
						메뉴
					</p>
				</div>
				<TabMenu
					menus={categories}
					selectedIdx={selectedCategoryIdx}
					onClickMenu={onClickCategory}
				/>
				<div className='grid grid-cols-3 gap-x-8 gap-y-16'>
					{filteredCategoryMenus.map((menu) => (
						<MenuCard
							shadowed
							key={menu.name}
							onClick={() => onClickMenu(menu)}
							src={menu.imagePaths[0]}
							title={menu.name}
							description={menu.description}
						/>
					))}
				</div>
			</div>
		</Common>
	);
}

export default MenuPage;
