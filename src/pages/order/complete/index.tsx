import { ButtonRect } from '@/components/ButtonRect';
import {
	IOrder,
	IOrderItem,
	OrderStatus,
} from '@/components/pages/profile/OrderInfo';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useCartStore } from '@/stores/cartStore';
import { useItemsStore } from '@/stores/itemsStore';
import {
	useOrderCommentStore,
	useOrderCompanyNameStore,
	useOrderEmailStore,
	useOrderOtherPhoneStore,
	useOrderStickerFileStore,
	useOrderStickerPhraseStore,
} from '@/stores/orderInfoStore';
import { UserType, useUserStore } from '@/stores/userStore';
import {
	addData,
	addMultipleDatas,
	updateData,
	uploadFileData,
} from '@/utils/firebase';
import { convertDateStrToTimestamp } from '@/utils/time';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface OrderQuery {
	resultCode: string;
	orderId: string;
	vbankName: string;
	vbankNumber: string;
	vbankExpDate: string;
	vbankHolder: string;
	amount: string;
}

function OrderCompletePage() {
	const [isSuccess, setIsSuccess] = useState(true);
	const [vbankInfo, setVbankInfo] = useState<OrderQuery>();

	const router = useRouter();
	const user = useUserStore((state) => state.user);

	const comment = useOrderCommentStore((state) => state.comment);
	const companyName = useOrderCompanyNameStore((state) => state.companyName);
	const stickerPhrase = useOrderStickerPhraseStore(
		(state) => state.stickerPhrase
	);
	const file = useOrderStickerFileStore((state) => state.file);
	const email = useOrderEmailStore((state) => state.email);
	const otherPhone = useOrderOtherPhoneStore((state) => state.otherPhone);
	const { cart, setCart } = useCartStore();
	const onResetItems = useItemsStore((state) => state.onResetItems);

	useEffect(() => {
		const query = router.query as any;
		//승인요청 성공
		if (query.resultCode === '0000') {
			setVbankInfo(query);
			updateAndResetOrder(query.orderId);
		} else {
			setIsSuccess(false);
		}
	}, [router.query]);

	const updateAndResetOrder = async (orderQ: OrderQuery) => {
		const succeed = await addOrderDataToDB(orderQ);
		if (succeed) {
			await updateUserAddress();
			resetCartItems();
		} else {
			alert('주문을 실패하였습니다.');
		}
	};

	const goToOrderHistory = () => {
		if (user?.userType === UserType.user) {
			router.push('/profile');
		} else {
			router.push('/guestProfile');
		}
	};

	const addOrderDataToDB = async (orderQ: OrderQuery) => {
		if (user) {
			const orderData: IOrder = {
				id: orderQ.orderId,
				email: email,
				otherPhone: otherPhone,
				ordererId: user.id,
				ordererType: user.userType,
				sticker: file ? true : false,
				stickerPhrase: stickerPhrase,
				companyName: companyName,
				comment: comment,
				orderStatus: OrderStatus.waitingPayment,
				vbank: {
					vbankName: orderQ.vbankName,
					vbankNumber: orderQ.vbankNumber,
					vbankHolder: orderQ.vbankHolder,
					vbankExpDate: orderQ.vbankExpDate,
				},
				createdAt: Timestamp.now(),
				updatedAt: null,
			};
			const newOrderData = (await addData('orders', orderData)) as IOrder;

			if (newOrderData) {
				if (file) {
					await uploadFileData(file, `stickers/${newOrderData.id}`);
				}
				const orderItems: Omit<IOrderItem, 'id'>[] = [];
				cart.forEach((data) => {
					data.items.forEach((item) => {
						orderItems.push({
							orderId: newOrderData.id,
							ordererName: user.name,
							categoryId: item.menu.categoryId,
							menuId: item.menu.id,
							quantity: item.count,
							deliveryDate: convertDateStrToTimestamp(
								data.dateTime.toString()
							),
							address: data.address,
							addressDetail: data.addressDetail,
							createdAt: Timestamp.now(),
						});
					});
				});
				return await addMultipleDatas('orderItems', orderItems);
			}
		}
	};

	const updateUserAddress = async () => {
		if (user) {
			if (user.userType === UserType.user) {
				await updateData('users', user.id, {
					address: user.address,
					addressDetail: user.addressDetail,
				});
			} else {
				await updateData('guests', user.id, {
					address: user.address,
					addressDetail: user.addressDetail,
				});
			}
		}
	};

	const resetCartItems = () => {
		setCart([]);
		onResetItems();
	};

	return (
		<Common meta={<Meta />}>
			{isSuccess && vbankInfo ? (
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
								죄송합니다. 주문을 실패하였습니다
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
