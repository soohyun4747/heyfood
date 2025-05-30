import { ChevronDown } from '@/icons/ChevronDown';
import { CSSProperties, useEffect, useState } from 'react';

export interface IDropdownProps {
	domId: string;
	list: { id: string; label: string }[];
	selectedId?: string;
	style?: CSSProperties;
	onClick?: (id: string) => void;
}

export function Dropdown(props: IDropdownProps) {
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		// Add click listener to the document
		document.addEventListener('click', handleClickOutside);

		// Cleanup the listener on component unmount
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const handleClickOutside = (e: MouseEvent) => {
		const target = e.target as HTMLElement | undefined;

		if (target && target.id === props.domId) {
			setOpen(true);
		} else {
			setOpen(false); // Change state when clicking outside
		}
	};

	return (
		<div
			id={props.domId}
			style={props.style}
			className='relative hover:cursor-pointer'
			onClick={() => {
				setOpen(true);
			}}>
			<div
				id={props.domId}
				className='flex justify-between items-center self-stretch px-5 py-3 rounded-lg border border-neutral-200'>
				<p
					id={props.domId}
					className='text-base text-left text-[#909090]'>
					{
						props.list.find((item) => item.id === props.selectedId)
							?.label
					}
				</p>
				<ChevronDown
					size={18}
					color='black'
				/>
			</div>
			{open && (
				<div
					style={{
						width: '-webkit-fill-available',
						boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.2)',
					}}
					className={`flex flex-col p-[12px] gap-[6px] rounded-[8px] border border-gray-100 bg-white shadow-dropdown w-max absolute top-[54px] left-0 h-[200px] overflow-auto z-[2]`}>
					{props.list.map((item, i) => (
						<div
							key={i}
							onClick={() =>
								props.onClick && props.onClick(item.id)
							}
							className={`flex gap-[12px] px-[20px] py-[8px] self-stretch items-center ${
								item.id === props.selectedId &&
								'bg-brand-01/30 hover:bg-brand-01/30'
							} rounded-[6px] hover:cursor-pointer hover:bg-brand-01/10`}>
							<div
								className={`select-none leading-[normal] self-center text-[16px] ${
									item.id === props.selectedId
										? 'font-bold text-black'
										: 'font-medium text-gray-600'
								}`}>
								{item.label}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
