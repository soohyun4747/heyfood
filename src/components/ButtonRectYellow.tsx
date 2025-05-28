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
				fontWeight: props.disabled ? 'light': 'bold',
				...props.style,
			}}
			className='flex justify-center items-center w-full md:min-h-[68px] min-h-[60px] select-none text-sm md:text-lg text-center text-white'>
			{props.value}
		</div>
	);
}
