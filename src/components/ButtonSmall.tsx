import { IButtonBasicProps } from './Button';

export function ButtonSmall(props: IButtonBasicProps) {
	return (
		<div
			className={`flex justify-center items-center flex-grow-0 flex-shrink-0 h-[36px] relative gap-2 px-[14px] rounded-[100px] ${
				props.disabled
					? 'border border-gray-200 bg-gray-200 text-gray-700'
					: 'border border-neutral-200 hover:bg-[#f8f8f8] text-[#0f0e0e] hover:cursor-pointer'
			}`}
			onClick={props.disabled ? undefined : props.onClick}>
			<p className='flex-grow-0 flex-shrink-0 h-6 text-base text-left select-none'>
				{props.value}
			</p>
		</div>
	);
}
