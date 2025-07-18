import { Drawer } from '@/components/Drawer';
import { ChevronLeftSmall } from '@/icons/ChevronLeftSmall';
import { ChevronRightSmall } from '@/icons/ChevronRightSmall';
import {
	dayLetters,
	getClosestTimeSlot,
	getDatesInMonth,
	isMoreThanThreeMonthsLater,
	timeSlots,
} from '@/utils/time';
import { useEffect, useRef, useState } from 'react';

interface IDateTimeDrawerProps {
	date?: Date;
	onClose: () => void;
	onConfirm: (date: Date) => void;
}

function getTwoDaysLaterAtNine(): Date {
	const today = new Date();
	const targetDate = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 2, // 이틀 후
		9,
		0,
		0,
		0
	);

	// 만약 이틀 후가 일요일(0)이면 하루를 더함
	if (targetDate.getDay() === 0) {
		targetDate.setDate(targetDate.getDate() + 1);
	}

	return targetDate;
}

const minDateTime = getTwoDaysLaterAtNine();
const today = new Date();

export function DateTimeDrawer(props: IDateTimeDrawerProps) {
	const [month, setMonth] = useState<number>(0);
	const [year, setYear] = useState<number>(2025);
	const [datesArray, setDatesArray] = useState<Date[][]>([]);
	const [dateTime, setDateTime] = useState<Date>();
	const [selectedTime, setSelectedTime] = useState<string>();
	const [infoHover, setInfoHover] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (props.date) {
			getSetDateTime(props.date);
		} else {
			getSetDateTimeTemplate(minDateTime);
		}
	}, [props.date]);

	const getSetDateTimeTemplate = (date: Date) => {
		const month = date.getMonth();
		const year = date.getFullYear();
		setMonth(month);
		setYear(year);
		setDatesArray(getDatesInMonth(year, month));
	};

	const getSetDateTime = (date: Date) => {
		const month = date.getMonth();
		const year = date.getFullYear();
		setDateTime(date);
		setMonth(month);
		setYear(year);
		setDatesArray(getDatesInMonth(year, month));
		setSelectedTime(getClosestTimeSlot(date));
	};

	const isMobile = () => {
		if (typeof window === 'undefined') return false;
		return window.innerWidth <= 768; // 모바일 기준 너비
	};

	const onClickDate = (clickedDate: Date) => {
		if (dateTime) {
			clickedDate.setHours(dateTime.getHours());
			clickedDate.setMinutes(dateTime.getMinutes());
		} else {
			if (selectedTime) {
				const [hour, minute] = selectedTime.split(':').map(Number);
				clickedDate.setHours(hour);
				clickedDate.setMinutes(minute);
			}
		}
		setDateTime(clickedDate);

		if (isMobile()) {
			ref.current?.scrollTo({ top: 500, behavior: 'smooth' });
		}
	};

	const onClickMonthRight = () => {
		setMonth((prevM) => {
			if (prevM === 11) {
				prevM = 0;
				setYear((prevY) => {
					prevY += 1;
					setDatesArray(getDatesInMonth(prevY, prevM));
					return prevY;
				});
			} else {
				prevM += 1;
				setDatesArray(getDatesInMonth(year, prevM));
			}
			return prevM;
		});
	};

	const onClickMonthLeft = () => {
		setMonth((prevM) => {
			if (prevM === 0) {
				prevM = 11;
				setYear((prevY) => {
					prevY -= 1;
					setDatesArray(getDatesInMonth(prevY, prevM));
					return prevY;
				});
			} else {
				prevM -= 1;
				setDatesArray(getDatesInMonth(year, prevM));
			}
			return prevM;
		});
	};

	const monthLeftDisabled = () => {
		if (
			minDateTime.getFullYear() >= year &&
			minDateTime.getMonth() >= month
		) {
			return true;
		}
		return false;
	};

	const monthRightDisabled = () => {
		if (today.getMonth() + 3 === month) {
			return true;
		}
		return false;
	};

	const handleTimeClick = (time: string) => {
		setSelectedTime(time);
		const [hour, minute] = time.split(':').map(Number);
		// 현재 날짜에 선택된 시간 적용 (초와 밀리초는 0으로 초기화)

		if (dateTime) {
			const newDateTime = new Date(
				dateTime.getFullYear(),
				dateTime.getMonth(),
				dateTime.getDate(),
				hour,
				minute,
				0,
				0
			);
			setDateTime(newDateTime);
		}
	};

	const isDateDisabled = (d: Date, j: number) => {
		if (
			minDateTime.getMonth() === d.getMonth() &&
			d.getDate() < minDateTime.getDate()
		) {
			return true;
		}
		if (j % 7 === 0) {
			return true;
		}

		if (isMoreThanThreeMonthsLater(d)) {
			return true;
		}
		return false;
	};

	return (
		<Drawer
			confirmDisabled={!dateTime || !selectedTime}
			title={'날짜 및 시간 선택'}
			content={
				<div
					ref={ref}
					className='flex flex-col gap-4 md:gap-[32px] w-full flex-1 overflow-auto'>
					<div className='w-full flex flex-col gap-[12px]'>
						<div className='flex justify-start items-center self-stretch relative gap-3'>
							<div
								onClick={
									!monthLeftDisabled()
										? onClickMonthLeft
										: undefined
								}
								className='hover:cursor-pointer'>
								<ChevronLeftSmall
									color={
										monthLeftDisabled()
											? '#E5E5E5'
											: undefined
									}
								/>
							</div>
							<p className='flex-grow w-[282px] text-base font-semibold text-center text-[#0f0e0e]'>
								{year}년 {month + 1}월
							</p>
							<div
								onClick={
									!monthRightDisabled()
										? onClickMonthRight
										: undefined
								}
								className='hover:cursor-pointer'>
								<ChevronRightSmall
									color={
										monthRightDisabled()
											? '#E5E5E5'
											: undefined
									}
								/>
							</div>
						</div>
						<div className='w-full flex flex-col gap-[12px]'>
							<div className='flex justify-between'>
								{dayLetters.map((day) => (
									<div
										key={day}
										className='flex w-[48px] h-[48px] items-center justify-center text-[16px] font-semibold leading-[normal] tracking-[0.16px] text-ava-orange'>
										{day}
									</div>
								))}
							</div>
							{datesArray.map((dates, i) => (
								<div
									className='flex text-[16px] font-bold justify-between w-full'
									key={i}>
									{dates.map((d, j) => {
										if (isDateDisabled(d, j)) {
											return (
												<span
													key={j}
													className={`w-[48px] h-[48px] flex items-center justify-center text-gray-200`}>
													{d.getDate()}
												</span>
											);
										} else {
											if (d.getMonth() === month) {
												if (
													d.getFullYear() ===
														dateTime?.getFullYear() &&
													d.getMonth() ===
														dateTime?.getMonth() &&
													d.getDate() ===
														dateTime?.getDate()
												) {
													return (
														<div
															key={j}
															className={`hover:cursor-pointer w-[48px] h-[48px] flex items-center justify-center text-white bg-brand-01 rounded-[100px]`}
															onClick={() =>
																onClickDate(d)
															}>
															{d.getDate()}
														</div>
													);
												} else {
													return (
														<div
															key={j}
															className={`hover:cursor-pointer w-[48px] h-[48px] flex items-center justify-center text-gray-900`}
															onClick={() =>
																onClickDate(d)
															}>
															{d.getDate()}
														</div>
													);
												}
											} else {
												return (
													<span
														key={j}
														className={`w-[48px] h-[48px] flex items-center justify-center text-gray-200`}>
														{d.getDate()}
													</span>
												);
											}
										}
									})}
								</div>
							))}
						</div>
						<div className='flex flex-col justify-center items-center self-stretch relative gap-1 px-3 py-2 bg-[#f8f8f8]'>
							<p className='flex-grow w-[330px] text-[10px] text-center text-[#5c5c5c]'>
								* 배송 날짜 기준 최소 이틀 전에 주문이
								가능합니다
							</p>
							<p className='flex-grow w-[330px] text-[10px] text-center text-[#5c5c5c]'>
								* 주문은 최대 3개월 이내로 가능합니다
							</p>
						</div>
					</div>
					<div className='flex flex-col justify-start items-start self-stretch gap-3 flex-1 overflow-hidden relative min-h-[240px]'>
						<div
							onMouseEnter={() => setInfoHover(true)}
							onMouseLeave={() => setInfoHover(false)}
							className='flex justify-start items-center relative gap-1'>
							<p className='text-base font-bold text-left text-[#0f0e0e]'>
								배달 시간
							</p>
							<div className='hover:cursor-pointer flex justify-start items-center relative gap-2 pb-0.5'>
								<svg
									width={16}
									height={17}
									viewBox='0 0 16 17'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className='w-4 h-4 relative'
									preserveAspectRatio='none'>
									<path
										d='M8 8.5L8 11.5M8 6.27637V6.25M2 8.5C2 5.18629 4.68629 2.5 8 2.5C11.3137 2.5 14 5.18629 14 8.5C14 11.8137 11.3137 14.5 8 14.5C4.68629 14.5 2 11.8137 2 8.5Z'
										stroke='#909090'
										strokeWidth='1.33333'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
						</div>
						{infoHover && (
							<div className='flex justify-center items-center gap-2 p-2 rounded-md bg-[#0f0e0e] absolute top-0 right-0'>
								<p className='text-xs text-center text-white'>
									<span className='text-xs text-center text-white'>
										09:00~16:00 이외의 시간에는{' '}
									</span>
									<br />
									<span className='text-xs text-center text-white'>
										전화 또는 문의하기 페이지를 통해
										연락주세요.
									</span>
								</p>
							</div>
						)}
						<div className='flex flex-col justify-start items-start self-stretch overflow-y-auto bg-white border border-neutral-200 flex-1'>
							{timeSlots.map((time) => {
								const isSelected = selectedTime === time;

								// 기본 스타일: border-bottom과 gap 등. 13시 이후(포맷상 "13:00"부터)는 추가로 w-[200px] 적용
								let containerClasses =
									'hover:cursor-pointer select-none flex justify-start items-center self-stretch relative gap-2 px-5 py-3.5 border-b border-neutral-200';

								// 선택된 경우 체크된 스타일 적용 (배경색 변경 및 요소 간 정렬 변경)
								if (isSelected) {
									containerClasses =
										'hover:cursor-pointer select-none flex justify-between items-center self-stretch relative px-5 py-3.5 bg-[#ffebc4] border-b';
								}

								return (
									<div
										key={time}
										onClick={() => handleTimeClick(time)}
										className={containerClasses}>
										<p className='w-[46px] text-base font-semibold text-left text-[#0f0e0e]'>
											{time}
										</p>
										{isSelected && (
											<svg
												width={20}
												height={20}
												viewBox='0 0 20 20'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
												className='w-5 h-5 relative'
												preserveAspectRatio='none'>
												<rect
													x='0.5'
													y='0.5'
													width={19}
													height={19}
													rx='9.5'
													fill='#FFC966'
												/>
												<rect
													x='0.5'
													y='0.5'
													width={19}
													height={19}
													rx='9.5'
													stroke='#FFC966'
												/>
												<path
													d='M14.6666 6.5L8.24992 12.9167L5.33325 10'
													stroke='white'
													strokeWidth={2}
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
											</svg>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			}
			onClose={props.onClose}
			onConfirm={() => dateTime && props.onConfirm(dateTime)}
		/>
	);
}
