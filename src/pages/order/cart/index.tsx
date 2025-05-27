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
		<div className='h-screen flex flex-col overflow-hidden'>
			<GNBOrder hideCart />
			<div className='flex flex-col justify-start items-center self-stretch gap-[60px] px-[120px] pt-20 pb-[100px] bg-[#fffbea] h-[calc(100vh-96px)] overflow-auto'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
					<p className='text-[50px] font-bold text-center text-[#0f0e0e]'>
						장바구니
					</p>
				</div>
				<div className='flex flex-col justify-start items-start w-[1200px] gap-12'>
					{cart.length > 0 ? (
						cart.map((data, dataIdx) => (
							<div
								key={data.id}
								className='flex flex-col justify-start items-center self-stretch gap-3'>
								<DeleteButton
									onClick={() => onClickDeleteBundle(dataIdx)}
								/>
								<div className='flex flex-col justify-start items-center self-stretch gap-1.5'>
									<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
										<div className='flex justify-start items-start self-stretch bg-white'>
											<div className='flex justify-start items-center flex-grow relative gap-3 px-6 py-4 border-t-0 border-r border-b-0 border-l-0 border-neutral-200'>
												<div className='flex justify-center items-center relative gap-2 pt-0.5'>
													<p className='text-base font-bold text-left text-[#0f0e0e]'>
														배달주소
													</p>
												</div>
												<p className='text-lg text-left text-[#0f0e0e]'>
													{data.address}{' '}
													{data.addressDetail}
												</p>
											</div>
											<div className='flex justify-start items-center flex-grow relative gap-3 px-6 py-4'>
												<div className='flex justify-center items-center relative gap-2 pt-0.5'>
													<p className='text-base font-bold text-left text-[#0f0e0e]'>
														날짜 및 시간
													</p>
												</div>
												<p className='text-lg text-left text-[#0f0e0e]'>
													{formatDateKR(
														data.dateTime
													)}
												</p>
											</div>
										</div>
										<div className='flex flex-col justify-start items-center w-[1200px] relative gap-8 px-[60px] py-8 bg-white border-t border-r-0 border-b-0 border-l-0 border-neutral-200'>
											{data.items.map((item, idx) => (
												<>
													{idx !== 0 && (
														<svg
															width={1080}
															height={1}
															viewBox='0 0 1080 1'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
															className='self-stretch flex-grow-0 flex-shrink-0'
															preserveAspectRatio='none'>
															<line
																y1='0.5'
																x2={1080}
																y2='0.5'
																stroke='#E5E5E5'
															/>
														</svg>
													)}
													<div className='flex justify-start items-center self-stretch gap-6 relative'>
														<div className='flex flex-col justify-start items-start flex-grow relative gap-2'>
															<p className='text-[28px] font-bold text-left text-[#0f0e0e]'>
																{item.menu.name}
															</p>
															<p className='text-[26px] font-light text-left text-[#0f0e0e]'>
																{item.menu.price.toLocaleString()}
																원
															</p>
														</div>
														<div className='flex justify-start items-center relative'>
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
															className='cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-[-44px]'>
															<Close
																color='#CBCBCB'
																size={28}
															/>
														</div>
													</div>
												</>
											))}
										</div>
									</div>
									{/* <div
										onClick={() => onClickEdit(dataIdx)}
										className='select-none cursor-pointer flex justify-center items-center relative gap-2 px-6 py-3 rounded-lg'>
										<p className='text-xl font-medium text-left text-[#f2ab27] underline underline-offset-[6px]'>
											수정하기
										</p>
									</div> */}
								</div>
							</div>
						))
					) : (
						<div className='h-[600px] w-full flex items-center justify-center text-gray-300 text-[24px] font-bold bg-white'>
							장바구니가 비어있습니다
						</div>
					)}
					<div className='flex flex-col justify-start items-start self-stretch gap-3'>
						<div className='flex justify-start items-center self-stretch gap-6 px-[60px] py-8 bg-white'>
							<div className='select-none flex justify-start items-center flex-grow relative gap-6'>
								<p className='text-2xl font-bold text-left text-[#0f0e0e]'>
									총 상품 금액
								</p>
								<p className='text-3xl font-semibold text-left text-[#f2ab27]'>
									{getTotalPrice().toLocaleString()}원
								</p>
							</div>
							<ButtonBorder
								value={'주문 추가하기'}
								onClick={() => router.push('/order')}
							/>
							<Button
								style={{ height: 58 }}
								value='주문하기'
								onClick={() => router.push('/order/payment')}
								disabled={cart.length === 0 ? true : false}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
