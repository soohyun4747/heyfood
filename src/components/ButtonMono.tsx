import { JSX, useState } from 'react';
import { IIconProps } from './ButtonIcon';

interface IButtonMonoProps {
	value: string | number;
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
			className='flex justify-center items-center w-[211px] px-8 py-[13px] rounded-[100px] border-2 border-gray-900 hover:bg-gray-900 hover:cursor-pointer'>
			<p
				style={{ color: hover ? 'white' : '#0F0E0E' }}
				className={`select-none flex-grow text-lg ${props.icon ? 'text-left' : 'text-center'}`}>
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
