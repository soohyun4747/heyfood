import { IIconProps } from '@/components/ButtonIcon';

export function ChevronLeftSmall(props: IIconProps) {
	return (
		<svg
			width={24}
			height={25}
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			preserveAspectRatio='none'>
			<path
				d='M16 20.5L8 12.5L16 4.5'
				stroke={props.color ?? '#FFC966'}
				stroke-width={2}
				stroke-linecap='square'
			/>
		</svg>
	);
}
