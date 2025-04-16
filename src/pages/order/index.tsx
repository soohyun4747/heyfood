import { ButtonNumText } from '@/components/ButtonNumText';
import { ButtonSmall } from '@/components/ButtonSmall';
import { GNBOrder } from '@/components/GNBOrder';
import { ICategory, IMenu } from '@/components/LandingMenusTab';
import { MenuCardOrder } from '@/components/MenuCardOrder';
import { TabMenu } from '@/components/TabMenu';
import { Reset } from '@/icons/Reset';
import { useItemsStore } from '@/stores/itemsStore';
import { useUserStore } from '@/stores/userStore';
import { fetchCollectionData, fetchImageUrls } from '@/utils/firebase';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { AddressDrawer } from './AddressDrawer';
import { useRouter } from 'next/router';
import { DateTimeDrawer } from './DateTimeDrawer';
import { useCartStore } from '@/stores/cartStore';
import { ModalCenter } from '@/components/ModalCenter';

const minimumCount = 30;

function OrderPage() {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [menus, setMenus] = useState<IMenu[]>([]);
	const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
	const [resetHover, setResetHover] = useState(false);
	const [addressDrawerOpen, setAddreessDrawerOpen] = useState(false);
	const [dateTimeDrawerOpen, setDateTimeDrawerOpen] = useState(false);
	const [dateTime, setDateTime] = useState<Date>();
	const [cartModalOpen, setCartModalOpen] = useState(false);

	const user = useUserStore((state) => state.user);
	const { items, setItems, onPlusItem, onMinusItem, onResetItems } =
		useItemsStore();
	const onAddCart = useCartStore((state) => state.onAddCart);

	const router = useRouter();

	const addressFull =
		user?.address && user?.addressDetail
			? `${user?.address} ${user?.addressDetail}`
			: undefined;

	useEffect(() => {
		if (!user) {
			router.push('/');
		}
	}, [user]);

	// 초기 데이터 로드
	useEffect(() => {
		fetchCollectionData('menuCategories', setCategories);
		const getSetMenus = async () => {
			const fetchedMenus =
				((await fetchCollectionData('menus')) as IMenu[] | undefined) ??
				[];
			// 이미지 URL들은 병렬 처리합니다.
			const updatedMenus = await Promise.all(
				fetchedMenus.map(async (menu) => {
					const urls = await fetchImageUrls(menu.imagePaths);
					if (urls) {
						menu.imagePaths = urls;
					}
					return menu;
				})
			);
			setMenus(updatedMenus);
		};
		getSetMenus();
	}, []);

	const getCartPrice = () => {
		let price = 0;
		items.forEach((item) => {
			price += Number(item.menu.price) * item.count;
		});
		return price;
	};

	const getCartItemsCount = () => {
		let count = 0;
		items.forEach((item) => {
			count += item.count;
		});
		return count;
	};

	const cartItemsCount = getCartItemsCount();

	// 선택된 카테고리에 해당하는 메뉴 필터링 (useMemo로 메모이제이션)
	const filteredCategoryMenus = useMemo(() => {
		if (!categories[selectedCategoryIdx]) return [];
		const selectedCategory = categories[selectedCategoryIdx];
		return menus.filter((menu) => menu.categoryId === selectedCategory.id);
	}, [menus, categories, selectedCategoryIdx]);

	const onClickCategory = (i: number) => {
		setSelectedCategoryIdx(i);
	};

	const onBlurMenuCount = (
		e: ChangeEvent<HTMLInputElement>,
		menu: IMenu,
		count: number | undefined
	) => {
		const numVal = Number(e.target.value);
		if (isNaN(numVal)) {
			setItems(menu, count ?? 0);
		} else {
			setItems(menu, numVal);
		}
	};

	const onClickPlus = (menu: IMenu) => {
		if (dateTime && addressFull) {
			onPlusItem(menu);
		} else {
			if (!addressFull) {
				alert('상단에 배달주소를 먼저 설정해주세요');
			} else {
				alert('상단에 날짜 및 시간을 먼저 설정해주세요');
			}
		}
	};

	const addToCart = () => {
		if (dateTime && addressFull) {
			onAddCart({
				id: dateTime + addressFull,
				dateTime: dateTime,
				addressFull: addressFull,
				items: items,
			});
		}

		setCartModalOpen(true);
		setDateTime(undefined);
		onResetItems();
	};

	return (
		<div className='h-screen flex flex-col overflow-hidden'>
			<GNBOrder />
			<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-[60px] px-[120px] pb-[100px] bg-white h-[calc(100%-131px-96px)] overflow-y-auto'>
				<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
					<p className='flex-grow-0 flex-shrink-0 text-[50px] font-bold text-center text-[#0f0e0e]'>
						주문하기
					</p>
				</div>
				<div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[1200px] gap-[60px]'>
					<div className='flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
						<div className='flex justify-start items-center flex-1 gap-3 px-6 py-4 border border-neutral-200 h-[62px]'>
							<div className='flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 pt-0.5'>
								<p className='flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#0f0e0e]'>
									배달주소
								</p>
							</div>
							<p className='flex-grow text-lg text-left text-[#0f0e0e]'>
								{user?.address} {user?.addressDetail}
							</p>
							<ButtonSmall
								value={'변경'}
								onClick={() => setAddreessDrawerOpen(true)}
							/>
						</div>
						<div className='flex justify-start items-center flex-1 gap-3 px-6 py-4 border-t border-r border-b border-l-0 border-neutral-200 h-[62px]'>
							<div className='flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 pt-0.5'>
								<p className='flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#0f0e0e]'>
									날짜 및 시간
								</p>
							</div>
							<p className='flex-grow text-lg text-left text-[#0f0e0e]'>
								{dateTime?.toLocaleString()}
							</p>
							<ButtonSmall
								value={'변경'}
								onClick={() => setDateTimeDrawerOpen(true)}
							/>
						</div>
					</div>
					<TabMenu
						menus={categories}
						selectedIdx={selectedCategoryIdx}
						onClickMenu={onClickCategory}
					/>
					<div className='grid grid-cols-3 gap-x-8 gap-y-16'>
						{filteredCategoryMenus.map((menu) => {
							const count = items.find(
								(item) => item.menu.id === menu.id
							)?.count;

							return (
								<MenuCardOrder
									key={menu.name}
									src={menu.imagePaths[0]}
									title={menu.name}
									price={menu.price}
									count={count}
									onClickPlus={() => onClickPlus(menu)}
									onClickMinus={() => onMinusItem(menu)}
									onBlurValue={(e) =>
										onBlurMenuCount(e, menu, count)
									}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<div
				className='flex justify-end items-center flex-grow-0 flex-shrink-0 w-[1440px] gap-10 px-[120px] py-8 rounded-tl-3xl rounded-tr-3xl bg-white relative'
				style={{ boxShadow: '0px 4px 20px 0 rgba(0,0,0,0.1)' }}>
				<div className='flex flex-col justify-center items-start flex-grow relative'>
					<p className='flex-grow-0 flex-shrink-0 text-[26px] font-medium text-right text-[#0f0e0e]'>
						{getCartPrice().toLocaleString()}원
					</p>
					<p className='flex-grow-0 flex-shrink-0 text-lg font-medium text-right text-[#909090]'>
						하루 30개부터 배달가능
					</p>
				</div>
				<div className='flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3'>
					<div
						onMouseEnter={() => setResetHover(true)}
						onMouseLeave={() => setResetHover(false)}
						className='hover:cursor-pointer flex justify-center items-center flex-grow-0 flex-shrink-0 rounded-lg bg-[#f8f8f8] border border-neutral-200 w-[56px] h-[56px]'
						onClick={onResetItems}>
						<Reset />
					</div>
					<ButtonNumText
						count={cartItemsCount}
						value={'장바구니에 넣기'}
						disabled={cartItemsCount < minimumCount ? true : false}
						onClick={addToCart}
					/>
				</div>
				{resetHover && (
					<div className='flex justify-center items-center flex-grow-0 flex-shrink-0 absolute left-[986px] top-[-3px] gap-2 p-2 rounded-md bg-[#0f0e0e]'>
						<p className='flex-grow-0 flex-shrink-0 text-xs text-center text-white'>
							비우고 다시 선택하기
						</p>
					</div>
				)}
			</div>
			{addressDrawerOpen && (
				<AddressDrawer onClose={() => setAddreessDrawerOpen(false)} />
			)}
			{dateTimeDrawerOpen && (
				<DateTimeDrawer
					date={dateTime}
					onClose={() => setDateTimeDrawerOpen(false)}
					onConfirm={(date) => {
						setDateTime(date);
						setDateTimeDrawerOpen(false);
					}}
				/>
			)}
			{cartModalOpen && (
				<ModalCenter
					title={'장바구니 담기'}
					description={
						<>
							장바구니에 메뉴가 담겼습니다.
							<br />
							주문을 추가하시겠습니까?
						</>
					}
					btn1st={{
						value: '장바구니로 이동',
						onClick: () => router.push('/cart'),
					}}
					btn2nd={{
						value: '주문 추가하기',
						onClick: () => setCartModalOpen(false),
					}}
				/>
			)}
		</div>
	);
}

export default OrderPage;
