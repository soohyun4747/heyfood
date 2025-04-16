import { IIconProps } from '@/components/ButtonIcon';

export function ChevronRightSmall(props: IIconProps) {
	return (
		<svg
			width={24}
			height={25}
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			preserveAspectRatio='none'>
			<path
				d='M9 4.5L17 12.5L9 20.5'
				stroke={props.color ?? '#FFC966'}
				stroke-width={2}
				stroke-linecap='square'
			/>
		</svg>
	);
}
