// pages/api/delivery-cost.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
	distanceKm: number; // 소수점 1자리까지 반올림된 킬로미터
};

type ErrorData = { error: string };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData | ErrorData>
) {
	try {
		const { startLat, startLng, endLat, endLng } = req.query;

		// 1) 파라미터 검증
		if (!startLat || !startLng || !endLat || !endLng) {
			return res
				.status(400)
				.json({
					error: 'startLat, startLng, endLat, endLng를 모두 전달해주세요.',
				});
		}

		const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!;
		const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!;
		
		if (!clientId || !clientSecret) {
			return res
				.status(500)
				.json({ error: '서버 환경변수가 설정되지 않았습니다.' });
		}

		// 2) 네이버 지도 운전 경로 API 호출
		const url = new URL(
			'https://maps.apigw.ntruss.com/map-direction/v1/driving'
		);
		url.searchParams.set('start', `${startLng},${startLat}`);
		url.searchParams.set('goal', `${endLng},${endLat}`);

		const apiRes = await fetch(url.toString(), {
			headers: {
				'X-NCP-APIGW-API-KEY-ID': clientId,
				'X-NCP-APIGW-API-KEY': clientSecret,
			},
		});

		if (!apiRes.ok) {
			const text = await apiRes.text();
			return res
				.status(apiRes.status)
				.json({ error: `네이버 API 에러: ${text}` });
		}

		const data = await apiRes.json();
		
		const route = data.route;
		if (!route || route.length === 0) {
			return res.status(404).json({ error: '경로를 찾을 수 없습니다.' });
		}

		// 3) 거리 계산(미터→킬로미터)
		const distanceMeters: number = route.traoptimal[0].summary.distance;
		const rawKm = distanceMeters / 1000;
		const distanceKm = Math.round(rawKm * 10) / 10; // 소수점 1자리 반올림


		// 5) 응답
		return res.status(200).json({ distanceKm });
	} catch (e: any) {
		console.error(e);
		return res
			.status(500)
			.json({ error: '서버 내부 오류가 발생했습니다.' });
	}
}
