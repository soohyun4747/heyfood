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
		<>
			<div className='flex flex-col justify-start items-start flex-grow relative gap-6 rounded-3xl'>
				<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-6'>
					<div className='flex justify-start items-center flex-grow relative gap-12'>
						<p className='flex-grow-0 flex-shrink-0 w-[110px] text-lg text-left text-[#0f0e0e]'>
							이메일 아이디
						</p>
						<svg
							width={1}
							height={29}
							viewBox='0 0 1 29'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								x1='0.5'
								y1='0.5'
								x2='0.499999'
								y2='28.5'
								stroke='#E5E5E5'
							/>
						</svg>
						<div className='flex justify-start items-center flex-grow gap-6'>
							<div className='flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2 py-px bg-white'>
								<p className='flex-grow-0 flex-shrink-0 text-lg text-left text-[#0f0e0e]'>
									{user?.email}
								</p>
							</div>
						</div>
					</div>
				</div>
				<svg
					width={892}
					height={1}
					viewBox='0 0 892 1'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='self-stretch flex-grow-0 flex-shrink-0'
					preserveAspectRatio='none'>
					<line
						y1='0.5'
						x2={892}
						y2='0.5'
						stroke='#E5E5E5'
					/>
				</svg>
				<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-12'>
					<p className='flex-grow-0 flex-shrink-0 w-[110px] text-lg text-left text-[#0f0e0e]'>
						이름
					</p>
					<svg
						width={1}
						height={28}
						viewBox='0 0 1 28'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='flex-grow-0 flex-shrink-0'
						preserveAspectRatio='none'>
						<line
							x1='0.5'
							y1='2.18557e-8'
							x2='0.499999'
							y2={28}
							stroke='#E5E5E5'
						/>
					</svg>
					<p className='flex-grow-0 flex-shrink-0 text-lg text-left text-[#0f0e0e]'>
						{user?.name}
					</p>
				</div>
				<svg
					width={892}
					height={1}
					viewBox='0 0 892 1'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='self-stretch flex-grow-0 flex-shrink-0'
					preserveAspectRatio='none'>
					<line
						y1='0.5'
						x2={892}
						y2='0.5'
						stroke='#E5E5E5'
					/>
				</svg>
				<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-12'>
					<p className='flex-grow-0 flex-shrink-0 w-[110px] text-lg text-left text-[#0f0e0e]'>
						비밀번호
					</p>
					<svg
						width={1}
						height={28}
						viewBox='0 0 1 28'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='flex-grow-0 flex-shrink-0'
						preserveAspectRatio='none'>
						<line
							x1='0.5'
							y1='2.18557e-8'
							x2='0.499999'
							y2={28}
							stroke='#E5E5E5'
						/>
					</svg>
					{isPasswordChange ? (
						<div className='flex flex-col justify-center items-start flex-grow relative gap-5'>
							<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-7 relative gap-4'>
								<div className='flex justify-start items-center flex-grow-0 flex-shrink-0 w-[480px] relative gap-8'>
									<p className='flex-grow-0 flex-shrink-0 w-[132px] text-lg text-left text-[#909090]'>
										기존 비밀번호
									</p>
									<input
										autoComplete='new-password'
										type='password'
										className='flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
										placeholder='기존 비밀번호 입력'
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</div>
							</div>
							<svg
								width={480}
								height={1}
								viewBox='0 0 480 1'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									y1='0.5'
									x2={480}
									y2='0.5'
									stroke='#E5E5E5'
								/>
							</svg>
							<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-7 relative gap-4'>
								<div className='flex justify-start items-center flex-grow-0 flex-shrink-0 w-[480px] relative gap-8'>
									<p className='flex-grow-0 flex-shrink-0 w-[132px] text-lg text-left text-[#909090]'>
										새 비밀번호
									</p>
									<input
										autoComplete='new-password'
										type='password'
										className='flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
										placeholder='영문+숫자 조합 8~16자리'
										value={newPassword}
										onChange={onChangeNewPassword}
									/>
								</div>
								{newPasswordError && (
									<p className='flex-grow-0 flex-shrink-0 text-xs text-left text-[#dd1c1c]'>
										영문+숫자 조합 8~16자리로 입력해주세요.
									</p>
								)}
							</div>
							<svg
								width={480}
								height={1}
								viewBox='0 0 480 1'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									y1='0.5'
									x2={480}
									y2='0.5'
									stroke='#E5E5E5'
								/>
							</svg>
							<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-4'>
								<div className='flex justify-start items-center flex-grow-0 flex-shrink-0 w-[480px] relative gap-8'>
									<p className='flex-grow-0 flex-shrink-0 text-lg text-left text-[#909090] w-[132px]'>
										새 비밀번호 확인
									</p>
									<input
										autoComplete='new-password'
										type='password'
										className='flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
										placeholder='비밀번호 확인 입력'
										value={newPasswordConfirm}
										onChange={onChangeNewPasswordConfirm}
									/>
								</div>
								<div className='flex justify-start items-start flex-grow-0 flex-shrink-0 gap-2.5'>
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
						<>
							<p className='flex-grow w-[517px] text-lg text-left text-[#0f0e0e]'>
								**********
							</p>
							<ButtonSmall
								value={'비밀번호 변경'}
								onClick={() => setIsPasswordChange(true)}
							/>
						</>
					)}
				</div>
				<svg
					width={892}
					height={1}
					viewBox='0 0 892 1'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='self-stretch flex-grow-0 flex-shrink-0'
					preserveAspectRatio='none'>
					<line
						y1='0.5'
						x2={892}
						y2='0.5'
						stroke='#E5E5E5'
					/>
				</svg>
			</div>
		</>
	);
}