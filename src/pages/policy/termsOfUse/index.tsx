import { Common } from '@/layouts/Common';

function TermsOfUsePage() {
	return (
		<Common>
			<div className='flex flex-col justify-start items-center relative gap-[60px] px-[20px] md:px-[120px] pt-[60px] md:pt-[100px] pb-40 bg-white'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
					<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
						이용약관
					</p>
				</div>
				<p className='max-w-[1200px] md:text-lg text-left text-[#0f0e0e]'>
					이 약관은 주식회사 헤이푸드서비스(이하 “회사”라 함)가
					제공하는 도시락 메뉴 확인 및 주문 등 인터넷 관련 서비스(이하
					“서비스”라 함)의 이용과 관련하여 회사와 회원 간의 권리, 의무
					및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
				</p>
				<div className='flex flex-col justify-start items-start md:w-[1200px] gap-[60px] p-5 md:p-8 bg-[#fffbea] rounded-3xl'>
					<div className='flex flex-col justify-start items-start self-stretch relative gap-3'>
						<p className='self-stretch text-lg md:text-2xl font-bold text-left text-[#0f0e0e]'>
							■ 제2조(회원가입 및 탈퇴)
						</p>
						<p className='self-stretch md:text-lg text-left text-[#0f0e0e]'>
							<span className='self-stretch'>
								1. 회원가입은 회사가 정한 절차에 따라 회원정보를
								기입하고, 본 약관에 동의함으로써 신청할 수
								있습니다.
							</span>
							<br />
							<span className='self-stretch'>
								2. 회원은 언제든지 탈퇴를 요청할 수 있으며, 회사는
								관련 법령에 따라 회원정보를 처리합니다.
							</span>
						</p>
					</div>
					<div className='flex flex-col justify-start items-start self-stretch relative gap-3'>
						<p className='self-stretch text-lg md:text-2xl font-bold text-left text-[#0f0e0e]'>
							■ 제3조(서비스 이용)
						</p>
						<p className='self-stretch md:text-lg text-left text-[#0f0e0e]'>
							<span className='self-stretch'>
								1. 회원은 회사가 제공하는 도시락 메뉴 확인, 주문,
								결제, 배송 등 서비스를 정상적으로 이용할 수
								있습니다.
							</span>
							<br />
							<span className='self-stretch'>
								2. 회사는 서비스의 내용, 운영상 또는 기술상 필요에
								따라 서비스의 전부 또는 일부를 변경할 수
								있습니다.
							</span>
						</p>
					</div>
					<div className='flex flex-col justify-start items-start self-stretch relative gap-3'>
						<p className='self-stretch text-lg md:text-2xl font-bold text-left text-[#0f0e0e]'>
							■ 제4조(회원의 의무)
						</p>
						<p className='self-stretch md:text-lg text-left text-[#0f0e0e]'>
							<span className='self-stretch'>
								1. 회원은 관계 법령, 본 약관, 회사의 공지사항을
								준수해야 하며, 타인의 권익을 침해하거나 서비스
								운영을 방해하는 행위를 해서는 안 됩니다.
							</span>
							<br />
							<span className='self-stretch'>
								2. 회원정보에 변경이 있을 경우 즉시 수정해야
								합니다.
							</span>
						</p>
					</div>
					<div className='flex flex-col justify-start items-start self-stretch relative gap-3'>
						<p className='self-stretch text-lg md:text-2xl font-bold text-left text-[#0f0e0e]'>
							■ 제5조(책임의 제한)
						</p>
						<p className='self-stretch md:text-lg text-left text-[#0f0e0e]'>
							회사는 천재지변, 불가항력적 사유로 인한 서비스
							제공의 장애에 대해 책임을 지지 않습니다.
						</p>
					</div>
					<div className='flex flex-col justify-start items-start self-stretch relative gap-3'>
						<p className='self-stretch text-lg md:text-2xl font-bold text-left text-[#0f0e0e]'>
							■ 제6조(분쟁해결 및 준거법)
						</p>
						<p className='self-stretch md:text-lg text-left text-[#0f0e0e]'>
							본 약관과 관련한 분쟁은 대한민국 법에 따르며, 회사의
							본사 소재지를 관할하는 법원을 전속관할로 합니다.
						</p>
					</div>
				</div>
			</div>
		</Common>
	);
}

export default TermsOfUsePage;
