import { Profile } from '@/icons/Profile';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import { useState } from 'react';

export interface IReview {
	id: string;
	name: string;
	email: string;
	comment: string;
	imagePaths: string[];
	createdAt: Timestamp;
}

export function ReviewItem(props: IReview) {
	const [open, setOpen] = useState(false);

	return (
		<div
			onClick={() => setOpen((prev) => !prev)}
			className='cursor-pointer flex md:flex-row flex-col justify-start items-start self-stretch relative gap-3 md:gap-5 md:gap-[100px] md:px-4 py-6 border-b border-neutral-200  self-stretch'>
			<div className='flex justify-start items-start flex-grow relative gap-2 md:gap-6'>
				<Profile />
				<div className='flex flex-col justify-center items-start flex-grow relative gap-3 mt-[6px]'>
					<div className='flex flex-col justify-start items-start self-stretch relative gap-2'>
						<p className='self-stretch text-[13px] md:text-base text-left text-[#0f0e0e]'>
							{props.name} |{' '}
							{props.createdAt.toDate().toLocaleDateString()}
						</p>
					</div>
					<div className='flex flex-col gap-6'>
						<p
							className={`self-stretch text-sm md:text-lg text-left text-[#0f0e0e] max-w-[880px] ${
								!open && 'max-h-[80px] line-clamp-3'
							}`}>
							{props.comment}
						</p>
						{props.imagePaths[0] && open && (
							<div className='flex flex-col gap-5'>
								{props.imagePaths.map((path, i) => (
									<Image
										key={path}
										src={path}
										alt={`image-${i}`}
										width={652}
										height={652}
										objectFit='cover'
										className='max-w-[300px] md:max-w-[652px]'
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-4 md:hidden pl-10'>
				{!open &&
					props.imagePaths.map((path, i) => (
						<Image
							key={i}
							src={path}
							alt={'preview'}
							width={120}
							height={120}
							className='min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] object-cover'
						/>
					))}
			</div>
			<div className='w-[120px] h-[120px] relative hidden md:block'>
				{props.imagePaths[0] && !open && (
					<Image
						src={props.imagePaths[0]}
						alt={'preview'}
						width={120}
						height={120}
						className='w-full h-full object-cover'
					/>
				)}
				{props.imagePaths.length > 1 && !open && (
					<div className='w-8 h-8 absolute left-[88px] top-[88px] flex items-center justify-center'>
						<div className='w-8 h-8 absolute left-0 top-0 opacity-30 bg-[#0f0e0e]' />
						<p className='text-sm font-bold text-center text-white'>
							{props.imagePaths.length}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
