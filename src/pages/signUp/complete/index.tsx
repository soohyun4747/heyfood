import { ButtonRect } from '@/components/ButtonRect';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';

function SignUpCompletePage() {
	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-[60px] px-[120px] pt-[100px] pb-40 min-h-full'>
				<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
					<p className='flex-grow-0 flex-shrink-0 text-[50px] font-bold text-center text-[#0f0e0e]'>
						회원가입 완료
					</p>
				</div>
				<div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 gap-10'>
					<div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-6'>
						<p className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-center text-[#0f0e0e]'>
							<span className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-center text-[#0f0e0e]'>
								홍길동님{' '}
							</span>
							<br />
							<span className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-center text-[#0f0e0e]'>
								헤이델리박스 회원이 되신 것을 환영합니다!
							</span>
						</p>
						<p className='flex-grow-0 flex-shrink-0 text-xl text-left text-[#0f0e0e]'>
							이제 로그인 후 다양한 서비스를 경험해 보세요!
						</p>
					</div>
					<ButtonRect
						value={'주문하러 가기'}
						style={{ width: 211, alignSelf: 'center' }}
					/>
				</div>
			</div>
		</Common>
	);
}

export default SignUpCompletePage;
