import { Drawer } from '@/components/Drawer';
import { Close } from '@/icons/Close';
import { IUser, UserType, useUserStore } from '@/stores/userStore';
import { updateData } from '@/utils/firebase';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

interface IAddressDrawerProps {
	onClose: () => void;
}

// react-daum-postcode는 브라우저 환경에서만 동작하므로 dynamic import 시 ssr 옵션을 false로 설정합니다.
const DaumPostcode = dynamic(() => import('react-daum-postcode'), {
	ssr: false,
});

export function AddressDrawer(props: IAddressDrawerProps) {
	const [address, setAddress] = useState<string>('');
	const [addressDetail, setAddressDetail] = useState('');
	const [addressSearchOpen, setAddressSearchOpen] = useState<boolean>(false); // 검색창 노출 여부

	const { user, setUser } = useUserStore();

	useEffect(() => {
		if (user) {
			setAddress(user?.address ?? '');
			setAddressDetail(user?.addressDetail ?? '');
		}
	}, [user]);

	// 주소 검색 완료 후 호출되는 콜백 함수
	const handleComplete = (data: any) => {
		let fullAddress = data.address;
		let extraAddress = '';

		// 'R' 타입은 도로명 주소인 경우 추가정보 처리 (예: 동, 건물명 등)
		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress
					? `, ${data.buildingName}`
					: data.buildingName;
			}
			fullAddress += extraAddress ? ` (${extraAddress})` : '';
		}
		setAddress(fullAddress);
		setAddressSearchOpen(false); // 검색창 닫기
	};

	const isAddressBusan = () => {
		if (address && address.startsWith('부산')) {
			return true;
		}
		return false;
	};

	const onClickConfirm = async () => {
		if (user) {
			const userCopy = JSON.parse(JSON.stringify(user)) as IUser;
			userCopy.address = address;
			userCopy.addressDetail = addressDetail;
			setUser(userCopy);
			await updateUserAddress(userCopy);
			props.onClose();
		}
	};

	const updateUserAddress = async (user: IUser) => {
		if (user.userType === UserType.user) {
			await updateData('users', user.id, {
				address: user.address,
				addressDetail: user.addressDetail,
			});
		} else {
			await updateData('guests', user.id, {
				address: user.address,
				addressDetail: user.addressDetail,
			});
		}
	};

	return (
		<Drawer
			title={'배달주소'}
			content={
				<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8'>
					<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6'>
						<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3'>
							<div className='flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1'>
								<p className='flex-grow-0 flex-shrink-0 text-sm text-left text-[#5c5c5c]'>
									기본주소
								</p>
								<div
									className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2 py-[3px] hover:cursor-pointer'
									onClick={() => setAddressSearchOpen(true)}>
									{address ? (
										<p className='flex-grow-0 flex-shrink-0 text-xl text-left'>
											{address}
										</p>
									) : (
										<p className='flex-grow-0 flex-shrink-0 text-xl text-left text-[#cbcbcb]'>
											배달 받으실 주소를 검색해 주세요
										</p>
									)}
								</div>
							</div>
							<svg
								width={354}
								height={1}
								viewBox='0 0 354 1'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='self-stretch flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									y1='0.5'
									x2={354}
									y2='0.5'
									stroke='#D9D9D9'
								/>
							</svg>
						</div>
						<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3'>
							<div className='flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1'>
								<p className='flex-grow-0 flex-shrink-0 text-sm text-left text-[#5c5c5c]'>
									상세주소
								</p>
								<input
									className='w-full text-xl text-left placeholder:text-[#cbcbcb] focus:outline-0'
									placeholder='상세주소 입력'
									value={addressDetail}
									onChange={(e) =>
										setAddressDetail(e.target.value)
									}
								/>
							</div>
							<svg
								width={354}
								height={1}
								viewBox='0 0 354 1'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='self-stretch flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									y1='0.5'
									x2={354}
									y2='0.5'
									stroke='#D9D9D9'
								/>
							</svg>
						</div>
					</div>
					<div className='flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2 p-3 bg-[#f8f8f8]'>
						<p className='flex-grow w-[330px] text-xs text-left text-[#5c5c5c]'>
							<span className='flex-grow w-[330px] text-xs text-left text-[#5c5c5c]'>
								기본 배송 지역은{' '}
								<span className='text-red-500 font-bold'>
									부산
								</span>
								이며, 인근 지역은 문의하기 페이지에{' '}
							</span>
							<br />
							<span className='flex-grow w-[330px] text-xs text-left text-[#5c5c5c]'>
								주문 내용을 남겨주시면 별도로 연락드리겠습니다.
							</span>
						</p>
					</div>
					{addressSearchOpen && (
						<div className='fixed top-[20%] left-1/2 transform -translate-x-1/2 z-[1000] bg-white p-[16px] rounded-[12px] flex flex-col gap-[12px]'>
							<div className='flex items-center justify-between'>
								<div>주소검색</div>
								<div
									onClick={() => setAddressSearchOpen(false)}
									className='hover:cursor-pointer'>
									<Close size={24} />
								</div>
							</div>
							<DaumPostcode onComplete={handleComplete} />
						</div>
					)}
				</div>
			}
			onClose={props.onClose}
			onConfirm={onClickConfirm}
			confirmDisabled={
				address && addressDetail && isAddressBusan() ? false : true
			}
		/>
	);
}
