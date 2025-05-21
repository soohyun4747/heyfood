export function HorizontalLine({ className }: { className?: string }) {
	return (
		<svg
			height={1}
			viewBox='0 0 1040 1'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={`self-stretch ${className}`}
			preserveAspectRatio='none'>
			<line
				y1='0.5'
				x2={1040}
				y2='0.5'
				stroke='#D9D9D9'
			/>
		</svg>
	);
}
