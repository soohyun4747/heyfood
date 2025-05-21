import { ButtonRect } from '@/components/ButtonRect';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { UserType, useUserStore } from '@/stores/userStore';
import { updateData } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface OrderQuery {
	orderId: string;
	vbankName: string;
	vbankNumber: string;
	vbankExpDate: string;
	vbankHolder: string;
	amount: string;
}

function OrderCompletePage() {
	const [vbankInfo, setVbankInfo] = useState<OrderQuery>();

	const router = useRouter();
	const user = useUserStore((state) => state.user);

	const goToOrderHistory = () => {
		if (user?.userType === UserType.user) {
			router.push('/profile');
		} else {
			router.push('/guestProfile');
		}
	};

	useEffect(() => {
		const query = router.query as any;
		setVbankInfo(query);
		if (query.orderId) {
			updateData('orders', query.orderId, {
				vbank: {
					vbankName: query.vbankName,
					vbankNumber: query.vbankNumber,
					vbankExpDate: query.vbankExpDate,
					vbankHolder: query.vbankHolder,
				},
			});
		}
	}, [router.query]);

	return (
		<Common meta={<Meta />}>
			{vbankInfo ? (
				<div className='flex flex-col justify-center items-center self-stretch gap-[24px] px-[120px] pt-[100px] pb-40 min-h-full'>
					<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
						<p className='text-[50px] font-bold text-center text-[#0f0e0e]'>
							주문 완료
						</p>
					</div>
					<div className='flex flex-col justify-start items-center gap-[56px]'>
						<p className='text-[32px] font-bold text-center text-[#0f0e0e]'>
							주문이 완료되었습니다!
						</p>
						<div className='flex flex-col justify-start items-center relative gap-[12px]'>
							<p className='text-lg text-[#0f0e0e] font-bold'>
								주문번호: {vbankInfo.orderId}
							</p>
							<p className='text-xs text-left text-[#0f0e0e]'>
								아래 가상계좌로 입금해주시면 정상적으로
								결제처리가 완료됩니다.
							</p>
							<div className='bg-gray-100 p-[24px] flex flex-col gap-[12px]'>
								<p className='text-[#0f0e0e] flex items-center gap-[10px]'>
									<span className='opacity-40 text-sm'>
										계좌정보:
									</span>{' '}
									{vbankInfo.vbankName}{' '}
									{vbankInfo.vbankNumber}
								</p>
								<p className='text-[#0f0e0e] flex items-center gap-[10px]'>
									<span className='opacity-40 text-sm'>
										예금주:
									</span>{' '}
									{vbankInfo.vbankHolder}
								</p>
								<p className='text-[#0f0e0e] flex items-center gap-[10px]'>
									<span className='opacity-40 text-sm'>
										결제금액:
									</span>{' '}
									{Number(vbankInfo.amount).toLocaleString()}
									원
								</p>
								<p className='text-[#0f0e0e] flex items-center gap-[10px]'>
									<span className='opacity-40 text-sm'>
										입금기간:
									</span>{' '}
									{new Date(
										vbankInfo.vbankExpDate
									).toLocaleString()}{' '}
									까지
								</p>
							</div>
						</div>
						<ButtonRect
							value={'주문내역 확인하기'}
							style={{ width: 211, alignSelf: 'center' }}
							onClick={goToOrderHistory}
						/>
					</div>
				</div>
			) : (
				<div className='flex flex-col justify-center items-center self-stretch gap-[60px] px-[120px] pt-[100px] pb-40 min-h-full'>
					<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
						<p className='text-[50px] font-bold text-center text-[#0f0e0e]'>
							주문 오류
						</p>
					</div>
					<div className='flex flex-col justify-start items-center gap-10'>
						<div className='flex flex-col justify-start items-center relative gap-6'>
							<p className='text-[32px] font-bold text-center text-[#0f0e0e]'>
								주문을 실패하였습니다
							</p>
						</div>
						<ButtonRect
							value={'주문내역 확인하기'}
							style={{ width: 211, alignSelf: 'center' }}
							onClick={goToOrderHistory}
						/>
					</div>
				</div>
			)}
		</Common>
	);
}

export default OrderCompletePage;
