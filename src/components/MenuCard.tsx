interface IMenuCardProps {
	onClick: () => void;
	src: string;
	title: string;
	description: string;
	shadowed?: boolean;
	price?: number;
}

export function MenuCard(props: IMenuCardProps) {
	return (
		<div
			onClick={props.onClick}
			style={{height: props.price ? 'auto' : 528 }}
			className={`hover:cursor-pointer flex flex-col gap-8 items-center p-6 rounded-3xl bg-white ${
				props.shadowed
					? 'shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]'
					: 'hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]'
			}`}>
			<div className='w-full'>
				<img
					src={props.src}
					alt={props.title}
					className='w-full h-auto md:w-[332px] h-[320px] object-cover rounded-3xl'
					loading='lazy'
				/>
			</div>
			{!props.price && <svg
				width={332}
				height={1}
				viewBox='0 0 332 1'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='w-full'
				preserveAspectRatio='none'>
				<line
					y1='0.5'
					x2={332}
					y2='0.5'
					stroke='#E5E5E5'
				/>
			</svg>}
			<div className='flex flex-col gap-2 w-[332px] text-center'>
				<p className='text-lg md:text-2xl text-[#0f0e0e]'>{props.title}</p>
				{props.price ? (
					<p className='text-[20px] md:text-[26px] text-sub-01'>
						{props.price?.toLocaleString()}원
					</p>
				) : (
					<p className='text-base text-[#909090] truncate whitespace-pre-line'>
						{props.description}
					</p>
				)}
			</div>
		</div>
	);
}
