import { IMenu } from '@/components/LandingMenusTab';
import { create } from 'zustand';

export interface IItem {
	menu: IMenu;
	count: number;
}

interface IItemsStore {
	items: IItem[];
	setItems: (items: IItem[]) => void;
	setItem: (menu: IMenu, count: number) => void;
	onPlusItem: (menu: IMenu) => void;
	onMinusItem: (menu: IMenu) => void;
	onResetItems: () => void;
}

export const useItemsStore = create<IItemsStore>((set) => {
	return {
		items: [],
		setItems: (items) =>
			set((state) => {
				state.items = items;
				return { ...state };
			}),
		setItem: (menu, count) =>
			set((state) => {
				const item = state.items.find(
					(item) => item.menu.id === menu.id
				);
				if (item) {
					if (count <= 0) {
						//count가 0이거나 더 작으면 아예 빼버리기
						state.items = state.items.filter(
							(item) => item.count === 0
						);
					} else {
						item.count = count;
					}
				}
				return { ...state };
			}),
		onPlusItem: (menu) =>
			set((state) => {
				const item = state.items.find(
					(item) => item.menu.id === menu.id
				);
				if (item) {
					item.count += 1;
				} else {
					state.items.push({
						menu: menu,
						count: 1,
					});
				}
				return { ...state };
			}),
		onMinusItem: (menu) =>
			set((state) => {
				const item = state.items.find(
					(item) => item.menu.id === menu.id
				);
				if (item) {
					item.count -= 1;

					//count가 0이 되면 cart에서 아예 빼버리기
					if (item.count === 0) {
						state.items = state.items.filter(
							(item) => item.count !== 0
						);
					}
				}
				return { ...state };
			}),
		onResetItems: () =>
			set((state) => {
				state.items = [];
				return { ...state };
			}),
	};
});
