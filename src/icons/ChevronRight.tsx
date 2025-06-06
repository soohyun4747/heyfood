import { IIconProps } from '@/components/ButtonIcon';

export function ChevronRight(props: IIconProps) {
	return (
		<svg
			width={props.size}
			height={props.size}
			viewBox='0 0 60 60'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			preserveAspectRatio='none'
			className='md:size-[60px] size-[36px]'>
			<path
				d='M25 17.5L37.5 30L25 42.5'
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
