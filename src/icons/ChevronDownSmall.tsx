import { IIconProps } from '@/components/ButtonIcon';

export function ChevronDownSmall(props: IIconProps) {
	return (
		<svg
			id={props.id}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 48 48'
			className={`size-6 md:size-[32px] relative ${props.className}`}
			fill='none'>
			<path
				id={props.id}
				d='M34 20L24 30L14 20'
				stroke={
					props.hover
						? props.hoverColor ?? '#F2AB27'
						: props.color ?? 'white'
				}
				strokeWidth='4'
				strokeLinecap='square'
			/>
		</svg>
	);
}
