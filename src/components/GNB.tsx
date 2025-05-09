import { IUserType, UserType } from '@/stores/userStore';
import { Button } from './Button';
import { User } from '@/icons/User';
import { useRouter } from 'next/router';
import Image from 'next/image';

export function GNB({ type }: { type: IUserType }) {
	const router = useRouter();

	return (
		<div className='flex justify-between items-center px-[120px] py-[30px]'>
			<div className='flex items-center gap-[200px]'>
				<Image
					src={'/images/logo.png'}
					alt={'logo'}
					width={206.32}
					height={30}
					onClick={() => router.push('/')}
					className='cursor-pointer'
				/>
				<div className='flex items-center gap-[44px]'>
					<div
						onClick={() => router.push('/heydelibox')}
						className='select-none p-[6px] font-bold leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
						헤이델리박스
					</div>
					<div
						onClick={() => router.push('/menu')}
						className='select-none p-[6px] font-bold leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
						메뉴
					</div>
					<div
						onClick={() => router.push('/faq')}
						className='select-none p-[6px] font-bold leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
						자주묻는 질문
					</div>
				</div>
			</div>
			<div className='flex items-center gap-[52px]'>
				<div className='flex items-center gap-[44px]'>
					<div
						onClick={() => router.push('/inquiry')}
						className='select-none p-[6px] text-sm leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
						문의하기
					</div>
					{type === UserType.guest ? (
						<div
							onClick={() => router.push('/login')}
							className='select-none p-[6px] text-sm leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
							로그인
						</div>
					) : (
						<div
							className='hover:cursor-pointer select-none'
							onClick={() => router.push('/profile')}>
							<User />
						</div>
					)}
				</div>
				<Button
					value={'주문하기'}
					onClick={() => router.push('/order')}
				/>
			</div>
		</div>
	);
}
