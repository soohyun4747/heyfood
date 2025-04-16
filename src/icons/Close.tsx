import { IIconProps } from '@/components/ButtonIcon';

export function Close({ size }: { size?: number }) {
	return (
		<svg
			width={size ?? 32}
			height={size ?? 32}
			viewBox={'0 0 32 32'}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			preserveAspectRatio='none'>
			<path
				d='M24 8L8 24M24 24L8 8'
				stroke='black'
				stroke-width={2}
				stroke-linecap='round'
			/>
		</svg>
	);
}
