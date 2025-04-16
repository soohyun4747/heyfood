import { Accordion } from '@/components/Accordion';
import { ICategory, IMenu } from '@/components/LandingMenusTab';
import { TabMenu } from '@/components/TabMenu';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { fetchCollectionData } from '@/utils/firebase';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

export interface IFaq {
	id: string;
	title: string;
	content: string;
	categoryId: string;
	createdAt: Timestamp;
}

export function FaqPage() {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
	const [faqs, setFaqs] = useState<IFaq[]>([]);

	// 초기 데이터 로드
	useEffect(() => {
		const getSetFaqCategories = async () => {
			await fetchCollectionData('FAQCategories', setCategories);
			setCategories((prev) => {
				prev.unshift({ id: 'all', name: '전체' });
				return [...prev];
			});
		};
		getSetFaqCategories();
		fetchCollectionData('FAQs', setFaqs);
	}, []);

	// 선택된 카테고리에 해당하는 메뉴 필터링 (useMemo로 메모이제이션)
	const filteredCategoryFaqs = useMemo(() => {
		const selectedCategory = categories[selectedCategoryIdx];
		if (selectedCategory?.id === 'all') {
			return faqs;
		}
		return faqs.filter((menu) => menu.categoryId === selectedCategory.id);
	}, [faqs, categories, selectedCategoryIdx]);

	const onClickCategory = (i: number) => {
		setSelectedCategoryIdx(i);
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] px-[120px] pt-[100px] pb-40 min-h-content'>
				<div className='flex flex-col justify-start items-center self-stretch  gap-2'>
					<p className=' text-5xl font-bold text-center text-[#0f0e0e] leading-[150%]'>
						자주묻는 질문
					</p>
					<p className=' text-base text-center text-[#0f0e0e] leading-[160%]'>
						고객분들이 자주 묻는 질문을 정리했습니다.
					</p>
				</div>
				<TabMenu
					menus={categories}
					selectedIdx={selectedCategoryIdx}
					onClickMenu={onClickCategory}
				/>
				<div className='flex flex-col justify-start items-start  w-[1200px] relative gap-5'>
					<p className=' text-lg text-left'>
						<span className=' text-lg font-medium text-left text-[#909090]'>
							총{' '}
						</span>
						<span className=' text-lg font-bold text-left text-[#0f0e0e]'>
							{filteredCategoryFaqs.length.toLocaleString()}개
						</span>
						<span className=' text-lg font-medium text-left text-[#909090]'>
							의 게시물이 있습니다.
						</span>
					</p>
					<div className='flex flex-col justify-start items-start self-stretch  relative'>
						<svg
							width={1200}
							height={3}
							viewBox='0 0 1200 3'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1='1.5'
								x2={1200}
								y2='1.5'
								stroke='#0F0E0E'
								strokeWidth={3}
							/>
						</svg>
						{filteredCategoryFaqs.map((faq) => (
							<Accordion
								title={faq.title}
								content={faq.content}
							/>
						))}
					</div>
				</div>
			</div>
		</Common>
	);
}

export default FaqPage;
