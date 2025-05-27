import { JSX } from 'react';
import { ButtonRectYellow } from './ButtonRectYellow';
import { IButtonBasicProps } from './Button';
import { ButtonRectBorder } from './ButtonRectBorder';

interface IModalCenterProps {
	title: string;
	description: string | JSX.Element;
	btn1st?: IButtonBasicProps;
	btn2nd?: IButtonBasicProps;
}

export function ModalCenter(props: IModalCenterProps) {
	return (
		<div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/40 flex items-center justify-center'>
			<div
				className='flex flex-col justify-start items-end w-[490px] gap-12 p-12 rounded-3xl bg-white'
				style={{ boxShadow: '0px 4px 20px 0 rgba(0,0,0,0.1)' }}>
				<div className='flex flex-col justify-start items-start self-stretch gap-6'>
					<div className='flex flex-col justify-center items-center self-stretch gap-2 py-0.5'>
						<p className='text-2xl font-bold text-center text-[#0f0e0e]'>
							{props.title}
						</p>
					</div>
					<div className='flex justify-center items-start self-stretch gap-2 text-lg text-center text-black'>
						{props.description}
					</div>
				</div>
				<div className='flex flex-col justify-start items-start self-stretch gap-4'>
					{props.btn1st && <ButtonRectYellow {...props.btn1st} />}
					{props.btn2nd && <ButtonRectBorder {...props.btn2nd} />}
				</div>
			</div>
		</div>
	);
}
