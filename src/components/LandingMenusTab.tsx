import { useEffect, useMemo, useState } from 'react';
import { ButtonIcon } from './ButtonIcon';
import { fetchCollectionData, fetchImageUrls } from '@/utils/firebase';
import { useMenuStore } from '@/stores/menuStore';
import { useRouter } from 'next/router';
import { ChevronLeft } from '@/icons/ChevronLeft';
import { ChevronRight } from '@/icons/ChevronRight';

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
					<div
						className='flex gap-[32px] transition-transform ease-out duration-300'
						style={{
							transform: `translateX(-${slideIdx * 1236}px)`,
						}}>
						{filteredCategoryMenus.map((menu) => (
							<div
								onClick={() => onClickMenu(menu)}
								key={menu.id}
								className='hover:cursor-pointer flex flex-col gap-8 items-center h-[528px] w-[380px] p-6 rounded-3xl bg-white hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]'>
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
