import Image from 'next/image';
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
			<Image
				className='w-[320px] h-[210px] rounded-2xl object-cover'
				src={src}
				width={320}
				height={210}
				alt={title}
			/>
			{/* 텍스트 영역 */}
			<div className='flex flex-col justify-start items-start w-[320px] relative gap-3'>
				<p className='text-[20px] md:text-xl font-bold text-left text-[#0f0e0e]'>
					{title}
				</p>
				<p className='text-base text-left text-[#0f0e0e]'>
					{description}
				</p>
			</div>
		</div>
	);
};
