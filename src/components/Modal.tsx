import { JSX } from 'react';

interface IModalProps {
	onClose: () => void;
	title: string;
	content: JSX.Element;
}

export function Modal(props: IModalProps) {
	return (
		<div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/40 flex items-center justify-center px-[20px] md:px-0'>
			<div
				className='flex flex-col justify-start items-end md:w-[700px] relative px-[20px] py-12 md:p-12 rounded-3xl bg-white'
				style={{ boxShadow: '0px 4px 12px 0 rgba(0,0,0,0.15)' }}>
				<div className='flex flex-col justify-start items-start self-stretch gap-6'>
					<div className='flex flex-col justify-start items-start self-stretch relative gap-3'>
						<div className='flex flex-col justify-center items-start self-stretch relative gap-2 py-0.5'>
							<p className='text-xl font-bold text-left text-[#0f0e0e]'>
								{props.title}
							</p>
						</div>
						<div className='self-stretch md:w-[604px] h-[1px] bg-[#0F0E0E]' />
					</div>
					<div className='flex justify-center items-start self-stretch md:h-[380px] h-[360px] relative overflow-y-auto gap-2'>
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
					className='w-8 h-8 absolute md:left-[620px] top-8 hover:cursor-pointer'
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
