import { Button } from '@/components/Button';
import { ButtonNumText } from '@/components/ButtonNumText';
import { GNBOrder } from '@/components/GNBOrder';
import { TextField } from '@/components/TextField';
import { Camera } from '@/icons/Camera';
import { useCartStore } from '@/stores/cartStore';
import { useUserStore } from '@/stores/userStore';
import { fetchDistanceInKmCost } from '@/utils/distance';
import { createDocId, uploadFileData } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { serverAuthVBank } from '@/utils/payment';
import {
	useOrderCommentStore,
	useOrderCompanyNameStore,
	useOrderEmailStore,
	useOrderOtherPhoneStore,
	useOrderStickerFileStore,
	useOrderStickerPhraseStore,
} from '@/stores/orderInfoStore';
import { CheckRect } from '@/components/CheckRect';

const heyfoodAddress = '해운대구 송정2로 13번길 40';
const stickerPrice = 300;
// const originPath = 'https://heyfood-iota.vercel.app'
const originPath = 'http://localhost:3000'

function PaymentPage() {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [deliveryPrices, setDeliveryPrices] = useState<number[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [stickerCheck, setStickerCheck] = useState(false);
	const [file, setFile] = useState<File>();

	const user = useUserStore((state) => state.user);
	const { comment, setComment } = useOrderCommentStore();
	const { companyName, setCompanyName } = useOrderCompanyNameStore();
	const { stickerPhrase, setStickerPhrase } = useOrderStickerPhraseStore();
	const { setIsFile } = useOrderStickerFileStore();
	const { email, setEmail } = useOrderEmailStore();
	const { otherPhone, setOtherPhone } = useOrderOtherPhoneStore();

	const fileInputRef = useRef<HTMLInputElement>(null);
	const cart = useCartStore((state) => state.cart);

	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/login');
		} else {
			setEmail(user.email ?? '');
		}
	}, [user]);

	const totalCount = useMemo(() => {
		let totalCount = 0;

		cart.forEach((bundle) => {
			bundle.items.forEach((item) => {
				totalCount += item.count;
			});
		});

		return totalCount;
	}, [cart]);

	const onClickPay = async () => {
		if (!companyName) {
			alert('업체명/현장명을 입력해주세요.');
			return;
		}

		if (stickerCheck && !stickerPhrase && stickerCheck && !file) {
			alert(
				'스티커를 체크하신 경우 스티커 문구나 사진을 업로드해주세요.'
			);
			return;
		}

		if (user) {
			const orderDocId = createDocId('orders');

			if (file) {
				await uploadFileData(file, `stickers/${orderDocId}`);
			}

			await serverAuthVBank(
				orderDocId,
				wholePrice,
				`${cart.at(0)?.items.at(0)?.menu.name} 외 ${totalCount - 1}건`,
				'정수현',
				`${originPath}/api/nicepay/approve`
			);
		}
	};

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

	const wholePrice = useMemo(() => {
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

		if (stickerCheck) {
			return stickerPrice * totalCount + itemsTotal + deliveryTotal;
		}

		return itemsTotal + deliveryTotal;
	}, [cart, deliveryPrices, stickerCheck]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0] ?? null;
		if (selected) {
			setFile(selected);
			setIsFile(true);
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
			const price = await fetchDistanceInKmCost(origin, destination);

			return price;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='h-screen-dynamic flex flex-col bg-[#fffbea]'>
			<GNBOrder hideCart />
			<div className='flex flex-col justify-start items-center self-stretch gap-8 md:gap-[60px] px-5 md:px-60 pt-10 md:pt-20 pb-[60px] md:pb-[220px] bg-[#fffbea] overflow-auto md:h-[calc(100vh-70px-120px)]'>
				<p className='hidden md:block text-[50px] font-bold text-center text-[#0f0e0e]'>
					주문/결제
				</p>
				<div className='flex flex-col justify-start items-start md:w-[960px] relative gap-3.5 self-stretch md:self-auto'>
					<p className='text-md md:text-2xl font-bold text-left text-[#0f0e0e]'>
						주문자 정보
					</p>
					<div className='flex flex-col justify-start items-start self-stretch gap-6 md:gap-9 p-6 bg-white'>
						<div className='flex md:flex-row flex-col items-center gap-6 md:gap-[32px]'>
							<div className='flex justify-start items-start self-stretch relative gap-2'>
								<p className='md:text-base font-bold text-left text-[#0f0e0e]'>
									이름
								</p>
								<p className='md:text-base text-left text-[#0f0e0e]'>
									{user?.name}
								</p>
							</div>
							<div className='flex justify-start items-start self-stretch relative gap-2'>
								<p className='md:text-base font-bold text-left text-[#0f0e0e]'>
									전화번호
								</p>
								<p className='md:text-base text-left text-[#0f0e0e]'>
									{user?.phone}
								</p>
							</div>
						</div>
						<div className='flex flex-col justify-start items-start self-stretch relative gap-2'>
							<p className='md:text-base font-bold text-left text-[#0f0e0e]'>
								이메일
							</p>
							<TextField
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='이메일을 입력하여주세요 (세금계산서)'
							/>
						</div>
						<div className='flex flex-col justify-start items-start self-stretch relative gap-2'>
							<p className='text-base font-bold text-left text-[#0f0e0e]'>
								비상 연락처 (선택)
							</p>
							<TextField
								value={otherPhone}
								onChange={(e) => setOtherPhone(e.target.value)}
								placeholder='비상 연락처를 입력하여주세요.'
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-start items-start md:w-[960px] relative gap-3.5 self-stretch md:self-auto'>
					<p className='text-md md:text-2xl font-bold text-left text-[#0f0e0e]'>
						배송정보
					</p>
					<div className='flex flex-col justify-start items-start self-stretch gap-6 md:gap-9 p-6 bg-white'>
						<div className='flex flex-col justify-start items-start self-stretch relative gap-2'>
							<p className='md:text-base font-bold text-left text-[#0f0e0e]'>
								요청사항 (선택)
							</p>
							<TextField
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								placeholder='요청사항을 입력해주세요'
							/>
						</div>
						<div className='flex flex-col justify-start items-start self-stretch relative gap-2'>
							<p className='md:text-base font-bold text-left text-[#0f0e0e]'>
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
				<div className='flex flex-col justify-start items-start md:w-[960px] relative gap-3.5 self-stretch md:self-auto'>
					<div className='flex justify-between items-center self-stretch'>
						<div className='flex items-center gap-[12px]'>
							<CheckRect
								checked={stickerCheck}
								onClick={() => setStickerCheck((prev) => !prev)}
							/>
							<p className='text-md md:text-2xl font-bold text-left text-[#0f0e0e]'>
								스티커 (선택)
							</p>
						</div>
						<p className='text-right text-[#0f0e0e]'>개당 +300원</p>
					</div>
					<div
						style={{ opacity: stickerCheck ? 1 : 0.4 }}
						className='relative flex md:flex-row flex-col justify-start items-start self-stretch gap-6 p-6 bg-white'>
						<div className='flex flex-col items-center p-4 bg-white border border-neutral-200 rounded-lg gap-[10px] w-full md:w-auto'>
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
						<div className='flex flex-col justify-start items-start self-stretch relative gap-2 flex-1 md:max-h-auto max-h-[200px]'>
							<p className='md:text-base font-bold text-left text-[#0f0e0e]'>
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
						{!stickerCheck && (
							<div className='bg-transparent w-full h-full absolute top-0 left-0' />
						)}
					</div>
				</div>
				<div className='flex flex-col justify-start items-start md:w-[960px] gap-3.5 max-w-[calc(100vw-40px)]'>
					<div className='flex justify-between items-center self-stretch relative'>
						<p className='text-md md:text-2xl font-bold text-left text-[#0f0e0e]'>
							주문내역
						</p>
						<p className='text-sm md:text-sm text-center text-[#0f0e0e]'>
							배송비는 거리 기반으로 책정됩니다
						</p>
					</div>
					<div className='flex flex-col justify-start items-start self-stretch gap-5'>
						<div className='flex flex-col justify-start items-center self-stretch gap-2'>
							{cart.map((bundle, i) => (
								<div
									key={i}
									className='flex flex-col justify-start items-start self-stretch '>
									<div className='flex justify-start items-center self-stretch relative gap-3 px-4 md:px-6 py-4 bg-white border-b border-neutral-200'>
										<p className='min-w-[62px]  md:text-base font-bold text-left text-[#0f0e0e]'>
											배달주소
										</p>
										<p className=' md:text-lg text-left text-[#0f0e0e]'>
											{bundle.address}{' '}
											{bundle.addressDetail}
										</p>
									</div>
									<div className='flex flex-col justify-start items-start self-stretch gap-4 md:gap-5 p-4 md:p-6 bg-white'>
										<div className='flex md:flex-row flex-col justify-between items-start self-stretch relative gap-3'>
											<div className='flex md:items-center gap-[12px]'>
												<p className='md:text-base font-bold text-left text-[#0f0e0e]'>
													배달날짜
												</p>
												<p className=' md:text-lg text-left text-[#0f0e0e]'>
													{new Date(
														bundle.dateTime
													).toLocaleString()}
												</p>
											</div>
											<div className='flex justify-between md:justify-start items-center relative gap-2 md:gap-[12px] md:self-auto self-stretch'>
												<p className='md:text-base  text-right text-[#0f0e0e]'>
													배송비
												</p>
												<p className='font-bold md:font-[400] md:text-xl text-right text-[#0f0e0e]'>
													{deliveryPrices[
														i
													]?.toLocaleString() ?? 0}
													원
												</p>
											</div>
										</div>
										{bundle.items.map((item, itemIdx) => (
											<div
												key={itemIdx}
												className='flex justify-between items-end self-stretch md:gap-0 gap-1'>
												<div className='flex flex-col justify-start relative gap-1 md:gap-2'>
													<div className='flex items-center gap-2 md:gap-[12px]'>
														<p className=' md:text-[22px] text-left text-[#0f0e0e]'>
															{item.menu.name}
														</p>
													</div>
													<div className='flex items-center gap-2 md:gap-3'>
														<p className=' md:text-xl text-left text-gray-500'>
															{item.menu.price.toLocaleString()}
															원
														</p>
														<p className=' md:text-xl text-left text-gray-300'>
															x{' '}
														</p>
														<p className=' md:text-xl text-left text-gray-300'>
															{item.count.toLocaleString()}
															개
														</p>
													</div>
												</div>
												<div className='flex justify-end items-center relative gap-2 self-end md:self-auto'>
													<p className='font-bold md:font-[400] md:text-[22px] text-right text-[#0f0e0e]'>
														{(
															item.menu.price *
															item.count
														).toLocaleString()}
														원
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							))}
							{stickerCheck && (
								<div className='p-4 md:p-[24px] bg-white flex justify-between items-center self-stretch '>
									<div className='flex justify-start items-center relative gap-2 md:gap-4'>
										<div className='flex items-center gap-2 md:gap-[12px]'>
											<p className=' md:text-[22px] text-left text-[#0f0e0e]'>
												스티커
											</p>
										</div>
										<div className='flex items-center gap-2 md:gap-[12px]'>
											<p className=' md:text-xl text-left text-gray-500'>
												{stickerPrice}원
											</p>
											<p className=' md:text-xl text-left text-gray-300'>
												x{' '}
											</p>
											<p className='md:text-xl text-left text-gray-300'>
												{totalCount.toLocaleString()}개
											</p>
										</div>
									</div>
									<div className='flex justify-end items-center relative gap-2 self-end md:self-auto'>
										<p className='font-bold md:font-[400] md:text-[22px] text-right text-[#0f0e0e]'>
											{(
												stickerPrice * totalCount
											).toLocaleString()}
											원
										</p>
									</div>
								</div>
							)}
						</div>
						<div className='flex justify-between items-center self-stretch gap-6 p-4 md:p-6 bg-white'>
							<p className='md:text-2xl font-bold text-left text-[#0f0e0e]'>
								총 결제 금액
							</p>
							<p className='md:text-2xl font-bold text-right text-[#f2ab27]'>
								{wholePrice.toLocaleString()}원
							</p>
						</div>
					</div>
				</div>
			</div>
			<div
				className='flex justify-center items-center w-[100vw] px-[20px] md:px-[120px] py-5 md:py-8 rounded-tl-3xl rounded-tr-3xl bg-white'
				style={{ boxShadow: '0px 4px 20px 0 rgba(0,0,0,0.1)' }}>
				<div className='w-full max-w-[960px] flex justify-center items-center justify-between'>
					<div className='flex flex-col justify-center items-start gap-1 md:gap-2'>
						<p className='md:text-[26px] font-medium text-right text-[#0f0e0e]'>
							{wholePrice.toLocaleString()}원
						</p>
						<p className='md:text-lg font-medium text-right text-[#909090]'>
							부가세 및 배송비 포함
						</p>
					</div>
					<ButtonNumText
						value={'결제하기'}
						count={0}
						onClick={onClickPay}
						className='min-w-[124px]'
					/>
				</div>
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
