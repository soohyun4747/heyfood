import { IIconProps } from "@/components/ButtonIcon";

export function Hamburger(props: IIconProps) {
	return (
		<svg
			width={24}
			height={25}
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='flex-grow-0 flex-shrink-0 w-6 h-6 relative'
			preserveAspectRatio='none'>
			<path
				d='M20 18.5H4M20 12.5H4M20 6.5H4'
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
