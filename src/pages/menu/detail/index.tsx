import { ButtonMono } from '@/components/ButtonMono';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useMenuStore } from '@/stores/menuStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Hamburger } from '@/icons/Hamburger';

function MenuDetailPage() {
	const { menu, setMenu } = useMenuStore();

	const router = useRouter();

	useEffect(() => {
		if (!menu) {
			router.push('/menu');
		}

		return () => {
			setMenu(undefined);
		};
	}, [menu]);

	const onClickToList = () => {
		router.push('/menu');
		setMenu(undefined);
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] px-[120px] pt-[100px] pb-40 bg-white'>
				<div className='flex flex-col justify-start items-center self-stretch  gap-2'>
					<p className='self-stretch  text-5xl font-bold text-center text-[#0f0e0e]'>
						메뉴 정보
					</p>
				</div>
				<div className='flex justify-center items-start  gap-[60px]'>
					<img
						src={menu?.imagePaths[0] ?? ''}
						alt={menu?.name}
						className='size-[600px] object-cover rounded-3xl'
						loading='lazy'
					/>
					<div className='flex flex-col justify-start items-start self-stretch  w-[540px] relative gap-10 py-4'>
						<div className='flex flex-col justify-start items-start self-stretch  gap-6'>
							<p className='self-stretch  w-[540px] text-[32px] font-bold text-left text-[#0f0e0e]'>
								{menu?.name}
							</p>
							<div className='flex justify-start items-center  gap-0.5'>
								<p className=' text-[26px] font-light text-left text-[#f2ab27]'>
									{menu?.price.toLocaleString()}
								</p>
								<p className=' text-2xl text-left text-[#f2ab27]'>
									원
								</p>
							</div>
						</div>
						<svg
							width={540}
							height={1}
							viewBox='0 0 540 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={540}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
						<p className='flex-grow w-[493px] h-[338px] text-lg text-left text-[#0f0e0e]'>
							{menu?.description}
						</p>
						<svg
							width={540}
							height={1}
							viewBox='0 0 540 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={540}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
					</div>
				</div>
				<ButtonMono
					value={'목록으로'}
					icon={Hamburger}
					onClick={onClickToList}
				/>
			</div>
		</Common>
	);
}

export default MenuDetailPage;
