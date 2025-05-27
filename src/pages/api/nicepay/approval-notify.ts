import { db } from '@/configs/firebaseConfig';
import { updateData } from '@/utils/firebase';
import { Timestamp } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

//status: ['paid', 'ready', 'failed', 'cancelled', 'partialCancelled', 'expired']
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { resultCode, orderId, status } = req.body;

	try {
		if (resultCode === '0000' && orderId) {
			updateData('orders', orderId, {
				orderStatus: status,
				updatedAt: Timestamp.now(),
			});
		}
	} catch (error) {
		console.error('Failed to update order status:', error);
	}

	// 나이스페이에 응답 전송
	res.status(200).send('OK');
}
