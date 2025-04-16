import { auth } from '@/configs/firebaseConfig';
import { IUser, UserType, useUserStore } from '@/stores/userStore';
import '@/styles/global.css';
import { fetchDataWithDocId } from '@/utils/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AppProps } from 'next/app';
import { useEffect } from 'react';

function App({ Component, pageProps }: AppProps) {
	const { user, setUser } = useUserStore();

	useEffect(() => {
		if (!user) {
			const email = localStorage.getItem('email');
			const password = localStorage.getItem('password');

			if (email && password) {
				checkAuthority(email, password);
			}
		}
	}, [user]);

	const checkAuthority = async (email: string, password: string) => {
		const auth = getAuth();
		try {
			// Firebase 인증: 이메일과 비밀번호로 로그인 시도
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			// Firestore DB에서 uid 기반의 사용자 데이터 가져오기
			const userData = (await fetchDataWithDocId('users', user.uid)) as
				| IUser
				| undefined;

			if (userData) {
				setUser({ ...userData, userType: UserType.user });
			} else {
				localStorage.clear();
			}
		} catch (error: any) {
			console.log(error.message);
			localStorage.clear();
		}
	};

	return <Component {...pageProps} />;
}

export default App;
