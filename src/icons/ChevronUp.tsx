import { IIconProps } from '@/components/ButtonIcon';

export function ChevronUp(props: IIconProps) {
	return (
		<svg
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={ `size-6 md:size-8 relative ${props.className}`}
			preserveAspectRatio='none'>
			<path
				d='M9.33301 18.6667L15.9997 12L22.6663 18.6667'
				stroke={
					props.hover
						? props.hoverColor ?? '#0F0E0E'
						: props.color ?? '#0F0E0E'
				}
				strokeWidth='2.66667'
				strokeLinecap='square'
			/>
		</svg>
	);
}
