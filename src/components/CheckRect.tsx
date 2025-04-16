import { useState } from 'react';
import { ICheckProps } from './CheckRound';

export function CheckRect(props: ICheckProps) {
	return (
		<div className='hover:cursor-pointer'>
			{props.checked ? (
				<svg
					onClick={props.onClick}
					width={24}
					height={24}
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className=' w-6 h-6 relative'
					preserveAspectRatio='none'>
					<g clip-path='url(#clip0_273_2438)'>
						<rect
							width={24}
							height={24}
							rx='7.2'
							fill='#FFC966'
						/>
						<path
							d='M17.727 8L9.72698 16L7 13.273'
							stroke='white'
							stroke-width={2}
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</g>
					<rect
						x='0.6'
						y='0.6'
						width='22.8'
						height='22.8'
						rx='6.6'
						stroke='#FFC966'
						stroke-width='1.2'
					/>
					<defs>
						<clipPath id='clip0_273_2438'>
							<rect
								width={24}
								height={24}
								rx='7.2'
								fill='white'
							/>
						</clipPath>
					</defs>
				</svg>
			) : (
				<div
					onClick={props.onClick}
					className=' w-6 h-6 overflow-hidden rounded-[7.2px] bg-white border-[1.2px] border-[#cbcbcb] hover:border-[#ffc966]'
				/>
			)}
		</div>
	);
}
