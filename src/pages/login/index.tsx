import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { UserLogin } from './UserLogin';
import { useEffect, useState } from 'react';
import { GuestLogin } from './GuestLogin';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';

function LoginPage() {
	const [selectedIdx, setSelectedIdx] = useState(0);
	const user = useUserStore((state) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push('/');
		}
	}, [user]);

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch  gap-[60px] px-[120px] pt-[100px] pb-40 bg-[#fffbea]'>
				<div
					className='flex flex-col justify-center items-center  w-[648px] gap-6 px-[100px] py-[80px] rounded-3xl bg-white'
					style={{ boxShadow: '0px 4px 20px 0 rgba(0,0,0,0.1)' }}>
					<div className='flex justify-start items-start self-stretch  border-t-0 border-r-0 border-b border-l-0 border-[#d9d9d9]'>
						{['회원 로그인', '비회원 주문하기'].map((value, i) => (
							<div
								key={i}
								onClick={() => setSelectedIdx(i)}
								style={{
									fontWeight: i === selectedIdx ? 700 : 400,
									borderBottom:
										i === selectedIdx
											? '2px solid #ffcd70'
											: 'none',
								}}
								className='hover:cursor-pointer flex justify-center items-center flex-grow relative gap-12 py-4 border-b-2 border-l-0 border-[#ffcd70]'>
								<p className=' text-xl text-center text-[#0f0e0e]'>
									{value}
								</p>
							</div>
						))}
					</div>
					{selectedIdx === 0 ? <UserLogin /> : <GuestLogin />}
				</div>
			</div>
		</Common>
	);
}

export default LoginPage;
