import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';

function HeyDeliBoxPage() {
	return (
		<Common meta={<Meta />}>
			<>
				<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-[60px] pt-[100px] bg-white'>
					<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
						<p className='self-stretch flex-grow-0 flex-shrink-0 text-5xl font-bold text-center text-[#0f0e0e] leading-[150%]'>
							헤이델리박스
						</p>
						<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e] leading-[160%]'>
							우리는 더 좋은 헤이데이박스를 위해 매일 노력합니다.
						</p>
					</div>
					<div className='flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-[668px] gap-2.5 bg-[#d9d9d9]'>
						<div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-12'>
							<p className='flex-grow-0 flex-shrink-0 text-5xl font-bold text-center text-[#0f0e0e] leading-[150%]'>
								<span className='flex-grow-0 flex-shrink-0 text-5xl font-bold text-center text-[#0f0e0e]'>
									선물 같은 도시락,{' '}
								</span>
								<br />
								<span className='flex-grow-0 flex-shrink-0 text-5xl font-bold text-center text-[#0f0e0e]'>
									행사를 빛내는 특별한 한 끼
								</span>
							</p>
							<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e] leading-[160%]'>
								<span className='flex-grow-0 flex-shrink-0 text-base font-bold text-center text-[#0f0e0e]'>
									실속 있는 가격과 호불호 없는 메뉴
								</span>
								<span className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
									로 남김없이 먹을 수 있습니다.
								</span>
								<br />
								<span className='flex-grow-0 flex-shrink-0 text-base font-bold text-center text-[#0f0e0e]'>
									맞춤형 스티커
								</span>
								<span className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
									로 행사의 특별함을 더하고 받는 분 모두가
								</span>
								<br />
								<span className='flex-grow-0 flex-shrink-0 text-base font-bold text-center text-[#0f0e0e]'>
									'나만을 위한 도시락'
								</span>
								<span className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
									을 느끼도록 정성을 담았습니다.
								</span>
							</p>
						</div>
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
						<div className='flex-grow-0 flex-shrink-0 w-[1200px] h-[593px] relative rounded-3xl bg-white'>
							{/* <img
								src='image-28.png'
								className='w-[1286px] h-[1398px] absolute left-[-44px] top-[-723px] object-cover'
							/> */}
						</div>
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
						<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
							설명글
						</p>
						<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
							설명글
						</p>
					</div>
					<div className='flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-[1200px] gap-[120px]'>
						<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1200px] relative gap-[60px]'>
							<div className='flex-grow-0 flex-shrink-0 w-[570px] h-[420px] rounded-2xl bg-[#d9d9d9]' />
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
							<div className='flex-grow-0 flex-shrink-0 w-[570px] h-[420px] rounded-2xl bg-[#d9d9d9]' />
						</div>
						<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1200px] relative gap-[60px]'>
							<div className='flex-grow-0 flex-shrink-0 w-[570px] h-[420px] rounded-2xl bg-[#d9d9d9]' />
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
									HACCP 인증 업체
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
							<div className='flex-grow-0 flex-shrink-0 w-[570px] h-[420px] rounded-2xl bg-[#d9d9d9]' />
						</div>
						<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1200px] relative gap-[60px]'>
							<div className='flex-grow-0 flex-shrink-0 w-[570px] h-[420px] rounded-2xl bg-[#d9d9d9]' />
							<div className='flex flex-col justify-start items-start flex-grow relative gap-3 py-12'>
								<p className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-left text-[#0f0e0e]'>
									기업부설연구소 운영
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
					</div>
				</div>
				<div className='flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-[500px] relative gap-2.5 px-[333px] py-[174px] bg-[#d9d9d9]'>
					<p className='flex-grow-0 flex-shrink-0 w-[774px] text-[40px] font-bold text-center text-black'>
						<span className='flex-grow-0 flex-shrink-0 w-[774px] text-[40px] font-bold text-center text-black'>
							젊은 기업 이미지를 강조하는 단체 사진{' '}
						</span>
						<br />
						<span className='flex-grow-0 flex-shrink-0 w-[774px] text-[40px] font-bold text-center text-black'>
							(워크샵 사진 활용)
						</span>
					</p>
				</div>
			</>
		</Common>
	);
}

export default HeyDeliBoxPage;
