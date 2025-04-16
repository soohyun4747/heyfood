import { IButtonBasicProps } from './Button';

export function ButtonSmall(props: IButtonBasicProps) {
	return (
		<div
			className='flex justify-center items-center flex-grow-0 flex-shrink-0 h-[26px] relative gap-2 px-3 rounded-[100px] border border-neutral-200 hover:bg-[#f8f8f8] hover:cursor-pointer'
			onClick={props.onClick}>
			<p className='flex-grow-0 flex-shrink-0 h-6 text-base text-left text-[#0f0e0e] select-none'>
				{props.value}
			</p>
		</div>
	);
}
