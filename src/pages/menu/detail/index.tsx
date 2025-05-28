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
			<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] px-[20px] md:px-[120px] pt-[40px] md:pt-[100px] pb-40 bg-white'>
				<div className='flex flex-col justify-start items-center self-stretch  gap-2'>
					<p className='self-stretch text-[28px] md:text-5xl font-bold text-center text-[#0f0e0e]'>
						메뉴 정보
					</p>
				</div>
				<div className='flex md:flex-row flex-col justify-center items-start md:gap-[60px] gap-[32px]'>
					<img
						src={menu?.imagePaths[0] ?? ''}
						alt={menu?.name}
						className='size-[320px] md:size-[600px] object-cover rounded-3xl'
						loading='lazy'
					/>
					<div className='flex flex-col justify-start items-start self-stretch md:w-[540px] relative gap-10 md:py-4'>
						<div className='flex flex-col justify-start items-start self-stretch gap-[12px] md:gap-6'>
							<p className='self-stretch text-[24px] md:text-[32px] font-bold text-left text-[#0f0e0e]'>
								{menu?.name}
							</p>
							<div className='flex justify-start items-center  gap-0.5'>
								<p className='text-[24px] md:text-[26px] font-light text-left text-[#f2ab27]'>
									{menu?.price.toLocaleString()}
								</p>
								<p className='text-[22px] md:text-2xl text-left text-[#f2ab27]'>
									원
								</p>
							</div>
						</div>
						<div className='bg-[#D9D9D9] self-stretch md:w-[540px] h-[1px]' />
						<p className='flex-grow w-full md:h-[264px] text-sm md:text-lg text-left text-[#0f0e0e]'>
							{menu?.description}
						</p>
						<div className='flex justify-center items-center self-stretch relative gap-2 px-3.5 py-1.5 bg-[#fffbea]'>
							<p className='text-xs md:text-sm text-left text-[#5c5c5c]'>
								🎁 맞춤 스티커 옵션 제공 | 결제 시 원하는 문구를
								입력해 주세요.
							</p>
						</div>
						<div className='bg-[#D9D9D9] self-stretch md:w-[540px] h-[1px]' />
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
