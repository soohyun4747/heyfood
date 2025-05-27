// pages/api/cancel-payment.ts or utils/cancelPayment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NICEPAY_API_URL } from './approve';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const { paymentId, orderId, reason, refundAccount, refundBankCode, refundHolder } = req.body;

	if (!paymentId || !orderId || !reason) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	const authStr = `${process.env.NEXT_PUBLIC_NICEPAY_CLIENT_KEY}:${process.env.NEXT_PUBLIC_NICEPAY_SECRET_KEY}`;
	const authBase64 = Buffer.from(authStr).toString('base64');

	try {
		const response = await fetch(`${NICEPAY_API_URL}/${paymentId}/cancel`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${authBase64}`,
			},
			body: JSON.stringify({
				reason,
				orderId,
                refundAccount,
                refundBankCode,
                refundHolder
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			console.error('Cancel failed:', data);
			return res.status(response.status).json(data);
		}

		return res.status(200).json(data);
	} catch (error) {
		console.error('Cancel error:', error);
		return res.status(500).json({ message: 'Server error', error });
	}
}
