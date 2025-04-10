import { IMenu } from '@/components/LandingMenusTab';
import { create } from 'zustand';

interface MenuStore {
	menu: IMenu | undefined;
	setMenu: (value: IMenu | undefined) => void;
}

export const useMenuStore = create<MenuStore>((set) => {
	return {
		menu: undefined,
		setMenu: (value) => set(() => ({ menu: value })),
	};
});
