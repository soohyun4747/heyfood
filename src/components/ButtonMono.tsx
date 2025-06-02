import { JSX, useState } from 'react';
import { IIconProps } from './ButtonIcon';

interface IButtonMonoProps {
	value: string | number;
	className?: string;
	white?: boolean;
	icon?: (props: IIconProps) => JSX.Element;
	onClick?: () => void;
}

export function ButtonMono(props: IButtonMonoProps) {
	const [hover, setHover] = useState<boolean>(false);

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={props.onClick}
			className={`flex justify-center items-center px-[28px] md:px-8 py-[10px] md:py-[13px] rounded-[100px] border-2 ${
				props.white
					? 'border-gray-100 hover:bg-gray-100'
					: 'border-gray-900 hover:bg-gray-900'
			} hover:cursor-pointer gap-4 w-fit ${props.className}`}>
			<p
				style={{
					color: hover
						? props.white
							? '#0F0E0E'
							: 'white'
						: props.white
						? '#F8F8F8'
						: '#0F0E0E',
				}}
				className={`select-none flex-grow md:text-lg ${
					props.icon ? 'text-left' : 'text-center'
				}`}>
				{props.value}
			</p>
			{props.icon &&
				props.icon({
					color: '#0F0E0E',
					hoverColor: 'white',
					hover: hover,
				})}
		</div>
	);
}
