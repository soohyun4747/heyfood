import { ButtonSmall } from '@/components/ButtonSmall';
import { IMenu } from '@/components/LandingMenusTab';
import { ModalCenter } from '@/components/ModalCenter';
import { DateTimeDrawer } from '@/components/pages/order/DateTimeDrawer';
import { IUser, IUserType, useUserStore } from '@/stores/userStore';
import {
	fetchCollectionData,
	fetchCollectionDataWithConstraints,
	fetchCollectionTableDataWithConstraints,
	updateData,
	updateMultipleDatas,
} from '@/utils/firebase';
import {
	convertDateStrToTimestamp,
	formatTimestampWithMinutes,
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

const eachFetchOrders = 5;

export const orderStatusLabels = {
	paymentComplete: '결제완료',
	confirmingPayment: '결제확인중',
	paymentIncomplete: '결제미완료',
	orderCanceled: '주문취소',
};

export const OrderStatus = {
	paymentComplete: 'paymentComplete',
	confirmingPayment: 'confirmingPayment',
	paymentIncomplete: 'paymentIncomplete',
	orderCanceled: 'orderCanceled',
} as const;

export type IOrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface IOrder {
	id: string;
	ordererId: string;
	ordererType: IUserType;
	orderStatus: IOrderStatus;
	comment?: string;
	sticker: boolean;
	stickerPhrase?: string;
	companyName: string;
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

function OrderInfoPage() {
	const [menus, setMenus] = useState<IMenu[]>([]);
	const [startAfterDoc] =
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

	const user = useUserStore((state) => state.user);

	useEffect(() => {
		fetchCollectionData('menus', setMenus);
	}, []);

	useEffect(() => {
		if (menus.length > 0 && user) {
			getSetOrderData(user);
		}
	}, [menus, user]);

	const getSetOrderData = async (user: IUser) => {
		setOrdersWithItems([]);

		const orderData5 = (await fetchCollectionTableDataWithConstraints(
			'orders',
			startAfterDoc,
			eachFetchOrders,
			[orderBy('createdAt', 'desc'), where('ordererId', '==', user?.id)]
		)) as IOrder[] | undefined;

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

	const getOrderWholePrice = (
		orderItemsWithDate: IDeliveryDateOrderItems[]
	) => {
		let price = 0;

		orderItemsWithDate.forEach((data) => {
			data.items.forEach((item) => {
				const menuData = menus.find((menu) => menu.id === item.menuId);
				if (menuData) {
					price += menuData.price * item.quantity;
				}
			});
		});
		return price;
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

	const onCancelOrder = async () => {
		if (selectedOrderData && user) {
			const updatedAt = Timestamp.now();

			let succeed = await updateData(
				'orders',
				selectedOrderData.orderData.id,
				{
					orderStatus: OrderStatus.orderCanceled,
					updatedAt: updatedAt,
				}
			);

			//order items update
			const updatingItems: { id: string; data: any }[] = [];
			selectedOrderData.orderItemsWithDeliveryDate.forEach(
				(orderItems) => {
					orderItems.items.forEach((item) => {
						updatingItems.push({
							id: item.id,
							data: {
								updatedAt: updatedAt,
							},
						});
					});
				}
			);

			succeed = await updateMultipleDatas('orderItems', updatingItems);

			if (succeed) {
				alert('주문이 취소되었습니다.');
				getSetOrderData(user);
			} else {
				alert('주문 취소를 실패하였습니다.');
			}
			setOrderCancelModal(false);
		}
	};

	const onClickOrderCancel = (data: IOrdersWithItems) => {
		setSelectedOrderData(data);
		setOrderCancelModal(true);
	};

	const isOrderCancelAvailable = (data: IOrdersWithItems) => {
		const earliestDeliveryData = data.orderItemsWithDeliveryDate.reduce(
			(earliest, current) => {
				return current.date.toDate() < earliest.date.toDate()
					? current
					: earliest;
			}
		);

		if (isMoreThanTwoDaysLeft(earliestDeliveryData.date.toDate())) {
			return true;
		}
		return false;
	};

	return (
		<div className='flex flex-col gap-[36px] w-[892px]'>
			{ordersWithItems.length > 0 ? (
				ordersWithItems.map((data, i) => (
					<div
						key={i}
						className='flex flex-col justify-center items-start flex-grow'>
						<div className='flex flex-col justify-start items-start self-stretch gap-6 p-6 bg-white border-t border-r border-b-0 border-l border-neutral-200'>
							<div className='flex justify-between self-stretch'>
								<div className='flex items-center gap-[12px]'>
									<p>
										{
											orderStatusLabels[
												data.orderData.orderStatus
											]
										}
									</p>
									<p className='flex-grow text-xl font-bold text-left text-[#0f0e0e]'>
										<span className='font-normal'>
											주문날짜
										</span>
										{'   '}
										{formatTimestampWithMinutes(
											data.orderData.createdAt
										)}
									</p>
								</div>
								<p className='text-2xl font-bold text-right text-[#0f0e0e]'>
									총{' '}
									{getOrderWholePrice(
										data.orderItemsWithDeliveryDate
									).toLocaleString()}
									원
								</p>
							</div>
						</div>
						{data.orderItemsWithDeliveryDate.map(
							(itemsWithDate, idx) => (
								<div className='flex flex-col gap-[24px] p-6 bg-white border border-neutral-200 self-stretch'>
									<div
										key={idx}
										className='flex justify-start items-start self-stretch gap-6'>
										<div className='flex flex-col justify-start items-start flex-grow relative gap-5'>
											<p className='text-lg font-bold text-left text-[#0f0e0e]'>
												<span className='font-normal'>
													배달날짜
												</span>
												{'   '}
												{formatTimestampWithMinutes(
													itemsWithDate.date
												)}
											</p>
											<div className='flex flex-col justify-start items-start self-stretch gap-3'>
												{itemsWithDate.items.map(
													(item, j) => (
														<div
															key={j}
															className='flex justify-start items-center self-stretch h-[30px] relative gap-1.5'>
															<p className='text-xl text-left text-[#0f0e0e]'>
																{item.menuId}
															</p>
															<p className='text-[22px] font-light text-left text-[#0f0e0e]'>
																{item.quantity.toLocaleString()}
																개
															</p>
														</div>
													)
												)}
											</div>
										</div>
										{isMoreThanTwoDaysLeft(
											itemsWithDate.date.toDate()
										) && (
											<ButtonSmall
												value={'배달 일정 변경'}
												onClick={() =>
													onOpenDateDrawer(
														itemsWithDate
													)
												}
											/>
										)}
									</div>
									<div className='self-stretch h-[1px] bg-gray-200' />
									<div className='flex justify-start items-center self-stretch relative gap-3'>
										<div className='flex justify-center items-center relative gap-2 pt-0.5'>
											<p className='text-base font-bold text-left text-[#0f0e0e]'>
												배달주소
											</p>
										</div>
										<p className='text-lg text-left text-[#0f0e0e]'>
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
						{isOrderCancelAvailable(data) && (
							<div className='flex py-3 justify-start items-start self-stretch gap-6 px-6 py-1 bg-white border-b border-l border-r border-neutral-200'>
								<p
									onClick={() => onClickOrderCancel(data)}
									className='cursor-pointer text-lg text-left text-[#5c5c5c]'>
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
				<div className='text-[24px] font-bold text-gray-300 h-[600px] flex items-center justify-center border border-gray-300'>
					주문 내역이 없습니다
				</div>
			)}
			{orderCancelModal && (
				<ModalCenter
					title={'주문 취소'}
					description={'주문을 취소하시겠습니까?'}
					btn1st={{
						value: '주문 취소',
						onClick: onCancelOrder,
						style: { background: '#DD1C1C', color: 'white' },
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

export default OrderInfoPage;
