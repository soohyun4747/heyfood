import { ButtonRect } from '@/components/ButtonRect';
import { ButtonRectYellow } from '@/components/ButtonRectYellow';
import { CheckRound } from '@/components/CheckRound';
import { IUser, UserType, useUserStore } from '@/stores/userStore';
import {
	addData,
	confirmVerificationCode,
	fetchDataWithDocId,
	sendVerificationCode,
} from '@/utils/firebase';
import { convertDateStrToTimestamp } from '@/utils/time';
import {
	ConfirmationResult,
	getAuth,
	RecaptchaVerifier,
	User,
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function GuestLogin() {
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [verifyCode, setVerifyCode] = useState('');
	const [confirmationResult, setConfirmationResult] =
		useState<ConfirmationResult>();
	const [isVerified, setIsVerified] = useState(false);
	const [credentialUser, setCredentialUser] = useState<User>();
	const [agreementCheck, setAgreementCheck] = useState(false);

	const setUser = useUserStore((state) => state.setUser);
	const auth = getAuth();
	const router = useRouter();

	// 컴포넌트가 마운트될 때 reCAPTCHA verifier를 초기화합니다.
	useEffect(() => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			auth,
			'recaptcha-container',
			{
				size: 'invisible',
				callback: (response: any) => {
					console.log('reCAPTCHA 해결 완료:', response);
				},
			}
		);
	}, [auth]);

	// 인증번호(OTP) 전송 함수
	const onClickSendCode = async () => {
		// 입력된 번호를 E.164 형식으로 변환
		const confirmResult = await sendVerificationCode(phoneNumber);
		setConfirmationResult(confirmResult);
	};

	// 사용자가 입력한 인증번호(OTP) 확인 함수
	const onClickConfirmCode = async () => {
		const user = await confirmVerificationCode(
			confirmationResult,
			verifyCode
		);
		if (user) {
			setCredentialUser(user);
			setIsVerified(true);
		}
	};

	const createOrGetSetUserData = async (user: User) => {
		const userData = (await fetchDataWithDocId('guests', user.uid)) as
			| IUser
			| undefined;
		if (userData) {
			if (userData.name === name) {
				setUser({ ...userData, userType: UserType.guest });
			} else {
				alert('이름이 맞지 않습니다.');
				return false;
			}
		} else {
			const newUserData: Omit<IUser, 'userType'> = {
				id: user.uid,
				name: name,
				phone: phoneNumber,
				createdAt: user.metadata.creationTime
					? convertDateStrToTimestamp(user.metadata.creationTime)
					: Timestamp.now(),
				address: null,
				addressDetail: null,
				updatedAt: null,
			};
			addData('guests', newUserData);
			setUser({ ...newUserData, userType: UserType.guest });
		}

		return true;
	};

	const goToOrder = async () => {
		if (credentialUser) {
			const succeed = await createOrGetSetUserData(credentialUser);
			if (succeed) {
				router.push('/order');
			}
		}
	};

	const goToOrderHistory = async () => {
		if (credentialUser) {
			const succeed = await createOrGetSetUserData(credentialUser);
			if (succeed) {
				router.push('/guestProfile');
			}
		}
	};

	return (
		<div className='flex flex-col justify-start items-start self-stretch  gap-10'>
			<div className='flex flex-col justify-start items-center self-stretch  gap-6'>
				<p className='text-xs md:text-[15px] text-center text-[#909090]'>
					헤이델리박스 회원이 되시면 다양한 혜택을 누리실 수 있습니다.
				</p>
				<div className='flex justify-end items-center self-stretch  gap-2'>
					<div
						onClick={() => router.push('/signUp')}
						className='hover:cursor-pointer flex justify-center items-center  gap-2 border-t-0 border-r-0 border-b border-l-0 border-[#a0a0a0]'>
						<p className='text-[13px] text-center text-[#a0a0a0]'>
							회원가입 하기
						</p>
					</div>
				</div>
			</div>
			<div className='flex flex-col justify-start items-start self-stretch  gap-3'>
				<div className='flex justify-start items-center self-stretch  gap-2'>
					<CheckRound
						checked={agreementCheck}
						onClick={() => setAgreementCheck((prev) => !prev)}
					/>
					<p className='text-sm md:text-base text-left text-[#0f0e0e]'>
						비회원 이용약관 및 개인정보 수집 이용동의
					</p>
				</div>
				<div className='md:bg-transparent bg-white flex justify-start items-start self-stretch  h-[238px] relative overflow-hidden gap-2 p-4 border border-[#d9d9d9] overflow-y-auto'>
					<p className='flex-grow md:w-[416px] text-sm md:text-[13px] text-left text-[#909090]'>
						<span>
							헤이델리박스는 비회원 주문 서비스를 위하여 다음과
							같이 귀하의 개인정보를 수집·이용합니다.
						</span>
						<br />
						<span>· 수집 항목:</span>
						<br />
						<span>
							- 연락처. 당사는 주문자명, 전화번호, 배달지 주소를
							수집할 수 있습니다.
						</span>
						<br />
						<span>
							- 결제 정보. 온라인 구매를 하는 경우, 귀하는 귀하가
							선택하는 결제 형태에 따라 신용/직불카드 번호 및 관련
							금융정보(유효기간, 보안코드, 청구지 주소 등) 또는
							기타 결제 방식에 대한 정보를 제공해야 합니다.
						</span>
						<br />
						<span>
							- 기기 및 기술 데이터. 당사는 귀하가 당사의
							웹사이트를 방문하거나 당사의 모바일 애플리케이션
							또는 서비스를 이용할 때 기술정보를 수집합니다.
							여기에는 귀하의 IP 주소, 귀하가 사용하는 모바일 기기
							유형, 귀하의 기기 운영체제 및 브라우저 유형, 시간대
							설정 및 위치, 언어, 고유 기기 식별자, 참조 웹사이트
							주소, 당사 웹사이트를 통해 귀하가 이용하는 경로 및
							기타 당사 웹사이트 내 귀하의 세션에 관한 정보가
							포함될 수 있습니다.
						</span>
						<br />
						<span>
							- 쿠키 및 기타 기술. 당사 및 당사의 제3자 서비스
							제공자들은 당사 웹사이트 및 모바일 서비스 이용에
							관한 정보를 수집하기 위하여 쿠키, 웹 비콘, 고유 광고
							식별자 및 모바일 기기 식별자와 같은 기술을
							이용합니다. 여기에는 예컨대 귀하의 인구통계학적
							정보, 미디어 소비, 쇼핑 습관, 또는 라이프스타일 선호
							등 공개 데이터베이스 또는 데이터 수집업체의 정보가
							포함될 수 있습니다.
						</span>
					</p>
				</div>
			</div>
			<div className='flex flex-col justify-start items-start self-stretch  gap-12'>
				<div className='flex flex-col justify-start items-start self-stretch  gap-3'>
					<div className='flex justify-start items-center self-stretch gap-6 px-6 py-[19px] border border-[#d9d9d9] bg-white md:bg-transparent'>
						<input
							className='flex-grow text-sm md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
							placeholder='이름'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='flex justify-start items-start self-stretch  gap-2'>
						<div className='flex justify-start items-center  w-[286px] relative gap-6 px-6 py-[19px] border border-[#d9d9d9] bg-white md:bg-transparent'>
							<input
								className='flex-grow text-sm md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
								placeholder='휴대폰 번호'
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>
						<ButtonRectYellow
							value='인증번호 발송'
							disabled={phoneNumber ? false : true}
							onClick={onClickSendCode}
							className='w-full md:min-h-[68px] min-h-[60px]'
						/>
					</div>
					<div className='flex justify-start items-start self-stretch  gap-2'>
						<div className='flex justify-start items-center  w-[286px] relative gap-6 px-6 py-[19px] border border-[#d9d9d9]  bg-white md:bg-transparent'>
							<input
								className='flex-grow text-sm md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
								placeholder='인증번호'
								value={verifyCode}
								onChange={(e) => setVerifyCode(e.target.value)}
							/>
						</div>
						<ButtonRectYellow
							value='확인'
							disabled={verifyCode ? false : true}
							onClick={onClickConfirmCode}
							className='w-full md:min-h-[68px] min-h-[60px]'
						/>
					</div>
				</div>
				<div className='flex flex-col justify-start items-start self-stretch  gap-8'>
					<div className='flex flex-col justify-start items-start self-stretch  gap-3'>
						<ButtonRect
							disabled={
								isVerified && name && agreementCheck
									? false
									: true
							}
							value='주문하기'
							onClick={goToOrder}
						/>
						<div className='flex justify-center items-center self-stretch  h-[68px] relative gap-[60px] px-8 py-5'>
							<p
								onClick={goToOrderHistory}
								style={{
									color:
										isVerified && name && agreementCheck
											? '#F2AB27'
											: '#909090',
								}}
								className='cursor-pointer md:text-lg font-bold text-center'>
								비회원 주문조회
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* reCAPTCHA 컨테이너 (invisible 옵션으로 보이지 않습니다) */}
			<div id='recaptcha-container'></div>
		</div>
	);
}
