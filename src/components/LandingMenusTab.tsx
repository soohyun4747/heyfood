import { useEffect, useMemo, useState } from 'react';
import { ButtonIcon } from './ButtonIcon';
import { fetchCollectionData, fetchImageUrls } from '@/utils/firebase';
import { useMenuStore } from '@/stores/menuStore';
import { useRouter } from 'next/router';
import { ChevronLeft } from '@/icons/ChevronLeft';
import { ChevronRight } from '@/icons/ChevronRight';
import { MenuCard } from './MenuCard';

export interface IMenu {
	id: string;
	name: string;
	categoryId: string;
	description: string;
	price: number;
	imagePaths: string[];
}

export interface ICategory {
	id: string;
	name: string;
}

export function LandingMenusTab() {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
	const [menus, setMenus] = useState<IMenu[]>([]);
	const [slideIdx, setSlideIdx] = useState(0);

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

	// 총 슬라이드 수 (한 페이지에 3개씩 표시)
	const maxSlideIdx = useMemo(() => {
		return Math.ceil(filteredCategoryMenus.length / 3) - 1;
	}, [filteredCategoryMenus]);

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
			<div className='flex justify-center items-start gap-4'>
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
						className='hover:cursor-pointer flex justify-center items-center gap-2 px-6 py-2 rounded-[100px]'>
						<p className='opacity-75 text-xl font-bold text-center text-white'>
							{category.name}
						</p>
					</div>
				))}
			</div>

			{/* 슬라이드 영역 */}
			<div className='flex justify-center items-center'>
				<div className='mr-[12px] w-[60px]'>
					{slideIdx > 0 && (
						<ButtonIcon
							icon={ChevronLeft}
							onClick={onClickMenusLeft}
						/>
					)}
				</div>

				{/* 외부 컨테이너는 고정 폭과 overflow-hidden 처리 */}
				<div className='w-[1204px] overflow-x-hidden'>
					{/* 내부 컨테이너: 모든 카드가 한 줄에 있고, translateX와 transition이 적용됨 */}
					{filteredCategoryMenus.length > 0 ? (
						<div
							className='flex gap-[32px] transition-transform ease-out duration-300'
							style={{
								transform: `translateX(-${slideIdx * 1236}px)`,
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

				<div className='ml-[12px] w-[60px]'>
					{slideIdx < maxSlideIdx &&
						filteredCategoryMenus.length > 3 && (
							<ButtonIcon
								icon={ChevronRight}
								onClick={onClickMenusRight}
							/>
						)}
				</div>
			</div>
		</div>
	);
}
