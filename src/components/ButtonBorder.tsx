import { IButtonBasicProps } from './Button';

export function ButtonBorder(props: IButtonBasicProps) {
	return (
		<div
			onClick={props.onClick}
			style={props.style}
			className={`select-none cursor-pointer flex justify-center items-center relative gap-2 px-6 py-3.5 rounded-lg bg-white border border-[#ffc966] hover:bg-sub-03 ${props.className}`}>
			<p className='md:text-xl text-left text-[#ffc966]'>{props.value}</p>
		</div>
	);
}
