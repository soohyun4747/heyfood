import { Dispatch, SetStateAction, useState } from 'react';

export interface ICheckProps {
	checked?: boolean;
	onClick?: () => void;
}

export function CheckRound(props: ICheckProps) {
	const [hover, setHover] = useState(false);

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
					<path
						d='M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z'
						fill='#FFC966'
					/>
					<path
						d='M16.303 9.11719L10.303 15.1172L8.25781 13.072'
						stroke='white'
						stroke-width={2}
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
				</svg>
			) : (
				<svg
					onClick={props.onClick}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					width={24}
					height={24}
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className=' w-6 h-6 relative'
					preserveAspectRatio='none'>
					<path
						d='M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z'
						stroke={hover ? '#FFC966' : '#CBCBCB'}
						stroke-width={2}
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
				</svg>
			)}
		</div>
	);
}
