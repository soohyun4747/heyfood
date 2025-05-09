import { ButtonRect } from '@/components/ButtonRect';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { emailDomains } from '@/pages/inquiry';
import { checkUser } from '@/utils/firebase';
import { regex } from '@/utils/string';
import { ChangeEvent, useState } from 'react';


function SignUpBasicInfoPage() {
	const [emailId, setEmailId] = useState<string>();
	const [emailDomain, setEmailDomain] = useState<string>();
	const [emailDomainSelectVal, setEmailDomainSelectVal] = useState<string>();
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordConfirmError, setPasswordConfirmError] = useState(false);

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
			!passwordConfirmError
		) {
			return false;
		}
		return true;
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] px-[120px] pt-[100px] pb-40 min-h-full'>
				<div className='flex flex-col justify-start items-center self-stretch  relative gap-2'>
					<p className=' text-[50px] font-bold text-center text-[#0f0e0e]'>
						기본정보 입력
					</p>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] p-20 rounded-3xl bg-white'>
					<div className='flex flex-col justify-start items-start self-stretch  relative gap-6'>
						<div className='flex justify-start items-center  w-[1040px] h-8 relative gap-6'>
							<div className='flex justify-start items-center  relative gap-12'>
								<p className=' w-[110px] text-lg text-left text-[#0f0e0e]'>
									이메일 아이디
								</p>
								<svg
									width={1}
									height={28}
									viewBox='0 0 1 28'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className=''
									preserveAspectRatio='none'>
									<line
										x1='0.5'
										y1='2.18557e-8'
										x2='0.499999'
										y2={28}
										stroke='#D9D9D9'
									/>
								</svg>
								<div className='flex justify-between items-center w-[564px] relative gap-6'>
									<div className='flex justify-start items-center h-8 gap-6 min-w-0'>
										<input
											className='min-w-0 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
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
										<p className=' text-xl text-left text-[#0f0e0e]'>
											@
										</p>
										<input
											className='min-w-0 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
											placeholder='도메인 입력'
											value={emailDomain}
											onChange={onChangeEmailDomainInput}
											onBlur={(e) =>
												onChangeEmail(
													`${emailId}@${e.target.value}`
												)
											}
										/>
									</div>
									<svg
										width={1}
										height={28}
										viewBox='0 0 1 28'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										className=''
										preserveAspectRatio='none'>
										<line
											x1='0.5'
											y1='2.18557e-8'
											x2='0.499999'
											y2={28}
											stroke='#E5E5E5'
										/>
									</svg>
									<select
										value={emailDomainSelectVal}
										className='ui dropdown focus:outline-0 hover:cursor-pointer min-w-0'
										onChange={onSelectEmailDomain}>
										{emailDomains.map((value) => (
											<option key={value} value={value}>
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
								className='flex-grow w-[246px] text-xs text-left'>
								동일한 이메일 주소로 가입된 계정이 있습니다
							</p>
						</div>
						<svg
							width={1040}
							height={1}
							viewBox='0 0 1040 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch '
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={1040}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
						<div className='flex justify-start items-center self-stretch  relative gap-6'>
							<div className='flex justify-start items-center  relative gap-12 flex-1'>
								<p className=' w-[110px] text-lg text-left text-[#0f0e0e]'>
									비밀번호
								</p>
								<svg
									width={1}
									height={28}
									viewBox='0 0 1 28'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className=''
									preserveAspectRatio='none'>
									<line
										x1='0.5'
										y1='2.18557e-8'
										x2='0.499999'
										y2={28}
										stroke='#D9D9D9'
									/>
								</svg>
								<input
									autoComplete='new-password'
									type='password'
									className='flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
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
								className='w-[246px] text-xs text-left'>
								영문+숫자 조합 8~16자리로 입력해주세요.
							</p>
						</div>
						<svg
							width={1040}
							height={1}
							viewBox='0 0 1040 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch '
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={1040}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
						<div className='flex justify-start items-center self-stretch  relative gap-6'>
							<div className='flex justify-start items-center relative gap-12 flex-1'>
								<p className=' w-[110px] text-lg text-left text-[#0f0e0e]'>
									비밀번호 확인
								</p>
								<svg
									width={1}
									height={28}
									viewBox='0 0 1 28'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className=''
									preserveAspectRatio='none'>
									<line
										x1='0.5'
										y1='2.18557e-8'
										x2='0.499999'
										y2={28}
										stroke='#D9D9D9'
									/>
								</svg>
								<input
									autoComplete='new-password'
									type='password'
									className='flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
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
								className='w-[246px] text-xs text-left'>
								비밀번호 정보가 일치하지 않습니다
							</p>
						</div>
						<svg
							width={1040}
							height={1}
							viewBox='0 0 1040 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch '
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={1040}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
					</div>
					<ButtonRect
						style={{ width: 211, alignSelf: 'center' }}
						value='회원가입 완료'
						disabled={isButtonDisabled()}
					/>
				</div>
			</div>
		</Common>
	);
}

export default SignUpBasicInfoPage;
