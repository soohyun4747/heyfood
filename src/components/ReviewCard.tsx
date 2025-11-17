import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IReview } from './ReviewItem';

interface ReviewCardProps {
        review: IReview;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
        const displayName = `${review.name[0]}*${review.name.at(-1)}`;
        const representativeImage = review.imagePaths[0];

        return (
                <Link href='/review' className='block'>
                        <div
                                className='flex flex-col justify-between h-[365px] md:h-[395px] w-[300px] md:w-[400px] relative p-8 rounded-3xl bg-white'
                                style={{ boxShadow: '0px 4px 20px 0 rgba(0,0,0,0.1)' }}>
                                <div className='flex flex-col relative gap-3'>
                                        <p className='text-5 md:text-2xl font-bold text-[#0f0e0e]'>
                                                {review.title}
                                        </p>
                                        {representativeImage ? (
                                                <div className='relative w-full h-[220px] md:h-[240px] rounded-2xl overflow-hidden'>
                                                        <Image
                                                                src={representativeImage}
                                                                alt={`${review.title} 대표 이미지`}
                                                                fill
                                                                sizes='(min-width: 768px) 400px, 300px'
                                                                className='object-cover'
                                                        />
                                                </div>
                                        ) : (
                                                <div className='w-full h-[220px] md:h-[240px] rounded-2xl bg-neutral-100 flex items-center justify-center'>
                                                        <p className='text-sm text-[#909090]'>대표 이미지가 없습니다.</p>
                                                </div>
                                        )}
                                </div>
                                <p className='text-[13px] md:text-base text-[#909090]'>
                                        {displayName} |{' '}
                                        {review.createdAt.toDate().toLocaleDateString()}
                                </p>
                        </div>
                </Link>
        );
};
