// ReviewCarousel.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { fetchImageUrls, fetchTableData, getDataCount, StartDocInfo } from '@/utils/firebase';
import { ReviewCard } from './ReviewCard';
import { IReview } from './ReviewItem';

export const ReviewCarousel: React.FC = () => {
        const [reviews, setReviews] = useState<IReview[]>([]);
        const [startDocInfo, setStartDocInfo] = useState<StartDocInfo>();

        useEffect(() => {
                loadReviews();
        }, []);

        const loadReviews = async () => {
                const totalDataCount = await getDataCount('reviews');

                if (!totalDataCount) {
                        setReviews([]);
                        return;
                }

                const fetchedReviews = (await fetchTableData(
                        'reviews',
                        startDocInfo,
                        totalDataCount,
                        1,
                        totalDataCount,
                        undefined,
                        setStartDocInfo
                )) as IReview[] | undefined;

                if (fetchedReviews) {
                        const reviewsWithImages = await Promise.all(
                                fetchedReviews.map(async (review) => {
                                        const urls = await fetchImageUrls(review.imagePaths);
                                        return {
                                                ...review,
                                                imagePaths: urls ?? review.imagePaths,
                                        };
                                })
                        );
                        setReviews(reviewsWithImages);
                }
        };

        const carouselReviews = useMemo(() => {
                return reviews.length > 0 ? [...reviews, ...reviews] : [];
        }, [reviews]);

        if (carouselReviews.length === 0) {
                return null;
        }

        return (
                <div className='overflow-x-hidden'>
                        <div className='inline-flex gap-8 animate-scroll h-[450px] items-center'>
                                {carouselReviews.map((review, index) => (
                                        <ReviewCard
                                                key={`${review.id}-${index}`}
                                                review={review}
                                        />
                                ))}
                        </div>
                </div>
        );
};
