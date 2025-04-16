import { IIconProps } from '../ButtonIcon';

export function ArrowRight(props: IIconProps) {
	return (
		<svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className=' w-6 h-6 relative'
			preserveAspectRatio='none'>
			<path
				d='M13.3333 5L20 12M20 12L13.3333 19M20 12L4 12'
				stroke={
					props.hover
						? props.hoverColor ?? 'white'
						: props.color ?? '#0F0E0E'
				}
				strokeWidth={2}
				strokeLinecap='square'
			/>
		</svg>
	);
}
