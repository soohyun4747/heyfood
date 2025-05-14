import { ButtonAgreement } from '@/components/ButtonAgreement';
import { ButtonRect } from '@/components/ButtonRect';
import { CheckRound } from '@/components/CheckRound';
import { Modal } from '@/components/Modal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function SignUpAgreementPage() {
	const [agreeAll, setAgreeAll] = useState(false);
	const [agree1, setAgree1] = useState(false);
	const [agree2, setAgree2] = useState(false);
	const [agree3, setAgree3] = useState(false);
	const [agree1ModalOpen, setAgree1ModalOpen] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (agree1 && agree2 && agree3) {
			setAgreeAll(true);
		} else {
			setAgreeAll(false);
		}
	}, [agree1, agree2, agree3]);

	const onClickAgreeAllCheck = () => {
		setAgreeAll((prev) => {
			const checked = !prev;
			if (checked) {
				setAgree1(true);
				setAgree2(true);
				setAgree3(true);
			} else {
				setAgree1(false);
				setAgree2(false);
				setAgree3(false);
			}
			return checked;
		});
	};

	return (
		<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] px-[120px] pt-[100px] pb-40'>
			<div className='flex flex-col justify-start items-center self-stretch  relative gap-2'>
				<p className=' text-[50px] font-bold text-center text-[#0f0e0e]'>
					약관동의
				</p>
			</div>
			<div className='flex flex-col items-center justify-center w-[994px] gap-[60px] px-[120px] py-20 rounded-3xl bg-white'>
				<div className='flex flex-col justify-start items-start self-stretch  gap-6'>
					<div className='flex flex-col justify-start items-start self-stretch  gap-6'>
						<div className='flex justify-start items-start self-stretch  gap-2'>
							<div className='flex justify-start items-center  relative gap-[10.666666984558105px] pb-0.5'>
								<CheckRound
									checked={agreeAll}
									onClick={onClickAgreeAllCheck}
								/>
							</div>
							<div className='flex flex-col justify-center items-start  relative gap-2 py-0.5'>
								<p className=' text-xl text-left text-[#0f0e0e]'>
									전체 동의합니다
								</p>
								<p className=' text-sm text-left text-[#909090]'>
									<span className=' text-sm text-left text-[#909090]'>
										전체동의는 필수 및 선택정보에 대한
										동의도 포함되어 있으며, 개별적으로도
										동의를 선택하실 수 있습니다.
									</span>
									<br />
									<span className=' text-sm text-left text-[#909090]'>
										선택항목에 대한 동의를 거부하는 경우에도
										회원가입 서비스는 이용 가능합니다.
									</span>
								</p>
							</div>
						</div>
						<div className='flex flex-col justify-start items-start self-stretch  relative'>
							<div className='flex flex-col justify-start items-start self-stretch  gap-3 py-4 bg-white'>
								<div className='flex justify-start items-center self-stretch  relative gap-2'>
									<div className='flex justify-start items-center  relative gap-[10.666666984558105px] pb-0.5'>
										<CheckRound
											checked={agree1}
											onClick={() =>
												setAgree1((prev) => !prev)
											}
										/>
									</div>
									<p className='flex-grow w-[645px] text-base text-left text-[#0f0e0e]'>
										[필수] 만 14세 이상입니다.
									</p>
									<ButtonAgreement
										value='내용보기'
										onClick={() => setAgree1ModalOpen(true)}
									/>
								</div>
							</div>
							<svg
								width={754}
								height={1}
								viewBox='0 0 754 1'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='self-stretch '
								preserveAspectRatio='none'>
								<line
									y1='0.5'
									x2={754}
									y2='0.5'
									stroke='#D9D9D9'
								/>
							</svg>
							<div className='flex flex-col justify-start items-start self-stretch  gap-3 py-4 bg-white'>
								<div className='flex justify-start items-center self-stretch  relative gap-2'>
									<CheckRound
										checked={agree2}
										onClick={() =>
											setAgree2((prev) => !prev)
										}
									/>
									<p className='flex-grow w-[645px] text-base text-left text-[#0f0e0e]'>
										[필수] 이용약관 동의
									</p>
									<ButtonAgreement value='내용보기' />
								</div>
							</div>
							<svg
								width={754}
								height={1}
								viewBox='0 0 754 1'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='self-stretch '
								preserveAspectRatio='none'>
								<line
									y1='0.5'
									x2={754}
									y2='0.5'
									stroke='#D9D9D9'
								/>
							</svg>
							<div className='flex flex-col justify-start items-start self-stretch  gap-3 py-4 bg-white'>
								<div className='flex justify-start items-center self-stretch  relative gap-2'>
									<CheckRound
										checked={agree3}
										onClick={() =>
											setAgree3((prev) => !prev)
										}
									/>
									<p className='flex-grow w-[645px] text-base text-left text-[#0f0e0e]'>
										[필수] 개인정보 수집 및 이용에 대한 동의
									</p>
									<ButtonAgreement value='내용보기' />
								</div>
							</div>
						</div>
					</div>
				</div>
				<ButtonRect
					value={'다음'}
					disabled={agreeAll ? false : true}
					style={{ width: 211, alignSelf: 'center' }}
					onClick={() => router.push('/signUp/basicInfo')}
				/>
			</div>
			{agree1ModalOpen && (
				<Modal
					onClose={() => setAgree1ModalOpen(false)}
					title={'이용약관'}
					content={
						<p className='flex-grow w-[604px] text-xs text-left text-black'>
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제 1장 총 칙
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제 1조 (목적)
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								본 이용약관은 주식회사 헤이델리박스(이하
								&quot;회사&quot;)에서 제공하는 모든 서비스(이하
								&quot;서비스&quot;)를 이용함에 있어 회사와
								이용자의 권리·의무 및 책임사항을 규정함을
								목적으로 합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								PC통신, 무선 등을 이용하는 전자상거래에 대해서도
								그 성질에 반하지 않는 한 이 약관을 준용합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제 2조 (정의)
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
							&quot;사이버몰&quot;이란 회사가 재화 또는 용역(이하 &quot;재화
								등&quot;)을 이용자에게 제공하기 위하여 컴퓨터 등
								정보통신 설비를 이용하여 재화 등을 거래할 수
								있도록 설정한 가상의 영업장을 말하며, 아울러
								사이버 몰을 운영하는 사업자의 의미로도
								사용합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
							&quot;이용자&quot;란 사이버몰에 접속하여 이 약관에 따라
								회사가 제공하는 서비스를 받는 회원 및 비회원을
								말합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
							&quot;회원&quot;이라 함은 회사에 개인정보를 제공하여 회원
								등록을 한 자로서, 회사의 정보를 지속적으로 제공
								받으며, 회사가 제공하는 서비스를 계속적으로
								이용할 수 있는 자를 말합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								&quot;비회원&quot;이라 함은 회원에 가입하지 않고 회사가
								제공하는 서비스를 이용하는 자를 말합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								이외에 이 약관에서 사용하는 용어의 정의는 관계
								법령 및 서비스 별 안내에서 정하는 바에 의합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제 3조 (약관 등의 명시와 설명 및 개정)
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사는 이 약관의 내용과 상호, 영업소 소재지
								주소(소비자의 불만을 처리할 수 있는 곳의 주소를
								포함), 전화번호, 모사전송번호, 이메일주소,
								사업자등록번호, 통신판매업신고번호,
								개인정보관리책임자 등을 이용자가 쉽게 알 수
								있도록 사이버몰의 초기 서비스화면(전면)에
								게시합니다. 다만, 약관의 내용은 이용자가
								연결화면을 통하여 볼 수 있도록 할 수 있습니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사는 『약관의 규제에 관한 법률』, 『정보통신망
								이용촉진 및 정보보호 등에 관한 법률』,
								『전자상거래 등에서의 소비자보호에 관한 법률』,
								『소비자기본법』 등 관련법을 위배하지 않는 범위
								에서 이 약관을 개정할 수 있습니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사는 약관을 개정할 경우에는 적용일자 및
								개정사유를 명시하여 현행약관과 회사의 화면에 그
								적용일자 7일 이전부터 적용일자 전일까지
								공지합니다. 다만, 이용자에게 불리하게 약관내용을
								변경하는 경우에는 최소한 30일 이상의 사전
								유예기간을 두고 공지합니다. 이 경우 회사는
								개정전 내용과 개정후 내용을 명확하게 비교하여
								이용자가 알기 쉽도록 표시합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사가 약관을 개정할 경우에는 그 개정약관은 그
								적용일자 이후에 체결되는 계약에만 적용되고 그
								이전에 이미 체결된 계약에 대해서는 개정 전의
								약관조항이 그대로 적용됩니다. 다만 이미 계약을
								체결한 이용자가 개정약관 조항의 적용을 받기를
								원하는 뜻을 제4항에 의한 개정약관의 공지기간
								내에 회사에 송신하여 회사의 동의를 받은 경우에는
								개정약관 조항이 적용됩니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								이 약관에서 정하지 아니한 내용과 이 약관의
								해석에 관하여는 『전자상거래 등에서의
								소비자보호에 관한 법률』, 『약관의 규제에 관한
								법률』, 공정거래위원회가 정하는 『전자상거래
								등에서의 소비자보호지침』 및 관계법령 또는
								상관례에 따릅니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제 2장 회사의 서비스
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제 4조 (서비스의 제공 및 변경)
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사는 다음과 같은 서비스를 제공합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								① 재화 또는 용역에 대한 정보 제공 및 구매 계약의
								체결
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								② 구매 계약이 체결된 재화 또는 용역의 배송
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								③ 기타 회사가 정하는 업무
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사는 상품 또는 용역이 품절되거나 기술적 사양의
								변경 등으로 더 이상 제공할 수 없는 경우에는 장차
								체결되는 계약에 의해 제공할 상품, 용역의 내용을
								변경할 수 있습니다. 이 경우에는 변경된 재화 또는
								용역의 내용 및 제공일자를 명시하여 현재의 재화
								또는 용역의 내용을 게시한 곳에 즉시 공지합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사가 제공하기로 이용자와 계약을 체결한
								서비스의 내용을 상품 등의 품절 또는 기술적
								사양의 변경 등의 사유로 변경할 경우에는 그
								사유를 이용자에게 통지 가능한 방법으로 즉시
								통지합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								전항의 경우 회사는 이로 인하여 이용자가 입은
								손해를 배상합니다. 다만, 회사가 고의 또는 과실이
								없음을 입증한 경우에는 아무런 책임을 부담하지
								않습니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제 5조 (서비스의 중단)
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사는 컴퓨터 등 정보통신설비의 보수점검, 교체
								및 고장, 통신의 두절, 천재지변, 불가항력, 기타
								회사의 합리적인 통제범위를 벗어난 사유가 발생한
								경우에는 서비스의 제공을 일시적으로 중단할 수
								있습니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제1항에 의한 서비스 중단의 경우에는 회사는
								제8조에 정한 방법으로 이용자에게 통지합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사는 제1항의 사유로 서비스의 제공이 일시적으로
								중단됨으로 인하여 이용자 또는 제3자가 입은
								손해에 대하여 회사의 고의 또는 과실이 없는 한
								손해를 배상하지 아니합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제 3장 서비스 이용계약
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제 6조 (회원가입)
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								이용자는 무료로 사이버몰 회원에 가입할 수
								있으며, 회사가 정한 가입 양식에 회원정보를
								기입한 후 이 약관에 동의한다는 의사표시를
								함으로서 회원가입을 신청합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사는 회원가입 신청에 대한 승낙을 통해 회원가입
								절차를 완료하고 회사의 서비스 이용 계정(이하
								&quot;계정&quot;)을 부여합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사는 제1항에 따라 회원가입을 신청한 이용자 중
								다음 각 호에 해당하지 않는 한 회원으로
								등록합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								① 가입신청자가 이 약관 제7조 제3항에 의하여
								이전에 회원자격을 상실한 적이 있는 경우, 다만
								제7조 제3항에 의한 회원자격 상실 후 3년이 경과한
								자로서 회사가 회원 재가입을 승낙한 경우는 예외로
								합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								② 등록 내용에 허위, 기재누락, 오기가 있는 경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								③ 기타 회원으로 등록하는 것이 회사의 기술상
								현저히 지장이 있다고 판단되는 경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								④ 만 14세 미만의 아동
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회원가입은 회사의 승낙이 가입 신청한 이용자에게
								도달한 때에 완료됩니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회원은 회사에 등록한 회원정보에 변경이 있는
								경우, 즉시 회사에서 정하는 방법에 따라 해당
								변경사항을 회사에 통지하거나 수정하여야 합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회원은 1인 당 1개의 계정만 가입할 수 있습니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								제 7조 (회원 탈퇴 및 자격 상실 등)
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회원은 회사에 언제든지 탈퇴를 요청할 수 있으며
								회사는 즉시 회원 탈퇴를 처리합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회원이 다음 각호의 사유에 해당하는 경우, 회사는
								회원 자격을 제한 및 정지시킬 수 있습니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								① 가입 신청 시에 허위 내용을 등록한 경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								② 회사의 서비스를 이용하여 구입한 재화 등의
								대금, 기타 회사의 서비스 이용에 관련하여 회원이
								부담하는 채무를 기일에 지급하지 않는 경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								③ 다른 사람의 회사의 서비스 이용을 방해하거나 그
								정보를 도용하는 등 전자상거래 질서를 위협하는
								경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								④ 회사를 이용하여 법령 또는 이 약관이 금지하거나
								공서양속에 반하는 행위를 하는 경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사가 회원 자격을 제한, 정지 시킨 후, 동일한
								행위가 2회 이상 반복되거나 30일 이내에 그 사유가
								시정 되지 아니하는 경우 회사는 회원 자격을
								상실시킬 수 있습니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회원이 1년간 서비스를 이용하지 않아 휴면회원으로
								전환된 때로부터 다시 서비스를 이용함이 없이
								1년이 경과한 경우, 회사는 서비스 이용계약을
								해지하고 회원을 탈퇴 처리할 수 있습니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								회사가 회원 자격을 상실시키는 경우에는 회원
								등록을 말소합니다. 이 경우 회원에게 이를
								통지하고, 회원 등록 말소 전에 최소한 30일 이상의
								기간을 정하여 소명할 기회를 부여합니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								본 조 제2항, 제3항 및 제5항의 규정에도 불구하고,
								다음의 각 호 중 어느 하나에 해당하는 경우 회사는
								그 사실을 알게 된 날로부터 3 일 이내에 회원 및
								이용자에게 그 위반 사실을 통보한 후 회원자격을
								상실시키거나 회사의 서비스 이용을 영구히 제한할
								수 있습니다.
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								① 공급받은 재화 등을 고의로 훼손하여 청약철회
								등을 요구하는 경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								② 타인의 명의나 정보를 도용하여 서비스를
								이용하는 경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								③ 여신전문금융업법 등 관련 법령을 위한하여
								비정상적인 결제 를 하거나 기타 회사의 시스템을
								비정상적으로 이용하는 경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								④ 정당하지 않은 사유로 주문의 취소, 반품, 환불
								등을 반복하여 회사의 업무를 방해하는 경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								⑤ 범죄 또는 현금화 목적 등으로 대금 결제 방식을
								악용하는 행위
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								⑥ 회사의 직원에게 폭언, 폭행 등 적정 범위를
								벗어나 신체적, 정 신적 고통을 유발할 수 있는
								행위를 하는 경우
							</span>
							<br />
							<span className='flex-grow w-[604px] text-xs text-left text-black'>
								⑦ 그 밖에 통상적이지 않은 방법으로 회사의 업무와
								다른 회원 및 이용자의 서비스 이용을 방해하여 그
								권리와 이익을 현저히 침해 하는 경우
							</span>
						</p>
					}
				/>
			)}
		</div>
	);
}

export default SignUpAgreementPage;
