import { ICheckProps } from './CheckRound';

export function ButtonRadio(props: ICheckProps) {
	return (
		<div className='hover:cursor-pointer'>
			{props.checked ? (
				<svg
					width={28}
					height={28}
					viewBox='0 0 28 28'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='self-stretch  h-7 relative'
					preserveAspectRatio='none'>
					<rect
						x={1}
						y={1}
						width={26}
						height={26}
						rx={13}
						fill='white'
					/>
					<rect
						x={1}
						y={1}
						width={26}
						height={26}
						rx={13}
						stroke='#FFC966'
						stroke-width={2}
					/>
					<circle
						cx='14.0004'
						cy='14.0004'
						r='5.6'
						fill='#FFC966'
					/>
				</svg>
			) : (
				<div className='self-stretch  w-7 h-7 overflow-hidden rounded-[14px] bg-white border-2 border-neutral-200 hover:border-[#ffc966]' />
			)}
		</div>
	);
}
