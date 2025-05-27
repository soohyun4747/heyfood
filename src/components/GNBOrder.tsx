import { ArrowLeft } from '@/icons/ArrowLeft';
import { Cart } from '@/icons/Cart';
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'next/router';

export function GNBOrder({ hideCart }: { hideCart?: boolean }) {
	const router = useRouter();
	const cart = useCartStore((state) => state.cart);
	

	return (
		<div className='flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-24 px-[120px] py-[17px] bg-white'>
			<div className='flex justify-between items-center flex-grow'>
				<div
					className='flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2 p-1.5 rounded hover:cursor-pointer'
					onClick={() => router.push('/')}>
					<ArrowLeft />
					<p className='select-none flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#0f0e0e]'>
						홈으로 돌아가기
					</p>
				</div>
				{!hideCart && (
					<div
						className='hover:cursor-pointer select-none flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1 p-1.5 rounded'
						onClick={() => router.push('/order/cart')}>
						<Cart />
						<p className='flex-grow-0 flex-shrink-0 text-xs font-bold text-left text-[#0f0e0e]'>
							장바구니
						</p>
						{cart.length > 0 && (
							<div className='flex justify-center items-end flex-grow-0 flex-shrink-0 h-4 gap-2 px-[5px] rounded-lg bg-[#ffcd70] absolute top-0 right-[8px]'>
								<p className='flex-grow-0 flex-shrink-0 text-[10px] font-bold text-center text-white'>
									{cart.length}
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
