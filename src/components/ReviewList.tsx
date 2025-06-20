import { IReview, ReviewItem } from '@/components/ReviewItem';
import {
	fetchCollectionTableDataWithConstraints,
	fetchImageUrls,
	getDataCount,
} from '@/utils/firebase';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { ReviewModal } from './ReviewModal';

const pageSize = 8;

export function ReviewList() {
	const [onPageReviews, setOnPageReviews] = useState<IReview[]>([]);
	const [page, setPage] = useState(1);
	const [startAfterDoc, setStartAfterDoc] =
		useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();
	const [totalPages, setTotalPages] = useState(1);
	const [reviewModalOpen, setReviewModalOpen] = useState(false);

	useEffect(() => {
		getSetReviews();
		getSetTotalPages();
	}, []);

	const onPageChange = (page: number) => {
		setPage(page);

		//pagination용 데이터 불러오기
	};

	const getSetReviews = async () => {
		const fetchedReviews = (await fetchCollectionTableDataWithConstraints(
			'reviews',
			startAfterDoc,
			pageSize,
			[],
			setStartAfterDoc
		)) as IReview[] | undefined;
		if (fetchedReviews) {
			// 이미지 URL들은 병렬 처리합니다.
			const updatedReviews = await Promise.all(
				fetchedReviews.map(async (review) => {
					const urls = await fetchImageUrls(review.imagePaths);
					if (urls) {
						review.imagePaths = urls;
					}
					return review;
				})
			);
			setOnPageReviews(updatedReviews);
		}
	};

	const getSetTotalPages = async () => {
		const dataCount = await getDataCount('reviews');
		setTotalPages(Math.ceil(dataCount / pageSize));
	};

	const onRegistered = async () => {
		if (page === 1) {
			await getSetReviews();
		} else {
			onPageChange(1);
		}
		setReviewModalOpen(false);
	};

	return (
		<div className='flex flex-col justify-center gap-5'>
			<div className='flex items-center justify-between'>
				<p className='text-lg text-left'>
					<span className=' text-lg font-medium text-left text-[#909090]'>
						총{' '}
					</span>
					<span className=' text-lg font-bold text-left text-[#0f0e0e]'>
						{onPageReviews.length}개
					</span>
					<span className=' text-lg font-medium text-left text-[#909090]'>
						의 게시물이 있습니다.
					</span>
				</p>
				<div
					className='px-3 pt-[6px] pb-[4px] relative rounded-lg border border-neutral-200 hover:bg-gray-100 cursor-pointer'
					onClick={() => setReviewModalOpen(true)}>
					<p className='text-center text-[#5c5c5c]'>후기 작성</p>
				</div>
			</div>
			<div className='flex flex-col justify-start items-start self-stretch  relative'>
				<div className='md:w-[1200px] self-stretch h-[3px] bg-[#0F0E0E]' />

				<div className='flex flex-col justify-center gap-[60px] items-center'>
					<div className='flex flex-col'>
						{onPageReviews.map((review) => (
							<ReviewItem {...review} />
						))}
					</div>
					<Pagination
						totalPages={totalPages}
						pageGroupMax={10}
						page={page}
						onChangePage={(val) => onPageChange(val)}
					/>
				</div>
			</div>
			{reviewModalOpen && (
				<ReviewModal onClose={() => setReviewModalOpen(false)} />
			)}
		</div>
	);
}
