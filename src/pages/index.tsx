import { ButtonMono } from '@/components/ButtonMono';
import { PromiseCard } from '@/components/PromiseCard';
import { ReviewCarousel } from '@/components/ReviewCarousel';
import { LandingMenusTab } from '@/components/LandingMenusTab';
import { ArrowRight } from '@/icons/ArrowRight';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Location } from '@/icons/Location';
import { Calendar } from '@/icons/Calendar';
import { Sticker } from '@/icons/Sticker';
import { Card } from '@/icons/Card';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { fetchImageUrls, getActivePopups } from '@/utils/firebase';
import { Popup } from '@/components/Popup';

export interface IPopup {
	id: string;
	startDate: Timestamp;
	endDate: Timestamp;
	imagePath: string;
	linkUrl: string;
	title: string;
	createdAt: Timestamp;
	updatedAt?: Timestamp;
}

function LandingPage() {
	const [popups, setPopups] = useState<IPopup[]>([]);
	const [isPopupOpens, setIsPopupOpens] = useState<boolean[]>([]);

	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			getSetPopups();
		}, 5000);
	}, []);

	const getSetPopups = async () => {
		const fetchedPopups = await getActivePopups();

		const updatedPopups = await Promise.all(
			fetchedPopups.map(async (popup) => {
				const urls = await fetchImageUrls([popup.imagePath]);
				if (urls) {
					popup.imagePath = urls[0];
				}
				return popup;
			})
		);

		setPopups(updatedPopups);
		setIsPopupOpens(new Array(updatedPopups.length).fill(true));
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-[345px] h-auto'>
					<Image
						src={'/images/banner.png'}
						alt={'banner'}
						width={1440}
						height={668}
						className='w-full h-auto hidden md:block object-cover'
					/>
					<Image
						src={'/images/banner_mob.png'}
						alt={'banner'}
						width={360}
						height={700}
						className='w-full h-[700px] md:hidden object-cover'
					/>
					<div className='md:hidden w-full h-[700px] opacity-40 bg-gradient-to-b from-[#f9ca38] to-[#f1e6c8] absolute top-0 left-0' />
					<div className='absolute top-[82px] left-[20px] md:top-1/2 md:transform md:-translate-y-1/2 md:left-[120px] flex flex-col gap-[60px]'>
						<div className='flex flex-col justify-start items-start gap-[9px] md:gap-3'>
							<p className='text-[37.5px] md:text-[50px] font-bold text-[#0f0e0e]'>
								<span>도시락, 고민될 땐 </span>
								<br />
								<span>HEYDELIBOX</span>
							</p>
							<p className='text-[13.5px] md:text-lg text-[#0f0e0e]'>
								<span>행사 도시락, 어떻게 준비하지?”</span>
								<br />
								<span>
									예산은 한정돼 있고, 참석자들에게 정성도
									전하고 싶은데...
								</span>
								<br />
								<span className='font-bold'>
									고민하는 당신을 위해 HEYDELIBOX가{' '}
									<br className='md:hidden' />
									해결해 드리겠습니다!
								</span>
							</p>
						</div>
						<div className='flex md:flex-row flex-col md:items-center gap-3'>
							<ButtonMono
								value={'지금 바로 상담받기'}
								icon={ArrowRight}
								onClick={() =>
									router.push('http://pf.kakao.com/_nTXSn')
								}
							/>
							<ButtonMono
								value={'도시락 메뉴 보기'}
								icon={ArrowRight}
								onClick={() => router.push('/menu')}
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch gap-[60px] py-40'>
					<div className='flex flex-col justify-start items-center relative gap-5'>
						<p className='text-[28px] md:text-5xl font-bold text-center text-[#0f0e0e]'>
							&nbsp;해결의 제안: <br className='md:hidden' />
							HEYDELIBOX 도시락
						</p>
						<p className='text-sm md:text-lg text-center text-[#0f0e0e]'>
							<span>
								호불호 없는 구성과 패키지에 정성스러운{' '}
								<br className='md:hidden' />
								느낌을 담은 커스텀 스티커로{' '}
							</span>
							<br />
							<span>
								고객 재주문율 95% 이상으로 끌어올릴 수 있습니다.
							</span>
						</p>
					</div>
					<div className='flex flex-col gap-[60px]'>
						<div className='flex md:flex-row flex-col gap-[60px] md:gap-8'>
							<PromiseCard
								title='홈페이지로 빠른 주문 가능'
								description='홈페이지에서 원하는 도시락과 행사일정을 입력하기만 하면, 별도의 상담 절차 없이도 쉽고 빠르게 주문할 수 있습니다. 간편한 온라인 주문 시스템으로 바쁜 일정에도 손쉽게 도시락을 준비하세요.'
								src={`${router.basePath}/images/promise_1.png`}
							/>
							<PromiseCard
								title='고급스러운 패키지'
								description='김밥, 샌드위치, 닭강정 등 다양한 메뉴를 깔끔하고 고급스러운 패키지에 담아 제공합니다. 도시락을 받는 순간부터 특별함을 느낄 수 있습니다.'
								src={`${router.basePath}/images/promise_2.png`}
							/>
							<PromiseCard
								title='커스텀스티커 부착'
								description='행사나 모임, 고객 요청에 따라 맞춤 문구가 담긴 스티커를 제작해 도시락에 부착해드립니다. 받는 이에게 감동을 더하는 세심한 서비스가 특징입니다.'
								src={`${router.basePath}/images/promise_3.png`}
							/>
						</div>
						<div className='flex md:flex-row flex-col gap-[60px] md:gap-8'>
							<PromiseCard
								title='원하는 일정에 배송 가능'
								description='고객이 원하는 날짜와 시간에 맞춰 신선한 도시락을 정해진 장소로 안전하게 배송합니다. 일정에 맞춘 맞춤형 서비스로 편리함을 제공합니다.'
								src={`${router.basePath}/images/promise_4.png`}
							/>
							<PromiseCard
								title='대량주문도 문제 없는 시스템'
								description='최신 설비와 체계적인 생산 시스템으로, 대량 주문에도 신속하고 정확하게 도시락을 준비할 수 있습니다. 기업 행사나 단체 주문도 걱정 없이 맡기실 수 있습니다.'
								src={`${router.basePath}/images/promise_5.png`}
							/>
							<PromiseCard
								title='HACCP 인증'
								description='위생과 안전을 최우선으로 하여, HACCP 인증을 받은 시설에서 도시락을 제조합니다. 믿고 먹을 수 있는 건강한 도시락을 약속드립니다.'
								src={`${router.basePath}/images/promise_6.png`}
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch  gap-[40px] md:px-[120px] py-40 bg-[#ffc966]'>
					<div className='flex flex-col justify-start items-center  gap-5'>
						<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
							헤이델리박스 메뉴
						</p>
						<LandingMenusTab />
					</div>
					<ButtonMono
						value={'더보기'}
						icon={ArrowRight}
						onClick={() => router.push('/menu')}
					/>
				</div>
				<div className='flex justify-center items-start self-stretch h-[900px] md:h-[790px] relative py-40 md:pt-40'>
					<div className='flex flex-col justify-start items-center gap-2'>
						<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
							서비스 이용 후기
						</p>
						<p className='md:text-lg text-center text-[#0f0e0e]'>
							헤이델리박스를 만나고 <br className='md:hidden'/>달라진 고객 후기를 살펴보세요
						</p>
					</div>
					<div className='absolute left-0 right-0 top-[310px]'>
						<ReviewCarousel />
					</div>
				</div>
				<div className='flex md:flex-row flex-col items-center gap-[60px] md:gap-[160px] justify-center pt-[60px] bg-[#FFFBEA]'>
					<div className='flex flex-col justify-start items-start relative gap-12'>
						<p className='text-[28px] md:text-[32px] font-bold text-left text-[#0f0e0e]'>
							주문방법
						</p>
						<div className='flex justify-start items-center relative gap-5'>
							<div className='size-[60px] rounded-full bg-brand-01 flex items-center justify-center'>
								<Location />
							</div>
							<div className='flex flex-col justify-start items-start relative gap-0.5'>
								<p className='self-stretch text-xl font-bold text-left text-[#0f0e0e]'>
									주소입력
								</p>
								<p className='self-stretch text-sm md:text-base text-left text-[#0f0e0e]'>
									행사도시락을 받아보실 주소 입력
								</p>
							</div>
						</div>
						<div className='flex justify-start items-center relative gap-5'>
							<div className='size-[60px] rounded-full bg-brand-01 flex items-center justify-center'>
								<Calendar />
							</div>
							<div className='flex flex-col justify-start items-start relative gap-0.5'>
								<p className='self-stretch text-xl font-bold text-left text-[#0f0e0e]'>
									날짜 및 시간선택
								</p>
								<p className='self-stretch text-sm md:text-base text-left text-[#0f0e0e]'>
									행사 일정에 맞춰 배송일과 시간 지정
								</p>
							</div>
						</div>
						<div className='flex justify-start items-center relative gap-5'>
							<div className='size-[60px] rounded-full bg-brand-01 flex items-center justify-center'>
								<Sticker />
							</div>
							<div className='flex flex-col justify-start items-start relative gap-0.5'>
								<p className='self-stretch text-xl font-bold text-left text-[#0f0e0e]'>
									스티커문구 입력
								</p>
								<p className='self-stretch text-sm md:text-base text-left text-[#0f0e0e]'>
									도시락에 붙일 커스텀 스티커 문구 입력
								</p>
							</div>
						</div>
						<div className='flex justify-start items-center relative gap-5'>
							<div className='size-[60px] rounded-full bg-brand-01 flex items-center justify-center'>
								<Card />
							</div>
							<div className='flex flex-col justify-start items-start relative gap-0.5'>
								<p className='self-stretch text-xl font-bold text-left text-[#0f0e0e]'>
									결제 및 주문하기
								</p>
							</div>
						</div>
						<p className='text-sm md:text-base text-left text-[#0f0e0e]'>
							<span>
								문의사항이 있으실 경우, 문의하기 페이지로
								<br className='md:hidden' />
								남겨주시면{' '}
							</span>
							<br className='hidden md:block' />
							<span>이메일로 24시간 이내 응답해 드립니다.</span>
						</p>
						<div className='w-[4px] h-[65px] bg-brand-01 absolute left-[28px] top-[150px]' />
						<div className='w-[4px] h-[65px] bg-brand-01 absolute left-[28px] top-[250px]' />
						<div className='w-[4px] h-[65px] bg-brand-01 absolute left-[28px] top-[360px]' />
					</div>
					<Image
						src={'/images/order_method.png'}
						width={652}
						height={737}
						className='w-[320px] md:w-[652px] h-auto md:h-[737px] object-contain'
						alt='order_method'
					/>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-[60px] px-[120px] py-40'>
					<div className='w-[320px] md:w-[1200px] h-[480px] relative overflow-hidden rounded-3xl'>
						<Image
							src={`${router.basePath}/images/banner_2.png`}
							className='w-[1200px] h-[480px] absolute left-0 top-0 object-cover hidden md:block'
							width={1200}
							height={480}
							alt='banner_2'
						/>
						<Image
							src={`${router.basePath}/images/banner_2_mob.png`}
							className='w-[320px] h-[480px] absolute left-0 top-0 object-cover md:hidden'
							width={320}
							height={480}
							alt='banner_2_mob'
						/>
						<div className='w-[320px] md:w-[1200px] h-[480px] absolute left-0 top-0 opacity-[0.45] rounded-3xl bg-[#0f0e0e]' />
						<div className='md:w-auto w-[211px] flex flex-col justify-start items-center gap-[52px] absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
							<div className='flex flex-col justify-center gap-2'>
								<p className='text-[28px] md:text-[50px] font-bold text-center text-[#f8f8f8]'>
									궁금한 점이 <br className='md:hidden' />
									있으신가요?
								</p>
								<p className='text-sm md:text-md text-center text-white leading-[160%]'>
									카카오톡, 전화, 문의하기로 쉽고{' '}
									<br className='md:hidden' />
									빠르게 문의/주문하세요!
								</p>
							</div>
							<div className='flex md:flex-row flex-col items-center gap-3'>
								<ButtonMono
									value={'카카오톡 문의'}
									onClick={() =>
										router.push(
											'http://pf.kakao.com/_nTXSn'
										)
									}
									white
								/>
								<ButtonMono
									value={'문의글 남기기'}
									onClick={() => router.push('/inquiry')}
									white
								/>
							</div>
						</div>
					</div>
					{popups.map((popup, i) => (
						<>
							{isPopupOpens[i] && (
								<Popup
									src={popup.imagePath}
									link={popup.linkUrl}
									onClose={() =>
										setIsPopupOpens((prev) => {
											prev[i] = false;
											return [...prev];
										})
									}
									id={popup.id}
								/>
							)}
						</>
					))}
				</div>
			</div>
		</Common>
	);
}

export default LandingPage;
