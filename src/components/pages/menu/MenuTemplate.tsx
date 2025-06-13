import { ICategory, IMenu } from '@/components/LandingMenusTab';
import { MenuCard } from '@/components/MenuCard';
import { TabMenu } from '@/components/TabMenu';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useMenuCategoriesStore } from '@/stores/menuCategoriesStore';
import { useMenusStore } from '@/stores/menusStore';
import { useMenuStore } from '@/stores/menuStore';
import { fetchCollectionData, fetchImageUrls } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const menuUrls = [
	'/menu/kimbabDosirak',
	'/menu/deopbabDosirak',
	'/menu/vipDosirak',
	'/menu/snackBox',
	'/menu/side',
];

export function MenuTemplate({ categoryIdx }: { categoryIdx: number }) {
	const [selectedCategoryIdx, setSelectedCategoryIdx] =
		useState<number>(categoryIdx);
	const { setMenu } = useMenuStore();
	const categories = useMenuCategoriesStore((state) => state.menuCategories);
	const menus = useMenusStore((state) => state.menus);

	const router = useRouter();

	useEffect(() => {
		setSelectedCategoryIdx(categoryIdx);
	}, [categoryIdx]);

	const onClickMenu = (menu: IMenu) => {
		setMenu(menu);
		router.push('/menu/detail');
	};

	const onClickCategory = (i: number) => {
		console.log(menuUrls[i]);

		router.push(menuUrls[i]);
	};

	// 선택된 카테고리에 해당하는 메뉴 필터링 (useMemo로 메모이제이션)
	const filteredCategoryMenus = useMemo(() => {
		if (!categories[selectedCategoryIdx]) return [];
		const selectedCategory = categories[selectedCategoryIdx];
		return menus.filter((menu) => menu.categoryId === selectedCategory.id);
	}, [menus, categories, selectedCategoryIdx]);

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] md:px-[120px] px-[20px] pt-[40px] md:pt-[100px] pb-40 bg-white'>
				<div className='flex flex-col justify-start items-center self-stretch  gap-2'>
					<p className='text-[28px] md:text-5xl font-bold text-center text-[#0f0e0e]'>
						메뉴
					</p>
				</div>
				<TabMenu
					menus={categories}
					selectedIdx={selectedCategoryIdx}
					onClickMenu={onClickCategory}
					className='md:justify-center md:min-h-[47px]'
				/>
				{filteredCategoryMenus.length > 0 ? (
					<div
						className={`grid grid-cols-1 ${
							filteredCategoryMenus.length === 2 &&
							'md:grid-cols-2'
						} ${
							filteredCategoryMenus.length > 2 && 'md:grid-cols-3'
						} gap-x-8 gap-y-16`}>
						{filteredCategoryMenus.map((menu) => (
							<MenuCard
								shadowed
								key={menu.name}
								onClick={() => onClickMenu(menu)}
								src={menu.imagePaths[0]}
								title={menu.name}
								description={menu.description}
								price={menu.price}
							/>
						))}
					</div>
				) : (
					<div className='h-full text-gray-300 font-bold self-center min-h-[528px] flex items-center'>
						상품 준비중입니다.
					</div>
				)}
				<div className='flex flex-col md:w-[1200px] relative gap-1.5 px-6 py-5 bg-[#fffbea]'>
					<p className='text-base font-bold text-left text-[#5c5c5c]'>
						패키지 디자인 추가 옵션
					</p>
					<p className='text-sm text-left text-[#5c5c5c]'>
						행사 및 기념일에 어울리는 맞춤형 스티커 제작 서비스를
						제공합니다. 주문/결제 단계에서 원하시는 문구를 입력할 수
						있어요.
					</p>
				</div>
			</div>
		</Common>
	);
}
