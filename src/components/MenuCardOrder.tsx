import { ChangeEvent } from 'react';
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
			className={`hover:cursor-pointer flex flex-col gap-8 items-center w-[380px] p-6 rounded-3xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]`}>
			<div className='w-full h-80'>
				<img
					src={props.src}
					alt={props.title}
					className='w-[332px] h-[320px] object-cover rounded-3xl'
					loading='lazy'
				/>
			</div>
			<svg
				width={332}
				height={1}
				viewBox='0 0 332 1'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='w-full'
				preserveAspectRatio='none'>
				<line
					y1='0.5'
					x2={332}
					y2='0.5'
					stroke='#E5E5E5'
				/>
			</svg>
			<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6'>
				<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
					<p className='self-stretch flex-grow-0 flex-shrink-0 w-[332px] text-2xl font-bold text-left text-[#0f0e0e]'>
						{props.title}
					</p>
					<p className='self-stretch flex-grow-0 flex-shrink-0 w-[332px] text-[22px] font-light text-left text-[#0f0e0e]'>
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
