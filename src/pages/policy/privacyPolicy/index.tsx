import { Common } from '@/layouts/Common';

function PrivacyPolicyPage() {
	return (
		<Common>
			<div className='flex flex-col justify-center items-center self-stretch  relative gap-[60px] px-[20px] md:px-[120px] pt-[60px] md:pt-[100px] pb-40 bg-white'>
				<div className='flex flex-col justify-start items-center self-stretch  relative gap-2'>
					<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
						개인정보취급방침
					</p>
				</div>
				<p className='md:max-w-[1200px]'>
					<span className='self-stretch md:text-lg text-left text-[#0f0e0e]'>
						&apos;헤이푸드서비스&apos;는 (이하 &apos;회사&apos;는) 고객님의 개인정보를
						중요시하며, &apos;정보통신망 이용촉진 및 정보보호&apos;에 관한
						법률을 준수하고 있습니다. 회사는 개인정보취급방침을
						통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와
						방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한
						조치가 취해지고 있는지 알려드립니다. 회사는
						개인정보취급방침을 개정하는 경우 웹사이트 공지사항(또는
						개별공지)을 통하여 공지할 것입니다.
					</span>
				</p>
				<div className='flex flex-col justify-start items-start relative gap-3 md:max-w-[1200px]'>
					<p className='self-stretch text-lg md:text-2xl font-bold text-left text-[#0f0e0e]'>
						■ 수집하는 개인정보 항목
					</p>
					<p className='self-stretch md:text-lg text-left text-[#0f0e0e]'>
						회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와
						같은 개인정보를 수집하고 있습니다.
					</p>
					<div className='flex flex-col justify-center items-center self-stretch  gap-8 p-5 md:p-8 rounded-3xl bg-[#fffbea]'>
						<div className='flex flex-col justify-start items-start self-stretch  relative gap-2'>
							<p className='self-stretch md:text-lg font-semibold text-left text-[#0f0e0e]'>
								수집항목
							</p>
							<p className='self-stretch'>
								<span className='self-stretch text-left text-[#0f0e0e]'>
									이름, 생년월일, 로그인ID, 비밀번호, 자택
									전화번호, 자택 주소, 휴대전화번호, 이메일,
									회사명, 부서, 직책, 회사전화번호, 기념일,
									법정대리인정보, 주민등록번호, 서비스
									이용기록, 접속 로그, 접속 IP 정보, 결제기록
								</span>
							</p>
						</div>
						<div className='flex flex-col justify-start items-start self-stretch  relative gap-2'>
							<p className='self-stretch md:text-lg font-semibold text-left text-[#0f0e0e]'>
								개인정보 수집방법
							</p>
							<p className='self-stretch text-left text-[#0f0e0e]'>
								홈페이지(회원가입), 서면양식
							</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-start items-start md:max-w-[1200px] relative gap-3'>
					<p className='self-stretch text-lg md:text-2xl font-bold text-left text-[#0f0e0e]'>
						■ 개인정보의 수집 및 이용목적
					</p>
					<p className='self-stretch md:text-lg text-left text-[#0f0e0e]'>
						회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
					</p>
					<div className='flex flex-col justify-center items-center self-stretch  gap-8 p-5 md:p-8 rounded-3xl bg-[#fffbea]'>
						<div className='flex flex-col justify-start items-start self-stretch  relative gap-2'>
							<p className='self-stretch text-left text-[#0f0e0e]'>
								서비스 제공에 관한 계약 이행 및 서비스 제공에
								따른 요금정산 콘텐츠 제공 , 구매 및 요금 결제 ,
								물품배송 또는 청구지 등 발송
							</p>
						</div>
						<div className='flex flex-col justify-start items-start self-stretch  relative gap-2'>
							<p className='self-stretch md:text-lg font-semibold text-left text-[#0f0e0e]'>
								회원관리
							</p>
							<p className='self-stretch text-left text-[#0f0e0e]'>
								회원제 서비스 이용에 따른 본인확인 , 개인 식별 ,
								연령확인 , 만14세 미만 아동 개인정보 수집 시
								법정 대리인 동의여부 확인 , 고지사항 전달, 
								마케팅 및 광고에 활용 접속 빈도 파악 또는 회원의
								서비스 이용에 대한 통계
							</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-start items-start md:w-[1200px] relative gap-3'>
					<p className='self-stretch text-lg md:text-2xl font-bold text-left text-[#0f0e0e]'>
						■ 개인정보의 보유 및 이용기간
					</p>
					<p className='self-stretch md:text-lg text-left text-[#0f0e0e]'>
						회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외
						없이 해당 정보를 지체 없이 파기합니다.
					</p>
				</div>
			</div>
		</Common>
	);
}

export default PrivacyPolicyPage;
