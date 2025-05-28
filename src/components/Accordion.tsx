import { ChevronDown } from '@/icons/ChevronDown';
import { ChevronUp } from '@/icons/ChevronUp';
import { useState } from 'react';

interface IAccordionProps {
	title: string;
	content: string;
}

export function Accordion(props: IAccordionProps) {
	const [open, setOpen] = useState(false);

	return (
		<div className='flex flex-col justify-start items-start self-stretch'>
			<div
				onClick={() => setOpen((prev) => !prev)}
				className='hover:cursor-pointer flex justify-between gap-[20px] md:gap-8 items-center self-stretch px-4 py-[12px] md:py-[24px] border-b border-[#c8cddb]'>
				<p className='select-none flex-1 text-[13px] md:text-[22px] text-left text-[#0f0e0e]'>
					{props.title}
				</p>
				{open ? (
					<ChevronUp />
				) : (
					<ChevronDown
						color='#909090'
						size={32}
					/>
				)}
			</div>
			{open && (
				<div className='flex items-center self-stretch  gap-2 px-4 py-[12px] md:py-[26px] bg-[#fffbea] border-b border-[#c8cddb]'>
					<p className='select-none text-[12px] md:text-xl text-left text-black whitespace-pre-line'>
						{props.content}
					</p>
				</div>
			)}
		</div>
	);
}
