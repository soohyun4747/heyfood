import { Timestamp } from 'firebase/firestore';

export const convertDateStrToTimestamp = (dateStr: string) => {
	return Timestamp.fromDate(new Date(dateStr));
};
