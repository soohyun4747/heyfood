import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useEffect, useState } from 'react';
import { logout } from '@/utils/firebase';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';
import { BasicInfo } from '@/components/pages/profile/BasicInfo';
import { OrderInfo } from '@/components/pages/profile/OrderInfo';

function ProfilePage() {
	const user = useUserStore((state) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/login');
		}
	}, [user]);

	const [selectedIdx, setSelectIdx] = useState(0);

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch gap-10 md:gap-[60px] md:px-[120px] pt-[40px] md:pt-[100px] pb-[120px] md:pb-40 min-h-fit md:h-screen'>
				<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
					마이페이지
				</p>
				<div className='select-none flex md:flex-row flex-col justify-start items-start gap-8 self-stretch md:self-auto'>
					<div className='flex md:flex-col justify-start items-start md:w-[276px] gap-4 md:gap-6 md:bg-white px-[20px] md:px-0'>
						{['나의 기본정보', '주문내역'].map((value, idx) => (
							<div
								key={idx}
								onClick={() => setSelectIdx(idx)}
								style={{
									color:
										selectedIdx === idx
											? '#f2ab27'
											: '#0f0e0e',
									borderColor:
										selectedIdx === idx
											? '#f2ab27'
											: '#0f0e0e',
									borderBottomWidth:
										selectedIdx === idx ? 1 : 0,
								}}
								className='flex justify-center items-center relative gap-2 hover:cursor-pointer'>
								<p className='md:text-2xl font-bold text-left'>
									{value}
								</p>
							</div>
						))}
					</div>
					{selectedIdx === 0 ? <BasicInfo /> : <OrderInfo />}
				</div>
				{selectedIdx === 0 ? (
					<div
						onClick={logout}
						className='hover:cursor-pointer flex justify-center items-center relative gap-2 px-6 py-3 rounded-lg'>
						<p className='select-none md:text-xl font-medium text-left text-[#909090] underline underline-offset-4'>
							로그아웃
						</p>
					</div>
				) : undefined}
			</div>
		</Common>
	);
}

export default ProfilePage;
