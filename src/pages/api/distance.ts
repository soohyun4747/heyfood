// pages/api/distance.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type DistanceResponse = {
	rows?: Array<{
		elements?: Array<{
			status: string;
			distance: { value: number };
		}>;
	}>;
	status: string;
	error_message?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { origin, destination } = req.query;
	if (
		!origin ||
		!destination ||
		typeof origin !== 'string' ||
		typeof destination !== 'string'
	) {
		return res
			.status(400)
			.json({ error: 'origin, destination 쿼리가 모두 필요합니다.' });
	}

	const apiKey = process.env.GOOGLE_MAPS_API_KEY;
	if (!apiKey) {
		return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
	}

	// origin, destination은 "lat,lng" 포맷으로 전달받습니다.
	const url =
		`https://maps.googleapis.com/maps/api/distancematrix/json` +
		`?origins=${encodeURIComponent(origin)}` +
		`&destinations=${encodeURIComponent(destination)}` +
		`&key=${apiKey}`;

	try {
		const response = await fetch(url);
		const data = (await response.json()) as DistanceResponse;
		if (data.status !== 'OK' || !data.rows?.length) {
			return res
				.status(400)
				.json({
					error: data.error_message || 'Distance Matrix 실패',
					status: data.status,
				});
		}
		res.status(200).json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: '서버 요청 중 오류가 발생했습니다.' });
	}
}
