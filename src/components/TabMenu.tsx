import { CSSProperties } from 'react';
import { ICategory } from './LandingMenusTab';

interface ITabMenuProps {
	menus: Omit<ICategory, 'order'>[];
	selectedIdx: number;
	onClickMenu: (i: number) => void;
	style?: CSSProperties;
	className?: string;
}

export function TabMenu(props: ITabMenuProps) {
	return (
		<div
			style={props.style}
			className={`flex items-center md:justify-center gap-[12px] md:gap-6 w-full max-w-[1200px] overflow-x-auto ${props.className}`}>
			{props.menus.map((category, i) => (
				<div
					key={i}
					style={{
						borderColor:
							i === props.selectedIdx ? '#f2ab27' : 'white',
					}}
					onClick={() => props.onClickMenu(i)}
					className='hover:cursor-pointer flex justify-center items-center  gap-2 md:px-6 md:py-2 p-[8px] border-b-[3px]'>
					<p
						style={{
							color:
								i === props.selectedIdx ? '#f2ab27' : '#909090',
							fontWeight: i === props.selectedIdx ? '700' : '400',
						}}
						className='text-sm md:text-xl text-center w-max'>
						{category.name}
					</p>
				</div>
			))}
		</div>
	);
}
