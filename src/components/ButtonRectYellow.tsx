import { CSSProperties } from 'react';

interface IButtonRectYellowProps {
	value: string;
	style?: CSSProperties;
	disabled?: boolean;
	id?: string;
	onClick?: () => void;
}

export function ButtonRectYellow(props: IButtonRectYellowProps) {
	return (
		<div
			id={props.id}
			onClick={props.disabled ? undefined : props.onClick}
			style={{
				background: props.disabled ? '#ffebc6' : '#FFCD70',
				...props.style,
			}}
			className='hover:cursor-pointer flex justify-center items-center w-full h-[68px]'>
			<p className='select-none text-lg font-bold text-center text-white'>
				{props.value}
			</p>
		</div>
	);
}
