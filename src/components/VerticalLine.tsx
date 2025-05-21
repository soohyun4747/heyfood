export function VerticalLine({ className }: { className?: string }) {
	return (
		<svg
			width={1}
			viewBox='0 0 1 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={`h-[28px] ${className}`}
			preserveAspectRatio='none'>
			<line
				x1='0.5'
				y1='2.18557e-8'
				x2='0.499999'
				y2={28}
				stroke='#D9D9D9'
			/>
		</svg>
	);
}
