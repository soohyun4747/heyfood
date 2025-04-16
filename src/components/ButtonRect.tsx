import { CSSProperties, useState } from 'react';

interface IButtonRectProps {
	value: string;
	style?: CSSProperties;
	disabled?: boolean;
	onClick?: () => void;
}

export function ButtonRect(props: IButtonRectProps) {
	const [hover, setHover] = useState(false);

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={props.disabled ? undefined : props.onClick}
			style={{
				background: props.disabled
					? '#ddd'
					: hover
					? '#F7BC4F'
					: '#FFCD70',
				color: props.disabled ? '#909090' : 'black',
				...props.style,
			}}
			className='hover:cursor-pointer flex justify-center items-center self-stretch h-[68px]'>
			<p className='select-none text-lg font-bold text-center'>
				{props.value}
			</p>
		</div>
	);
}
