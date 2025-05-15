// utils/location.ts
/**
 * 주소를 받아 위/경도 객체를 반환
 */
export async function geocode(
	address: string
): Promise<{ lat: number; lng: number }> {
	const res = await fetch(
		`/api/geocode?address=${encodeURIComponent(address)}`
	);
	if (!res.ok) {
		throw new Error('Geocoding API 오류');
	}
	return await res.json();
}

/**
 * 위/경도 좌표(“lat,lng”)를 이용해 도로 거리(km)를 반환
 */
export async function fetchDistanceKm(
	ori: { lat: number; lng: number },
	dst: { lat: number; lng: number }
): Promise<number | null> {
	try {
		const res = await fetch(
			`/api/distance-km?startLat=${ori.lat}&startLng=${ori.lng}&endLat=${dst.lat}&endLng=${dst.lng}`
		);
		const json = await res.json();
		if (!res.ok) {
			return null;
		}
		return json.distanceKm;
	} catch (err: any) {
		console.error(err.message);
		alert('배송비 책정을 실패하였습니다.');
		return null;
	}
}

/**
 * 주소 두 개를 받아 최종 킬로미터를 구합니다.
 */
export async function fetchDistanceInKmCost(
	originAddr: string,
	destAddr: string
): Promise<number> {
	// 1) 주소 → 위경도
	const [ori, dst] = await Promise.all([
		geocode(originAddr),
		geocode(destAddr),
	]);

	const distanceKm = await fetchDistanceKm(ori, dst);

	let cost = 0;
	if (distanceKm) {

		const deliveryCost = deliveryCosts.find(
			(data) => distanceKm <= data.distance
		);

		if (deliveryCost) {
			cost = deliveryCost.cost;
		} else {
			cost = deliveryCostMax;
		}
	}

	return cost;
}

const deliveryCosts = [
	{ distance: 10, cost: 15000 },
	{ distance: 20, cost: 20000 },
	{ distance: 30, cost: 25000 },
];

const deliveryCostMax = 30000;
