import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    const data = req.body;

	console.log(data)

	// 나이스페이에 응답 전송
	res.status(200).send('OK');
}
