import { ButtonRect } from '@/components/ButtonRect';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';

function SignUpCompletePage() {
	const user = useUserStore((state) => state.user);
	const router = useRouter();

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-center items-center self-stretch gap-[60px] md:px-[120px] pt-[40px] md:pt-[100px] pb-[120px] md:pb-40 min-h-[calc(100vh-70.4px)] md:min-h-[calc(100vh-112px)]'>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
					<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
						회원가입 완료
					</p>
				</div>
				<div className='flex flex-col justify-start items-center gap-10'>
					<div className='flex flex-col justify-start items-center relative gap-6'>
						<p className='text-[24px] md:text-[32px] font-bold text-center text-[#0f0e0e]'>
							<span>{user?.name}님 </span>
							<br />
							<span>
								헤이푸드박스 회원이 되신 것을{' '}
								<br className='md:hidden' />
								환영합니다!
							</span>
						</p>
						<p className='md:text-xl text-left text-[#0f0e0e]'>
							이제 로그인 후 다양한 서비스를 경험해 보세요!
						</p>
					</div>
					<ButtonRect
						value={'주문하러 가기'}
						style={{ width: 211, alignSelf: 'center' }}
						onClick={() => router.push('/order')}
					/>
				</div>
			</div>
		</Common>
	);
}

export default SignUpCompletePage;
