import { Button } from '@/components/Button';
import { ButtonNumText } from '@/components/ButtonNumText';
import { GNBOrder } from '@/components/GNBOrder';
import { TextField } from '@/components/TextField';
import { Camera } from '@/icons/Camera';
import { useCartStore } from '@/stores/cartStore';
import { useUserStore } from '@/stores/userStore';
import { fetchDistanceInKm } from '@/utils/distance';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const heyfoodAddress = '해운대구 송정2로 13번길 40';

function PaymentPage() {
	const [comment, setComment] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [stickerPhrase, setStickerPhrase] = useState('');
	const [, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [deliveryPrices, setDeliveryPrices] = useState<number[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const user = useUserStore((state) => state.user);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const cart = useCartStore((state) => state.cart);

	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/login');
		}
	}, [user]);

	// const onClickPay = () => {
	// 	if (user) {
	// 		const orderData: IOrder = {
	// 			id: '',
	// 			ordererId: user.id,
	// 			ordererType: user.userType,
	// 			address: user.address ?? '',
	// 			addressDetail: user.addressDetail ?? '',
	// 			createdAt: Timestamp.now(),
	// 		};
	// 		addData('orders', orderData);

	// 		const orderItems: IOrderItem[] = [];
	// 		// cart.forEach((data) => {
	// 		// 	orderItems.push({
	// 		// 		id: '',
	// 		// 		orderId
	// 		// 	})
	// 		// });
	// 		// addMultipleDatas('orderItems', orderItems);
	// 	}
	// };

	useEffect(() => {
		setLoading(true);
		Promise.all(cart.map((bundle) => getDeliveryPrice(bundle.address)))
			// 혹시라도 undefined가 섞일 수 있다면 필터링
			.then((prices) =>
				setDeliveryPrices(prices.filter((p): p is number => p != null))
			)
			.catch((err) => {
				console.error('배송비 계산 중 오류:', err);
				setDeliveryPrices([]);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [cart]);

	const getWholePrice = (): number => {
		const itemsTotal = cart.reduce((sum, bundle) => {
			return (
				sum +
				bundle.items.reduce(
					(bundleSum, item) =>
						bundleSum + item.menu.price * item.count,
					0
				)
			);
		}, 0);

		const deliveryTotal = (deliveryPrices ?? []).reduce(
			(sum, d) => sum + d,
			0
		);

		return itemsTotal + deliveryTotal;
	};

	const wholePrice = getWholePrice();

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0] ?? null;
		if (selected) {
			setFile(selected);
			setPreviewUrl(URL.createObjectURL(selected));
		}
	};

	const handleSelectClick = () => {
		fileInputRef.current?.click();
	};

	const getDeliveryPrice = async (address: string) => {
		try {
			const origin = heyfoodAddress;
			//부가 주소를 빼기 위해서
			const destination = address.split(' (').at(0)!;
			const price = await fetchDistanceInKm(origin, destination);
			console.log({ price });

			return price;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='h-screen flex flex-col overflow-hidden'>
			<GNBOrder hideCart />
			<div className='flex flex-col justify-start items-center self-stretch gap-[60px] px-60 pt-20 pb-[100px] bg-[#fffbea] overflow-auto h-[calc(100%-96px-135px)]'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
					<p className='text-[50px] font-bold text-center text-[#0f0e0e]'>
						주문/결제
					</p>
				</div>
				<div className='flex flex-col justify-start items-start w-[960px] relative gap-3.5'>
					<p className='text-2xl font-bold text-left text-[#0f0e0e]'>
						배송정보
					</p>
					<div className='flex flex-col justify-start items-start self-stretch gap-9 p-6 bg-white'>
						<div className='flex flex-col justify-start items-start self-stretch relative gap-2'>
							<p className='text-base font-bold text-left text-[#0f0e0e]'>
								요청사항
							</p>
							<TextField
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								placeholder='요청사항을 입력해주세요'
							/>
						</div>
						<div className='flex flex-col justify-start items-start self-stretch relative gap-2'>
							<p className='text-base font-bold text-left text-[#0f0e0e]'>
								업체명/현장명
							</p>
							<TextField
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
								placeholder='업체명(현장명)을 입력해주세요'
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-start items-start w-[960px] relative gap-3.5'>
					<p className='self-stretch w-[960px] text-2xl font-bold text-left text-[#0f0e0e]'>
						스티커 (옵션)
					</p>
					<div className='flex justify-start items-start self-stretch gap-6 p-6 bg-white'>
						<div className='flex flex-col items-center p-4 bg-white border border-neutral-200 rounded-lg gap-[10px]'>
							<div className='w-full h-[120px] min-w-[120px] border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center overflow-hidden'>
								{previewUrl ? (
									<img
										src={previewUrl}
										alt='Preview'
										className='object-cover w-full h-full'
									/>
								) : (
									<div className='flex flex-col items-center text-neutral-500'>
										<span className='mt-2 text-sm'>
											<Camera />
										</span>
									</div>
								)}
							</div>

							{/* 파일 선택 인풋 (보이지 않음) */}
							<input
								type='file'
								accept='image/*'
								onChange={handleFileChange}
								ref={fileInputRef}
								className='hidden'
							/>

							{/* 로컬에서 파일 선택 트리거 버튼 */}
							<Button
								value={'업로드'}
								onClick={handleSelectClick}
								style={{ height: 46, width: '100%' }}
							/>
						</div>
						<div className='flex flex-col justify-start items-start self-stretch flex-shrink-0 relative gap-2 flex-1'>
							<p className='text-base font-bold text-left text-[#0f0e0e]'>
								스티커 문구
							</p>
							<TextField
								value={stickerPhrase}
								onChange={(e) =>
									setStickerPhrase(e.target.value)
								}
								placeholder='스티커 문구를 작성해주세요'
								style={{ height: '-webkit-fill-available' }}
								multiline
								rows={6}
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-start items-start w-[960px] gap-3.5'>
					<div className='flex justify-between items-center self-stretch relative'>
						<p className='text-2xl font-bold text-left text-[#0f0e0e]'>
							주문내역
						</p>
						<p className='text-sm text-center text-[#0f0e0e]'>
							배송비는 거리 기반으로 책정됩니다
						</p>
					</div>
					<div className='flex flex-col justify-start items-start self-stretch gap-5'>
						<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0'>
							{cart.map((bundle, i) => (
								<div key={i} className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0'>
									<div className='flex justify-start items-center self-stretch relative gap-3 px-6 py-4 bg-white border-t-0 border-r-0 border-b border-l-0 border-neutral-200'>
										<div className='flex justify-center items-center relative gap-2 pt-0.5'>
											<p className='text-base font-bold text-left text-[#0f0e0e]'>
												배달주소
											</p>
										</div>
										<p className='text-lg text-left text-[#0f0e0e]'>
											{bundle.address}{' '}
											{bundle.addressDetail}
										</p>
									</div>
									<div className='flex flex-col justify-start items-start self-stretch gap-7 p-6 bg-white border-t-0 border-r-0 border-b border-l-0 border-neutral-200'>
										<div className='flex flex-col justify-start items-start self-stretch gap-6'>
											<div className='flex flex-col justify-start items-start self-stretch gap-5'>
												<div className='flex justify-between items-start self-stretch relative'>
													<div className='flex items-center gap-[12px]'>
														<p className='font-bold text-left text-[#0f0e0e]'>
															배달날짜
														</p>
														<p className='text-lg text-left text-[#0f0e0e]'>
															{bundle.dateTime.toLocaleString()}
														</p>
													</div>
													<div className='flex justify-start items-center relative gap-[12px]'>
														<p className='text-right text-[#0f0e0e]'>
															배송비
														</p>
														<p className='text-xl text-right text-[#0f0e0e]'>
															{deliveryPrices[
																i
															]?.toLocaleString() ??
																0}
															원
														</p>
													</div>
												</div>
												{bundle.items.map((item, itemIdx) => (
													<div key={itemIdx} className='flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0'>
														<div className='flex justify-start items-center relative gap-4'>
															<div className='flex items-center gap-[12px]'>
																<p className='text-[22px] text-left text-[#0f0e0e]'>
																	{
																		item
																			.menu
																			.name
																	}
																</p>
																<p className='text-xl text-left text-gray-500'>
																	{item.menu.price.toLocaleString()}
																	원
																</p>
															</div>
															<p className='text-xl text-left text-gray-300'>
																x{' '}
															</p>
															<p className='text-xl text-left text-gray-300'>
																{item.count.toLocaleString()}
																개
															</p>
														</div>
														<div className='flex justify-end items-center relative gap-2'>
															<p className='text-[22px] text-right text-[#0f0e0e]'>
																{(
																	item.menu
																		.price *
																	item.count
																).toLocaleString()}
																원
															</p>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className='flex flex-col justify-center items-start self-stretch gap-6 p-6 bg-white'>
							<div className='flex justify-between items-center self-stretch relative'>
								<p className='text-2xl font-bold text-left text-[#0f0e0e]'>
									총 결제 금액
								</p>
								<p className='w-[391px] h-[29px] text-2xl font-bold text-right text-[#f2ab27]'>
									{wholePrice.toLocaleString()}원
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className='flex justify-end items-center self-stretch gap-10 px-[120px] py-8 rounded-tl-3xl rounded-tr-3xl bg-white'
				style={{ boxShadow: '0px 4px 20px 0 rgba(0,0,0,0.1)' }}>
				<div className='flex flex-col justify-center items-start flex-grow relative'>
					<p className='text-[26px] font-medium text-right text-[#0f0e0e]'>
						{wholePrice.toLocaleString()}원
					</p>
					<p className='text-lg font-medium text-right text-[#909090]'>
						부가세 및 배송비 포함
					</p>
				</div>
				<ButtonNumText
					value={'결제하기'}
					count={0}
				/>
			</div>
			{loading && (
				<div className='fixed inset-0 bg-white/80 z-50 flex items-center justify-center'>
					<div className='w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin' />
				</div>
			)}
		</div>
	);
}

export default PaymentPage;
