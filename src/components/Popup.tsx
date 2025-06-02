import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IPopupProps {
	id: string;
	src: string;
	link?: string;
	onClose: () => void;
}

export function Popup(props: IPopupProps) {
	const [showPopupToday, setShowPopupToday] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (canShowPopup(props.id)) {
			setShowPopupToday(true);
		}
	}, [props.id]);

	function canShowPopup(id: string): boolean {
		const hideUntil = localStorage.getItem(`hidePopupUntil_${id}`);
		if (!hideUntil) return true;

		const now = new Date();
		return now > new Date(hideUntil); // 지금 시간이 만료 시간 이후이면 true
	}

	const onCloseForOneDay = () => {
		const expireTime = new Date();
		expireTime.setHours(expireTime.getHours() + 24);

		localStorage.setItem(
			`hidePopupUntil_${props.id}`,
			expireTime.toISOString()
		);
		props.onClose();
	};

	return (
		<>
			{showPopupToday && (
				<div className='fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center px-[20px] md:px-0 z-[2]'>
					<div
						className='flex flex-col justify-start items-start'
						style={{
							filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.15))',
						}}>
						<div className='flex flex-col justify-center items-start overflow-hidden'>
							<img
								src={props.src}
								alt={props.src}
								className={`object-cover max-w-[90vw] max-h-[80vh] w-auto h-auto cursor-pointer`}
								loading='lazy'
								onClick={() =>
									props.link && router.push(props.link)
								}
							/>
							<div className='flex justify-start items-center self-stretch '>
								<div
									onClick={onCloseForOneDay}
									className='cursor-pointer flex justify-center items-center flex-grow relative px-4 md:px-8 py-3 md:py-6 bg-[#5c5c5c] border-r border-white'>
									<p className='text-xs md:text-lg text-center text-white'>
										24시간 동안 열지 않음
									</p>
								</div>
								<div
									onClick={props.onClose}
									className='cursor-pointer flex justify-center items-center flex-grow relative px-4 md:px-8 py-3 md:py-6 bg-[#5c5c5c]'>
									<p className='text-xs md:text-lg text-center text-white'>
										닫기
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
