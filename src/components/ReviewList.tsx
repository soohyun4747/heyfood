import { IReview, ReviewItem } from '@/components/ReviewItem';
import {
	fetchImageUrls,
	fetchTableData,
	getDataCount,
	StartDocInfo,
} from '@/utils/firebase';
import { useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { ReviewModal } from './ReviewModal';
import { useUserStore } from '@/stores/userStore';

const pageSize = 8;

export function ReviewList() {
	const [onPageReviews, setOnPageReviews] = useState<IReview[]>([]);
	const [page, setPage] = useState(1);
	const [startDocInfo, setStartDocInfo] = useState<StartDocInfo>();
	const [total, setTotal] = useState(1);
	const [reviewModalOpen, setReviewModalOpen] = useState(false);

	const user = useUserStore((state) => state.user);

	useEffect(() => {
		getSetInitData();
	}, []);

	const getSetInitData = async () => {
		const totalDataCount = await getDataCount('reviews');

		setTotal(totalDataCount);
		const fetchedReviews = (await fetchTableData(
			'reviews',
			startDocInfo,
			pageSize,
			1,
			totalDataCount,
			undefined,
			setStartDocInfo
		)) as IReview[] | undefined;
		setPage(1);
		if (fetchedReviews) {
			getSetReviewsImages(fetchedReviews);
		}
	};

	const getSetReviewsImages = async (reviews: IReview[]) => {
		// 이미지 URL들은 병렬 처리합니다.
		const updatedReviews = await Promise.all(
			reviews.map(async (review) => {
				const urls = await fetchImageUrls(review.imagePaths);
				if (urls) {
					review.imagePaths = urls;
				}
				return review;
			})
		);
		setOnPageReviews(updatedReviews);
	};

	const onPageChange = async (page: number) => {
		setPage(page);
		const fetchedReviews = (await fetchTableData(
			'reviews',
			startDocInfo,
			pageSize,
			page,
			total,
			undefined,
			setStartDocInfo
		)) as IReview[] | undefined;
		if (fetchedReviews) {
			getSetReviewsImages(fetchedReviews);
		}
	};

	const onRegistered = async () => {
		getSetInitData();
		setReviewModalOpen(false);
	};

	return (
		<div className='flex flex-col justify-center gap-5 self-stretch md:self-auto'>
			<div className='flex items-center justify-between'>
				<p className='text-sm md:text-lg text-left'>
					<span className='font-medium text-left text-[#909090]'>
						총{' '}
					</span>
					<span className='font-bold text-left text-[#0f0e0e]'>
						{total}개
					</span>
					<span className='font-medium text-left text-[#909090]'>
						의 게시물이 있습니다.
					</span>
				</p>
				{user && (
					<div
						className='px-3 pt-[6px] pb-[4px] relative rounded-lg border border-neutral-200 hover:bg-gray-100 cursor-pointer'
						onClick={() => setReviewModalOpen(true)}>
						<p className='md:text-base text-sm text-center text-[#5c5c5c]'>
							후기 작성
						</p>
					</div>
				)}
			</div>
			<div className='flex flex-col justify-start items-start self-stretch  relative'>
				<div className='md:w-[1200px] self-stretch h-[3px] bg-[#0F0E0E]' />

				<div className='flex flex-col justify-center gap-[60px] items-center self-stretch'>
					<div className='flex flex-col self-stretch'>
						{onPageReviews.map((review) => (
							<ReviewItem
								key={review.id}
								{...review}
							/>
						))}
					</div>
					<Pagination
						total={total}
						page={page}
						pageSize={pageSize}
						pageGroupMax={8}
						onChangePage={(val) => onPageChange(val)}
					/>
				</div>
			</div>
			{reviewModalOpen && (
				<ReviewModal
					onClose={() => setReviewModalOpen(false)}
					onRegistered={onRegistered}
				/>
			)}
		</div>
	);
}
