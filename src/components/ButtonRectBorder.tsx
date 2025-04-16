import { IButtonBasicProps } from './Button';

export function ButtonRectBorder(props: IButtonBasicProps) {
	return (
		<div
			onClick={props.onClick}
			className='flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-[62px] relative gap-[60px] px-8 py-6 bg-white border border-[#ffc966] hover:bg-[#fffbea] bg-white hover:cursor-pointer'>
			<p className='flex-grow-0 flex-shrink-0 text-lg font-bold text-center text-[#5c5c5c]'>
				{props.value}
			</p>
		</div>
	);
}
