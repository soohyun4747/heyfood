import { ButtonMono } from '@/components/ButtonMono';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useMenuStore } from '@/stores/menuStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Hamburger } from '@/icons/Hamburger';

function MenuDetailPage() {
	const { menu, setMenu } = useMenuStore();
	const router = useRouter();

	const [currentIndex, setCurrentIndex] = useState(0);
	const [opacity, setOpacity] = useState(1);

	const imagePaths = menu?.imagePaths ?? [];

	useEffect(() => {
		if (!menu) {
			router.push('/menu');
		}

		return () => {
			setMenu(undefined);
		};
	}, [menu]);

	// 이미지 자동 전환
	useEffect(() => {
		if (imagePaths.length <= 1) return;

		const interval = setInterval(() => {
			// 먼저 opacity를 0으로 만들고 300ms 후 이미지 교체 및 opacity 복원
			setOpacity(0);

			setTimeout(() => {
				setCurrentIndex((prev) => (prev + 1) % imagePaths.length);
				setOpacity(1);
			}, 300);
		}, 2000);

		return () => clearInterval(interval);
	}, [imagePaths]);

	const onClickToList = () => {
		router.push('/menu');
		setMenu(undefined);
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch gap-[60px] px-[20px] md:px-[120px] pt-[40px] md:pt-[100px] pb-40 bg-white'>
				<div className='flex flex-col justify-start items-center self-stretch gap-2'>
					<p className='self-stretch text-[28px] md:text-5xl font-bold text-center text-[#0f0e0e]'>
						메뉴 정보
					</p>
				</div>
				<div className='flex md:flex-row flex-col justify-center items-start md:gap-[60px] gap-[32px]'>
					<img
						src={imagePaths[currentIndex] ?? ''}
						alt={menu?.name}
						style={{ opacity }}
						className='size-[320px] md:size-[600px] object-cover rounded-3xl transition-opacity duration-500'
						loading='lazy'
					/>
					<div className='flex flex-col justify-start items-start self-stretch md:w-[540px] relative gap-10 md:py-4'>
						<div className='flex flex-col justify-start items-start self-stretch gap-[12px] md:gap-6'>
							<p className='self-stretch text-[24px] md:text-[32px] font-bold text-left text-[#0f0e0e]'>
								{menu?.name}
							</p>
							<div className='flex justify-start items-center gap-0.5'>
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
