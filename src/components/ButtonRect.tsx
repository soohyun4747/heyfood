import { CSSProperties } from 'react';

interface IButtonRectProps {
	value: string;
	style?: CSSProperties;
	disabled?: boolean;
	onClick?: () => void;
}

export function ButtonRect(props: IButtonRectProps) {
	return (
		<div
			onClick={props.disabled ? undefined : props.onClick}
			style={{
				background: props.disabled ? '#ddd' : '#FFCD70',
				color: props.disabled ? '#909090' : 'white',
				...props.style,
			}}
			className='hover:cursor-pointer flex justify-center items-center self-stretch h-[68px]'>
			<p className='select-none text-lg font-bold text-center'>
				{props.value}
			</p>
		</div>
	);
}
