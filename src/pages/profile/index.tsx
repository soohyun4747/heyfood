import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import ProfileBasicInfoPage from './basicInfo';
import { useEffect, useState } from 'react';
import { logout } from '@/utils/firebase';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';
import OrderInfoPage from './orderInfo';

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
			<div className='flex flex-col justify-start items-center self-stretch gap-[60px] px-[120px] pt-[100px] pb-40 min-h-fit h-screen'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
					<p className='text-[50px] font-bold text-center text-[#0f0e0e]'>
						마이페이지
					</p>
				</div>
				<div className='select-none flex justify-start items-start gap-8'>
					<div className='flex flex-col justify-start items-start w-[276px] gap-6'>
						{['나의 기본정보', '주문내역'].map((value, idx) => (
							<div
								onClick={() => setSelectIdx(idx)}
								style={{
									color:
										selectedIdx === idx
											? '#f2ab27'
											: '#0f0e0e',
								}}
								className='flex justify-center items-center relative gap-2 hover:cursor-pointer'>
								<p className='text-2xl font-bold text-left'>
									{value}
								</p>
							</div>
						))}
					</div>
					{selectedIdx === 0 ? (
						<ProfileBasicInfoPage />
					) : (
						<OrderInfoPage />
					)}
				</div>
				{selectedIdx === 0 ? (
					<div
						onClick={logout}
						className='hover:cursor-pointer flex justify-center items-center relative gap-2 px-6 py-3 rounded-lg'>
						<p className='select-none text-xl font-medium text-left text-[#909090]'>
							로그아웃
						</p>
					</div>
				) : undefined}
			</div>
		</Common>
	);
}

export default ProfilePage;
