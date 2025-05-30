import { IButtonBasicProps } from './Button';

export function ButtonSmall(props: IButtonBasicProps) {
	return (
		<div
			className={`flex justify-center items-center h-[26px] md:h-[36px] relative gap-2 px-2 md:px-[14px] rounded-[100px] ${
				props.disabled
					? 'border border-gray-200 bg-gray-200 text-gray-700'
					: 'border border-neutral-200 hover:bg-[#f8f8f8] text-[#0f0e0e] hover:cursor-pointer'
			}`}
			onClick={props.disabled ? undefined : props.onClick}>
			<p className='md:h-6 h-[18px] text-[13px] md:text-base text-left select-none'>
				{props.value}
			</p>
		</div>
	);
}
