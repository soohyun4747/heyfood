import { ButtonRect } from '@/components/ButtonRect';
import {
	bankHolder,
	bankName,
	bankNumber,
	IOrder,
	IOrderItem,
	IOrderStatus,
	OrderStatus,
	PaymentMethod,
} from '@/components/pages/profile/OrderInfo';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { IItemsBundle, useCartStore } from '@/stores/cartStore';
import { useItemsStore } from '@/stores/itemsStore';
import {
	useOrderCommentStore,
	useOrderCompanyNameStore,
	useOrderDeliveryPriceStore,
	useOrderEmailStore,
	useOrderHeatingStore,
	useOrderIdStore,
	useOrderOtherPhoneStore,
	useOrderPaymentMethodStore,
	useOrderPriceStore,
	useOrderStickerFileStore,
	useOrderStickerPhraseStore,
	useOrderStickerPriceStore,
} from '@/stores/orderInfoStore';
import { useProfileTabIdxStore } from '@/stores/profileTabIdxStore';
import { IUser, UserType, useUserStore } from '@/stores/userStore';
import { cleanObject } from '@/utils/object';
import {
	addData,
	addMultipleDatas,
	fetchDataWithDocId,
} from '@/utils/firebase';
import { getCompositionString } from '@/utils/string';
import { convertDateStrToTimestamp } from '@/utils/time';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

interface OrderQuery {
	resultCode: string;
	orderId: string;
	vbankName: string;
	vbankNumber: string;
	vbankExpDate: string;
	vbankHolder: string;
	amount: string;
	tid: string;
	status: IOrderStatus;
}

function OrderCompletePage() {
	const [isSuccess, setIsSuccess] = useState(true);
	// const [vbankInfo, setVbankInfo] = useState<OrderQuery>();

	const router = useRouter();
	const { user, setUser } = useUserStore();
	const setTabIdx = useProfileTabIdxStore((state) => state.setTabIdx);

	const { comment, setComment } = useOrderCommentStore();
	const { companyName, setCompanyName } = useOrderCompanyNameStore();
	const { stickerPhrase, setStickerPhrase } = useOrderStickerPhraseStore();
	const { isFile, setIsFile } = useOrderStickerFileStore();
	const { email, setEmail } = useOrderEmailStore();
	const { otherPhone, setOtherPhone } = useOrderOtherPhoneStore();
	const { heating, setHeating } = useOrderHeatingStore();
	const { cart, setCart } = useCartStore();
	const { paymentMethod, setPaymentMethod } = useOrderPaymentMethodStore();
	const { orderId, setOrderId } = useOrderIdStore();
	const { orderPrice, setOrderPrice } = useOrderPriceStore();
	const { deliveryPrice, setDeliveryPrice } = useOrderDeliveryPriceStore();
	const { stickerPrice, setStickerPrice } = useOrderStickerPriceStore();

	const onResetItems = useItemsStore((state) => state.onResetItems);

	useEffect(() => {
		return () => resetCartOrderData();
	}, []);

	//guest에 대해서만 complete 페이지에서 (users는 _app.tsx에서 디폴트로 실행)
	useEffect(() => {
		const auth = getAuth();
		// Auth 상태가 바뀔 때(토큰 복원 포함)마다 호출됩니다.
		onAuthStateChanged(auth, async (fbUser) => {
			if (fbUser) {
				// Firestore에서 추가 사용자 정보 가져오기
				const userData = (await fetchDataWithDocId(
					'guests',
					fbUser.uid
				)) as IUser | undefined;
				if (userData) {
					setUser({ ...userData, userType: UserType.guest });
				}
			} else {
				// 로그아웃 상태가 됐다면 스토어도 초기화
				setUser(undefined);
			}
		});
	}, [setUser]);

	useEffect(() => {
		if (user && cart.length > 0) {
			// if (paymentMethod === PaymentMethod.offline) {
			// 	setIsSuccess(true);
			// 	updateOrderData(undefined, user, cart);
			// } else {
			// 	if (router.query.resultCode) {
			// 		const query = router.query as any;

			// 		//승인요청 성공
			// 		if (query.resultCode === '0000') {
			// 			setIsSuccess(true);
			// 			setVbankInfo(query);
			// 			updateOrderData(query, user, cart);
			// 		} else {
			// 			setIsSuccess(false);
			// 		}
			// 	}
			// }
			setIsSuccess(true);
			updateOrderData(undefined, user, cart);
		}
	}, [router.query, user, cart]);

	const updateOrderData = async (
		orderQ: OrderQuery | undefined,
		user: IUser,
		cart: IItemsBundle[]
	) => {
		const succeed = await addOrderDataToDB(orderQ, user, cart);
		if (!succeed) {
			alert('주문을 실패하였습니다.');
		}
	};

	const resetCartOrderData = () => {
		resetCartItems();
		resetOrderInfo();
	};

	const goToOrderHistory = () => {
		if (user?.userType === UserType.user) {
			setTabIdx(0);
			router.push('/profile');
		} else {
			router.push('/guestProfile');
		}
	};

	const addOrderDataToDB = async (
		orderQ: OrderQuery | undefined,
		user: IUser,
		cart: IItemsBundle[]
	): Promise<boolean> => {
		try {
			const orderData: IOrder = cleanObject({
				id: orderId,
				email,
				otherPhone,
				ordererId: user.id,
				ordererName: user.name,
				ordererType: user.userType,
				stickerFile: isFile,
				stickerPhrase,
				companyName,
				comment,
				heating,
				orderStatus: OrderStatus.complete,
				//orderStatus: orderQ ? orderQ.status : OrderStatus.complete, //현장결제의 경우 바로 "주문완료"
				// vbankName: orderQ?.vbankName,
				// vbankNumber: orderQ?.vbankNumber,
				// vbankHolder: orderQ?.vbankHolder,
				// vbankExpDate: orderQ?.vbankExpDate,
				deliveryPrice,
				stickerPrice,
				price: orderPrice,
				// paymentId: orderQ?.tid,
				paymentMethod,
				createdAt: Timestamp.now(),
				updatedAt: null,
			}) as IOrder;

			const newOrderData = (await addData('orders', orderData)) as IOrder;
			if (!newOrderData) return false;

			const orderItems: Omit<IOrderItem, 'id'>[] = [];

			cart.forEach((data) => {
				data.items.forEach((item) => {
					orderItems.push({
						orderId: newOrderData.id,
						ordererName: user.name,
						categoryId: item.menu.categoryId,
						menuName: item.menu.composition
							? `${item.menu.name} ${getCompositionString(
									item.menu
							  )}`
							: item.menu.name,
						menuPrice: item.menu.price,
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

			const result = await addMultipleDatas('orderItems', orderItems);
			sendEmailtoHey(
				user.name,
				orderItems,
				stickerPrice,
				deliveryPrice,
				orderPrice
			);
			return !!result;
		} catch (err) {
			console.error('addOrderDataToDB error:', err);
			return false;
		}
	};

	const sendEmailtoHey = async (
		ordererName: string,
		orderItems: Omit<IOrderItem, 'id'>[],
		stickerPrice: number,
		deliveryPrice: number,
		totalPrice: number
	) => {
		const dateFixedOrderItems: any[] = JSON.parse(
			JSON.stringify(orderItems)
		);

		dateFixedOrderItems.forEach((item, i) => {
			item.deliveryDate = orderItems[i].deliveryDate.toDate().toLocaleString();
		});

		const templateParams = {
			ordererName,
			orderItems: dateFixedOrderItems,
			stickerPrice,
			deliveryPrice,
			totalPrice,
		};

		try {
			// EmailJS 서비스 호출
			// 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY'를 EmailJS 콘솔에서 발급받은 값으로 대체해야 합니다.
			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2 ?? '',
				templateParams,
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
			);
			console.log('이메일 전송 성공');
			// 전송 성공 후 상태 초기화 또는 다른 처리를 할 수 있습니다.
		} catch (error) {
			console.error('이메일 전송 실패:', error);
		}
	};

	const resetCartItems = () => {
		setCart([]);
		onResetItems();
	};

	const resetOrderInfo = () => {
		setComment('');
		setCompanyName('');
		setIsFile(false);
		setStickerPhrase('');
		setEmail('');
		setOtherPhone('');
		setHeating(undefined);
		setPaymentMethod(PaymentMethod.card);
		setOrderId('');
		setOrderPrice(0);
		setDeliveryPrice(0);
		setStickerPrice(0);
	};

	return (
		<Common meta={<Meta />}>
			{isSuccess ? (
				<div className='flex flex-col justify-center items-center self-stretch gap-3 md:gap-[24px] px-[20px] md:px-[120px] md:pt-[100px] md:pb-40 md:min-h-full min-h-[calc(100vh-70.4px)]'>
					<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
						<p className='text-xl md:text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
							주문 완료
						</p>
					</div>
					<div className='flex flex-col justify-start items-center gap-9 md:gap-[56px]'>
						<p className='text-2xl md:text-[32px] font-bold text-center text-[#0f0e0e]'>
							주문이 완료되었습니다!
						</p>
						<div className='flex flex-col justify-start items-center relative gap-[12px]'>
							<p className='md:text-lg text-[#0f0e0e] font-bold'>
								주문번호: {orderId}
							</p>
							{paymentMethod === PaymentMethod.transfer ? (
								<p className='text-sm text-center text-[#0f0e0e] leading-[160%]'>
									아래 계좌로 입금해주시면{' '}
									<br className='md:hidden' />
									정상적으로 결제처리가 완료됩니다.
								</p>
							) : (
								<p className='text-sm text-center text-[#0f0e0e] leading-[160%]'>
									카드로 결제 가능한 링크를 이메일/문자로
									보내드립니다.
								</p>
							)}
							<div className='bg-gray-100 p-[24px] flex flex-col gap-[12px] min-w-[260px] min-h-[100px]'>
								<p className='md:text-base text-sm text-[#0f0e0e] flex items-center gap-[10px]'>
									<span className='opacity-40 text-sm'>
										결제방법:
									</span>{' '}
									{paymentMethod === PaymentMethod.transfer
										? '계좌이체'
										: '카드결제'}
								</p>
								{paymentMethod === PaymentMethod.transfer && (
									<p className='md:text-base text-sm text-[#0f0e0e] flex items-center gap-[10px]'>
										<span className='opacity-40 text-sm'>
											계좌정보:
										</span>{' '}
										{bankName} {bankNumber}
									</p>
								)}
								{paymentMethod === PaymentMethod.transfer && (
									<p className='md:text-base text-sm text-[#0f0e0e] flex items-center gap-[10px]'>
										<span className='opacity-40 text-sm'>
											예금주:
										</span>{' '}
										{bankHolder}
									</p>
								)}
								<p className='md:text-base text-sm text-[#0f0e0e] flex items-center gap-[10px]'>
									<span className='opacity-40 text-sm'>
										결제금액:
									</span>{' '}
									{orderPrice.toLocaleString()}원
								</p>
								{/* {paymentMethod === PaymentMethod.bank && (
									<p className='md:text-base text-sm text-[#0f0e0e] flex items-center gap-[10px]'>
										<span className='opacity-40 text-sm'>
											입금기한:
										</span>{' '}
										{vbankInfo &&
											new Date(
												vbankInfo?.vbankExpDate
											).toLocaleString()}{' '}
										까지
									</p>
								)} */}
							</div>
							{paymentMethod === PaymentMethod.transfer && (
								<p className='text-sm text-center leading-[160%] text-blue-500'>
									24시간 이내로 입금 부탁드립니다.
								</p>
							)}
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
