import { IIconProps } from '@/components/ButtonIcon';

export function ChevronDown(props: IIconProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='48'
			height='48'
			viewBox='0 0 48 48'
			fill='none'>
			<path
				d='M34 20L24 30L14 20'
				stroke={
					props.hover
						? props.hoverColor ?? '#F2AB27'
						: props.color ?? 'white'
				}
				stroke-width='4'
				stroke-linecap='square'
			/>
		</svg>
	);
}
