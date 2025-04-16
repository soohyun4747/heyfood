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
				...props.style,
			}}
			className='hover:cursor-pointer flex justify-center items-center w-full min-h-[68px]'>
			<p className='select-none text-lg font-bold text-center text-gray-900'>
				{props.value}
			</p>
		</div>
	);
}
