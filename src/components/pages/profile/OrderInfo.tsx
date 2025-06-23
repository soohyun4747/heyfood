import { ButtonSmall } from '@/components/ButtonSmall';
import { Dropdown } from '@/components/Dropdown';
import { IMenu } from '@/components/LandingMenusTab';
import { ModalCenter } from '@/components/ModalCenter';
import { DateTimeDrawer } from '@/components/pages/order/DateTimeDrawer';
import { PaymentStatus } from '@/components/PaymentStatus';
import { TextField } from '@/components/TextField';
import { ChevronDown } from '@/icons/ChevronDown';
import { Vbank } from '@/pages/api/nicepay/approve';
import { IUser, IUserType, useUserStore } from '@/stores/userStore';
import {
	fetchCollectionData,
	fetchCollectionDataWithConstraints,
	fetchCollectionTableDataWithConstraints,
	getDataCount,
	updateData,
	updateMultipleDatas,
} from '@/utils/firebase';
import { bankOptions } from '@/utils/payment';
import {
	convertDateStrToTimestamp,
	formatTimestampWithMinutes,
	isMoreThanOneDayLeft,
	isMoreThanTwoDaysLeft,
} from '@/utils/time';
import {
	DocumentData,
	orderBy,
	QueryDocumentSnapshot,
	Timestamp,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const eachFetchOrders = 5;

export const orderStatusLabels = {
	paid: '결제완료',
	ready: '결제확인중',
	failed: '결제실패',
	cancelled: '주문취소',
	expired: '결제기한만료',
};

export const OrderStatus = {
	paid: 'paid',
	ready: 'ready',
	failed: 'failed',
	cancelled: 'cancelled',
	expired: 'expired',
} as const;

export type IOrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface IOrder extends Omit<Vbank, 'vbankCode'> {
	id: string;
	ordererId: string;
	ordererType: IUserType;
	orderStatus: IOrderStatus;
	comment?: string;
	stickerFile: boolean;
	stickerPhrase?: string;
	companyName: string;
	email: string;
	otherPhone?: string;
	price: number;
	paymentId: string;
	createdAt: Timestamp;
	updatedAt: Timestamp | null;
}

export interface IOrderItem {
	id: string;
	orderId: string;
	ordererName: string;
	categoryId: string;
	menuId: string;
	quantity: number;
	deliveryDate: Timestamp;
	address: string;
	addressDetail: string;
	createdAt: Timestamp;
	updatedAt?: Timestamp;
}

interface IOrdersWithItems {
	orderData: IOrder;
	orderItemsWithDeliveryDate: IDeliveryDateOrderItems[];
}

interface IDeliveryDateOrderItems {
	date: Timestamp;
	items: IOrderItem[];
}

const dropdownDomId = uuidv4();

export function OrderInfo() {
	const [menus, setMenus] = useState<IMenu[]>([]);
	const [startAfterDoc, setStartAfterDoc] =
		useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();
	const [ordersWithItems, setOrdersWithItems] = useState<IOrdersWithItems[]>(
		[]
	);
	const [dateTimeDrawerOpen, setDateTimeDrawerOpen] = useState(false);
	const [dateTime, setDateTime] = useState<Date>();
	const [selectedItemsWithDate, setSelectedItemsWithDate] =
		useState<IDeliveryDateOrderItems>();
	const [selectedOrderData, setSelectedOrderData] =
		useState<IOrdersWithItems>();
	const [orderCancelModal, setOrderCancelModal] = useState(false);
	const [isMoreDisabled, setIsMoreDisabled] = useState(false);
	const [wholeDataCnt, setWholeDataCnt] = useState(0);
	const [refundAccount, setRefundAccount] = useState('');
	const [refundBankCode, setRefundBankCode] = useState(bankOptions[3].id);
	const [refundHolder, setRefundHolder] = useState('');

	const user = useUserStore((state) => state.user);

	useEffect(() => {
		fetchCollectionData('menus', setMenus);
		getSetWholeDataCnt();
	}, []);

	useEffect(() => {
		if (menus.length > 0 && user) {
			getSetOrderData(user, true);
		}
	}, [menus, user]);

	useEffect(() => {
		if (wholeDataCnt <= ordersWithItems.length) {
			setIsMoreDisabled(true);
		} else {
			setIsMoreDisabled(false);
		}
	}, [ordersWithItems.length, wholeDataCnt]);

	const getSetWholeDataCnt = async () => {
		const dataCnt = await getDataCount('orders');
		setWholeDataCnt(dataCnt);
	};

	const onClickMore = () => {
		if (user) {
			getSetOrderData(user);
		}
	};

	const getSetOrderData = async (user: IUser, isFirst?: boolean) => {
		const orderData5 = (await fetchCollectionTableDataWithConstraints(
			'orders',
			isFirst ? undefined : startAfterDoc,
			eachFetchOrders,
			[orderBy('createdAt', 'desc'), where('ordererId', '==', user?.id)],
			setStartAfterDoc
		)) as IOrder[] | undefined;

		if (isFirst) {
			setOrdersWithItems([]);
		}

		if (orderData5) {
			for (const orderData of orderData5) {
				const orderItems = (await fetchCollectionDataWithConstraints(
					'orderItems',
					[where('orderId', '==', orderData.id)]
				)) as IOrderItem[] | undefined;

				if (orderItems) {
					const orderItemsWithDeliveryDate: IDeliveryDateOrderItems[] =
						[];
					orderItems.forEach((item) => {
						const idx = orderItemsWithDeliveryDate.findIndex(
							(dateItem) =>
								dateItem.date.toString() ===
								item.deliveryDate.toString()
						);
						if (idx > -1) {
							orderItemsWithDeliveryDate[idx].items.push(item);
						} else {
							orderItemsWithDeliveryDate.push({
								date: item.deliveryDate,
								items: [item],
							});
						}
					});

					setOrdersWithItems((prev) => {
						prev.push({
							orderData: orderData,
							orderItemsWithDeliveryDate:
								orderItemsWithDeliveryDate,
						});
						return [...prev];
					});
				}
			}
		}
	};

	const onOpenDateDrawer = (itemsWithDate: IDeliveryDateOrderItems) => {
		setSelectedItemsWithDate(itemsWithDate);
		setDateTime(itemsWithDate.date.toDate());
		setDateTimeDrawerOpen(true);
	};

	const onChangeDate = async (date: Date) => {
		if (selectedItemsWithDate && user) {
			const updatedAt = Timestamp.now();

			const updatingItems = selectedItemsWithDate?.items.map((item) => ({
				id: item.id,
				data: {
					deliveryDate: convertDateStrToTimestamp(date.toString()),
					updatedAt: updatedAt,
				},
			}));

			const succeed = await updateMultipleDatas(
				'orderItems',
				updatingItems
			);
			setDateTimeDrawerOpen(false);
			if (succeed) {
				alert('배송날짜를 변경하였습니다.');
				getSetOrderData(user);
			} else {
				alert('배송날짜 변경을 실패하였습니다.');
			}
		}
	};

	const fetchCancelPayment = async (paymentId: string, orderId: string) => {
		const response = await fetch('/api/nicepay/cancel', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				paymentId: paymentId,
				orderId: orderId,
				reason: '사용자 요청 취소',
				refundAccount: refundAccount,
				refundBankCode: refundBankCode,
				refundHolder: refundHolder,
			}),
		});

		const result = await response.json();
		return result;
	};

	const onCancelOrder = async () => {
		if (!selectedOrderData || !user) return;

		if (!refundHolder) {
			alert('예금주명을 입력하여주세요');
			return;
		}

		if (!refundAccount) {
			alert('계좌번호를 입력하여주세요');
			return;
		}

		try {
			const result = await fetchCancelPayment(
				selectedOrderData.orderData.paymentId,
				selectedOrderData.orderData.id
			);

			if (result.resultCode === '0000') {
				const updatedAt = Timestamp.now();

				const succeedOrder = await updateData(
					'orders',
					selectedOrderData.orderData.id,
					{
						orderStatus: OrderStatus.cancelled,
						updatedAt,
					}
				);

				const updatingItems: { id: string; data: any }[] = [];
				selectedOrderData.orderItemsWithDeliveryDate.forEach(
					(orderItems) => {
						orderItems.items.forEach((item) => {
							updatingItems.push({
								id: item.id,
								data: { updatedAt },
							});
						});
					}
				);

				const succeedItems = await updateMultipleDatas(
					'orderItems',
					updatingItems
				);

				if (succeedOrder && succeedItems) {
					updateLocalStatusToCancel();
					alert('주문이 취소되었습니다.');
				} else {
					alert('주문 취소를 실패하였습니다.');
				}
			} else {
				alert(result.resultMsg);
			}
		} catch (error) {
			console.error('주문 취소 에러:', error);
			alert('처리 중 오류가 발생했습니다.');
		} finally {
			setOrderCancelModal(false);
		}
	};

	const updateLocalStatusToCancel = () => {
		setOrdersWithItems((prev) => {
			const idx = prev.findIndex(
				(data) => data.orderData.id === selectedOrderData?.orderData.id
			);
			prev[idx].orderData.orderStatus = OrderStatus.cancelled;
			return [...prev];
		});
	};

	const onClickOrderCancel = (data: IOrdersWithItems) => {
		setSelectedOrderData(data);
		setOrderCancelModal(true);
	};

	const isOrderCancelAvailable = (data: IOrdersWithItems) => {
		if (data.orderItemsWithDeliveryDate.length > 0) {
			const earliestDeliveryData = data.orderItemsWithDeliveryDate.reduce(
				(earliest, current) => {
					return current.date.toDate() < earliest.date.toDate()
						? current
						: earliest;
				}
			);

			if (isMoreThanOneDayLeft(earliestDeliveryData.date.toDate())) {
				return true;
			}
		}
		return false;
	};

	const orderStatusAddInfo = (orderStatus: IOrderStatus) => {
		switch (orderStatus) {
			case OrderStatus.ready:
				return '입금 후 결제 확인까지 15분 정도 소요됩니다.';
			case OrderStatus.cancelled:
				return '주문 취소 후 입금까지 이틀정도 소요됩니다.';
			default:
				return '';
		}
	};

	return (
		<div className='flex flex-col gap-[36px] md:w-[892px]'>
			{ordersWithItems.length > 0 ? (
				ordersWithItems.map((data, i) => (
					<div
						key={i}
						className='flex flex-col justify-center items-start flex-grow'>
						<div className='flex justify-between self-stretch items-center self-stretch px-4 py-5 md:p-6 border-t border-r border-l border-neutral-200'>
							<div className='flex items-start items-center gap-[12px]'>
								<PaymentStatus
									status={data.orderData.orderStatus}
								/>
								<p className='text-xs max-w-[120px] md:max-w-auto'>
									{orderStatusAddInfo(
										data.orderData.orderStatus
									)}
								</p>
							</div>
							<p className='text-md md:text-2xl font-bold text-right text-[#0f0e0e]'>
								총 {data.orderData.price?.toLocaleString()}원
							</p>
						</div>
						{data.orderItemsWithDeliveryDate.map(
							(itemsWithDate, idx) => (
								<div
									key={idx}
									className='flex flex-col gap-4 md:gap-[24px] px-4 py-5 md:p-6 bg-white border border-neutral-200 self-stretch'>
									<div
										key={idx}
										className='flex md:flex-row flex-col justify-start items-start self-stretch gap-6'>
										<div className='flex flex-col justify-start items-start flex-grow gap-5 self-stretch'>
											<div className='flex self-stretch justify-between md:gap-0 gap-2'>
												<div className=' md:text-lg font-bold text-[#0f0e0e] flex md:items-center gap-1 md:gap-3 flex-col md:flex-row'>
													<p>배달날짜</p>
													<p className='font-normal text-sm md:text-lg'>
														{formatTimestampWithMinutes(
															itemsWithDate.date
														)}
													</p>
												</div>
												{isMoreThanTwoDaysLeft(
													itemsWithDate.date.toDate()
												) && (
													<ButtonSmall
														value={'일정 변경'}
														onClick={() =>
															onOpenDateDrawer(
																itemsWithDate
															)
														}
													/>
												)}
											</div>
											<div className='flex flex-col justify-start items-start self-stretch gap-2 md:gap-3'>
												{itemsWithDate.items.map(
													(item, j) => (
														<div
															key={j}
															className='flex justify-start items-center self-stretch gap-1.5'>
															<p className=' md:text-xl text-[#0f0e0e]'>
																{item.menuId}
															</p>
															<p className='md:text-[22px] font-bold md:font-light text-[#0f0e0e]'>
																{item.quantity.toLocaleString()}
																개
															</p>
														</div>
													)
												)}
											</div>
										</div>
									</div>
									<div className='self-stretch h-[1px] bg-gray-200' />
									<div className='flex justify-start items-center self-stretch gap-3'>
										<div className='flex justify-center items-center gap-2 pt-0.5'>
											<p className='md:text-lg font-bold text-[#0f0e0e] md:min-w-auto min-w-[62px]'>
												배달주소
											</p>
										</div>
										<p className=' md:text-lg text-[#0f0e0e]'>
											{itemsWithDate.items[0].address}{' '}
											{
												itemsWithDate.items[0]
													.addressDetail
											}
										</p>
									</div>
								</div>
							)
						)}
						<div className='flex flex-col justify-start items-start self-stretch gap-3 p-6 border border-neutral-200 '>
							<div className='flex items-center self-stretch justify-between'>
								<p className=' md:text-lg font-bold text-[#0f0e0e]'>
									주문정보
								</p>
								<p className=' md:text-lg text-black/30'>
									{data.orderData.id}
								</p>
							</div>
							<div className='flex flex-col justify-start items-start self-stretch gap-3 p-5 rounded-xl bg-[#f8f8f8]'>
								<div className='flex justify-start items-center self-stretch gap-3'>
									<div className='flex justify-center items-center gap-2 pt-0.5'>
										<p className='flex-grow md:text-base font-bold text-[#5c5c5c] min-w-[62px] md:min-w-auto'>
											주문날짜
										</p>
									</div>
									<p className=' md:text-lg text-[#5c5c5c]'>
										{formatTimestampWithMinutes(
											data.orderData.createdAt
										)}
									</p>
								</div>
								<div className='flex justify-start items-center self-stretch gap-3'>
									<div className='flex justify-center items-center gap-2 pt-0.5'>
										<p className='flex-grow  md:text-base font-bold text-[#5c5c5c] min-w-[48px] md:min-w-auto'>
											이메일
										</p>
									</div>
									<p className=' md:text-lg text-[#5c5c5c]'>
										{data.orderData.email}
									</p>
								</div>
								<div className='flex justify-start items-center self-stretch gap-3'>
									<div className='flex justify-center items-center gap-2 pt-0.5'>
										<p className='flex-grow  md:text-base font-bold text-[#5c5c5c]'>
											비상 연락처
										</p>
									</div>
									<p className=' md:text-lg text-[#5c5c5c]'>
										{data.orderData.otherPhone}
									</p>
								</div>
								<div className='flex justify-start items-center self-stretch gap-3'>
									<div className='flex justify-center items-center gap-2 pt-0.5'>
										<p className='flex-grow md:min-w-24  md:text-base font-bold text-[#5c5c5c]'>
											업체명/현장명
										</p>
									</div>
									<p className=' md:text-lg text-[#5c5c5c]'>
										{data.orderData.companyName}
									</p>
								</div>
								<div className='flex justify-start items-center self-stretch gap-3'>
									<div className='flex justify-center items-center gap-2 pt-0.5'>
										<p className=' md:text-base font-bold text-[#5c5c5c]'>
											요청사항
										</p>
									</div>
									<p className=' md:text-lg text-[#5c5c5c]'>
										{data.orderData.comment}
									</p>
								</div>
								<div className='flex justify-start items-center self-stretch gap-3'>
									<div className='flex justify-center items-center gap-2 pt-0.5'>
										<p className=' md:text-base font-bold text-[#5c5c5c]'>
											스티커
										</p>
									</div>
									<p className=' md:text-lg text-[#5c5c5c]'>
										{data.orderData.stickerFile ||
										data.orderData.stickerPhrase
											? 'o'
											: 'x'}
									</p>
								</div>
							</div>
						</div>
						<div className='flex flex-col justify-start items-start self-stretch gap-3 p-6 border border-t-0 border-neutral-200'>
							<p className=' md:text-lg font-bold text-[#0f0e0e]'>
								결제정보
							</p>
							<div className='flex flex-col justify-start items-start self-stretch gap-3 p-5 rounded-xl bg-[#f8f8f8]'>
								<div className='flex justify-start items-center self-stretch gap-3'>
									<div className='flex justify-center items-center gap-2 pt-0.5'>
										<p className='flex-grow  md:text-base font-bold text-[#5c5c5c]'>
											결제방식
										</p>
									</div>
									<p className=' md:text-lg text-[#5c5c5c]'>
										가상계좌
									</p>
								</div>
								<div className='flex justify-start items-center self-stretch gap-3'>
									<div className='flex justify-center items-center gap-2 pt-0.5'>
										<p className='flex-grow  md:text-base font-bold text-[#5c5c5c] min-w-[62px] md:min-w-auto'>
											계좌정보
										</p>
									</div>
									<p className=' md:text-lg text-[#5c5c5c]'>
										{data.orderData.vbankName}{' '}
										{data.orderData.vbankNumber}
									</p>
								</div>
								<div className='flex justify-start items-center self-stretch gap-3'>
									<div className='flex justify-center items-center gap-2 pt-0.5'>
										<p className='flex-grow  md:text-base font-bold text-[#5c5c5c]'>
											예금주
										</p>
									</div>
									<p className=' md:text-lg text-[#5c5c5c]'>
										{data.orderData.vbankHolder}
									</p>
								</div>
								<div className='flex justify-start items-center self-stretch gap-3'>
									<div className='flex justify-center items-center gap-2 pt-0.5'>
										<p className='flex-grow  md:text-base font-bold text-[#5c5c5c]'>
											입금기한
										</p>
									</div>
									<p className=' md:text-lg text-[#5c5c5c]'>
										{data.orderData.vbankExpDate &&
											new Date(
												data.orderData.vbankExpDate
											).toLocaleString()}
									</p>
								</div>
							</div>
						</div>
						{isOrderCancelAvailable(data) && (
							<div className='flex py-3 justify-start items-start self-stretch gap-6 px-6 py-1 border border-t-0 border-neutral-200'>
								<p
									onClick={() => onClickOrderCancel(data)}
									className='cursor-pointer  md:text-lg text-[#5c5c5c]'>
									주문 취소
								</p>
							</div>
						)}
						{dateTimeDrawerOpen && (
							<DateTimeDrawer
								date={dateTime}
								onClose={() => setDateTimeDrawerOpen(false)}
								onConfirm={onChangeDate}
							/>
						)}
					</div>
				))
			) : (
				<div className='md:text-[24px] font-bold text-gray-300 h-[600px] flex items-center justify-center border border-gray-300'>
					주문 내역이 없습니다
				</div>
			)}
			{!isMoreDisabled && (
				<div
					onClick={onClickMore}
					className='cursor-pointer hover:bg-gray-700 self-center bg-black/30 rounded-full size-[32px] flex items-center justify-center'>
					<ChevronDown />
				</div>
			)}
			{orderCancelModal && (
				<ModalCenter
					title={'주문 취소'}
					description={
						<>
							{selectedOrderData?.orderData.orderStatus ===
							'ready' ? (
								<div className='flex flex-col gap-2'>
									<p className='text-md font-bold'>
										주문을 취소하시겠습니까?
									</p>
									<p className='text-sm'>
										입금한지 얼마 안되신 경우 &quot;결제
										확인중&quot;이 &quot;결제 완료&quot;로
										바뀐 후 취소해주세요.
									</p>
								</div>
							) : (
								<div className='flex flex-col gap-[24px]'>
									<p className=''>
										환불받을 계좌정보를 입력해주세요
									</p>
									<div className='flex flex-col gap-[12px]'>
										<div className='flex items-center gap-[6px]'>
											<p className='min-w-[60px] md:w-[90px] md:text-base  text-left'>
												예금주명
											</p>
											<TextField
												value={refundHolder}
												onChange={(e) =>
													setRefundHolder(
														e.target.value
													)
												}
												style={{ flex: 1 }}
											/>
										</div>
										<div className='flex items-center gap-[6px]'>
											<p className='min-w-[60px] md:w-[90px] md:text-base  text-left'>
												은행
											</p>
											<Dropdown
												domId={dropdownDomId}
												list={bankOptions}
												selectedId={refundBankCode}
												onClick={(id) =>
													setRefundBankCode(id)
												}
												style={{ flex: 1 }}
											/>
										</div>
										<div className='flex items-center gap-[6px]'>
											<p className='min-w-[60px] md:w-[90px] md:text-base  text-left'>
												계좌번호
											</p>
											<TextField
												value={refundAccount}
												onChange={(e) =>
													setRefundAccount(
														e.target.value
													)
												}
												style={{ flex: 1 }}
											/>
										</div>
									</div>
								</div>
							)}
						</>
					}
					btn1st={{
						value: '주문 취소',
						onClick: onCancelOrder,
						style: { background: '#DD1C1C', color: 'white' },
						className: 'w-full md:min-h-[68px] min-h-[58px]',
					}}
					btn2nd={{
						value: '닫기',
						onClick: () => setOrderCancelModal(false),
					}}
				/>
			)}
		</div>
	);
}
