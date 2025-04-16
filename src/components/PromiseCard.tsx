import React from 'react';

export interface PromiseCardProps {
	title: string;
	description: string;
	src: string;
}

export const PromiseCard: React.FC<PromiseCardProps> = ({
	title,
	description,
	src,
}) => {
	return (
		<div className='flex flex-col justify-start items-start relative gap-8'>
			<img
				className='w-[276px] h-[210px] rounded-2xl'
				src={src}
			/>
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
