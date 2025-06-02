import { ButtonCount } from './ButtonCount';

interface IMenuCardOrderProps {
	src: string;
	title: string;
	price: number;
	count?: number;
	onClickPlus?: () => void;
	onClickMinus?: () => void;
	onBlurValue?: (numVal: number) => void;
}

export function MenuCardOrder(props: IMenuCardOrderProps) {
	return (
		<div
			className={`hover:cursor-pointer flex flex-col gap-3 md:gap-8 items-center w-full md:w-[380px] p-2 pb-3 md:p-6 rounded-xl md:rounded-3xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]`}>
			<img
				src={props.src}
				alt={props.title}
				className='w-full h-[120px] md:h-[320px] object-cover rounded-xl md:rounded-3xl'
				loading='lazy'
			/>
			<div className='self-stretch h-[1px] bg-[#E5E5E5] hidden md:block' />
			<div className='flex flex-col justify-start items-start self-stretch gap-3 md:gap-6'>
				<div className='flex flex-col justify-start items-start self-stretch relative md:gap-2 gap-[4px]'>
					<p className='self-stretch text-sm md:text-2xl font-bold text-left text-[#0f0e0e]'>
						{props.title}
					</p>
					<p className='self-stretch text-sm md:text-[22px] font-light text-left text-[#0f0e0e]'>
						{props.price.toLocaleString()}원
					</p>
				</div>
				<ButtonCount
					value={'메뉴 담기'}
					count={props.count}
					onClickMinus={props.onClickMinus}
					onClickPlus={props.onClickPlus}
					onBlurValue={props.onBlurValue}
				/>
			</div>
		</div>
	);
}
