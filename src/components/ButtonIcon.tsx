import { useDeviceStore } from '@/stores/deviceStore';
import { JSX, useState } from 'react';

export interface IIconProps {
	color?: string;
	hoverColor?: string;
	hover?: boolean;
	size?: number;
	id?: string;
	className?: string;
	disabled?: boolean;
}

export interface IButtonIconProps extends IIconProps {
	icon: (props: IIconProps) => JSX.Element;
	onClick?: () => void;
}

export function ButtonIcon(props: IButtonIconProps) {
	const [hover, setHover] = useState<boolean>(false);
	const isMobile = useDeviceStore((state) => state.isMobile);

	return (
		<div
			id={props.id}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={!props.disabled ? props.onClick : undefined}
			className={`hover:cursor-pointer ${props.className}`}
			style={{ opacity: props.disabled ? 0.5 : 1 }}>
			{props.icon({
				color: props.color,
				hoverColor: props.hoverColor,
				hover: !isMobile ? hover : false,
				id: props.id,
			})}
		</div>
	);
}
