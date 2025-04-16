import { ButtonRect } from '@/components/ButtonRect';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';

function LoginFindIdPage() {
	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-[60px] px-[120px] pt-[100px] pb-40 min-h-full'>
				<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
					<p className='flex-grow-0 flex-shrink-0 text-[50px] font-bold text-center text-[#0f0e0e]'>
						이메일 아이디 찾기
					</p>
				</div>
				<div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 gap-10'>
					<div className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-6'>
						<p className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-center text-[#0f0e0e]'>
							<span className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-center text-[#0f0e0e]'>
								입력하신 휴대폰 번호로
							</span>
							<br />
							<span className='flex-grow-0 flex-shrink-0 text-[32px] font-bold text-center text-[#0f0e0e]'>
								이메일 아이디를 전송했습니다
							</span>
						</p>
						<p className='flex-grow-0 flex-shrink-0 text-xl text-left text-[#0f0e0e]'>
							로그인 페이지에서 다시 로그인해 주세요.
						</p>
					</div>
					<ButtonRect
						value={'로그인하러 가기'}
						style={{ width: 211, alignSelf: 'center' }}
					/>
				</div>
			</div>
		</Common>
	);
}

export default LoginFindIdPage;
