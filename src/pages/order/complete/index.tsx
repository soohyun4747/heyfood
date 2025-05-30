import { ButtonRect } from '@/components/ButtonRect';
import {
	IOrder,
	IOrderItem,
	IOrderStatus,
} from '@/components/pages/profile/OrderInfo';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { IItemsBundle, useCartStore } from '@/stores/cartStore';
import { useItemsStore } from '@/stores/itemsStore';
import {
	useOrderCommentStore,
	useOrderCompanyNameStore,
	useOrderEmailStore,
	useOrderOtherPhoneStore,
	useOrderStickerFileStore,
	useOrderStickerPhraseStore,
} from '@/stores/orderInfoStore';
import { IUser, UserType, useUserStore } from '@/stores/userStore';
import {
	addData,
	addMultipleDatas,
	fetchDataWithDocId,
} from '@/utils/firebase';
import { convertDateStrToTimestamp } from '@/utils/time';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
	tid: string;
	status: IOrderStatus;
}

function OrderCompletePage() {
	const [isSuccess, setIsSuccess] = useState(true);
	const [vbankInfo, setVbankInfo] = useState<OrderQuery>();

	const router = useRouter();
	const { user, setUser } = useUserStore();

	const { comment, setComment } = useOrderCommentStore();
	const { companyName, setCompanyName } = useOrderCompanyNameStore();
	const { stickerPhrase, setStickerPhrase } = useOrderStickerPhraseStore();
	const { isFile, setIsFile } = useOrderStickerFileStore();
	const { email, setEmail } = useOrderEmailStore();
	const { otherPhone, setOtherPhone } = useOrderOtherPhoneStore();
	const { cart, setCart } = useCartStore();
	const onResetItems = useItemsStore((state) => state.onResetItems);

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
		if (router.query.resultCode && user && cart.length > 0) {
			const query = router.query as any;

			//승인요청 성공
			if (query.resultCode === '0000') {
				setIsSuccess(true);
				setVbankInfo(query);
				updateAndResetOrder(query, user, cart);
			} else {
				setIsSuccess(false);
			}
		}
	}, [router.query, user, cart]);

	const updateAndResetOrder = async (
		orderQ: OrderQuery,
		user: IUser,
		cart: IItemsBundle[]
	) => {
		const succeed = await addOrderDataToDB(orderQ, user, cart);
		if (succeed) {
			resetCartItems();
			resetOrderInfo();
		} else {
			alert('주문을 실패하였습니다.');
		}
	};
	
	console.log(user);
	

	const goToOrderHistory = () => {
		if (user?.userType === UserType.user) {
			router.push('/profile');
		} else {
			router.push('/guestProfile');
		}
	};

	const addOrderDataToDB = async (
		orderQ: OrderQuery,
		user: IUser,
		cart: IItemsBundle[]
	): Promise<boolean> => {
		try {
			const orderData: IOrder = {
				id: orderQ.orderId,
				email,
				otherPhone,
				ordererId: user.id,
				ordererType: user.userType,
				stickerFile: isFile,
				stickerPhrase,
				companyName,
				comment,
				orderStatus: orderQ.status,
				vbankName: orderQ.vbankName,
				vbankNumber: orderQ.vbankNumber,
				vbankHolder: orderQ.vbankHolder,
				vbankExpDate: orderQ.vbankExpDate,
				price: Number(orderQ.amount),
				paymentId: orderQ.tid,
				createdAt: Timestamp.now(),
				updatedAt: null,
			};

			const newOrderData = (await addData('orders', orderData)) as IOrder;
			if (!newOrderData) return false;

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

			const result = await addMultipleDatas('orderItems', orderItems);
			return !!result;
		} catch (err) {
			console.error('addOrderDataToDB error:', err);
			return false;
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
	};

	return (
		<Common meta={<Meta />}>
			{isSuccess ? (
				<div className='flex flex-col justify-center items-center self-stretch gap-3 md:gap-[24px] px-[20px] md:px-[120px] md:pt-[100px] md:pb-40 min-h-full'>
					<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
						<p className='text-xl md:text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
							주문 완료
						</p>
					</div>
					<div className='flex flex-col justify-start items-center gap-9 md:gap-[56px]'>
						<p className='text-2xl md:text-[32px] font-bold text-center text-[#0f0e0e]'>
							주문이 완료되었습니다!
						</p>
						{vbankInfo && (
							<div className='flex flex-col justify-start items-center relative gap-[12px]'>
								<p className='md:text-lg text-[#0f0e0e] font-bold'>
									주문번호: {vbankInfo?.orderId}
								</p>
								<p className='text-xs text-center text-[#0f0e0e] leading-[160%]'>
									아래 가상계좌로 입금해주시면 <br className='md:hidden'/>정상적으로
									결제처리가 완료됩니다.
								</p>
								<div className='bg-gray-100 p-[24px] flex flex-col gap-[12px]'>
									<p className='md:text-base text-sm text-[#0f0e0e] flex items-center gap-[10px]'>
										<span className='opacity-40 text-sm'>
											계좌정보:
										</span>{' '}
										{vbankInfo?.vbankName}{' '}
										{vbankInfo?.vbankNumber}
									</p>
									<p className='md:text-base text-sm text-[#0f0e0e] flex items-center gap-[10px]'>
										<span className='opacity-40 text-sm'>
											예금주:
										</span>{' '}
										{vbankInfo?.vbankHolder}
									</p>
									<p className='md:text-base text-sm text-[#0f0e0e] flex items-center gap-[10px]'>
										<span className='opacity-40 text-sm'>
											결제금액:
										</span>{' '}
										{Number(
											vbankInfo?.amount
										).toLocaleString()}
										원
									</p>
									<p className='md:text-base text-sm text-[#0f0e0e] flex items-center gap-[10px]'>
										<span className='opacity-40 text-sm'>
											입금기간:
										</span>{' '}
										{vbankInfo &&
											new Date(
												vbankInfo?.vbankExpDate
											).toLocaleString()}{' '}
										까지
									</p>
								</div>
							</div>
						)}
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
