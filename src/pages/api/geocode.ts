// pages/api/geocode.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type GeoResponse = {
	results?: Array<{
		geometry: { location: { lat: number; lng: number } };
	}>;
	status: string;
	error_message?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { address } = req.query;
	if (!address || typeof address !== 'string') {
		return res.status(400).json({ error: 'address 쿼리가 필요합니다.' });
	}

	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	if (!apiKey) {
		return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
	}

	const url =
		`https://maps.googleapis.com/maps/api/geocode/json` +
		`?address=${encodeURIComponent(address)}` +
		`&key=${apiKey}`;

	try {
		const response = await fetch(url);
		const data = (await response.json()) as GeoResponse;
		if (data.status !== 'OK' || !data.results?.length) {
			return res
				.status(400)
				.json({
					error: data.error_message || 'Geocoding 실패',
					status: data.status,
				});
		}
		const { lat, lng } = data.results[0].geometry.location;
		res.status(200).json({ lat, lng });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: '서버 요청 중 오류가 발생했습니다.' });
	}
}
