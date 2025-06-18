import Image from 'next/image';

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
			className={`hover:cursor-pointer flex flex-col gap-8 items-center p-6 rounded-3xl bg-white ${
				props.shadowed
					? 'shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]'
					: 'hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]'
			} ${props.price ? 'h-[auto]' : 'md:h-[528px]'}`}>
			<div className='w-full'>
				<Image
					src={props.src}
					alt={props.title}
					className='w-full h-[272px] md:w-[332px] md:h-[320px] object-cover rounded-3xl'
					width={332}
					height={320}
					priority
				/>
			</div>
			<div className='flex flex-col gap-2 w-[252px] md:w-[332px] text-center'>
				<p className='text-lg md:text-2xl text-[#0f0e0e]'>
					{props.title}
				</p>
				{props.price ? (
					<p className='text-[20px] md:text-[26px] text-sub-01'>
						{props.price?.toLocaleString()}원
					</p>
				) : (
					<p className='text-base text-[#909090] truncate whitespace-pre-line h-[72px] md:max-h-[78px]'>
						{props.description}
					</p>
				)}
			</div>
		</div>
	);
}
