import { ButtonNumText } from '@/components/ButtonNumText';
import { ButtonSmall } from '@/components/ButtonSmall';
import { GNBOrder } from '@/components/GNBOrder';
import { IMenu } from '@/components/LandingMenusTab';
import { MenuCardOrder } from '@/components/MenuCardOrder';
import { TabMenu } from '@/components/TabMenu';
import { Reset } from '@/icons/Reset';
import { IItem, useItemsStore } from '@/stores/itemsStore';
import { useUserStore } from '@/stores/userStore';
import { useEffect, useMemo, useState } from 'react';
import { AddressDrawer } from '../../components/pages/order/AddressDrawer';
import { useRouter } from 'next/router';
import { DateTimeDrawer } from '../../components/pages/order/DateTimeDrawer';
import { useCartStore } from '@/stores/cartStore';
import { ModalCenter } from '@/components/ModalCenter';
import { categorySideId } from './payment';
import { useMenuCategoriesStore } from '@/stores/menuCategoriesStore';
import { useMenusStore } from '@/stores/menusStore';
import { MenuCardOrderSnack } from '@/components/MenuCardOrderSnack';

export const minDosirakCount = 30;

const customDessertBox = '내마음대로 다과박스';

function OrderPage() {
	const categories = useMenuCategoriesStore((state) => state.menuCategories);
	const menus = useMenusStore((state) => state.menus);
	const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
	const [resetHover, setResetHover] = useState(false);
	const [addressDrawerOpen, setAddreessDrawerOpen] = useState(false);
	const [dateTimeDrawerOpen, setDateTimeDrawerOpen] = useState(false);
	const [dateTime, setDateTime] = useState<Date>();
	const [cartModalOpen, setCartModalOpen] = useState(false);
	const [sameAddressDateNoticeModal, setSameAddressDateNoticeModal] =
		useState(false);

	const { user } = useUserStore();
	const { items, onAddItem, setItem, onPlusItem, onMinusItem, onResetItems } =
		useItemsStore();
	const { cart, onAddCart, onRemoveCart } = useCartStore();

	const router = useRouter();

	const addressFull =
		user?.address && user?.addressDetail
			? `${user?.address} ${user?.addressDetail}`
			: undefined;

	const bundleId =
		dateTime && addressFull ? dateTime + addressFull : undefined;

	useEffect(() => {
		if (!user) {
			router.push('/login');
		}
	}, [user]);

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

	// 선택된 카테고리에 해당하는 메뉴 필터링 (useMemo로 메모이제이션)
	const filteredCategoryMenus = useMemo(() => {
		if (!categories[selectedCategoryIdx]) return [];
		const selectedCategory = categories[selectedCategoryIdx];
		return menus.filter((menu) => menu.categoryId === selectedCategory.id);
	}, [menus, categories, selectedCategoryIdx]);

	const onClickCategory = (i: number) => {
		setSelectedCategoryIdx(i);
	};

	const onBlurMenuCount = (menu: IMenu, numVal: number) => {
		setItem(menu, numVal);
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

	const onClickAddToCart = () => {
		if (bundleId) {
			const oBundleIdx = cart.findIndex(
				(bundle) => bundle.id === bundleId
			);
			if (oBundleIdx > -1) {
				setSameAddressDateNoticeModal(true);
			} else {
				addToCart();
			}
		}
	};

	const addToCart = () => {
		if (bundleId && dateTime && user?.address && user?.addressDetail) {
			onAddCart({
				id: bundleId,
				dateTime: dateTime,
				address: user?.address,
				addressDetail: user?.addressDetail,
				items: items,
			});
			setCartModalOpen(true);
			setDateTime(undefined);
			onResetItems();
		}
	};

	const replaceCartBundle = () => {
		if (bundleId) {
			onRemoveCart(bundleId);
			setSameAddressDateNoticeModal(false);
			addToCart();
		}
	};

	return (
		<div className='h-screen-dynamic flex flex-col overflow-hidden'>
			<GNBOrder />
			<div className='flex flex-col justify-start items-center self-stretch gap-[60px] md:px-[120px] pb-[120px] md:pb-[100px] bg-white h-[calc(100vh-232px)] md:h-[calc(100vh-131px)] overflow-y-auto'>
				<p className='hidden md:block text-[50px] font-bold text-center text-[#0f0e0e]'>
					주문하기
				</p>
				<div className='flex flex-col justify-start items-center md:w-[1200px] gap-7 md:gap-[60px]'>
					<div className='flex md:flex-row flex-col justify-start items-start max-w-[100vw] md:w-full self-stretch'>
						<div className='flex justify-between md:justify-start items-center flex-1 gap-3 px-5 md:px-6 py-4 border border-neutral-200 md:h-[62px] self-stretch md:self-auto'>
							<p className='min-w-[76px] md:min-w-[70px] text-sm md:text-base font-bold text-left text-[#0f0e0e]'>
								배달주소
							</p>
							<p className='flex-1 md:flex-grow text-sm md:text-lg text-left text-[#0f0e0e]'>
								{user?.address} {user?.addressDetail}
							</p>
							<ButtonSmall
								value={'변경'}
								onClick={() => setAddreessDrawerOpen(true)}
							/>
						</div>
						<div className='flex justify-start items-center flex-1 gap-3 px-6 py-4 md:border-t border-r border-b border-l-0 border-neutral-200 md:h-[62px] self-stretch md:self-auto'>
							<div className='flex justify-center items-center relative gap-2 pt-0.5'>
								<p className='min-w-[76px] md:min-w-[90px] text-sm md:text-base font-bold text-left text-[#0f0e0e]'>
									날짜 및 시간
								</p>
							</div>
							<p className='flex-grow text-sm md:text-lg text-left text-[#0f0e0e]'>
								{dateTime?.toLocaleString().slice(0, -3)}
							</p>
							<ButtonSmall
								value={'변경'}
								onClick={() => setDateTimeDrawerOpen(true)}
							/>
						</div>
					</div>
					<div className='max-w-[calc(100vw-40px)] md:max-w-auto'>
						<TabMenu
							menus={categories}
							selectedIdx={selectedCategoryIdx}
							onClickMenu={onClickCategory}
							className='md:justify-center'
						/>
					</div>
					<div
						className={`grid grid-cols-2 ${
							filteredCategoryMenus.length === 1 &&
							'md:grid-cols-1'
						} ${
							filteredCategoryMenus.length === 2 &&
							'md:grid-cols-2'
						} ${
							filteredCategoryMenus.length > 2 && 'md:grid-cols-3'
						} gap-3 md:gap-x-8 md:gap-y-16 pt-4 md:pt-0 self-stretch md:self-auto px-[20px] md:px-0`}>
						{filteredCategoryMenus.map((menu) => {
							const count = items.find(
								(item) => item.menu.id === menu.id
							)?.count;

							if (menu.id === customDessertBox) {
								return (
									<MenuCardOrderSnack
										key={menu.id}
										menu={menu}
										onAdd={(menu, count) =>
											onAddItem(menu, count)
										}
										isAddressFilled={
											addressFull ? true : false
										}
										isDateTimeFilled={
											dateTime ? true : false
										}
									/>
								);
							}

							return (
								<MenuCardOrder
									key={menu.name}
									src={menu.imagePaths[0]}
									title={menu.name}
									price={menu.price}
									count={count}
									onClickPlus={() => onClickPlus(menu)}
									onClickMinus={() => onMinusItem(menu)}
									onBlurValue={(val) =>
										onBlurMenuCount(menu, val)
									}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<div
				className='fixed bottom-0 flex items-center justify-center rounded-tl-3xl rounded-tr-3xl bg-white relative max-w-[1440px] self-center w-full md:w-auto'
				style={{ boxShadow: '0px 4px 20px 0 rgba(0,0,0,0.1)' }}>
				<div className='flex md:flex-row flex-col justify-end md:items-center gap-[18px] md:gap-10 p-[20px] pb-[24px] md:px-[120px] md:py-8 w-full md:w-[1440px]'>
					<div className='flex flex-col justify-center items-start flex-grow relative'>
						<p className='text-[20px] md:text-[26px] font-medium text-right text-[#0f0e0e]'>
							{getCartPrice().toLocaleString()}원
						</p>
						<p className='text-sm md:text-lg font-medium text-right text-red-500'>
							하루 도시락 30개부터 배달 가능합니다
						</p>
					</div>
					<div className='flex justify-start items-center gap-3'>
						<div
							onMouseEnter={() => setResetHover(true)}
							onMouseLeave={() => setResetHover(false)}
							className='hover:cursor-pointer flex justify-center items-center rounded-lg hover:bg-[#f8f8f8] bg-white border border-neutral-200 size-[52px] md:size-[56px]'
							onClick={onResetItems}>
							<Reset />
						</div>
						<ButtonNumText
							count={getCartItemsCount()}
							value={'장바구니에 넣기'}
							disabled={
								getDosirakCount(items) < minDosirakCount
									? true
									: false
							}
							onClick={onClickAddToCart}
							className='md:w-[230px] flex-1'
						/>
					</div>
					{resetHover && (
						<div className='flex justify-center items-center absolute left-[986px] top-[-3px] gap-2 p-2 rounded-md bg-[#0f0e0e]'>
							<p className='text-xs text-center text-white'>
								비우고 다시 선택하기
							</p>
						</div>
					)}
				</div>
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
						onClick: () => router.push('/order/cart'),
						className: 'w-full md:min-h-[68px] min-h-[60px]',
					}}
					btn2nd={{
						value: '주문 추가하기',
						onClick: () => setCartModalOpen(false),
					}}
				/>
			)}
			{sameAddressDateNoticeModal && (
				<ModalCenter
					title={'잠깐!'}
					description={
						<>
							장바구니에 같은 주소와 날짜/시간으로
							<br />
							담겨진 상품이 이미 있습니다.
							<br />
							현재 상품으로 대체하시겠습니까?
						</>
					}
					btn1st={{
						value: '대체하기',
						onClick: replaceCartBundle,
						className: 'w-full md:min-h-[68px] min-h-[60px]',
					}}
					btn2nd={{
						value: '취소하기',
						onClick: () => setSameAddressDateNoticeModal(false),
					}}
				/>
			)}
		</div>
	);
}

export default OrderPage;

export const getDosirakCount = (items: IItem[]) => {
	let count = 0;
	items.forEach((item) => {
		if (item.menu.categoryId !== categorySideId) {
			count += item.count;
		}
	});
	return count;
};
