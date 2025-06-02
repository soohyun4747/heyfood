import React from 'react';

export interface Review {
  id: string;
  title: string;
  description: string;
  author: string;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div
      className="flex flex-col justify-between h-[365px] md:h-[395px] w-[300px] md:w-[400px] relative p-8 rounded-3xl bg-white"
      style={{ boxShadow: '0px 4px 20px 0 rgba(0,0,0,0.1)' }}
    >
      <div className="flex flex-col relative gap-3">
        <p className="text-5 md:text-2xl font-bold text-[#0f0e0e]">
          {review.title}
        </p>
        <p className="text-4 md:text-lg">
          {review.description}
        </p>
      </div>
      <p className="text-[13px] md:text-base text-[#909090]">
        {review.author}
      </p>
    </div>
  );
};
