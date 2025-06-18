import { ChevronDownSmall } from '@/icons/ChevronDownSmall';
import { ChevronUp } from '@/icons/ChevronUp';
import { JSX, useState } from 'react';

interface IAccordionProps {
	title: string;
	content: JSX.Element;
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
					<ChevronUp
						color='#909090'
					/>
				) : (
					<ChevronDownSmall
						color='#909090'
					/>
				)}
			</div>
			{open && (
				<div className='w-[1200px] max-w-[1200px]'>{props.content}</div>
			)}
		</div>
	);
}
