import { OrderInfo } from '@/components/pages/profile/OrderInfo';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function GuestProfilePage() {
	const user = useUserStore((state) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/login');
		}
	}, [user]);

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch gap-10 md:gap-[60px] px-[20px] md:px-[120px] pt-[40px] md:pt-[100px] pb-[120px] md:pb-40 min-h-fit h-screen'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
					<p className='text-2xl md:text-[50px] font-bold text-center text-[#0f0e0e]'>
						{user?.name}<span className='text-xl md:text-[36px] font-semibold'>님 ({user?.phone})</span> 
					</p>
				</div>
				<div className='select-none flex justify-start items-start gap-8'>
					<div className='hidden md:flex flex-col justify-start items-start w-[276px] gap-6'>
						{['주문내역'].map((value, idx) => (
							<div
								key={idx}
								style={{
									color: '#f2ab27',
								}}
								className='flex justify-center items-center relative gap-2 hover:cursor-pointer'>
								<p className='text-2xl font-bold text-left'>
									{value}
								</p>
							</div>
						))}
					</div>
					<OrderInfo />
				</div>
			</div>
		</Common>
	);
}

export default GuestProfilePage;
