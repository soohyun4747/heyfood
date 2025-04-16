import { IIconProps } from '@/components/ButtonIcon';

export function ChevronLeft(props: IIconProps) {
	return (
		<svg
			width={props.size ?? 60}
			height={props.size ?? 60}
			viewBox='0 0 60 60'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			preserveAspectRatio='none'>
			<path
				d='M35 17.5L22.5 30L35 42.5'
				stroke={
					props.hover
						? props.hoverColor ?? '#F2AB27'
						: props.color ?? 'white'
				}
				strokeWidth={5}
				strokeLinecap='square'
			/>
		</svg>
	);
}
