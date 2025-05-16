import { ButtonRect } from '@/components/ButtonRect';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { UserType, useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';

function OrderCompletePage() {
	const router = useRouter();
	const user = useUserStore((state) => state.user);

	const goToOrderHistory = () => {
		if (user?.userType === UserType.user) {
			router.push('/profile');
		} else {
			router.push('/guestProfile');
		}
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-center items-center self-stretch gap-[60px] px-[120px] pt-[100px] pb-40 min-h-full'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
					<p className='text-[50px] font-bold text-center text-[#0f0e0e]'>
						주문 완료
					</p>
				</div>
				<div className='flex flex-col justify-start items-center gap-10'>
					<div className='flex flex-col justify-start items-center relative gap-6'>
						<p className='text-[32px] font-bold text-center text-[#0f0e0e]'>
							주문이 완료되었습니다!
						</p>
						<p className='text-xl text-left text-[#0f0e0e]'>
							주문내역을 확인하러 가시겠습니까?
						</p>
					</div>
					<ButtonRect
						value={'주문내역 확인하기'}
						style={{ width: 211, alignSelf: 'center' }}
						onClick={goToOrderHistory}
					/>
				</div>
			</div>
		</Common>
	);
}

export default OrderCompletePage;
