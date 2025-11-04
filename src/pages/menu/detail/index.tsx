import { ButtonMono } from '@/components/ButtonMono';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useMenuStore } from '@/stores/menuStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Hamburger } from '@/icons/Hamburger';
import { fetchImageUrls } from '@/utils/firebase';
import { IMenu } from '@/components/LandingMenusTab';

function MenuDetailPage() {
	const { menu, setMenu } = useMenuStore();
	const router = useRouter();

	const [currentIndex, setCurrentIndex] = useState(0);
        const [detailSrc, setDetailSrc] = useState<string>('');

	const imagePaths = menu?.imagePaths ?? [];

	useEffect(() => {
		if (!menu) {
			router.push('/menu/69dosirak');
		}

		return () => {
			setMenu(undefined);
		};
	}, [menu]);

        // 이미지 자동 전환
        useEffect(() => {
                if (imagePaths.length <= 1) return;

                const interval = setInterval(() => {
                        setCurrentIndex((prev) => (prev + 1) % imagePaths.length);
                }, 4000);

                return () => clearInterval(interval);
        }, [imagePaths]);

	useEffect(() => {
		if (menu) {
			getSetDetailImage(menu);
		}
	}, [menu]);

	const onClickToList = () => {
		router.back();
		setMenu(undefined);
	};

	const getSetDetailImage = async (menu: IMenu) => {
		const urls = await fetchImageUrls([menu.imageDetailPath]);
		if (urls) {
			setDetailSrc(urls[0]);
		}
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
                                        <div className='overflow-hidden rounded-3xl size-[320px] md:size-[600px]'>
                                                <div
                                                        className='flex h-full w-full transition-transform duration-500 ease-in-out'
                                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                                >
                                                        {imagePaths.map((path, index) => (
                                                                <img
                                                                        key={`${path}-${index}`}
                                                                        src={path ?? ''}
                                                                        alt={`${menu?.name ?? '메뉴 이미지'}-${index + 1}`}
                                                                        className='size-[320px] md:size-[600px] flex-shrink-0 object-cover'
                                                                        loading='lazy'
                                                                />
                                                        ))}
                                                </div>
                                        </div>
					<div className='flex flex-col justify-start items-start self-stretch md:w-[540px] relative gap-10 md:py-4'>
						<div className='flex flex-col gap-4 md:gap-5'>
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
							<p className='self-stretch text-xs md:text-[16px] text-left text-[#0f0e0e]'>
								{menu?.ingredient}
							</p>
							<div className='bg-[#D9D9D9] self-stretch md:w-[540px] h-[1px]' />
                                                        <p className='flex-grow w-full md:h-[264px] text-sm md:text-lg text-left text-[#0f0e0e] whitespace-pre-line'>
                                                                {menu?.description}
                                                        </p>
						</div>

						<div className='flex flex-col gap-2 self-stretch'>
							<div className='flex justify-center items-center self-stretch relative px-3.5 py-1.5 bg-[#fffbea]'>
								<p className='text-xs md:text-sm text-left text-[#5c5c5c]'>
									🎁 맞춤 스티커 옵션 제공 | 결제 시 원하는
									문구를 입력해 주세요.
								</p>
							</div>
							<div className='flex justify-center items-center self-stretch relative px-3.5 py-1.5 bg-[#fffbea]'>
								<p className='text-xs md:text-sm text-left text-[#5c5c5c]'>
									⏱️ 서비스 제공 기간 | 도시락 주문은 최대
									3개월 이내로 가능합니다
								</p>
							</div>
						</div>
						<div className='bg-[#D9D9D9] self-stretch md:w-[540px] h-[1px]' />
					</div>
				</div>
				<img
					src={detailSrc}
					alt={detailSrc}
					className={`object-cover max-[90vh] md:max-w-[1200px] w-auto h-auto`}
					loading='lazy'
				/>
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
