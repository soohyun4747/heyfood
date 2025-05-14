import { ButtonRect } from '@/components/ButtonRect';
import { IUser, UserType, useUserStore } from '@/stores/userStore';
import { fetchDataWithDocId } from '@/utils/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function UserLogin() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const router = useRouter();
	const setUser = useUserStore((state) => state.setUser);

	// 로그인 버튼 클릭 시 호출할 함수 (Firebase 인증 시도)
	const handleLogin = async () => {
		if (email && password) {
			const auth = getAuth();
			try {
				// Firebase 인증: 이메일과 비밀번호로 로그인 시도
				const userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
				const user = userCredential.user;

				// Firestore DB에서 uid 기반의 사용자 데이터 가져오기
				const userData = (await fetchDataWithDocId(
					'users',
					user.uid
				)) as IUser | undefined;

				if (userData) {
					setUser({ ...userData, userType: UserType.user });

					// 사용자 정보 저장 후 menu 페이지로 이동
					router.push('/order');
				} else {
					alert('로그인을 실패하였습니다');
				}
			} catch (error: any) {
				alert('로그인 실패: ' + error.message);
			}
		}
	};

	return (
		<div className='flex flex-col justify-start items-start self-stretch  gap-12'>
			<div className='flex flex-col justify-start items-center self-stretch  gap-10'>
				<p className=' text-[15px] text-center text-[#909090]'>
					<span className=' text-[15px] text-center text-[#909090]'>
						헤이델리박스 회원으로 로그인하시면 제공하는
					</span>
					<br />
					<span className=' text-[15px] text-center text-[#909090]'>
						다양한 서비스를 이용할 수 있습니다.
					</span>
				</p>
				<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
					<div className='flex justify-start items-center self-stretch  gap-6 px-6 py-[22px] border border-[#d9d9d9]'>
						<p className=' w-[110px] text-base text-left text-[#0f0e0e]'>
							이메일
						</p>
						<input
							className='flex-grow text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
							placeholder='이메일 입력'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='flex justify-start items-center self-stretch  gap-6 px-6 py-[22px] border-t-0 border-r border-b border-l border-[#d9d9d9]'>
						<p className=' w-[110px] text-base text-left text-[#0f0e0e]'>
							비밀번호
						</p>
						<input
							autoComplete='new-password'
							type='password'
							className='flex-grow text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
							placeholder='비밀번호 입력'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col justify-center items-center self-stretch  gap-8'>
				<ButtonRect
					disabled={email && password ? false : true}
					value={'로그인'}
					onClick={handleLogin}
				/>
				<div className='flex justify-start items-center self-stretch  gap-3'>
					<p className='cursor-pointer flex-grow w-[133.33px] text-[13px] text-center text-[#a0a0a0]'>
						아이디 찾기
					</p>
					<svg
						width={2}
						height={24}
						viewBox='0 0 2 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='flex-grow-0 flex-shrink-0'
						preserveAspectRatio='none'>
						<line
							x1='0.833008'
							y1='2.18557e-8'
							x2='0.833007'
							y2={24}
							stroke='#A0A0A0'
						/>
					</svg>
					<p className='cursor-pointer flex-grow w-[133.33px] text-[13px] text-center text-[#a0a0a0]'>
						비밀번호 찾기
					</p>
					<svg
						width={2}
						height={24}
						viewBox='0 0 2 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='flex-grow-0 flex-shrink-0'
						preserveAspectRatio='none'>
						<line
							x1='1.16699'
							y1='2.18557e-8'
							x2='1.16699'
							y2={24}
							stroke='#A0A0A0'
						/>
					</svg>
					<p
						onClick={() => router.push('/signUp')}
						className='cursor-pointer flex-grow w-[133.33px] text-[13px] text-center text-[#a0a0a0]'>
						회원가입
					</p>
				</div>
			</div>
		</div>
	);
}
