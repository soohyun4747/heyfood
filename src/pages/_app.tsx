import { useDeviceStore } from '@/stores/deviceStore';
import { IUser, UserType, useUserStore } from '@/stores/userStore';
import '@/styles/global.css';
import { fetchDataWithDocId } from '@/utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { useEffect } from 'react';

function App({ Component, pageProps }: AppProps) {
	const { setUser } = useUserStore();
	const setIsMobile = useDeviceStore((state) => state.setIsMobile);

	useEffect(() => {
		function setRealViewportHeight() {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
		window.addEventListener('resize', setRealViewportHeight);
		setRealViewportHeight();
	}, []);

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkIsMobile(); // 최초 실행
		window.addEventListener('resize', checkIsMobile);
		return () => window.removeEventListener('resize', checkIsMobile);
	}, [setIsMobile]);

	useEffect(() => {
		const auth = getAuth();
		// Auth 상태가 바뀔 때(토큰 복원 포함)마다 호출됩니다.
		const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
			if (fbUser) {
				// Firestore에서 추가 사용자 정보 가져오기
				const userData = (await fetchDataWithDocId(
					'users',
					fbUser.uid
				)) as IUser | undefined;
				if (userData) {
					setUser({ ...userData, userType: UserType.user });
				}
			} else {
				// 로그아웃 상태가 됐다면 스토어도 초기화
				setUser(undefined);
			}
		});

		return () => unsubscribe();
	}, [setUser]);

	return (
		<>
			<Component {...pageProps} />
			<Script src='https://pay.nicepay.co.kr/v1/js/'></Script>
		</>
	);
}

export default App;
