import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

// Firebase Admin SDK 초기화 (앱이 이미 초기화 되어 있지 않은 경우에만)
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: 'heyfood-30435',
			clientEmail:
				'firebase-adminsdk-fbsvc@heyfood-30435.iam.gserviceaccount.com',
			// .env 파일에 저장된 비공개 키는 \n 이스케이프 처리 필요
			privateKey:
				'-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCRRGJHoTXjYRVO\nitnL63BPywvhJlvwUwNE3mAvgMUH+ff/chQPUBc2tUPv0xoXaN7o8JkGZWeRNZ7v\nMEvQYANTbKIHSLrjfEkgYCRM60mLbXSwGBal7WH6lF6gm6OhLAHpnQgNgmi1qO5I\nKKlaG1HW+X9j9eFlHVj8cJNHCDR9PZz7g0Lapwer1ERocI+Au0d8mIfNeGYebZ4C\n85XBsN0Rghgj3ZUyUwwxDzjDblTCT6kpen0Slo8GUUoeG3MULifHs0PAWKc7UGd8\nAhBeNPFHUJGiBFucnf48NJ6XbBAZgrnjLIPDRxBHLp64BWWQ1KeCckAc3JMI1WaR\npI5VIhrDAgMBAAECggEACN2YDYNHHMMfJkWu6Ihl0j2nOKZhkQ3rH3TE52rf9Rsq\nQzXgOu9qSav2L/iw8ttmU058jSZHxyLZhtAdqGN1TU4BdRlZH14SWaTHqMW2HaMt\nLm9IUcSzKJrA5bA2yps7Dwz6FPAv2ZP5EU1UYv8gCp/8FT37c6ZyK/Uaf+8xXBbj\nGkj1dsAX4Xyoyw2Tu0HX19dh5e0krW9HOdwcUehQdfhwNDbQ1z9bsMXFZvY6231J\nh3f2uZv/30OUFVJ3xhgz5xQKG9IhyPKDTfRt4PpFFbnZSrlyHw33bLnPDKzSsSMI\nbmSqNpKKYR52hoD1jpZGzfw3e2n1gJwON/gqowWYVQKBgQDEN4HcQJGn68re0lXw\nLpFCmlm14p7bQ2xg8r2EV8//iIvDzmrrR9eaD/VlmJ0uAs5d62YnwuigXurdUCt6\nIKNqtLK3GGJ2xUbLA2WAyW5YFG2rtRe1HpWQXHDyyOdnVVCQndOVhfNyyfK83Lcb\nV6OmK/dFg1HI+EDvayZbfvX0LwKBgQC9huixGlbMOGhwVp6Z6rBvf2Aja6gjCOLl\neGb7VlD6a92ean3NryZa+7LtDHa/75hsj1CU1NIVVZeioee8PSE4bpCRRfynRkb9\nDnN3tpyr2Zw6s5lsB8JdTcEjWxznNkhsk6AhEDmz5l2QrNOWvp0afNzZyfjRpRsU\nGfFMSsSZrQKBgANSxVpLpavobHk1qsr0nvU31Akmm3YvQCisM9WH/zfewi9A0cLG\nZrpvRsK/wPnEhmZE1Ggb/wCoWuYAs5vP7bSi9tvvB8vnL3nExvVVdA792ZWs7Yfd\nyr61MhyKlpDDeyfX5HuF10e8b+YO/vLxmw33dKqyvLHgsojbkby++791AoGAR2DJ\nvfl3ew47dyOIM9uJe1RzdqOS/S7ZlSaVUk8dzFJXctQUcSRnw5hLuK8bAgpQU4Je\nDM9iF5rWsu9bAS/clQ4+8Bd1oeH71k5c+lcSBj68cfc17tO1RcKE3LXx2ro86Hdo\ntUsREEnQLy6HuZwsOs+PtY41YW9XFWj30Y3PITkCgYBomO01YxYIznshmnOSqR8y\nqwDuupdAdKq00k4zLvjLSiMwKPy8MIJzV69cllRAvYrz6XAtp6DOIjZXTeVKqzrG\nHIScJrqGZ2wltJM1UAUT41JqXjtZ1oWsJHkyeLYlFbkpwC6B5+ZdbKzcL5wQYa7S\nE8a9O+87ZBroYklGW950Ew==\n-----END PRIVATE KEY-----\n'.replace(
					/\\n/g,
					'\n'
				),
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
