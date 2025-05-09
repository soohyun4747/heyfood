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
export async function fetchDistanceInKmByCoords(
	ori: { lat: number; lng: number },
	dst: { lat: number; lng: number }
): Promise<number> {
	const originParam = `${ori.lat},${ori.lng}`;
	const destParam = `${dst.lat},${dst.lng}`;
	const res = await fetch(
		`/api/distance?origin=${encodeURIComponent(
			originParam
		)}&destination=${encodeURIComponent(destParam)}`
	);
	if (!res.ok) {
		throw new Error('Distance Matrix API 오류');
	}
	const data = (await res.json()) as {
		rows: {
			elements: Array<{ status: string; distance: { value: number } }>;
		}[];
	};
	const elem = data.rows[0].elements![0];
	if (elem.status !== 'OK') {
		// ZERO_RESULTS 등은 Infinity 처리할 수도 있습니다.
		throw new Error(`Google API status: ${elem.status}`);
	}
	return elem.distance.value / 1000;
}

/**
 * 주소 두 개를 받아 최종 킬로미터를 구합니다.
 */
export async function fetchDistanceInKm(
	originAddr: string,
	destAddr: string
): Promise<number> {
	// 1) 주소 → 위경도
	const [ori, dst] = await Promise.all([
		geocode(originAddr),
		geocode(destAddr),
	]);

	console.log({ ori, dst });

	// 2) 위경도 → 거리(km)
	return fetchDistanceInKmByCoords(ori, dst);
}
