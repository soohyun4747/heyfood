import { ButtonRect } from '@/components/ButtonRect';
import { VerticalLine } from '@/components/VerticalLine';
import { db } from '@/configs/firebaseConfig';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { IUser } from '@/stores/userStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();

function FindPasswordPage() {
	const [email, setEmail] = useState<string>('');
	const [emailSent, setEmailSent] = useState(false);
	const router = useRouter();

	const onClickConfirm = async () => {
		const users = await findUserByEmail(email);

		if (users[0]) {
			sendPasswordResetEmail(auth, email)
				.then(() => {
					console.log('비밀번호 재설정 이메일을 보냈습니다.');
					setEmailSent(true);
				})
				.catch((error) => {
					console.error('에러 발생:', error.message);
					alert('이메일 발송을 실패하였습니다.');
				});
		} else {
			alert('회원가입 되지 않은 이메일입니다.');
		}
	};

	async function findUserByEmail(email: string) {
		const usersRef = collection(db, 'users');
		const q = query(usersRef, where('email', '==', email));

		const querySnapshot = await getDocs(q);
		const users = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as IUser[];
		return users; // This will be an array of matched users
	}

	return (
		<Common meta={<Meta />}>
			<div
				className='flex flex-col justify-center items-center self-stretch  gap-[60px] px-[20px] md:px-[120px] pt-[40px] md:pt-[100px] pb-[120px] md:pb-40 md:min-h-[calc(100vh-112px)] min-h-[calc(100vh-70.4px)]'>
				<div className='flex flex-col justify-start items-center self-stretch  relative gap-2'>
					<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
						비밀번호 찾기
					</p>
				</div>
				{emailSent ? (
					<div className='flex flex-col justify-start items-center gap-[60px] md:p-20'>
						<p className='text-center'>회원님의 이메일로 <br className='md:hidden'/>임시 비밀번호가 전송되었습니다.</p>
						<ButtonRect
							style={{ width: 211, alignSelf: 'center' }}
							value='로그인하러 가기'
							onClick={() => router.push('/login')}
						/>
					</div>
				) : (
					<div className='flex flex-col justify-start items-center gap-8 md:gap-[60px] md:p-20 bg-white'>
						<div className='flex flex-col md:flex-row justify-start items-start relative gap-4 md:gap-12 border border-black/10 p-[24px]'>
							<p className='min-w-[110px] text-sm md:text-lg text-left text-[#0f0e0e]'>
								이메일
							</p>
							<VerticalLine className='md:block hidden' />
							<input
								className='flex-1 text-[13px] md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0 md:w-[300px] w-[240px]'
								placeholder='이메일 입력'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<ButtonRect
							style={{ width: 211, alignSelf: 'center' }}
							value='비밀번호 찾기'
							disabled={email ? false : true}
							onClick={onClickConfirm}
						/>
					</div>
				)}
			</div>
		</Common>
	);
}

export default FindPasswordPage;
