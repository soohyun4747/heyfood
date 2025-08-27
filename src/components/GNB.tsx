import { IUserType, UserType, useUserStore } from '@/stores/userStore';
import { Button } from './Button';
import { User } from '@/icons/User';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ButtonIcon } from './ButtonIcon';
import { useEffect, useState } from 'react';
import { Menu } from '@/icons/Menu';

const domId = 'humburger';

export function GNB({ type }: { type: IUserType }) {
	const [menuOpen, setMenuOpen] = useState(false);

	const router = useRouter();
	const user = useUserStore((state) => state.user);

	useEffect(() => {
		// Add click listener to the document
		document.addEventListener('click', handleClickOutside);

		// Cleanup the listener on component unmount
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [menuOpen]);

	const onClickOrder = () => {
		if (user?.userType === UserType.user) {
			router.push('/order');
		} else {
			router.push('/login');
		}
	};

	const handleClickOutside = (e: MouseEvent) => {
		const target = e.target as HTMLElement | undefined;

		if (target && target.id === domId) {
			setMenuOpen(true);
		} else {
			setMenuOpen(false); // Change state when clicking outside
		}
	};

	return (
		<div className='fixed top-0 flex w-full justify-between items-center px-[20px] md:px-[120px] bg-white z-[1]'>
			<div className='flex items-center md:gap-[200px]'>
				<Image
					src={'/images/logo1.png'}
					alt={'logo'}
					width={180}
					height={90}
					onClick={() => router.push('/')}
					className='cursor-pointer hidden md:block'
				/>
				<Image
					src={'/images/logo1.png'}
					alt={'logo'}
					width={146.15}
					height={20}
					onClick={() => router.push('/')}
					className='cursor-pointer md:hidden'
				/>
				<div className='hidden md:flex items-center gap-[44px]'>
					<div
						onClick={() => router.push('/heydelibox')}
						className='select-none p-[6px] font-bold leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
						헤이푸드
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
					<div
						onClick={() => router.push('/review')}
						className='select-none p-[6px] font-bold leading-[normal] text-gray-900 hover:text-sub-01 hover:cursor-pointer'>
						후기
					</div>
				</div>
			</div>
			<div className='flex items-center gap-[12px] md:gap-[52px]'>
				<div className='hidden md:flex items-center gap-[44px]'>
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
					onClick={onClickOrder}
				/>
				<ButtonIcon
					icon={Menu}
					onClick={() => {
						setMenuOpen(true);
					}}
					id={domId}
					className='md:hidden'
				/>
			</div>
			{menuOpen && <MenuDrawer type={type} />}
		</div>
	);
}

const MenuDrawer = ({ type }: { type: IUserType }) => {
	const router = useRouter();

	return (
		<div
			id={domId}
			style={{ boxShadow: '0px 4px 12px 0 rgba(0,0,0,0.15)' }}
			className='flex flex-col justify-start items-center w-full gap-5 p-5 bg-white absolute top-0 left-0 z-[2]'>
			<p
				onClick={() => router.push('/')}
				className='text-lg font-bold text-left text-[#1f2023]'>
				홈
			</p>
			<p
				onClick={() => router.push('/heydelibox')}
				className='text-lg font-bold text-left text-[#1f2023]'>
				헤이푸드
			</p>
			<p
				onClick={() => router.push('/menu')}
				className='text-lg font-bold text-left text-[#1f2023]'>
				메뉴
			</p>
			<p
				onClick={() => router.push('/faq')}
				className='text-lg font-bold text-left text-[#1f2023]'>
				자주묻는 질문
			</p>
			<p
				onClick={() => router.push('/review')}
				className='text-lg font-bold text-left text-[#1f2023]'>
				후기
			</p>
			<svg
				id={domId}
				height={2}
				viewBox='0 0 320 2'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='self-stretch '
				preserveAspectRatio='none'>
				<line
					id={domId}
					y1='1.28906'
					x2={320}
					y2='1.28906'
					stroke='#E5E5E5'
				/>
			</svg>
			<p
				onClick={() => router.push('/inquiry')}
				className='text-lg text-left text-[#1f2023]'>
				문의하기
			</p>
			{type === UserType.guest ? (
				<p
					onClick={() => router.push('/login')}
					className='text-lg text-left text-[#1f2023]'>
					로그인
				</p>
			) : (
				<p
					onClick={() => router.push('/profile')}
					className='text-lg text-left text-[#1f2023]'>
					마이페이지
				</p>
			)}
		</div>
	);
};
