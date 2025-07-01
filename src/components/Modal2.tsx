import { Close } from '@/icons/Close';
import { ButtonIcon } from './ButtonIcon';
import { ButtonRectYellow } from './ButtonRectYellow';
import { JSX } from 'react';

interface Modal2 {
	title: string;
	btnValue: string;
	btnDisabled?: boolean;
	content: JSX.Element;
	onBtnClick: () => void;
	onClose: () => void;
}

export function Modal2(props: Modal2) {
	return (
		<div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/40 flex items-center justify-center px-[20px] md:px-0 z-[2]'>
			<div className='flex flex-col justify-start items-start md:w-[612px] relative w-full'>
				<div className='self-stretch h-[76px] flex items-center justify-center relative rounded-tl-3xl rounded-tr-3xl bg-white border-t-0 border-r-0 border-b border-l-0 border-neutral-200 relative'>
					<p className='text-lg font-bold text-left text-[#0f0e0e]'>
						{props.title}
					</p>
					<ButtonIcon
						icon={Close}
						className='absolute top-1/2 -translate-y-1/2 right-[20px] md:right-[30px]'
						onClick={props.onClose}
					/>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch gap-6 md:px-9 md:py-8 p-5 rounded-bl-3xl rounded-br-3xl bg-white max-h-[450px] overflow-auto md:max-h-[unset]'>
					{props.content}
					<ButtonRectYellow
						disabled={props.btnDisabled}
						value={props.btnValue}
						onClick={props.onBtnClick}
						className='w-full md:min-h-[68px] min-h-[58px]'
					/>
				</div>
			</div>
		</div>
	);
}
