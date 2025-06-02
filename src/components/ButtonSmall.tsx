import { IButtonBasicProps } from './Button';

export function ButtonSmall(props: IButtonBasicProps) {
	return (
		<div
			className={`flex justify-center items-center h-[30px] md:h-[36px] relative px-2 md:px-[14px] rounded-[100px] w-fit ${
				props.disabled
					? 'border border-gray-200 bg-gray-200 text-gray-700'
					: 'border border-neutral-200 hover:bg-[#f8f8f8] text-[#0f0e0e] hover:cursor-pointer'
			} ${props.className}`}
			onClick={props.disabled ? undefined : props.onClick}>
			<p className='md:h-6 h-[22px] md:text-base text-left select-none'>
				{props.value}
			</p>
		</div>
	);
}
