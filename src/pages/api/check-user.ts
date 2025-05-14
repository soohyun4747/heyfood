import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

// Firebase Admin SDK 초기화 (앱이 이미 초기화 되어 있지 않은 경우에만)
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID,
			clientEmail: process.env.NEXT_PUBLIC_FIRE_CLIENT_EMAIL,
			privateKey: process.env.NEXT_PUBLIC_FIRE_PRIVATE_KEY,
		}),
	});
}

// 응답 데이터 타입 정의
type Data =
	| { exists: boolean; user?: admin.auth.UserRecord }
	| { error: string };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
): Promise<void> {
	// POST 방식만 허용
	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST');
		res.status(405).json({ error: 'Method not allowed' });
		return;
	}

	const { email } = req.body;

	// 이메일이 제공되지 않은 경우 에러 응답
	if (!email) {
		res.status(400).json({ error: 'Email is required' });
		return;
	}

	try {
		// 해당 이메일을 가진 사용자 정보를 검색
		const userRecord = await admin.auth().getUserByEmail(email);

		return res.status(200).json({ exists: true, user: userRecord });
	} catch (error: any) {
		// 'auth/user-not-found' 에러 처리 (사용자가 없음을 의미)
		if (error.code === 'auth/user-not-found') {
			return res.status(200).json({ exists: false });
		}
		// 그 외의 예외는 에러 메시지와 함께 반환
		return res.status(500).json({ error: error.message });
	}
}
