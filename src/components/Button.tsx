import { CSSProperties } from 'react';

export interface IButtonBasicProps {
	value: string;
	onClick?: () => void;
	style?: CSSProperties;
	disabled?: boolean;
}

interface IButtonProps extends IButtonBasicProps {
	color?: string;
}

export function Button(props: IButtonProps) {
	return (
		<div
			onClick={!props.disabled ? props.onClick : undefined}
			style={{
				background: props.disabled ? '#E5E5E5' : props.color,
				cursor: props.disabled ? 'default' : 'pointer',
				color: props.disabled ? '#909090' : '#0F0E0E',
				...props.style,
			}}
			className='text-sm md:text-base select-none bg-brand-01 hover:bg-[#FFB224] font-bold leading-[160%] px-[12px] md:px-[16px] py-[8px] md:py-[14px] rounded-lg flex justify-center items-center'>
			{props.value}
		</div>
	);
}
