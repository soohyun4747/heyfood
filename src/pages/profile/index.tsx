import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useEffect } from 'react';
import { logout } from '@/utils/firebase';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';
import { BasicInfo } from '@/components/pages/profile/BasicInfo';
import { OrderInfo } from '@/components/pages/profile/OrderInfo';
import { useProfileTabIdxStore } from '@/stores/profileTabIdxStore';
import { useItemsStore } from '@/stores/itemsStore';
import { useCartStore } from '@/stores/cartStore';
import {
	useOrderCommentStore,
	useOrderCompanyNameStore,
	useOrderEmailStore,
	useOrderHeatingStore,
	useOrderOtherPhoneStore,
	useOrderStickerFileStore,
	useOrderStickerPhraseStore,
} from '@/stores/orderInfoStore';

function ProfilePage() {
	const user = useUserStore((state) => state.user);
	const { tabIdx, setTabIdx } = useProfileTabIdxStore();
	const onResetItems = useItemsStore((state) => state.onResetItems);
	const { setCart } = useCartStore();

	const { setComment } = useOrderCommentStore();
	const { setCompanyName } = useOrderCompanyNameStore();
	const { setStickerPhrase } = useOrderStickerPhraseStore();
	const { setIsFile } = useOrderStickerFileStore();
	const { setEmail } = useOrderEmailStore();
	const { setOtherPhone } = useOrderOtherPhoneStore();
	const { setHeating } = useOrderHeatingStore();

	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/login');
		}
	}, [user]);

	// 🔁 5분(300,000ms)마다 새로고침
	useEffect(() => {
		const interval = setInterval(() => {
			window.location.reload();
		}, 300000); // 300,000ms = 5분

		return () => clearInterval(interval); // cleanup
	}, []);

	const onLogout = async () => {
		await logout();
		resetCartItems();
		resetOrderInfo();
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
		setHeating(undefined);
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch gap-10 md:gap-[60px] md:px-[120px] pt-[40px] md:pt-[100px] pb-[120px] md:pb-40 min-h-fit md:h-screen'>
				<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
					마이페이지
				</p>
				<div className='select-none flex md:flex-row flex-col justify-start items-start gap-8 self-stretch md:self-auto'>
					<div className='flex md:flex-col justify-start items-start md:w-[276px] gap-4 md:gap-6 md:bg-white px-[20px] md:px-0'>
						{['주문내역', '기본정보'].map((value, idx) => (
							<div
								key={idx}
								onClick={() => setTabIdx(idx)}
								style={{
									color:
										tabIdx === idx ? '#f2ab27' : '#0f0e0e',
									borderColor:
										tabIdx === idx ? '#f2ab27' : '#0f0e0e',
									borderBottomWidth: tabIdx === idx ? 1 : 0,
								}}
								className='flex justify-center items-center relative gap-2 hover:cursor-pointer'>
								<p className='md:text-2xl font-bold text-left'>
									{value}
								</p>
							</div>
						))}
					</div>
					{tabIdx === 0 ? <OrderInfo /> : <BasicInfo />}
				</div>
				{tabIdx === 1 ? (
					<div
						onClick={onLogout}
						className='hover:cursor-pointer flex justify-center items-center relative gap-2 px-6 py-3 rounded-lg'>
						<p className='select-none md:text-xl font-medium text-left text-[#909090] underline underline-offset-4'>
							로그아웃
						</p>
					</div>
				) : undefined}
			</div>
		</Common>
	);
}

export default ProfilePage;
