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
			onClick={props.onClick}
			style={{ background: props.color, ...props.style }}
			className='select-none bg-brand-01 hover:bg-[#FFB224] hover:cursor-pointer font-bold leading-[160%] px-[16px] py-[14px] text-gray-900 rounded-lg flex justify-center items-center'>
			{props.value}
		</div>
	);
}
