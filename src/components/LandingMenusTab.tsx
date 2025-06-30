import { useMemo, useState } from 'react';
import { ButtonIcon } from './ButtonIcon';
import { useMenuStore } from '@/stores/menuStore';
import { useRouter } from 'next/router';
import { ChevronLeft } from '@/icons/ChevronLeft';
import { ChevronRight } from '@/icons/ChevronRight';
import { MenuCard } from './MenuCard';
import { useDeviceStore } from '@/stores/deviceStore';
import { useMenuCategoriesStore } from '@/stores/menuCategoriesStore';
import { useMenusStore } from '@/stores/menusStore';

export interface IMenu {
	id: string;
	name: string;
	categoryId: string;
	description: string;
	ingredient: string;
	price: number;
	imagePaths: string[];
	imageDetailPath: string;
	composition: CompositionDesserts;
}

export interface CompositionItem {
	id: string;
	name: string;
	price: number;
}

export interface CompositionDesserts {
	snacks: CompositionItem[];
	drinks: CompositionItem[];
}

export interface ICategory {
	id: string;
	name: string;
	order: number;
}

export function LandingMenusTab() {
	const categories = useMenuCategoriesStore((state) => state.menuCategories);
	const menus = useMenusStore((state) => state.menus);
	const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
	const [slideIdx, setSlideIdx] = useState(0);

	const { setMenu } = useMenuStore();
	const isMobile = useDeviceStore((state) => state.isMobile);
	const router = useRouter();
	// 선택된 카테고리에 해당하는 메뉴 필터링 (useMemo로 메모이제이션)
	const filteredCategoryMenus = useMemo(() => {
		if (!categories[selectedCategoryIdx]) return [];
		const selectedCategory = categories[selectedCategoryIdx];
		return menus.filter((menu) => menu.categoryId === selectedCategory.id);
	}, [menus, categories, selectedCategoryIdx]);

	// 총 슬라이드 수 (한 페이지에 3개씩 표시)
	const maxSlideIdx = useMemo(() => {
		return Math.ceil(filteredCategoryMenus.length / (isMobile ? 1 : 3)) - 1;
	}, [filteredCategoryMenus, isMobile]);

	const onClickMenusLeft = () => {
		setSlideIdx((prev) => Math.max(prev - 1, 0));
	};

	const onClickMenusRight = () => {
		setSlideIdx((prev) => Math.min(prev + 1, maxSlideIdx));
	};

	// 카테고리 변경 시 슬라이드 인덱스 리셋
	const onClickCategory = (i: number) => {
		setSelectedCategoryIdx(i);
		setSlideIdx(0);
	};

	const onClickMenu = (menu: IMenu) => {
		setMenu(menu);
		router.push('/menu/detail');
	};

	return (
		<div className='flex flex-col justify-center gap-[40px]'>
			{/* 카테고리 버튼 */}
			<div className='flex md:justify-center items-start md:gap-4 px-[12px] w-[360px] md:w-auto overflow-x-auto'>
				{categories.map((category, i) => (
					<div
						key={category.id}
						onClick={() => onClickCategory(i)}
						style={{
							background:
								i === selectedCategoryIdx
									? '#f2ab27'
									: '#ffc966',
						}}
						className='hover:cursor-pointer flex justify-center items-center px-[18px] md:px-6 py-2 rounded-[100px]'>
						<p className='opacity-75 text-[13px] md:text-xl font-bold text-center text-white w-max'>
							{category.name}
						</p>
					</div>
				))}
			</div>

			{/* 슬라이드 영역 */}
			<div className='flex justify-center items-center'>
				<div className='md:mr-[12px] md:w-[60px]'>
					<ButtonIcon
						icon={ChevronLeft}
						onClick={onClickMenusLeft}
						disabled={slideIdx > 0 ? false : true}
					/>
				</div>

				{/* 외부 컨테이너는 고정 폭과 overflow-hidden 처리 */}
				<div className='w-[300px] md:w-[1204px] overflow-x-hidden'>
					{/* 내부 컨테이너: 모든 카드가 한 줄에 있고, translateX와 transition이 적용됨 */}
					{filteredCategoryMenus.length > 0 ? (
						<div
							className='flex gap-[32px] transition-transform ease-out duration-300 md:justify-center'
							style={{
								transform: `translateX(-${
									slideIdx * (isMobile ? 332 : 1236)
								}px)`,
							}}>
							{filteredCategoryMenus.map((menu) => (
								<MenuCard
									key={menu.name}
									onClick={() => onClickMenu(menu)}
									src={menu.imagePaths[0]}
									title={menu.name}
									description={menu.description}
								/>
							))}
						</div>
					) : (
						<div className='h-full text-white font-bold self-center min-h-[528px] flex items-center justify-center'>
							상품 준비중입니다.
						</div>
					)}
				</div>
				<div className='md:ml-[12px] md:w-[60px]'>
					<ButtonIcon
						icon={ChevronRight}
						onClick={onClickMenusRight}
						disabled={
							slideIdx < maxSlideIdx
								? // &&
								  // filteredCategoryMenus.length > (isMobile ? 1 : 3)
								  false
								: true
						}
					/>
				</div>
			</div>
		</div>
	);
}
