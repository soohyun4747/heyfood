import { Timestamp } from 'firebase/firestore';

export const months: string[] = [
	'1월',
	'2월',
	'3월',
	'4월',
	'5월',
	'6월',
	'7월',
	'8월',
	'9월',
	'10월',
	'11월',
	'12월',
];

export const timeSlots = [
	'09:00',
	'09:30',
	'10:00',
	'10:30',
	'11:00',
	'11:30',
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
];

export const dayLetters = ['일', '월', '화', '수', '목', '금', '토'];

export const getDatesInMonth = (year: number, month: number): Date[][] => {
	let startDate = new Date(year, month, 1); // Month is zero-based
	let endDate = new Date(year, month + 1, 0); // Day 0 is the last day of the previous month

	const startDateDay = startDate.getDay();
	const endDateDay = endDate.getDay();

	if (startDateDay > 0) {
		startDate = new Date(year, month, -(startDateDay - 1));
	}
	if (endDateDay < 6) {
		endDate = new Date(year, month + 1, 6 - endDateDay);
	}

	const datesArray: Date[][] = [];
	let dayCnt = 0;

	for (
		let date = startDate;
		date <= endDate;
		date.setDate(date.getDate() + 1)
	) {
		if (dayCnt === 0) {
			datesArray.push([]);
		}
		datesArray.at(-1)?.push(new Date(date));
		dayCnt++;
		if (dayCnt === 7) {
			dayCnt = 0;
		}
	}

	return datesArray;
};

export const convertDateStrToTimestamp = (dateStr: string) => {
	return Timestamp.fromDate(new Date(dateStr));
};

export function formatTimestampWithMinutes(timestamp: Timestamp) {
	const date = timestamp.toDate();

	// 월·일 두 자리 포맷팅
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	// 요일 한글 배열에서 추출
	const dayOfWeek = dayLetters[date.getDay()];

	// 오전/오후 구분
	let hours = date.getHours();
	const mins = date.getMinutes();
	const isAM = hours < 12;
	const period = isAM ? '오전' : '오후';

	// 12시간제 변환
	if (!isAM && hours > 12) hours -= 12;
	if (hours === 0) hours = 12;

	// 분 두 자리 포맷팅
	const minuteStr = String(mins).padStart(2, '0');

	return `${month}월 ${day}일 (${dayOfWeek}), ${period} ${hours}시 ${minuteStr}분`;
}

export function formatDateKR(date: Date): string {
	// 월·일 두 자리 포맷팅
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	// 요일 한글 배열에서 추출
	const weekdayKR = dayLetters[date.getDay()];

	// 시·분 및 오전/오후 구분
	let hours = date.getHours();
	const mins = date.getMinutes();
	const isAM = hours < 12;
	const period = isAM ? '오전' : '오후';

	// 12시간제 변환
	if (!isAM && hours > 12) hours -= 12;
	if (hours === 0) hours = 12;

	const minuteStr = String(mins).padStart(2, '0');

	return `${month}월 ${day}일 (${weekdayKR}), ${period} ${hours}시 ${minuteStr}분`;
}

export function getClosestTimeSlot(date: Date): string {
	// 1. date를 기준으로 분 단위로 변환
	const targetMinutes = date.getHours() * 60 + date.getMinutes();

	// 2. timeSlots도 분 단위로 변환하여 거리 비교
	let closestSlot = timeSlots[0];
	let minDiff = Infinity;

	timeSlots.forEach((slot) => {
		const [hour, minute] = slot.split(':').map(Number);
		const slotMinutes = hour * 60 + minute;
		const diff = Math.abs(slotMinutes - targetMinutes);

		if (diff < minDiff) {
			minDiff = diff;
			closestSlot = slot;
		}
	});

	return closestSlot;
}

/**
 * 주어진 날짜가 현재로부터 2일 이상 남았는지 여부를 반환
 * @param targetDate - 비교할 날짜 (Date 객체)
 * @returns boolean
 */
export function isMoreThanTwoDaysLeft(targetDate: Date): boolean {
	const now = new Date();

	const diffInMs = targetDate.getTime() - now.getTime();
	const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;

	return diffInMs > twoDaysInMs;
}

export function isMoreThanOneDayLeft(targetDate: Date): boolean {
	const now = new Date();

	const diffInMs = targetDate.getTime() - now.getTime();
	const oneDayInMs =  24 * 60 * 60 * 1000;

	return diffInMs > oneDayInMs;
}