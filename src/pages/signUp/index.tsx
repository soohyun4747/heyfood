import { ButtonAgreement } from '@/components/ButtonAgreement';
import { ButtonRect } from '@/components/ButtonRect';
import { CheckRound } from '@/components/CheckRound';
import { Modal } from '@/components/Modal';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useMarketingAgreeStore } from '@/stores/marketingAgreeStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function SignUpAgreementPage() {
	const [agreeAll, setAgreeAll] = useState(false);
	const [agreeMin, setAgreeMin] = useState(false);
	const [agree0, setAgree0] = useState(false);
	const [agree1, setAgree1] = useState(false);
	const [agree2, setAgree2] = useState(false);
	const [agree3, setAgree3] = useState(false);
	const [agree4, setAgree4] = useState(false);
	const [agree1ModalOpen, setAgree1ModalOpen] = useState(false);
	const [agree2ModalOpen, setAgree2ModalOpen] = useState(false);
	const [agree3ModalOpen, setAgree3ModalOpen] = useState(false);
	const [agree4ModalOpen, setAgree4ModalOpen] = useState(false);

	const setMarketingAgree = useMarketingAgreeStore(
		(state) => state.setMarketingAgree
	);

	const router = useRouter();

	useEffect(() => {
		if (agree0 && agree1 && agree2 && agree3 && agree4) {
			setAgreeAll(true);
			setAgreeMin(true);
		} else {
			if (agree0 && agree1 && agree2 && agree3) {
				setAgreeMin(true);
			} else {
				setAgreeMin(false);
			}
			setAgreeAll(false);
		}
	}, [agree0, agree1, agree2, agree3, agree4]);

	const onClickAgreeAllCheck = () => {
		setAgreeAll((prev) => {
			const checked = !prev;
			if (checked) {
				setAgree0(true);
				setAgree1(true);
				setAgree2(true);
				setAgree3(true);
				setAgree4(true);
			} else {
				setAgree0(false);
				setAgree1(false);
				setAgree2(false);
				setAgree3(false);
				setAgree4(false);
			}
			return checked;
		});
	};

	const onClickNext = () => {
		router.push('/signUp/basicInfo');
		setMarketingAgree(agree4);
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] md:px-[120px] px-[20px] pt-[40px] md:pt-[100px] pb-[120px] md:pb-40'>
				<div className='flex flex-col justify-start items-center self-stretch  relative gap-2'>
					<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
						약관동의
					</p>
				</div>
				<div className='flex flex-col items-center justify-center md:w-[994px] gap-[60px] md:px-[120px] md:py-20 rounded-3xl bg-white'>
					<div className='flex flex-col justify-start items-start self-stretch  gap-6'>
						<div className='flex flex-col justify-start items-start self-stretch  gap-6'>
							<div className='flex justify-start items-start self-stretch  gap-2'>
								<div className='flex justify-start items-center  relative gap-[10.7px] pb-0.5'>
									<CheckRound
										checked={agreeAll}
										onClick={onClickAgreeAllCheck}
									/>
								</div>
								<div className='flex flex-col justify-center items-start  relative gap-2 py-0.5'>
									<p className='md:text-xl text-left text-[#0f0e0e]'>
										전체 동의합니다
									</p>
									<p className='text-xs md:text-sm text-left text-[#909090]'>
										<span>
											전체동의는 필수 및 선택정보에 대한
											동의도 포함되어 있으며, 개별적으로도
											동의를 선택하실 수 있습니다.
										</span>
										<br />
										<span>
											선택항목에 대한 동의를 거부하는
											경우에도 회원가입 서비스는 이용
											가능합니다.
										</span>
									</p>
								</div>
							</div>
							<div className='flex flex-col justify-start items-start self-stretch  relative'>
								<div className='flex flex-col justify-start items-start self-stretch  gap-3 py-4 bg-white'>
									<div className='flex justify-start items-center self-stretch  relative gap-2'>
										<div className='flex justify-start items-center  relative gap-[10.7px] pb-0.5'>
											<CheckRound
												checked={agree1}
												onClick={() =>
													setAgree0((prev) => !prev)
												}
											/>
										</div>
										<p className='flex-grow md:w-[645px] text-base text-left text-[#0f0e0e]'>
											[필수] 만 14세 이상입니다.
										</p>
									</div>
								</div>
								<div className='self-stretch md:w-[754px] h-[1px] bg-[#D9D9D9]' />
								<div className='flex flex-col justify-start items-start self-stretch  gap-3 py-4 bg-white'>
									<div className='flex justify-start items-center self-stretch  relative gap-2'>
										<div className='flex justify-start items-center  relative gap-[10.7px] pb-0.5'>
											<CheckRound
												checked={agree1}
												onClick={() =>
													setAgree1((prev) => !prev)
												}
											/>
										</div>
										<p className='flex-grow md:w-[645px] text-base text-left text-[#0f0e0e]'>
											[필수] 이용약관 동의
										</p>
										<ButtonAgreement
											value='내용보기'
											onClick={() =>
												setAgree1ModalOpen(true)
											}
										/>
									</div>
								</div>
								<div className='self-stretch md:w-[754px] h-[1px] bg-[#D9D9D9]' />
								<div className='flex flex-col justify-start items-start self-stretch  gap-3 py-4 bg-white'>
									<div className='flex justify-start items-center self-stretch  relative gap-2'>
										<CheckRound
											checked={agree2}
											onClick={() =>
												setAgree2((prev) => !prev)
											}
										/>
										<p className='flex-grow  md:md:w-[645px] text-base text-left text-[#0f0e0e]'>
											[필수] 개인정보 수집 및 이용에 대한
											동의
										</p>
										<ButtonAgreement
											value='내용보기'
											onClick={() =>
												setAgree2ModalOpen(true)
											}
										/>
									</div>
								</div>
								<div className='self-stretch md:w-[754px] h-[1px] bg-[#D9D9D9]' />
								<div className='flex flex-col justify-start items-start self-stretch  gap-3 py-4 bg-white'>
									<div className='flex justify-start items-center self-stretch  relative gap-2'>
										<CheckRound
											checked={agree3}
											onClick={() =>
												setAgree3((prev) => !prev)
											}
										/>
										<p className='flex-grow md:md:w-[645px] text-base text-left text-[#0f0e0e]'>
											[필수] 개인정보 제 3자 제공 동의
										</p>
										<ButtonAgreement
											value='내용보기'
											onClick={() =>
												setAgree3ModalOpen(true)
											}
										/>
									</div>
								</div>
								<div className='self-stretch md:w-[754px] h-[1px] bg-[#D9D9D9]' />
								<div className='flex flex-col justify-start items-start self-stretch  gap-3 py-4 bg-white'>
									<div className='flex justify-start items-center self-stretch  relative gap-2'>
										<CheckRound
											checked={agree4}
											onClick={() =>
												setAgree4((prev) => !prev)
											}
										/>
										<p className='flex-grow md:md:w-[645px] text-base text-left text-[#0f0e0e]'>
											[선택] 마케팅 활용 동의
										</p>
										<ButtonAgreement
											value='내용보기'
											onClick={() =>
												setAgree4ModalOpen(true)
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<ButtonRect
						value={'다음'}
						disabled={agreeMin ? false : true}
						style={{ width: 211, alignSelf: 'center' }}
						onClick={onClickNext}
					/>
				</div>
				{agree1ModalOpen && (
					<Modal
						onClose={() => setAgree1ModalOpen(false)}
						title={'이용약관 동의'}
						content={
							<p className='md:w-[604px] text-xs text-left text-black'>
								<span className='md:w-[604px] text-xs text-left text-black'>
									제1조(목적)
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									이 약관은 주식회사 헤이푸드서비스(이하
									“회사”라 함)가 제공하는 도시락 메뉴 확인 및
									주문 등 인터넷 관련 서비스(이하 “서비스”라
									함)의 이용과 관련하여 회사와 회원 간의 권리,
									의무 및 책임사항, 기타 필요한 사항을
									규정함을 목적으로 합니다.
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									제2조(회원가입 및 탈퇴)
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									1. 회원가입은 회사가 정한 절차에 따라
									회원정보를 기입하고, 본 약관에 동의함으로써
									신청할 수 있습니다.
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									2. 회원은 언제든지 탈퇴를 요청할 수 있으며,
									회사는 관련 법령에 따라 회원정보를
									처리합니다.
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									제3조(서비스 이용)
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									1. 회원은 회사가 제공하는 도시락 메뉴 확인,
									주문, 결제, 배송 등 서비스를 정상적으로
									이용할 수 있습니다.
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									2. 회사는 서비스의 내용, 운영상 또는 기술상
									필요에 따라 서비스의 전부 또는 일부를 변경할
									수 있습니다.
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									제4조(회원의 의무)
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									1. 회원은 관계 법령, 본 약관, 회사의
									공지사항을 준수해야 하며, 타인의 권익을
									침해하거나 서비스 운영을 방해하는 행위를
									해서는 안 됩니다.
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									2. 회원정보에 변경이 있을 경우 즉시 수정해야
									합니다.
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									제5조(책임의 제한)
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									회사는 천재지변, 불가항력적 사유로 인한
									서비스 제공의 장애에 대해 책임을 지지
									않습니다.
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									제6조(분쟁해결 및 준거법)
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									본 약관과 관련한 분쟁은 대한민국 법에
									따르며, 회사의 본사 소재지를 관할하는 법원을
									전속관할로 합니다.
								</span>
							</p>
						}
					/>
				)}
				{agree2ModalOpen && (
					<Modal
						onClose={() => setAgree2ModalOpen(false)}
						title={'개인정보 수집 및 이용에 대한 동의'}
						content={
							<p className='md:w-[604px] text-xs text-left text-black'>
								<span className='md:w-[604px] text-xs text-left text-black'>
									1. 수집하는 개인정보 항목
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									회사는 회원가입, 상담, 서비스 신청 등을 위해
									아래와 같은 개인정보를 수집합니다.
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									- 수집항목: 이름, 생년월일, 성별, 로그인ID,
									비밀번호, 휴대전화번호, 이메일, 주소, 서비스
									이용기록, 접속 로그, 접속 IP 정보, 결제기록
									등
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									- 수집방법: 홈페이지(회원가입), 서면양식
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									2. 개인정보의 수집 및 이용목적
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									- 서비스 제공에 관한 계약 이행 및
									요금정산(콘텐츠 제공, 구매 및 결제, 도시락
									배송 등)
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									- 회원 관리(본인확인, 개인 식별, 연령확인,
									고지사항 전달 등)
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									- 마케팅 및 광고에 활용(접속 빈도 파악,
									서비스 이용 통계 등, 선택 동의 시)
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									3. 개인정보의 보유 및 이용기간
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									회원 탈퇴 시 또는 수집 및 이용목적 달성
									시까지 보유하며, 관련 법령에 따라 보존이
									필요한 경우 해당 기간 동안 보관합니다.
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									4. 동의 거부 권리 및 불이익
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									개인정보 수집 및 이용 동의를 거부할 수
									있으나, 필수항목 미동의 시 회원가입 및
									서비스 이용이 제한될 수 있습니다.
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									개인정보 수집 및 이용 동의를 거부할 수
									있으나, 필수항목 미동의 시 회원가입 및
									서비스 이용이 제한될 수 있습니다.
								</span>
								<span className='md:w-[604px] text-xs text-left text-black'>
									※ 자세한 내용은 개인정보 처리방침에서
									확인하실 수 있습니다.
								</span>
							</p>
						}
					/>
				)}
				{agree3ModalOpen && (
					<Modal
						onClose={() => setAgree3ModalOpen(false)}
						title={'개인정보 제 3자 제공 동의'}
						content={
							<p className='md:w-[604px] text-xs text-left text-black'>
								<span className='md:w-[604px] text-xs text-left text-black'>
									회사는 서비스 제공 및 원활한 주문·배송
									처리를 위해 아래와 같이 개인정보를 제3자에게
									제공합니다.
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									1. 제공받는 자
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									- 가맹점(도시락 제조 및 배송 담당 매장)
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									- 배송(퀵서비스) 대행업체
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									2. 제공 항목
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									이름, 연락처(휴대전화번호), 배송지 주소,
									주문 내역
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									3. 제공 목적
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									도시락 주문 처리 및 배송, 고객 상담 등
									서비스 제공
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									4. 보유 및 이용 기간
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									제공일로부터 6개월 또는 서비스 제공(배송)
									완료 시까지 (단, 관련 법령에 따라 보존이
									필요한 경우 해당 기간 동안 보관)
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									5. 동의 거부 권리 및 불이익
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									동의를 거부할 수 있으나, 동의하지 않을 경우
									도시락 주문 및 배송 등 서비스 이용이 제한될
									수 있습니다.
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									※ 자세한 내용은 개인정보 처리방침에서
									확인하실 수 있습니다.
								</span>
							</p>
						}
					/>
				)}
				{agree4ModalOpen && (
					<Modal
						onClose={() => setAgree4ModalOpen(false)}
						title={'마케팅 활용 동의'}
						content={
							<p className='md:w-[604px] text-xs text-left text-black'>
								<span className='md:w-[604px] text-xs text-left text-black'>
									1. 수집 및 이용 항목
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									휴대전화번호, 이메일, 서비스 이용기록, 접속
									로그, 쿠키, 접속 IP 정보 등
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									2. 이용 목적
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									신제품, 이벤트, 혜택 등 각종 마케팅 및
									광고성 정보 안내
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									서비스 및 이벤트 안내, 고객 맞춤형 혜택 제공
									등
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									3. 보유 및 이용기간
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									회원 탈퇴 또는 동의 철회 시까지
								</span>
								<br />
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									4. 동의 거부 시 불이익
								</span>
								<br />
								<span className='md:w-[604px] text-xs text-left text-black'>
									동의를 거부해도 서비스 이용에는 불이익이
									없습니다.
								</span>
							</p>
						}
					/>
				)}
			</div>
		</Common>
	);
}

export default SignUpAgreementPage;
