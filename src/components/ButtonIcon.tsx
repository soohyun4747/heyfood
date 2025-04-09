import { JSX, useState } from 'react';

export interface IIconProps {
	color?: string;
	hoverColor?: string;
	hover?: boolean;
}

export interface IButtonIconProps extends IIconProps {
	icon: (props: IIconProps) => JSX.Element;
	onClick?: () => void;
}

export function ButtonIcon(props: IButtonIconProps) {
	const [hover, setHover] = useState<boolean>(false);

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={props.onClick}
			className='hover:cursor-pointer'>
			{props.icon({
				color: props.color,
				hoverColor: props.hoverColor,
				hover: hover,
			})}
		</div>
	);
}
