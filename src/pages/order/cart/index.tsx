import { Button } from '@/components/Button';
import { ButtonBorder } from '@/components/ButtonBorder';
import { ButtonMinusRound } from '@/components/ButtonMinusRound';
import { ButtonPlusRound } from '@/components/ButtonPlusRound';
import { DeleteButton } from '@/components/DeleteButton';
import { GNBOrder } from '@/components/GNBOrder';
import { Close } from '@/icons/Close';
import { useCartStore } from '@/stores/cartStore';
import { useUserStore } from '@/stores/userStore';
import { formatDateKR } from '@/utils/time';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function CartPage() {
	const router = useRouter();
	const { user } = useUserStore();
	const { cart, setCart } = useCartStore();

	console.log(cart);

	useEffect(() => {
		if (!user) {
			router.push('/login');
		}
	}, [user]);

	const getTotalPrice = () => {
		let price = 0;
		cart.forEach((data) => {
			data.items.forEach((item) => {
				price += item.count * item.menu.price;
			});
		});

		return price;
	};

	const onClickPlusButton = (dataIdx: number, itemIdx: number) => {
		const item = cart[dataIdx]?.items[itemIdx];
		if (item) {
			item.count += 1;
			cart[dataIdx].items[itemIdx] = item;
			setCart(cart);
		}
	};

	const onClickMinusButton = (dataIdx: number, itemIdx: number) => {
		const item = cart[dataIdx]?.items[itemIdx];
		if (item) {
			if (item.count - 1 < 1) {
				return;
			} else {
				item.count -= 1;
				cart[dataIdx].items[itemIdx] = item;
				setCart(cart);
			}
		}
	};

	const onClickDeleteItem = (dataIdx: number, itemIdx: number) => {
		cart[dataIdx]?.items.splice(itemIdx, 1);
		if (cart[dataIdx]?.items.length < 1) {
			onClickDeleteBundle(dataIdx);
			return;
		}

		setCart(cart);
	};

	const onClickDeleteBundle = (dataIdx: number) => {
		cart.splice(dataIdx, 1);
		setCart(cart);
	};

	return (
		<div className='h-screen-dynamic flex flex-col overflow-hidden'>
			<GNBOrder hideCart />
			<div className='flex flex-col justify-start items-center self-stretch gap-[60px] px-[20px] md:px-[120px] pt-10 md:pt-20 pb-[60px] md:pb-[100px] bg-[#fffbea] md:h-[calc(100vh-96px)] min-h-[calc(100vh-68px)] overflow-auto'>
				<p className='hidden md:block text-[50px] font-bold text-center text-[#0f0e0e]'>
					장바구니
				</p>
				<div className='flex flex-col justify-start items-start md:w-[1200px] gap-12'>
					{cart.length > 0 ? (
						cart.map((data, dataIdx) => (
							<div
								key={data.id}
								className='flex flex-col justify-start items-center self-stretch gap-3'>
								<DeleteButton
									onClick={() => onClickDeleteBundle(dataIdx)}
								/>
								<div className='flex flex-col justify-start items-start self-stretch '>
									<div className='flex justify-start md:flex-row flex-col items-start self-stretch bg-white'>
										<div className='flex justify-start items-center flex-grow gap-3 p-4 md:px-6 md:py-4 border-t-0 md:border-r border-b md:border-b-0 border-l-0 border-neutral-200'>
											<p className='text-sm md:text-base font-bold text-left text-[#0f0e0e] min-w-[65px] md:min-w-auto'>
												배달주소
											</p>
											<p className='text-sm md:text-lg text-left text-[#0f0e0e]'>
												{data.address}{' '}
												{data.addressDetail}
											</p>
										</div>
										<div className='flex justify-start items-center flex-grow gap-3 p-4 md:px-6 md:py-4'>
											<p className='text-sm md:text-base font-bold text-left text-[#0f0e0e] min-w-[65px] md:min-w-auto'>
												날짜 및 시간
											</p>
											<p className='text-sm md:text-lg text-left text-[#0f0e0e]'>
												{formatDateKR(
													new Date(data.dateTime)
												)}
											</p>
										</div>
									</div>
									<div className='flex flex-col justify-start items-center md:w-[1200px] relative gap-6 md:gap-8 px-4 md:px-[60px] py-5 md:py-8 bg-white border-t border-r-0 border-b-0 border-l-0 border-neutral-200 self-stretch md:self-auto'>
										{data.items.map((item, idx) => (
											<>
												{idx !== 0 && (
													<div className='md:w-[1080px] h-[1px] self-stretch bg-[#E5E5E5]' />
												)}
												<div className='flex flex-col self-stretch'>
													<div className='flex justify-start items-center self-stretch gap-6 relative'>
														<div className='flex flex-col justify-start items-start flex-grow relative gap-2'>
															<p className='text-[20px] md:text-[28px] font-bold text-left text-[#0f0e0e]'>
																{item.menu.name}
															</p>
															<p className='text-lg md:text-[26px] font-light text-left text-[#0f0e0e]'>
																{item.menu.price.toLocaleString()}
																원
															</p>
														</div>
														<div className='hidden md:flex justify-start items-center relative'>
															<ButtonMinusRound
																onClick={() =>
																	onClickMinusButton(
																		dataIdx,
																		idx
																	)
																}
															/>
															<div className='select-none flex justify-center items-center relative gap-2 py-[9px] rounded-[100px]'>
																<p className='w-[62px] text-2xl font-bold text-center text-[#0f0e0e]'>
																	{item.count}
																</p>
															</div>
															<ButtonPlusRound
																onClick={() =>
																	onClickPlusButton(
																		dataIdx,
																		idx
																	)
																}
															/>
														</div>
														<div
															onClick={() =>
																onClickDeleteItem(
																	dataIdx,
																	idx
																)
															}
															className='cursor-pointer absolute top-[14px] md:top-1/2 transform -translate-y-1/2 right-0 md:right-[-44px]'>
															<Close
																color='#CBCBCB'
																size={28}
															/>
														</div>
													</div>
													<div className='flex justify-end items-center md:hidden'>
														<ButtonMinusRound
															onClick={() =>
																onClickMinusButton(
																	dataIdx,
																	idx
																)
															}
														/>
														<div className='select-none flex justify-center items-center relative gap-2 py-[9px] rounded-[100px]'>
															<p className='w-[48px] md:w-[62px] text-md md:text-2xl font-bold text-center text-[#0f0e0e]'>
																{item.count}
															</p>
														</div>
														<ButtonPlusRound
															onClick={() =>
																onClickPlusButton(
																	dataIdx,
																	idx
																)
															}
														/>
													</div>
												</div>
											</>
										))}
									</div>
								</div>
							</div>
						))
					) : (
						<div className='h-[600px] w-full flex items-center justify-center text-gray-300 text-[24px] font-bold bg-white'>
							장바구니가 비어있습니다
						</div>
					)}
					<div className='flex flex-col justify-start items-start self-stretch gap-3'>
						<div className='flex md:flex-row flex-col justify-start items-center self-stretch gap-3 md:gap-6 md:px-[60px] md:py-8 p-4 bg-white'>
							<div className='select-none flex justify-between md:justify-start items-center flex-grow relative gap-6 self-stretch md:self-auto'>
								<p className='text-md md:text-2xl font-bold text-left text-[#0f0e0e]'>
									총 상품 금액
								</p>
								<p className='text-[24px] md:text-3xl font-semibold text-left text-[#f2ab27]'>
									{getTotalPrice().toLocaleString()}원
								</p>
							</div>
							<div className='flex gap-3 md:gap-6 self-stretch'>
								<ButtonBorder
									value={'주문 추가하기'}
									onClick={() => router.push('/order')}
									className='flex-1 md:min-w-[170px]'
								/>
								<Button
									style={{ height: 58 }}
									value='주문하기'
									onClick={() =>
										router.push('/order/payment')
									}
									className='flex-1'
									disabled={cart.length === 0 ? true : false}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
