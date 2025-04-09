import { IUserType, UserType } from '@/stores/userStore';
import { Button } from './Button';
import { User } from './icons/User';

export function GNB({ type }: { type: IUserType }) {
	return (
		<div className='flex justify-between items-center px-[120px] py-[30px]'>
			<div className='flex items-center gap-[200px]'>
				<div></div>
				<div className='flex items-center gap-[44px]'>
					<div className='select-none p-[6px] font-bold leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
						헤이델리박스
					</div>
					<div className='select-none p-[6px] font-bold leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
						메뉴
					</div>
					<div className='select-none p-[6px] font-bold leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
						자주묻는 질문
					</div>
				</div>
			</div>
			<div className='flex items-center gap-[52px]'>
				<div className='flex items-center gap-[44px]'>
					<div className='select-none p-[6px] text-sm leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
						문의하기
					</div>
					{type === UserType.guest ? (
						<div className='select-none p-[6px] text-sm leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
							로그인
						</div>
					) : (
						<User />
					)}
				</div>
				<Button value={'주문하기'} />
			</div>
		</div>
	);
}
