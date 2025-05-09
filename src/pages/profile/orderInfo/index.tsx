import { IMenu } from '@/components/LandingMenusTab';
import { IUser, IUserType, useUserStore } from '@/stores/userStore';
import {
	fetchCollectionData,
	fetchCollectionDataWithConstraints,
	fetchCollectionTableDataWithConstraints,
} from '@/utils/firebase';
import { formatTimestampWithMinutes } from '@/utils/time';
import {
	DocumentData,
	orderBy,
	QueryDocumentSnapshot,
	Timestamp,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

const eachFetchOrders = 5;

export interface IOrder {
	id: string;
	ordererId: string;
	ordererType: IUserType;
	address: string;
	addressDetail: string;
	comment?: string;
	createdAt: Timestamp;
	updatedAt?: Timestamp;
}

export interface IOrderItem {
	id: string;
	orderId: string;
	ordererName: string;
	categoryId: string;
	menuId: string;
	quantity: number;
	deliveryDate: Timestamp;
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
	const [startAfterDoc, ] =
		useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();
	const [ordersWithItems, setOrdersWithItems] = useState<IOrdersWithItems[]>(
		[]
	);

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
		const orderData5 = (await fetchCollectionTableDataWithConstraints(
			'orders',
			startAfterDoc,
			eachFetchOrders,
			[orderBy('createdAt', 'desc'), where('ordererId', '==', user?.id)]
		)) as IOrder[] | undefined;

		console.log( orderData5);
		
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
							(dateItem) => dateItem.date === item.deliveryDate
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
						return prev;
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

	return (
		<div className='flex flex-col gap-[36px] w-[892px]'>
			{ordersWithItems.length > 0 ? ordersWithItems.map((data, i) => (
				<div key={i} className='flex flex-col justify-center items-start flex-grow'>
					<div className='flex flex-col justify-start items-start self-stretch gap-6 p-6 bg-white border-t border-r border-b-0 border-l border-neutral-200'>
						<div className='flex justify-start items-start self-stretch relative gap-3'>
							<p className='flex-grow w-[441px] text-xl font-bold text-left text-[#0f0e0e]'>
								<span className='font-normal'>주문날짜</span>
								{'   '}
								{formatTimestampWithMinutes(
									data.orderData.createdAt
								)}
							</p>
							<p className='w-[391px] h-[29px] text-2xl font-bold text-right text-[#0f0e0e]'>
								총{' '}
								{getOrderWholePrice(
									data.orderItemsWithDeliveryDate
								).toLocaleString()}
								원
							</p>
						</div>
					</div>
					{data.orderItemsWithDeliveryDate.map((itemsWithDate, idx) => (
						<div key={idx} className='flex justify-start items-start self-stretch gap-6 p-6 bg-white border border-neutral-200'>
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
									{itemsWithDate.items.map((item, j) => (
										<div key={j} className='flex justify-start items-center self-stretch h-[30px] relative gap-1.5'>
											<p className='text-xl text-left text-[#0f0e0e]'>
												{item.menuId}
											</p>
											<p className='text-[22px] font-light text-left text-[#0f0e0e]'>
												{item.quantity.toLocaleString()}
												개
											</p>
										</div>
									))}
								</div>
							</div>
							<div className='flex justify-center items-center h-[26px] relative gap-2 px-3 rounded-[100px] border border-neutral-200'>
								<p className='text-sm text-left text-[#0f0e0e]'>
									배달 일정 변경
								</p>
							</div>
						</div>
					))}

					<div className='flex flex-col justify-start items-start self-stretch gap-6 px-6 py-1 bg-white border border-neutral-200'>
						<div className='flex justify-end items-center flex-grow-0 flex-shrink-0'>
							<div className='flex justify-center items-center relative gap-2 py-3 rounded-lg'>
								<p className='text-lg text-left text-[#5c5c5c]'>
									주문 취소
								</p>
							</div>
						</div>
					</div>
				</div>
			)) : <div className='text-[24px] font-bold text-gray-300 h-[600px] flex items-center justify-center border border-gray-300'>주문 내역이 없습니다</div>}
		</div>
	);
}

export default OrderInfoPage;
