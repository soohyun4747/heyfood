// pages/api/nicepay/approve.ts
import { OrderStatus } from '@/components/pages/profile/OrderInfo';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface Vbank {
	vbankCode?: string;
	vbankName?: string;
	vbankNumber?: string;
	vbankExpDate: string;
	vbankHolder?: string;
}

export const NICEPAY_API_URL = 'https://api.nicepay.co.kr/v1/payments';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { authResultCode, tid, amount, orderId } = req.body;

	let vbank: Vbank | undefined;
	let status = OrderStatus.ready;

	if (authResultCode === '0000') {
		const authStr = `${process.env.NICEPAY_CLIENT_KEY}:${process.env.NICEPAY_SECRET_KEY}`;
		const authBase64 = Buffer.from(authStr).toString('base64');

		try {
			const response = await fetch(`${NICEPAY_API_URL}/${tid}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${authBase64}`, // 환경변수로 관리
				},
				body: JSON.stringify({ amount }),
			});

			const text = await response.text();
			console.log('📦 NICEPAY raw response:', text);
			const data = JSON.parse(text);

			//const data = await response.json();
			vbank = data.vbank;
			status = data.status;
		} catch (error: any) {
			console.error('승인 요청 오류:', error);
		}
	}

	res.redirect(
		302,
		`/order/complete?` +
			`resultCode=${encodeURIComponent(authResultCode)}` +
			`&orderId=${encodeURIComponent(orderId)}` +
			`&vbankName=${encodeURIComponent(vbank?.vbankName || '')}` +
			`&vbankNumber=${encodeURIComponent(vbank?.vbankNumber || '')}` +
			`&vbankExpDate=${encodeURIComponent(vbank?.vbankExpDate || '')}` +
			`&vbankHolder=${encodeURIComponent(vbank?.vbankHolder || '')}` +
			`&amount=${encodeURIComponent(amount)}` +
			`&tid=${encodeURIComponent(tid)}` +
			`&status=${encodeURIComponent(status)}`
	);
}
