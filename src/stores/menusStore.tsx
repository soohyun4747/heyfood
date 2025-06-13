import { IMenu } from '@/components/LandingMenusTab';
import { create } from 'zustand';

interface MenusStore {
	menus: IMenu[];
	setMenus: (value: IMenu[]) => void;
}

export const useMenusStore = create<MenusStore>((set) => {
	return {
		menus: [],
		setMenus: (value) => set(() => ({ menus: value })),
	};
});
