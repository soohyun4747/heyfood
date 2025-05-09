
interface IMenuCardProps {
	onClick: () => void;
	src: string;
	title: string;
	description: string;
	shadowed?: boolean;
}

export function MenuCard(props: IMenuCardProps) {
	return (
		<div
			onClick={props.onClick}
			className={`hover:cursor-pointer flex flex-col gap-8 items-center h-[528px] w-[380px] p-6 rounded-3xl bg-white ${
				props.shadowed
					? 'shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]'
					: 'hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]'
			}`}>
			<div className='w-full h-80'>
				<img
					src={props.src}
					alt={props.title}
					className='w-[332px] h-[320px] object-cover rounded-3xl'
					loading='lazy'
				/>
			</div>
			<svg
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
			</svg>
			<div className='flex flex-col gap-2 w-full'>
				<p className='w-[332px] text-2xl text-center text-[#0f0e0e]'>
					{props.title}
				</p>
				<p className='w-[332px] text-base text-center text-[#909090] truncate whitespace-pre-line'>
					{props.description}
				</p>
			</div>
		</div>
	);
}
