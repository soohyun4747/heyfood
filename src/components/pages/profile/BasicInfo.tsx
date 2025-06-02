import { ButtonSmall } from '@/components/ButtonSmall';
import { useUserStore } from '@/stores/userStore';
import { logout } from '@/utils/firebase';
import { regex } from '@/utils/string';
import {
	EmailAuthProvider,
	getAuth,
	reauthenticateWithCredential,
	updatePassword,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function BasicInfo() {
	const [isPasswordChange, setIsPasswordChange] = useState(false);
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
	const [newPasswordError, setNewPasswordError] = useState(false);
	const [isNewPasswordsMatch, setIsNewPasswordsMatch] = useState(false);

	const router = useRouter();

	const user = useUserStore((state) => state.user);

	const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputVal = e.target.value;
		setNewPassword(inputVal);
		setNewPasswordError(!regex.test(inputVal));
	};

	const onChangeNewPasswordConfirm = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const inputVal = e.target.value;
		setNewPasswordConfirm(inputVal);
		if (inputVal === newPassword) {
			setIsNewPasswordsMatch(true);
		} else {
			setIsNewPasswordsMatch(true);
		}
	};

	const onCancelPasswordChange = () => {
		setIsPasswordChange(false);
		resetPasswordChange();
	};

	const resetPasswordChange = () => {
		setPassword('');
		setNewPassword('');
		setNewPasswordConfirm('');
		setNewPasswordError(false);
		setIsNewPasswordsMatch(false);
	};

	const changePassword = async () => {
		const auth = getAuth();
		const user = auth.currentUser;

		if (user && user.email) {
			try {
				// 1) 재인증 (오래된 세션일 때 필요)
				const credential = EmailAuthProvider.credential(
					user.email,
					password
				);
				await reauthenticateWithCredential(user, credential);

				// 비밀번호 업데이트
				await updatePassword(user, newPassword);
				alert('비밀번호 변경을 완료하였습니다.');
				setIsPasswordChange(false);
				resetPasswordChange();
			} catch (error: any) {
				alert('다시 로그인해주세요.');
				console.log(error);
				logout();
				router.push('/login');
			}
		}
	};

	return (
		<div className='flex flex-col  gap-6 self-stretch md:self-auto px-[20px] md:px-0'>
			<div className='flex flex-col gap-2 md:gap-6 self-stretch md:self-auto'>
				<div className='flex md:flex-row flex-col md:items-center  gap-3 md:gap-12'>
					<p className='w-[110px]  md:text-lg text-left text-[#0f0e0e]'>
						이메일 아이디
					</p>
					<svg
						width={1}
						height={29}
						viewBox='0 0 1 29'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='md:block hidden'
						preserveAspectRatio='none'>
						<line
							x1='0.5'
							y1='0.5'
							x2='0.499999'
							y2='28.5'
							stroke='#E5E5E5'
						/>
					</svg>
					<p className=' md:text-lg text-left text-[#0f0e0e]'>
						{user?.email}
					</p>
				</div>
				<div className='md:w-[892px] h-[1px] self-stretch bg-[#E5E5E5]' />
			</div>
			<div className='flex flex-col gap-2 md:gap-6 self-stretch md:self-auto'>
				<div className='flex md:flex-row flex-col md:items-center self-stretch   gap-3 md:gap-12'>
					<p className=' w-[110px]  md:text-lg text-left text-[#0f0e0e]'>
						이름
					</p>
					<svg
						width={1}
						height={28}
						viewBox='0 0 1 28'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='hidden md:block'
						preserveAspectRatio='none'>
						<line
							x1='0.5'
							y1='2.18557e-8'
							x2='0.499999'
							y2={28}
							stroke='#E5E5E5'
						/>
					</svg>
					<p className=' md:text-lg text-left text-[#0f0e0e]'>
						{user?.name}
					</p>
				</div>
				<div className='md:w-[892px] h-[1px] self-stretch bg-[#E5E5E5]' />
			</div>
			<div className='flex flex-col gap-2 md:gap-6 self-stretch md:self-auto'>
				<div className='flex md:flex-row flex-col md:items-center self-stretch gap-4 md:gap-12'>
					<p className='w-[110px]  md:text-lg text-left text-[#0f0e0e]'>
						비밀번호
					</p>
					<div className='self-stretch w-[1px] bg-[#E5E5E5] md:block hidden' />
					{isPasswordChange ? (
						<div className='flex flex-col justify-center items-start gap-5'>
							<div className='flex flex-col justify-center items-start gap-2 md:gap-5 self-stretch md:self-auto'>
								<div className='flex md:flex-row flex-col md:items-center md:w-[480px] gap-3 md:gap-8'>
									<p className='w-[110px] md:w-[132px]  md:text-lg text-left text-[#909090]'>
										기존 비밀번호
									</p>
									<input
										autoComplete='new-password'
										type='password'
										className='flex-1  md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
										placeholder='기존 비밀번호 입력'
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</div>
								<div className='md:w-[480px] h-[1px] self-stretch bg-[#E5E5E5]' />
							</div>
							<div className='flex flex-col justify-center items-start gap-2 md:gap-5 self-stretch md:self-auto'>
								<div className='flex md:items-center self-stretch  gap-4'>
									<div className='flex md:flex-row flex-col md:items-center md:w-[480px]  gap-4 md:gap-8'>
										<p className='w-[110px] md:w-[132px]  md:text-lg text-left text-[#909090]'>
											새 비밀번호
										</p>
										<input
											autoComplete='new-password'
											type='password'
											className='flex-1  md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
											placeholder='영문+숫자 조합 8~16자리'
											value={newPassword}
											onChange={onChangeNewPassword}
										/>
									</div>
									{newPasswordError && (
										<p className=' text-xs text-left text-[#dd1c1c]'>
											영문+숫자 조합 8~16자리로
											입력해주세요.
										</p>
									)}
								</div>
								<div className='md:w-[480px] h-[1px] self-stretch bg-[#E5E5E5]' />
							</div>
							<div className='flex md:items-center self-stretch gap-4 md:justify-start justify-between'>
								<div className='flex md:flex-row flex-col md:items-center md:w-[480px]  gap-4 md:gap-8'>
									<p className='md:w-[132px]  md:text-lg text-left text-[#909090]'>
										새 비밀번호 확인
									</p>
									<input
										autoComplete='new-password'
										type='password'
										className='flex-1  md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0 md:max-w-[unset] max-w-[200px]'
										placeholder='비밀번호 확인 입력'
										value={newPasswordConfirm}
										onChange={onChangeNewPasswordConfirm}
									/>
								</div>
								<div className='flex items-end md:items-start gap-2 md:gap-2.5 min-w-[90px] md:min-w-auto'>
									<ButtonSmall
										value='변경'
										disabled={
											!isNewPasswordsMatch || !password
										}
										onClick={changePassword}
									/>
									<ButtonSmall
										value='취소'
										onClick={onCancelPasswordChange}
									/>
								</div>
							</div>
						</div>
					) : (
						<div className='flex items-center w-full justify-between'>
							<p className=' md:text-lg text-left text-[#0f0e0e]'>
								**********
							</p>
							<ButtonSmall
								value={'비밀번호 변경'}
								onClick={() => setIsPasswordChange(true)}
							/>
						</div>
					)}
				</div>
				<div className='md:w-[892px] h-[1px] self-stretch bg-[#E5E5E5]' />
			</div>
		</div>
	);
}
