// pages/api/nicepay/approve.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export interface Vbank {
	vbankCode: string;
	vbankName: string;
	vbankNumber: string;
	vbankExpDate: string;
	vbankHolder: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { authResultCode, tid, amount, orderId } = req.body;

	let vbank: Vbank | undefined;

	if (authResultCode === '0000') {
		const authStr = `${process.env.NEXT_PUBLIC_NICEPAY_CLIENT_KEY}:${process.env.NEXT_PUBLIC_NICEPAY_SECRET_KEY}`;
		const authBase64 = Buffer.from(authStr).toString('base64');

		try {
			const response = await fetch(
				`https://sandbox-api.nicepay.co.kr/v1/payments/${tid}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Basic ${authBase64}`, // 환경변수로 관리
					},
					body: JSON.stringify({ amount }),
				}
			);

			const data = await response.json();
			vbank = data.vbank;
		} catch (error: any) {
			console.error('승인 요청 오류:', error);
		}
	}

	res.redirect(
		302,
		`/order/complete?` +
			`orderId=${encodeURIComponent(orderId)}` +
			`&vbankName=${encodeURIComponent(vbank?.vbankName || '')}` +
			`&vbankNumber=${encodeURIComponent(vbank?.vbankNumber || '')}` +
			`&vbankExpDate=${encodeURIComponent(vbank?.vbankExpDate || '')}` +
			`&vbankHolder=${encodeURIComponent(vbank?.vbankHolder || '')}` +
			`&amount=${encodeURIComponent(amount)}`
	);
}
