import React from 'react';

export interface PromiseCardProps {
	title: string;
	description: string;
}

export const PromiseCard: React.FC<PromiseCardProps> = ({
	title,
	description,
}) => {
	return (
		<div className='flex flex-col justify-start items-start relative gap-8'>
			{/* 이미지 영역 (회색 배경 박스) */}
			<div className='w-[276px] h-[210px] rounded-2xl bg-[#d9d9d9]' />
			{/* 텍스트 영역 */}
			<div className='flex flex-col justify-start items-start w-[276px] relative gap-3'>
				<p className='text-xl font-bold text-left text-[#0f0e0e]'>
					{title}
				</p>
				<p className='text-base text-left text-[#0f0e0e]'>
					{description}
				</p>
			</div>
		</div>
	);
};
