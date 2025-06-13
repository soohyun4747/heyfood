import { ICategory, IMenu } from '@/components/LandingMenusTab';
import { useDeviceStore } from '@/stores/deviceStore';
import { useMenuCategoriesStore } from '@/stores/menuCategoriesStore';
import { useMenusStore } from '@/stores/menusStore';
import { IUser, UserType, useUserStore } from '@/stores/userStore';
import '@/styles/global.css';
import {
	fetchCollectionData,
	fetchDataWithDocId,
	fetchImageUrls,
} from '@/utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { useEffect } from 'react';

export const getSetCateogories = async (
	setCategories: (value: ICategory[]) => void
) => {
	const menuCategories = (await fetchCollectionData(
		'menuCategories'
	)) as ICategory[];
	if (menuCategories) {
		const orderedCategories: ICategory[] = [];

		menuCategories.forEach((category) => {
			orderedCategories[category.order] = category;
		});

		setCategories(orderedCategories);
	}
};

export const getSetMenus = async (setMenus: (value: IMenu[]) => void) => {
	const fetchedMenus =
		((await fetchCollectionData('menus')) as IMenu[] | undefined) ?? [];
	// 이미지 URL들은 병렬 처리합니다.
	const updatedMenus = await Promise.all(
		fetchedMenus.map(async (menu) => {
			const urls = await fetchImageUrls(menu.imagePaths);
			if (urls) {
				menu.imagePaths = urls;
			}
			return menu;
		})
	);
	setMenus(updatedMenus);
};

function App({ Component, pageProps }: AppProps) {
	const { setUser } = useUserStore();
	const setIsMobile = useDeviceStore((state) => state.setIsMobile);
	const setCategories = useMenuCategoriesStore(
		(state) => state.setMenuCategories
	);
	const setMenus = useMenusStore((state) => state.setMenus);

	useEffect(() => {
		getSetCateogories(setCategories);
		getSetMenus(setMenus);
	}, []);

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
