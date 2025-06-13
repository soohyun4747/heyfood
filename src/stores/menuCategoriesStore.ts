import { ICategory } from '@/components/LandingMenusTab';
import { create } from 'zustand';

interface MenuCategoriesStore {
	menuCategories: ICategory[];
	setMenuCategories: (value: ICategory[]) => void;
}

export const useMenuCategoriesStore = create<MenuCategoriesStore>((set) => ({
	menuCategories: [],
	setMenuCategories: (value) => set({ menuCategories: value }),
}));
