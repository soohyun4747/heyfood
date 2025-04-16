export interface IButtonBasicProps {
	value: string;
	onClick?: () => void;
}

interface IButtonProps extends IButtonBasicProps {
	color?: string;
	value: string;
	onClick?: () => void;
}

export function Button(props: IButtonProps) {
	return (
		<div
			onClick={props.onClick}
			style={{ background: props.color }}
			className='select-none bg-brand-01 hover:bg-[#FFB224] hover:cursor-pointer font-bold leading-[160%] px-[16px] py-[14px] text-gray-900 rounded-lg'>
			{props.value}
		</div>
	);
}
