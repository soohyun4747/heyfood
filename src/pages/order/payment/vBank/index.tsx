import { ButtonRect } from '@/components/ButtonRect';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { UserType, useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function OrderVBankPage() {
	const router = useRouter();
	const user = useUserStore((state) => state.user);

	useEffect(() => {
		const query = router.query;

		console.log(query);
		

		if (query.resultCode === '0000') {
			console.log('가상계좌 발급 성공:', query);
		} else {
			console.warn('가상계좌 발급 실패:', query);
		}
	}, [router.query]);

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-center items-center self-stretch gap-[60px] px-[120px] pt-[100px] pb-40 min-h-full'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
					<p className='text-[50px] font-bold text-center text-[#0f0e0e]'>
						가상 계좌
					</p>
				</div>
			</div>
		</Common>
	);
}

export default OrderVBankPage;
