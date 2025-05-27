import { CSSProperties, useState } from 'react';
import { IButtonBasicProps } from './Button';

interface IButtonRectYellowProps extends IButtonBasicProps {
	style?: CSSProperties;
	disabled?: boolean;
	id?: string;
}

export function ButtonRectYellow(props: IButtonRectYellowProps) {
	const [hover, setHover] = useState(false);

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			id={props.id}
			onClick={props.disabled ? undefined : props.onClick}
			style={{
				background: props.disabled
					? '#ffebc6'
					: hover
					? '#F7BC4F'
					: '#FFCD70',
				cursor: props.disabled ? 'default' : 'pointer',
				color: props.disabled ? '#909090' : '#0F0E0E',
				...props.style,
			}}
			className='flex justify-center items-center w-full min-h-[68px] select-none text-lg font-bold text-center'>
			{props.value}
		</div>
	);
}
