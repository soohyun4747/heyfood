import { JSX } from 'react';
import { ButtonRectYellow } from './ButtonRectYellow';
import { Close } from '@/icons/Close';

export interface IDrawerProps {
	title: string;
	content: JSX.Element;
	confirmDisabled?: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export function Drawer(props: IDrawerProps) {
	return (
		<div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/40 flex items-center justify-end'>
			<div
				className='flex flex-col justify-start items-end h-full w-[450px] max-w-[100vw] relative gap-3 md:gap-6 px-5 md:px-12 py-6 md:py-8 bg-white'
				style={{ boxShadow: '0px 4px 12px 0 rgba(0,0,0,0.15)' }}>
				<div
					onClick={props.onClose}
					className='hover:cursor-pointer'>
					<Close />
				</div>
				<div className='flex flex-col justify-start items-start self-stretch flex-grow overflow-hidden gap-6 md:gap-8'>
					<div className='flex flex-col justify-start items-start self-stretch relative gap-3'>
						<div className='flex flex-col justify-center items-start relative gap-2 py-0.5'>
							<p className='text-md md:text-xl font-bold text-left text-[#0f0e0e]'>
								{props.title}
							</p>
						</div>
						<svg
							width={354}
							height={2}
							viewBox='0 0 354 2'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch'
							preserveAspectRatio='none'>
							<line
								y1={1}
								x2={354}
								y2={1}
								stroke='#0F0E0E'
								stroke-width={2}
							/>
						</svg>
					</div>
					{props.content}
				</div>
				<ButtonRectYellow
					value={'확인'}
					onClick={props.onConfirm}
					disabled={props.confirmDisabled}
					className='w-full md:min-h-[68px] min-h-[58px]'
				/>
			</div>
		</div>
	);
}
