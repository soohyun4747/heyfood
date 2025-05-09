import { ButtonMono } from '@/components/ButtonMono';
import { PromiseCard } from '@/components/PromiseCard';
import { ReviewCarousel } from '@/components/ReviewCarousel';
import { LandingMenusTab } from '@/components/LandingMenusTab';
import { ArrowRight } from '@/icons/ArrowRight';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useRouter } from 'next/router';
import Image from 'next/image';

function LandingPage() {
	const router = useRouter();

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-[345px] h-auto'>
					<Image
						src={'/images/banner.png'}
						alt={'banner'}
						width={1440}
						height={668}
						className='w-full h-auto'
					/>
					<p className='text-5xl font-bold text-center text-[#0f0e0e] leading-[150%] absolute left-1/2 transform -translate-x-1/2 top-[90px]'>
						<span className=' text-5xl font-bold text-center text-[#0f0e0e]'>
							선물 같은 도시락,{' '}
						</span>
						<br />
						<span className=' text-5xl font-bold text-center text-[#0f0e0e]'>
							행사를 빛내는 특별한 한 끼
						</span>
					</p>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] px-[120px] py-40'>
					<div className='flex flex-col justify-start items-center  gap-3'>
						<p className=' text-[50px] font-bold text-center text-[#0f0e0e]'>
							실속있는 가격에 남김없이
						</p>
						<p className=' text-lg text-center text-[#0f0e0e]'>
							<span className=' text-lg font-bold text-center text-[#0f0e0e]'>
								실속 있는 가격과 호불호 없는 메뉴
							</span>
							<span className=' text-lg text-center text-[#0f0e0e]'>
								로 남김없이 먹을 수 있습니다.
							</span>
							<br />
							<span className=' text-lg font-bold text-center text-[#0f0e0e]'>
								맞춤형 스티커
							</span>
							<span className=' text-lg text-center text-[#0f0e0e]'>
								로 행사의 특별함을 더하고 받는 분 모두가
							</span>
							<br />
							<span className=' text-lg font-bold text-center text-[#0f0e0e]'>
								&apos;나만을 위한 도시락&apos;
							</span>
							<span className=' text-lg text-center text-[#0f0e0e]'>
								을 느끼도록 정성을 담았습니다.
							</span>
						</p>
					</div>
					<ButtonMono
						icon={ArrowRight}
						value={'브랜드 스토리'}
					/>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch  gap-[40px] px-[120px] py-40 bg-[#ffc966]'>
					<div className='flex flex-col justify-start items-center  gap-5'>
						<p className=' text-[50px] font-bold text-center text-[#0f0e0e]'>
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
				<div className='flex flex-col justify-start items-center  self-stretch gap-[60px] px-[120px] py-40'>
					<div className='flex flex-col justify-start items-center  gap-2'>
						<p className=' text-[50px] font-bold text-center text-[#0f0e0e]'>
							헤이델리박스의 약속
						</p>
						<p className=' text-lg text-center text-[#0f0e0e]'>
							<span className=' text-lg text-center text-[#0f0e0e]'>
								헤이델리박스는 따뜻하고 정성이 담긴, 차원이 다른
								도시락을 제공합니다.{' '}
							</span>
							<br />
							<span className=' text-lg text-center text-[#0f0e0e]'>
								당일 생산 원칙으로 신선한 식재료를 사용하여
								다양한 메뉴를 연구개발하였습니다.
							</span>
						</p>
					</div>
					<div className='flex justify-start items-start  gap-8'>
						<div className='flex justify-start items-start gap-8'>
							<PromiseCard
								title='신선한 식재료 사용'
								description='깨끗한 물과 비옥한 토지에서 자란 보은 정이품 쌀로 밥을 짓기에 밥알이 살아있습니다. 프리미엄 돌자반으로 주먹밥을 만들어 비린 맛이 적고, 고소함과 감칠맛이 가득합니다.'
								src={`${router.basePath}/images/promise_1.png`}
							/>
							<PromiseCard
								title='당일 생산 원칙'
								description='당일 생산 원칙으로 매일 새벽 3시부터 갓 만들어 따뜻하고 신선한 간편식을 전문 배송업체를 통해 안정적으로 배송합니다.'
								src={`${router.basePath}/images/promise_2.png`}
							/>
							<PromiseCard
								title='다양한 메뉴 개발'
								description='매달 신메뉴를 출시하고 있으면 분기별로 정기적인 리뉴얼이 이뤄집니다. 20가지가 넘는 다양한 간편식으로 새로운 헤이델리박스 도시락을 선사합니다.'
								src={`${router.basePath}/images/promise_3.png`}
							/>
							<PromiseCard
								title='기업부설연구소 운영'
								description='귀사의 기업환경에 맞게 1.식단 2.서비스 매뉴얼 3.배송 관리 4.진열 등을 전담 담당자 매칭을 통해 지속적으로 소통하고 개선하도록 하겠습니다.'
								src={`${router.basePath}/images/promise_4.png`}
							/>
						</div>
					</div>
				</div>
				<div className='flex justify-center items-start self-stretch  gap-[60px] px-[120px] py-40 bg-[#fffbea]'>
					<img
						className='self-stretch  w-[564px] h-[562px] rounded-3xl bg-[#d9d9d9]'
						src={`${router.basePath}/images/ceo_intro.png`}
					/>
					<div className='flex flex-col justify-start items-start relative gap-3'>
						<p className=' text-[32px] font-bold text-left text-[#0f0e0e]'>
							<span className=' text-[32px] font-bold text-left text-[#0f0e0e]'>
								정성 가득한 한 끼로{' '}
							</span>
							<br />
							<span className=' text-[32px] font-bold text-left text-[#0f0e0e]'>
								세상을 조금씩 바꿔나가고 싶습니다.
							</span>
						</p>
						<p className='self-stretch  w-[576px] text-base text-left text-[#0f0e0e]'>
							<span className='self-stretch  w-[576px] text-base text-left text-[#0f0e0e]'>
								대학 시절, 캠퍼스 행사에서 버려지는 수많은
								도시락을 보며 가슴이 아팠습니다.{' '}
							</span>
							<br />
							<span className='self-stretch  w-[576px] text-base text-left text-[#0f0e0e]'>
								그 순간, &apos;모두가 즐겁게 먹을 수 있는 도시락&apos;에
								대한 꿈을 품게 되었습니다.
							</span>
							<br />
							<br />
							<span className='self-stretch  w-[576px] text-base text-left text-[#0f0e0e]'>
								이 꿈을 현실로 만들기 위해 PSI 푸드테크에서
								3년간 현장 경험을 쌓았습니다. 그 시간 동안
								도시락 제작의 모든 과정을 배우며,
								&apos;김밥도시락&apos;이라는 아이디어를 떠올렸습니다.
							</span>
							<br />
							<br />
							<span className='self-stretch  w-[576px] text-base text-left text-[#0f0e0e]'>
								우리의 목표는 단순한 한 끼가 아닙니다. 받는 순간
								미소 짓게 되는 &apos;선물 같은 도시락&apos;을 만들고
								싶었습니다. 맞춤형 스티커로 특별한 메시지를
								담고, 모두가 맛있게 즐길 수 있는 메뉴로
								구성했습니다.
							</span>
							<br />
							<br />
							<span className='self-stretch  w-[576px] text-base text-left text-[#0f0e0e]'>
								이제 우리 도시락은 행사를 빛내는 특별한 요소가
								되었습니다. 하지만 여기서 멈추지{' '}
							</span>
							<br />
							<span className='self-stretch  w-[576px] text-base text-left text-[#0f0e0e]'>
								않을 겁니다. 소외된 이웃들에게도 따뜻한 한 끼를
								전하고 싶어 사회적 기업으로의{' '}
							</span>
							<br />
							<span className='self-stretch  w-[576px] text-base text-left text-[#0f0e0e]'>
								성장도 꿈꾸고 있습니다.
							</span>
							<br />
							<br />
							<span className='self-stretch  w-[576px] text-base text-left text-[#0f0e0e]'>
								정성 가득한 한 끼로 세상을 조금씩 바꿔나가는 것,
								그것이 바로 우리가 추구하는 도시락의 모습입니다.
							</span>
						</p>
						<p className='self-stretch  w-[576px] text-base font-bold text-right text-[#0f0e0e]'>
							정태현 대표
						</p>
					</div>
				</div>
				<div className='flex justify-center items-start self-stretch h-[790px] relative pt-40'>
					<div className='flex flex-col justify-start items-center gap-2'>
						<p className='text-[50px] font-bold text-center text-[#0f0e0e]'>
							서비스 이용 후기
						</p>
						<p className='text-lg text-center text-[#0f0e0e]'>
							헤이델리박스를 만나고 달라진 고객 후기를 살펴보세요
						</p>
					</div>
					<div className='absolute left-0 right-0 top-[310px]'>
						<ReviewCarousel />
					</div>
					<div
						className='w-[168px] h-[542px] absolute left-[-1px] top-[247px]'
						style={{
							background:
								'linear-gradient(to left, rgba(255,255,255,0) -10%, #fff 100%)',
						}}
					/>
					<div
						className='w-[168px] h-[542px] absolute right-[-1px] top-[247px]'
						style={{
							background:
								'linear-gradient(to right, rgba(255,255,255,0) -10%, #fff 100%)',
						}}
					/>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-[60px] px-[120px] py-40'>
					<div className='w-[1200px] h-[480px] relative overflow-hidden rounded-3xl bg-[#d9d9d9]'>
						<img
							src={`${router.basePath}/images/promise_3.png`}
							className='w-[1200.3px] h-[800px] absolute left-[-1px] top-[-162px] object-cover'
						/>
						<div className='w-[1200px] h-[480px] absolute left-[-1px] top-[-1px] opacity-[0.45] rounded-3xl bg-[#0f0e0e]' />
						<div className='flex flex-col justify-start items-center absolute left-[380px] top-[110px] gap-[52px]'>
							<p className='text-[50px] font-bold text-center text-[#f8f8f8]'>
								<span className='text-[50px] font-bold text-center text-[#f8f8f8]'>
									더욱 다양한 맞춤형
								</span>
								<br />
								<span className='text-[50px] font-bold text-center text-[#f8f8f8]'>
									서비스를 알아보세요
								</span>
							</p>
							<ButtonMono value={'문의하기'} />
						</div>
					</div>
				</div>
			</div>
		</Common>
	);
}

export default LandingPage;
