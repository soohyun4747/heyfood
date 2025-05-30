import { IButtonBasicProps } from './Button';

interface IButtonNumText extends IButtonBasicProps {
	count: number;
	disabled?: boolean;
}

export function ButtonNumText(props: IButtonNumText) {
	return (
		<div
			style={{ ...props.style }}
			onClick={!props.disabled ? props.onClick : undefined}
			className={`hover:cursor-pointer select-none flex justify-center items-center relative gap-2 px-6 py-3.5 rounded-lg ${
				props.disabled
					? 'bg-neutral-200'
					: 'bg-[#ffc966] hover:bg-[#F7BC4F]'
			} ${props.className}`}>
			{props.count > 0 && (
				<div
					className={`flex flex-col justify-center items-end h-6 relative gap-3 px-[7.5px] rounded-xl ${
						props.disabled
							? 'bg-[#cbcbcb] text-[#909090]'
							: 'bg-white text-[#ffc966]'
					}`}>
					<p className='text-[15px] font-bold text-center'>
						{props.count}
					</p>
				</div>
			)}
			<p
				className={`md:text-xl text-left ${
					props.disabled ? 'text-[#909090]' : 'text-[#0f0e0e]'
				}`}>
				{props.value}
			</p>
		</div>
	);
}
