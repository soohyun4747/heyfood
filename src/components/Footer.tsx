export function Footer() {
	return (
		<div className='flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-60 pt-10 pb-[100px] bg-[#ffc966]'>
			<div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[1200px] gap-6'>
				<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-[21px]'>
					<p className='flex-grow-0 flex-shrink-0 text-base font-bold text-center text-[#0f0e0e]'>
						개인정보처리방침
					</p>
					<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
						이용약관
					</p>
					<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
						이메일무단수집거부
					</p>
				</div>
				<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-10'>
					<div className='self-stretch flex-grow-0 flex-shrink-0 h-0.5 opacity-[0.24] bg-[#0f0e0e]' />
					<div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-[50px]'>
						<div className='flex justify-start items-start flex-grow relative gap-[50px]'>
							<div className='flex-grow-0 flex-shrink-0 w-[155px] h-[98px] relative overflow-hidden bg-[#d6d6d6]' />
							<div className='flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-6'>
								<div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-2.5'>
									<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-6'>
										<p className='flex-grow-0 flex-shrink-0 text-[15px] font-bold text-center text-[#0f0e0e]'>
											(주)헤이푸드서비스
										</p>
										<p className='flex-grow-0 flex-shrink-0 text-[15px] font-bold text-center text-[#0f0e0e]'>
											사업자등록번호 : 794-87-03646
										</p>
										<p className='flex-grow-0 flex-shrink-0 text-[15px] font-bold text-center text-[#0f0e0e]'>
											대표: 정태현
										</p>
									</div>
									<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-7'>
										<p className='flex-grow-0 flex-shrink-0 text-[15px] font-bold text-center text-[#0f0e0e]'>
											주소
										</p>
										<p className='flex-grow-0 flex-shrink-0 text-[15px] text-center text-[#0f0e0e]'>
											부산광역시 해운대구 송정2로 13번길
											40
										</p>
									</div>
									<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-4'>
										<p className='flex-grow-0 flex-shrink-0 text-[15px] font-bold text-center text-[#0f0e0e]'>
											이메일
										</p>
										<p className='flex-grow-0 flex-shrink-0 text-[15px] text-center text-[#0f0e0e]'>
											heyfood@heyfood.com
										</p>
									</div>
								</div>
								<p className='flex-grow-0 flex-shrink-0 text-sm font-light text-center text-[#0f0e0e]'>
									COPYRIGHT © 2025 HEYFOOD. ALL RIGHTS
									RESERVED.
								</p>
							</div>
						</div>
						<div className='flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-3'>
							<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-[39px]'>
								<p className='flex-grow-0 flex-shrink-0 text-[15px] font-bold text-center text-[#0f0e0e]'>
									전화
								</p>
								<p className='flex-grow-0 flex-shrink-0 text-[15px] text-center text-[#0f0e0e]'>
									051-715-4600
								</p>
							</div>
							<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-4'>
								<p className='flex-grow-0 flex-shrink-0 text-[15px] font-bold text-center text-[#0f0e0e]'>
									문의시간{' '}
								</p>
								<div className='flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-0.5'>
									<p className='flex-grow-0 flex-shrink-0 text-[15px] text-center text-[#0f0e0e]'>
										평일 오전 10:00 - 오후 5:00
									</p>
									<p className='flex-grow-0 flex-shrink-0 text-[15px] text-center text-[#0f0e0e]'>
										(점심시간 오후 12:00 - 오후 1:00)
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
