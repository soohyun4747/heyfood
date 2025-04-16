import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useRouter } from 'next/router';

function HeyDeliBoxPage() {
	const router = useRouter();

	return (
		<Common meta={<Meta />}>
			<>
				<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-[1001px] relative gap-[60px] pt-[100px] bg-white'>
					<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
						<p className='flex-grow-0 flex-shrink-0 text-[50px] font-bold text-center text-[#0f0e0e]'>
							헤이델리박스
						</p>
						<p className='flex-grow-0 flex-shrink-0 text-lg text-center text-[#0f0e0e]'>
							우리는 더 좋은 헤이데이박스를 위해 매일 노력합니다.
						</p>
					</div>
					<div className='self-stretch flex-grow-0 flex-shrink-0 h-[731px] relative overflow-hidden'>
						<div className='w-full h-[731px] absolute bg-[#d9d9d9]' />
						<img
							src={`${router.basePath}/images/heyfood_intro.png`}
							className='w-[1920px] h-[1225px] absolute top-[-394px] object-cover'
						/>
						<div className='w-full h-[731px] absolute opacity-[0.45] bg-[#0f0e0e]' />
						<div className='flex flex-col justify-center items-center relative gap-12 top-1/2 transform -translate-y-1/2'>
							<p className='flex-grow-0 flex-shrink-0 text-[50px] font-bold text-center text-white'>
								<span className='flex-grow-0 flex-shrink-0 text-[50px] font-bold text-center text-white'>
									선물 같은 도시락,{' '}
								</span>
								<br />
								<span className='flex-grow-0 flex-shrink-0 text-[50px] font-bold text-center text-white'>
									행사를 빛내는 특별한 한 끼
								</span>
							</p>
							<p className='flex-grow-0 flex-shrink-0 text-xl text-center text-white'>
								<span className='flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-white'>
									실속 있는 가격과 호불호 없는 메뉴
								</span>
								<span className='flex-grow-0 flex-shrink-0 text-xl text-center text-white'>
									로 남김없이 먹을 수 있습니다.
								</span>
								<br />
								<span className='flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-white'>
									맞춤형 스티커
								</span>
								<span className='flex-grow-0 flex-shrink-0 text-xl text-center text-white'>
									로 행사의 특별함을 더하고 받는 분 모두가
								</span>
								<br />
								<span className='flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-white'>
									'나만을 위한 도시락'
								</span>
								<span className='flex-grow-0 flex-shrink-0 text-xl text-center text-white'>
									을 느끼도록 정성을 담았습니다.
								</span>
							</p>
						</div>
						<div className='w-full h-[405px] absolute top-[325px] opacity-25 bg-gradient-to-b from-black/0 to-black' />
					</div>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-[60px] px-[120px] py-40'>
					<div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2'>
						<p className='flex-grow-0 flex-shrink-0 text-[50px] font-bold text-center text-[#0f0e0e]'>
							기존 행사도시락 현황
						</p>
						<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
							설명글
						</p>
						<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
							설명글
						</p>
					</div>
					<div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[1200px] relative gap-8'>
						<div className='self-stretch flex-grow-0 flex-shrink-0 h-[560px] rounded-3xl bg-[#d9d9d9]' />
					</div>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-[60px] px-[120px] py-40 bg-[#ffebc4]'>
					<div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2'>
						<p className='flex-grow-0 flex-shrink-0 text-[50px] font-bold text-center text-[#0f0e0e]'>
							24년 70여개 고객사 담당자 설문조사 결과
						</p>
						<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
							설명글
						</p>
						<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
							설명글
						</p>
					</div>
					<div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-6'>
						<div className='flex-grow-0 flex-shrink-0 w-[1200px] h-[593px] relative rounded-3xl bg-white' />
						<div className='flex justify-start items-center flex-grow-0 flex-shrink-0 w-[37px] relative gap-3'>
							<svg
								width={15}
								height={14}
								viewBox='0 0 15 14'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='flex-grow-0 flex-shrink-0'
								preserveAspectRatio='xMidYMid meet'>
								<circle
									cx='7.5'
									cy={7}
									r={7}
									fill='white'
								/>
							</svg>
							<svg
								width={15}
								height={14}
								viewBox='0 0 15 14'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='flex-grow-0 flex-shrink-0'
								preserveAspectRatio='xMidYMid meet'>
								<circle
									cx='7.5'
									cy={7}
									r={7}
									fill='#D9D9D9'
								/>
							</svg>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-[100px] px-[120px] pt-[100px] pb-40'>
					<div className='w-full h-[412px] bg-[#fffbea] absolute top-[279px]' />
					<div className='w-full h-[623px] bg-[#fffbea] absolute top-[1138px]' />
					<div className='w-full h-[222px] bg-[#fffbea] absolute bottom-0' />
					<div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2'>
						<p className='flex-grow-0 flex-shrink-0 text-[50px] font-bold text-center text-[#0f0e0e]'>
							헤이델리박스의 약속
						</p>
						<p className='flex-grow-0 flex-shrink-0 text-lg text-center text-[#0f0e0e]'>
							<span className='flex-grow-0 flex-shrink-0 text-lg text-center text-[#0f0e0e]'>
								헤이푸드서비스는 단순히 음식을 제공하는 것을
								넘어,{' '}
							</span>
							<br />
							<span className='flex-grow-0 flex-shrink-0 text-lg text-center text-[#0f0e0e]'>
								고객의 특별한 순간에 정성과 가치를 더하는
								도시락을 만듭니다.
							</span>
						</p>
					</div>
					<div className='flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-[1200px] gap-[120px]'>
						<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1200px] relative gap-[60px]'>
							<img
								className='flex-grow-0 flex-shrink-0 w-[570px] h-[420px] rounded-2xl'
								src={`${router.basePath}/images/promise_1.png`}
							/>
							<div className='flex flex-col justify-start items-start flex-grow relative gap-3 py-12'>
								<p className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-left text-[#0f0e0e]'>
									신선한 식재료 사용
								</p>
								<p className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										깨끗한 물과 비옥한 토지에서 자란 보은
										정이품 쌀로 밥을 짓기에{' '}
									</span>
									<br />
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										밥알이 살아있습니다. 박향희 선생님이
										웃어 밥만을 위해 만드신{' '}
									</span>
									<br />
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										프리미엄 돌자반으로 주먹밥을 만들어 비린
										맛이 적고,{' '}
									</span>
									<br />
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										고소함과 감칠맛이 가득합니다.
									</span>
								</p>
							</div>
						</div>
						<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1200px] relative gap-[60px]'>
							<div className='flex flex-col justify-start items-start flex-grow relative gap-3 py-12'>
								<p className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-left text-[#0f0e0e]'>
									당일 생산 원칙
								</p>
								<p className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										당일 생산 원칙으로 매일 새벽 3시부터 갓
										만들어 따뜻하고 신선한{' '}
									</span>
									<br />
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										간편식을 전문 배송업체를 통해 안정적으로
										배송합니다.
									</span>
								</p>
							</div>
							<img
								className='flex-grow-0 flex-shrink-0 w-[570px] h-[420px] rounded-2xl'
								src={`${router.basePath}/images/promise_2.png`}
							/>
						</div>
						<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1200px] relative gap-[60px]'>
							<img
								className='flex-grow-0 flex-shrink-0 w-[570px] h-[420px] rounded-2xl'
								src={`${router.basePath}/images/promise_3.png`}
							/>
							<div className='flex flex-col justify-start items-start flex-grow relative gap-3 py-12'>
								<p className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-left text-[#0f0e0e]'>
									다양한 메뉴 개발
								</p>
								<p className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										매달 신메뉴를 출시하고 있으면 분기별로
										정기적인 리뉴얼이{' '}
									</span>
									<br />
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										이뤄집니다. 100가지가 넘는 다양한
										간편식으로 매일 새로운{' '}
									</span>
									<br />
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										헤이델리박스 오피스를 선사합니다.
									</span>
								</p>
							</div>
						</div>
						<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1200px] relative gap-[60px]'>
							<div className='flex flex-col justify-start items-start flex-grow relative gap-3 py-12'>
								<p className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-left text-[#0f0e0e]'>
									HACCP 인증 &amp; 기업부설연구소 운영
								</p>
								<p className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										HACCP 인증 공장에서 철저히 관리된 위생
										환경에서 도시락을{' '}
									</span>
									<br />
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										생산합니다. 자체 기업부설연구소에서 실온
										김밥의 안전성을{' '}
									</span>
									<br />
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										연구하고 자가테스트를 통해 품질 유지
										방안을 지속적으로{' '}
									</span>
									<br />
									<span className='self-stretch flex-grow-0 flex-shrink-0 w-[570px] text-xl text-left text-[#0f0e0e]'>
										개발합니다.
									</span>
								</p>
							</div>
							<img
								className='flex-grow-0 flex-shrink-0 w-[570px] h-[420px] rounded-2xl'
								src={`${router.basePath}/images/promise_4.png`}
							/>
						</div>
					</div>
				</div>
				<div className='self-stretch flex-grow-0 flex-shrink-0 h-[500px] relative overflow-hidden bg-[#d9d9d9]'>
					<img
						src={`${router.basePath}/images/company_group.png`}
						className='h-[500px] absolute object-cover'
					/>
					<div className='w-full h-[500px] absolute opacity-20 bg-[#0f0e0e]' />
				</div>
			</>
		</Common>
	);
}

export default HeyDeliBoxPage;
