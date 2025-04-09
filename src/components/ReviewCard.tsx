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
      className="flex flex-col justify-between items-center h-[335px] w-[400px] relative p-8 rounded-3xl bg-white"
      style={{ boxShadow: '0px 4px 20px 0 rgba(0,0,0,0.1)' }}
    >
      <div className="flex flex-col justify-start items-start w-[336px] relative gap-3">
        <p className="w-[336px] text-2xl font-bold text-left text-[#0f0e0e]">
          {review.title}
        </p>
        <p className="w-[336px] text-lg text-left text-[#0f0e0e]">
          {review.description}
        </p>
      </div>
      <p className="w-[336px] text-base text-left text-[#909090]">
        {review.author}
      </p>
    </div>
  );
};
