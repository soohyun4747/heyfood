import { IIconProps } from '@/components/ButtonIcon';

export function Minus(props: IIconProps) {
	return (
		<svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M8.625 12H15.375'
				stroke={props.color ?? '#FFC966'}
				stroke-width={3}
				stroke-linecap='square'
				stroke-linejoin='round'
			/>
		</svg>
	);
}
