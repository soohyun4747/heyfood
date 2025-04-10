import { ICategory, IMenu } from '@/components/LandingMenusTab';
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
			<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-[60px] px-[120px] pt-[100px] pb-40 bg-white'>
				<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
					<p className='flex-grow-0 flex-shrink-0 text-5xl font-bold text-center text-[#0f0e0e]'>
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
						<div
							onClick={() => onClickMenu(menu)}
							key={menu.id}
							className='hover:cursor-pointer flex flex-col gap-8 items-center h-[528px] w-[380px] p-6 rounded-3xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]'>
							<div className='w-full h-80'>
								<img
									src={menu.imagePaths[0] ?? ''}
									alt={menu.name}
									className='w-[332px] h-[320px] object-cover rounded-3xl'
									loading='lazy'
								/>
							</div>
							<svg
								width={332}
								height={1}
								viewBox='0 0 332 1'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='w-full'
								preserveAspectRatio='none'>
								<line
									y1='0.5'
									x2={332}
									y2='0.5'
									stroke='#E5E5E5'
								/>
							</svg>
							<div className='flex flex-col gap-2 w-full'>
								<p className='w-[332px] text-2xl text-center text-[#0f0e0e]'>
									{menu.name}
								</p>
								<p className='w-[332px] text-base text-center text-[#909090] truncate'>
									{menu.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Common>
	);
}

export default MenuPage;
