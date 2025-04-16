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

function get3YearsArray(): number[] {
	const currentYear = new Date().getFullYear();
	const endYear = currentYear + 2;
	const years: number[] = [];

	for (let year = currentYear; year <= endYear; year++) {
		years.push(year);
	}

	return years;
}

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
