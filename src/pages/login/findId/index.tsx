import { ButtonRect } from '@/components/ButtonRect';
import { VerticalLine } from '@/components/VerticalLine';
import { db } from '@/configs/firebaseConfig';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { IUser } from '@/stores/userStore';
import { extractNumbers } from '@/utils/string';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';

function FindIdPage() {
	const [phone, setPhone] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>();
	const router = useRouter();

	const onClickConfirm = async () => {
		const users = await findUserByPhoneAndName(phone, name);

		if (users[0]) {
			setEmail(users[0].email);
		} else {
			alert('입력하신 정보랑 일치하는 회원이 없습니다.');
		}
	};

	async function findUserByPhoneAndName(phone: string, name: string) {
		const phoneNumber = extractNumbers(phone);

		const usersRef = collection(db, 'users');
		const q = query(
			usersRef,
			where('phone', '==', phoneNumber),
			where('name', '==', name)
		);

		const querySnapshot = await getDocs(q);
		const users = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as IUser[];
		return users; // This will be an array of matched users
	}

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-center items-center self-stretch gap-[60px]  px-[20px] md:px-[120px] pt-[40px] md:pt-[100px] pb-[120px] md:pb-40 md:min-h-[calc(100vh-112px)] min-h-[calc(100vh-70.4px)]'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
					<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
						이메일 찾기
					</p>
				</div>
				{email ? (
					<div className='flex flex-col justify-start items-center gap-[60px] md:p-20'>
						<div className='flex flex-col gap-[24px] items-center'>
							<p className='text-sm'>
								회원님의 정보와 일치하는 이메일입니다.
							</p>
							<div className='flex flex-col justify-start items-start self-stretch  relative gap-6 border border-gray-100 p-[24px]'>
								<div className='md:text-base text-sm flex items-center gap-[24px]'>
									<p className='opacity-40'>이메일</p>
									<p>{email}</p>
								</div>
							</div>
						</div>
						<ButtonRect
							style={{ width: 211, alignSelf: 'center' }}
							value='로그인하러 가기'
							onClick={() => router.push('/login')}
						/>
					</div>
				) : (
					<div className='flex flex-col justify-start items-center gap-[60px] md:p-20 self-stretch md:self-auto'>
						<div className='flex flex-col justify-start items-start self-stretch  relative gap-6 border border-black/10 p-[24px]'>
							<div className='flex justify-start items-center  relative md:gap-12 flex-1 gap-4'>
								<p className='md:min-w-[110px] w-[78px] text-sm md:text-lg text-left text-[#0f0e0e]'>
									이름
								</p>
								<VerticalLine />
								<input
									className='flex-1 text-[13px] md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
									placeholder='이름 입력'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className='flex justify-start items-center  relative md:gap-12 flex-1 gap-4'>
								<p className='md:min-w-[110px] w-[78px] text-sm md:text-lg text-left text-[#0f0e0e]'>
									휴대폰 번호
								</p>
								<VerticalLine />
								<input
									className='flex-1 text-[13px] md:text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
									placeholder='휴대폰 번호 입력'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
						</div>
						<ButtonRect
							style={{ width: 211, alignSelf: 'center' }}
							value='이메일 찾기'
							disabled={phone && name ? false : true}
							onClick={onClickConfirm}
						/>
					</div>
				)}
			</div>
		</Common>
	);
}

export default FindIdPage;
