import { IIconProps } from '@/components/ButtonIcon';

export function Menu(props: IIconProps) {	

	return (
		<svg
			id={props.id}
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='w-6 h-6 relative'
			preserveAspectRatio='none'>
			<path
				id={props.id}
				d='M20 18H4M20 12H4M20 6H4'
				stroke='black'
				stroke-width={2}
				stroke-linecap='square'
			/>
		</svg>
	);
}
