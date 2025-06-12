import Image from 'next/image';
import { useRouter } from 'next/router';

export function Footer() {
	const router = useRouter();

	return (
		<div className='flex flex-col justify-center items-center self-stretch gap-60 pt-10 pb-10 md:pb-[100px] bg-[#ffc966] px-[20px] md:px-0'>
			<div className='flex flex-col justify-start items-start md:w-[1200px] gap-6'>
				<div className='flex justify-start items-start  gap-[21px]'>
					<p
						onClick={() => router.push('/policy/privacyPolicy')}
						className='cursor-pointer text-base font-bold text-center text-[#0f0e0e]'>
						개인정보처리방침
					</p>
					<p
						onClick={() => router.push('/policy/termsOfUse')}
						className='cursor-pointer text-base text-center text-[#0f0e0e]'>
						이용약관
					</p>
				</div>
				<div className='flex flex-col justify-start items-start self-stretch  gap-10'>
					<div className='self-stretch  h-0.5 opacity-[0.24] bg-[#0f0e0e]' />
					<div className='flex flex-col md:flex-row justify-start items-start self-stretch gap-4 md:gap-[50px]'>
						<div className='flex md:flex-row flex-col justify-start items-start flex-grow relative gap-[50px]'>
							<div className='w-[190px] h-[26px] relative overflow-hidden'>
								<Image
									src={'/images/logo2.svg'}
									alt={'logo'}
									fill
								/>
							</div>
							<div className='flex md:flex-col flex-col-reverse justify-center items-start gap-10'>
								<div className='flex flex-col justify-start items-start gap-4 md:gap-2.5'>
									<div className='flex md:flex-row flex-col justify-start items-start gap-4 md:gap-6'>
										<p className=' text-[15px] font-bold text-center text-[#0f0e0e]'>
											(주)헤이푸드서비스
										</p>
										<p className=' text-[15px] font-bold text-center text-[#0f0e0e]'>
											사업자등록번호 : 794-87-03646
										</p>
										<p className=' text-[15px] font-bold text-center text-[#0f0e0e]'>
											대표: 정태현
										</p>
									</div>
									<div className='flex justify-start items-start  gap-7'>
										<p className=' text-[15px] font-bold text-center text-[#0f0e0e]'>
											주소
										</p>
										<p className=' text-[15px] text-center text-[#0f0e0e]'>
											부산광역시 해운대구 송정2로 13번길
											40
										</p>
									</div>
									<div className='flex justify-start items-start  gap-4'>
										<p className=' text-[15px] font-bold text-center text-[#0f0e0e]'>
											이메일
										</p>
										<p className=' text-[15px] text-center text-[#0f0e0e]'>
											heyfoodsv@naver.com
										</p>
									</div>
								</div>
								<p className='text-sm font-light md:text-center text-[#0f0e0e]'>
									COPYRIGHT © 2025 HEYFOOD. ALL RIGHTS
									RESERVED.
								</p>
							</div>
						</div>
						<div className='flex flex-col justify-start items-start  gap-3'>
							<div className='flex justify-start items-start  gap-[39px]'>
								<p className=' text-[15px] font-bold text-center text-[#0f0e0e]'>
									전화
								</p>
								<p className=' text-[15px] text-center text-[#0f0e0e]'>
									1833-4601
								</p>
							</div>
							<div className='flex justify-start items-start  gap-4'>
								<p className=' text-[15px] font-bold text-center text-[#0f0e0e]'>
									문의시간{' '}
								</p>
								<div className='flex flex-col justify-center items-start  gap-0.5'>
									<p className=' text-[15px] text-center text-[#0f0e0e]'>
										평일 오전 10:00 - 오후 5:00
									</p>
									<p className=' text-[15px] text-center text-[#0f0e0e]'>
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
