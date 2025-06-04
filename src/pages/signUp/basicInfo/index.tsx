import { ButtonRect } from '@/components/ButtonRect';
import { ButtonRectYellow } from '@/components/ButtonRectYellow';
import { HorizontalLine } from '@/components/HorizontalLine';
import { VerticalLine } from '@/components/VerticalLine';
import { auth, db } from '@/configs/firebaseConfig';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { emailDomains } from '@/pages/inquiry';
import { useMarketingAgreeStore } from '@/stores/marketingAgreeStore';
import { IUser, UserType, useUserStore } from '@/stores/userStore';
import {
	addData,
	checkUser,
	confirmVerificationCode,
	sendVerificationCode,
} from '@/utils/firebase';
import { extractNumbers, regex } from '@/utils/string';
import {
	ApplicationVerifier,
	ConfirmationResult,
	createUserWithEmailAndPassword,
	getAuth,
	RecaptchaVerifier,
	User,
} from 'firebase/auth';
import {
	collection,
	getDocs,
	query,
	Timestamp,
	where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

function SignUpBasicInfoPage() {
	const [emailId, setEmailId] = useState<string>();
	const [emailDomain, setEmailDomain] = useState<string>();
	const [emailDomainSelectVal, setEmailDomainSelectVal] = useState<string>();
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordConfirmError, setPasswordConfirmError] = useState(false);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [verifyCode, setVerifyCode] = useState('');
	const [confirmationResult, setConfirmationResult] =
		useState<ConfirmationResult>();
	const [credentialUser, setCredentialUser] = useState<User>();
	const marketingAgree = useMarketingAgreeStore(
		(state) => state.marketingAgree
	);

	const { setUser } = useUserStore();

	const router = useRouter();
	const recaptchaAuth = getAuth();

	// 컴포넌트가 마운트될 때 reCAPTCHA verifier를 초기화합니다.
	useEffect(() => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			recaptchaAuth,
			'recaptcha-container2',
			{
				size: 'invisible',
				callback: (response: any) => {
					console.log('reCAPTCHA 해결 완료:', response);
				},
			}
		);
	}, [recaptchaAuth]);

	const onSelectEmailDomain = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value !== '직접 입력') {
			setEmailDomain(e.target.value);
			setEmailDomainSelectVal(e.target.value);
			onChangeEmail(`${emailId}@${e.target.value}`);
		}
	};

	const onChangeEmailDomainInput = (e: ChangeEvent<HTMLInputElement>) => {
		setEmailDomain(e.target.value);
		if (
			emailDomainSelectVal !== '직접 입력' &&
			e.target.value !== emailDomainSelectVal
		) {
			setEmailDomainSelectVal('직접 입력');
		}
	};

	const onChangeEmail = async (email: string) => {
		const user = await checkUser(email);
		if (user) {
			setEmailError(true);
		} else {
			setEmailError(false);
		}
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputVal = e.target.value;
		setPassword(inputVal);
		setPasswordError(!regex.test(inputVal));
	};

	const onChangePasswordConfirm = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const inputVal = e.target.value;
		setPasswordConfirm(inputVal);
		if (inputVal === password) {
			setPasswordConfirmError(false);
		} else {
			setPasswordConfirmError(true);
		}
	};

	const isButtonDisabled = () => {
		if (
			emailId &&
			emailDomain &&
			!emailError &&
			password &&
			!passwordError &&
			passwordConfirm &&
			!passwordConfirmError &&
			credentialUser
		) {
			return false;
		}
		return true;
	};

	const onSignUp = async () => {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			`${emailId}@${emailDomain}`,
			password
		);
		const newUser = userCredential.user;

		const addedData = (await addData('users', {
			id: newUser.uid,
			name: name,
			email: newUser.email,
			phone: extractNumbers(phone),
			createdAt: Timestamp.now(),
			marketingAgree: marketingAgree,
		})) as IUser | false;

		if (addedData) {
			setUser({
				...addedData,
				userType: UserType.user,
			});

			router.push('/signUp/complete');
		} else {
			alert('회원가입에 실패하였습니다.');
		}
	};

	// 인증번호(OTP) 전송 함수
	const onClickSendCode = async (appVerifier?: ApplicationVerifier) => {
		const users = await findUserByPhone(phone);
		if (users.length > 0) {
			alert('이미 존재하는 전화번호입니다.');
			return;
		}

		const confirmResult = await sendVerificationCode(phone, appVerifier);
		setConfirmationResult(confirmResult);
	};

	async function findUserByPhone(phone: string) {
		const phoneNumber = extractNumbers(phone);

		const usersRef = collection(db, 'users');
		const q = query(usersRef, where('phone', '==', phoneNumber));

		const querySnapshot = await getDocs(q);
		const users = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as IUser[];
		return users; // This will be an array of matched users
	}

	// 사용자가 입력한 인증번호(OTP) 확인 함수
	const onClickConfirmCode = async () => {
		const user = await confirmVerificationCode(
			confirmationResult,
			verifyCode
		);
		if (user) {
			setCredentialUser(user);
		}
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] px-[20px] md:px-[120px] pt-[40px] md:pt-[100px] pb-[120px] md:pb-40'>
				<div className='flex flex-col justify-start items-center self-stretch  gap-2'>
					<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
						기본정보 입력
					</p>
				</div>
				<div className='flex flex-col justify-start items-center gap-[60px] md:p-20 rounded-3xl bg-white self-stretch'>
					<div className='flex flex-col justify-start items-start md:self-auto self-stretch md:gap-6 gap-5'>
						<div className='flex flex-col md:gap-6 gap-2 self-stretch'>
							<div className='flex md:flex-row flex-col justify-start md:items-center md:w-[1040px] md:h-8 gap-[6px] md:gap-6'>
								<div className='flex md:flex-row flex-col justify-start md:items-center gap-[8px] md:gap-12'>
									<p className=' w-[110px]  md:text-lg text-left text-[#0f0e0e]'>
										이메일 아이디
									</p>
									<VerticalLine className='hidden md:block' />
									<div className='flex justify-between items-center md:w-[564px] gap-6 self-stretch'>
										<div className='flex justify-start items-center h-8 md:gap-6 gap-[6px] '>
											<input
												className='md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0 max-w-[96px] md:min-w-[160px]'
												placeholder='아이디 입력'
												value={emailId}
												onChange={(e) =>
													setEmailId(e.target.value)
												}
												onBlur={(e) =>
													onChangeEmail(
														`${e.target.value}@${emailDomain}`
													)
												}
											/>
											<p className='md:text-xl text-left text-[#0f0e0e]'>
												@
											</p>
											<input
												className='md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0 max-w-[90px] md:min-w-[160px]'
												placeholder='도메인 입력'
												value={emailDomain}
												onChange={
													onChangeEmailDomainInput
												}
												onBlur={(e) =>
													onChangeEmail(
														`${emailId}@${e.target.value}`
													)
												}
											/>
										</div>
										<VerticalLine className='hidden md:block' />
										<select
											value={emailDomainSelectVal}
											className='focus:outline-0 hover:cursor-pointer md:text-base max-w-[96px] md:max-w-auto'
											onChange={onSelectEmailDomain}>
											{emailDomains.map((value) => (
												<option
													key={value}
													value={value}>
													{value}
												</option>
											))}
										</select>
									</div>
								</div>
								<p
									style={{
										color: emailError
											? '#dd1c1c'
											: 'transparent',
									}}
									className='flex-grow w-[246px]  text-left hidden md:block'>
									동일한 이메일 주소로 가입된 계정이 있습니다
								</p>
							</div>
							<HorizontalLine />
							<p
								style={{
									color: emailError
										? '#dd1c1c'
										: 'transparent',
								}}
								className='md:hidden  text-left'>
								동일한 이메일 주소로 가입된 계정이 있습니다
							</p>
						</div>
						<div className='flex flex-col gap-2 md:gap-6 self-stretch'>
							<div className='flex md:flex-row flex-col justify-start md:items-center self-stretch  gap-6'>
								<div className='flex md:flex-row flex-col justify-start md:items-center  gap-2 md:gap-12 flex-1'>
									<p className='w-[110px]  md:text-lg text-left text-[#0f0e0e]'>
										비밀번호
									</p>
									<VerticalLine className='hidden md:block' />
									<input
										autoComplete='new-password'
										type='password'
										className='flex-1 md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
										placeholder='영문+숫자 조합 8~16자리'
										value={password}
										onChange={onChangePassword}
									/>
								</div>
								<p
									style={{
										color: passwordError
											? '#dd1c1c'
											: 'transparent',
									}}
									className='w-[246px]  text-left hidden md:block'>
									영문+숫자 조합 8~16자리로 입력해주세요.
								</p>
							</div>
							<HorizontalLine />
							<p
								style={{
									color: passwordError
										? '#dd1c1c'
										: 'transparent',
								}}
								className='md:hidden  text-left'>
								영문+숫자 조합 8~16자리로 입력해주세요.
							</p>
						</div>
						<div className='flex flex-col gap-2 md:gap-6 self-stretch'>
							<div className='flex md:flex-row flex-col justify-start md:items-center self-stretch  gap-6'>
								<div className='flex md:flex-row flex-col justify-start md:items-center gap-2 md:gap-12 flex-1'>
									<p className='w-[110px]  md:text-lg text-left text-[#0f0e0e]'>
										비밀번호 확인
									</p>
									<VerticalLine className='hidden md:block' />
									<input
										autoComplete='new-password'
										type='password'
										className='flex-1 md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
										placeholder='비밀번호 확인 입력'
										value={passwordConfirm}
										onChange={onChangePasswordConfirm}
									/>
								</div>
								<p
									style={{
										color: passwordConfirmError
											? '#dd1c1c'
											: 'transparent',
									}}
									className='w-[246px]  text-left hidden md:block'>
									비밀번호 정보가 일치하지 않습니다
								</p>
							</div>
							<HorizontalLine />
							<p
								style={{
									color: passwordConfirmError
										? '#dd1c1c'
										: 'transparent',
								}}
								className='md:hidden  text-left'>
								비밀번호 정보가 일치하지 않습니다
							</p>
						</div>
						<div className='flex flex-col gap-2 md:gap-6 self-stretch md:pb-0 pb-6'>
							<div className='flex md:flex-row flex-col justify-start  md:items-center  gap-2 md:gap-12 flex-1'>
								<p className=' w-[110px]  md:text-lg text-left text-[#0f0e0e]'>
									이름
								</p>
								<VerticalLine className='hidden md:block' />
								<input
									className='flex-1 md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
									placeholder='이름 입력'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<HorizontalLine />
						</div>
						<div className='flex flex-col gap-2 md:gap-6 self-stretch md:pb-0 pb-6'>
							<div className='flex md:flex-row flex-col justify-start md:items-center gap-2 md:gap-12 flex-1'>
								<p className='min-w-[110px]  md:text-lg text-left text-[#0f0e0e]'>
									휴대폰 번호
								</p>
								<VerticalLine className='hidden md:block' />
								<div className='flex justify-between self-stretch flex-1'>
									<input
										className='flex-1 md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0 md:max-w-[unset] max-w-[215px]'
										placeholder='휴대폰 번호 입력'
										value={phone}
										onChange={(e) =>
											setPhone(e.target.value)
										}
									/>
									<ButtonRectYellow
										value='인증번호 발송'
										disabled={phone ? false : true}
										onClick={() =>
											onClickSendCode(
												window.recaptchaVerifier
											)
										}
										className='md:w-[180px] min-w-[120px] md:min-h-[68px] min-h-[48px]'
									/>
								</div>
							</div>
							<HorizontalLine />
						</div>
						<div className='flex flex-col gap-2 md:gap-6 self-stretch'>
							<div className='flex md:flex-row flex-col justify-start md:items-center gap-2 md:gap-12 flex-1 self-stretch'>
								<p className='min-w-[110px]  md:text-lg text-left text-[#0f0e0e]'>
									인증번호
								</p>
								<VerticalLine className='hidden md:block' />
								<div className='flex justify-between flex-1'>
									<input
										className='flex-1 md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0 md:max-w-auto max-w-[215px]'
										placeholder='인증번호 입력'
										value={verifyCode}
										onChange={(e) =>
											setVerifyCode(e.target.value)
										}
									/>
									<ButtonRectYellow
										value='확인'
										disabled={verifyCode ? false : true}
										onClick={onClickConfirmCode}
										className='md:w-[180px] min-w-[120px] md:min-h-[68px] min-h-[48px]'
									/>
								</div>
							</div>
							<HorizontalLine />
						</div>
					</div>
					<ButtonRect
						style={{ width: 211, alignSelf: 'center' }}
						value='회원가입 완료'
						disabled={isButtonDisabled()}
						onClick={onSignUp}
					/>
				</div>
				{/* reCAPTCHA 컨테이너 (invisible 옵션으로 보이지 않습니다) */}
				<div id='recaptcha-container2'></div>
			</div>
		</Common>
	);
}

export default SignUpBasicInfoPage;
