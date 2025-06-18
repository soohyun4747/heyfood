import { Accordion } from '@/components/Accordion';
import { ICategory } from '@/components/LandingMenusTab';
import { TabMenu } from '@/components/TabMenu';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { fetchCollectionData, fetchImageUrls } from '@/utils/firebase';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

export interface IFaq {
	id: string;
	title: string;
	imagePath: string;
	categoryId: string;
	createdAt: Timestamp;
}

export function FaqPage() {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
	const [faqs, setFaqs] = useState<IFaq[]>([]);

	// 초기 데이터 로드
	useEffect(() => {
		getSetCategories();
		getSetFaqs();
	}, []);

	const getSetCategories = async () => {
		const faqCategories = (await fetchCollectionData(
			'FAQCategories'
		)) as ICategory[];
		if (faqCategories) {
			const orderedCategories: ICategory[] = [];

			faqCategories.forEach((category) => {
				orderedCategories[category.order] = category;
			});

			orderedCategories.unshift({ id: 'all', name: '전체', order: -1 });

			setCategories(orderedCategories);
		}
	};

	const getSetFaqs = async () => {
		const fetchedFaqs =
			((await fetchCollectionData('FAQs')) as IFaq[] | undefined) ?? [];

		const updatedFaqs = await Promise.all(
			fetchedFaqs.map(async (faq) => {
				const urls = await fetchImageUrls([faq.imagePath]);
				if (urls) {
					faq.imagePath = urls[0];
				}
				return faq;
			})
		);

		setFaqs(updatedFaqs);
	};

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
			<div className='flex flex-col items-center self-stretch  gap-[60px] px-[20px] md:px-[120px] pt-[40px] md:pt-[100px] pb-40 h-screen min-h-fit'>
				<div className='flex flex-col justify-center items-center self-stretch gap-2 md:gap-4'>
					<p className='text-[28px] md:text-5xl font-bold text-center text-[#0f0e0e] leading-[150%]'>
						자주묻는 질문
					</p>
					<p className='text-sm md:text-base text-center text-[#0f0e0e] leading-[160%]'>
						고객분들이 자주 묻는 질문을 정리했습니다.
					</p>
				</div>
				<TabMenu
					menus={categories}
					selectedIdx={selectedCategoryIdx}
					onClickMenu={onClickCategory}
				/>
				<div className='flex flex-col justify-center items-start md:w-[1200px] self-stretch relative gap-5 md:self-center justify-self-center'>
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
						<div className='md:w-[1200px] self-stretch h-[3px] bg-[#0F0E0E]' />
						{filteredCategoryFaqs.map((faq) => (
							<Accordion
								key={faq.id}
								title={faq.title}
								content={
									faq.imagePath ? (
										<Image
											src={faq.imagePath}
											alt={faq.title}
											width={300}
											height={600}
											className='w-[320px] md:w-[1200px] h-auto object-cover relative'
										/>
									) : (
										<></>
									)
								}
							/>
						))}
					</div>
				</div>
			</div>
		</Common>
	);
}

export default FaqPage;
