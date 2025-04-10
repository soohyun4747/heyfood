import { IIconProps } from '../ButtonIcon';

export function ChevronLeft(props: IIconProps) {
	return (
		<svg
			width={60}
			height={60}
			viewBox='0 0 60 60'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='flex-grow-0 flex-shrink-0 w-[60px] h-[60px] relative'
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
