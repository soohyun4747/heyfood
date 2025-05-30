import { Delete } from '@/icons/Delete';
import { useState } from 'react';

export function DeleteButton({ onClick }: { onClick?: () => void }) {
	const [hover, setHover] = useState(false);

	return (
		<div
			onClick={onClick}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onTouchStart={() => setHover(true)}
			onTouchEnd={() => setHover(false)}
			className='cursor-pointer flex flex-col justify-start items-end self-stretch gap-2'>
			<div className='group flex justify-end md:justify-start items-center w-[82px] relative gap-1 md:px-2.5 py-[3px]'>
				<Delete color={hover ? '#0F0E0E' : '#A0A0A0'} />
				<div className='flex justify-center items-center relative gap-2 pt-[3px]'>
					<p className='text-xs md:text-lg font-bold text-left text-[#a0a0a0] group-hover:text-[#0F0E0E]'>
						삭제
					</p>
				</div>
			</div>
		</div>
	);
}
