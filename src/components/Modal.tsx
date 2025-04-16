import { JSX } from 'react';

interface IModalProps {
	onClose: () => void;
	title: string;
	content: JSX.Element;
}

export function Modal(props: IModalProps) {
	return (
		<div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/40 flex items-center justify-center'>
			<div
				className='flex flex-col justify-start items-end flex-grow-0 flex-shrink-0 w-[700px] relative p-12 rounded-3xl bg-white'
				style={{ boxShadow: '0px 4px 12px 0 rgba(0,0,0,0.15)' }}>
				<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6'>
					<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3'>
						<div className='flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2 py-0.5'>
							<p className='flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-[#0f0e0e]'>
								{props.title}
							</p>
						</div>
						<svg
							width={604}
							height={2}
							viewBox='0 0 604 2'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1={1}
								x2={604}
								y2={1}
								stroke='#0F0E0E'
								stroke-width={2}
							/>
						</svg>
					</div>
					<div className='flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 h-[495px] relative overflow-y-auto gap-2'>
						{props.content}
					</div>
				</div>
				<svg
					onClick={props.onClose}
					width={32}
					height={32}
					viewBox='0 0 32 32'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='flex-grow-0 flex-shrink-0 w-8 h-8 absolute left-[620px] top-8 hover:cursor-pointer'
					preserveAspectRatio='none'>
					<path
						d='M24 8L8 24M24 24L8 8'
						stroke='black'
						stroke-width={2}
						stroke-linecap='round'
					/>
				</svg>
			</div>
		</div>
	);
}
