import { IButtonBasicProps } from './Button';

export function ButtonAgreement(props: IButtonBasicProps) {
	return (
		<div
			className='hover:cursor-pointer flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 px-2 py-1 bg-white border border-[#0f0e0e] hover:bg-[#f8f8f8]'
			onClick={props.onClick}>
			<p className='select-none flex-grow-0 flex-shrink-0 text-xs text-left text-[#0f0e0e]'>
				{props.value}
			</p>
		</div>
	);
}
