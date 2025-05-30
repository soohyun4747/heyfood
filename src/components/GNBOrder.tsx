import { ArrowLeft } from '@/icons/ArrowLeft';
import { Cart } from '@/icons/Cart';
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'next/router';

const mobPageTitles: { [key: string]: string } = {
	'/order': '주문하기',
	'/order/cart': '장바구니',
	'/order/payment': '주문/결제',
};

export function GNBOrder({ hideCart }: { hideCart?: boolean }) {
	const router = useRouter();
	const cart = useCartStore((state) => state.cart);

	//fixed w-full 
	return (
		<div className='flex justify-between items-center self-stretch md:h-24 px-[20px] md:px-[120px] py-[16px] md:py-[17px] bg-white z-[2]'>
			<div
				className='flex justify-center items-center self-stretch gap-2 p-1.5 rounded hover:cursor-pointer'
				onClick={() => router.push('/')}>
				<ArrowLeft />
				<p className='hidden md:block select-none text-base font-bold text-left text-[#0f0e0e]'>
					홈으로 돌아가기
				</p>
			</div>
			<p className='text-lg font-bold md:hidden'>
				{mobPageTitles[router.pathname]}
			</p>
			{!hideCart && (
				<div
					className='hover:cursor-pointer select-none flex flex-col justify-center items-center self-stretch gap-1 p-1.5 rounded relative'
					onClick={() => router.push('/order/cart')}>
					<Cart />
					<p className='hidden md:block text-xs font-bold text-left text-[#0f0e0e]'>
						장바구니
					</p>
					{cart.length > 0 && (
						<div className='flex justify-center items-end h-4 gap-2 px-[5px] rounded-lg bg-[#ffcd70] absolute top-0 md:top-[4px] right-[-2px] md:right-[8px]'>
							<p className='text-[10px] font-bold text-center text-white'>
								{cart.length}
							</p>
						</div>
					)}
				</div>
			)}
			{hideCart && <div className='size-[36px] md:hidden' />}
		</div>
	);
}
