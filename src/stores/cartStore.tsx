import { create } from 'zustand';
import { IItem } from './itemsStore';

interface IItemsBundle {
	id: string;
	address: string;
	addressDetail: string;
	dateTime: Date;
	items: IItem[];
}

interface ICartStore {
	cart: IItemsBundle[];
	editBundleIdx?: number;
	onAddCart: (bundle: IItemsBundle) => void;
	onRemoveCart: (id: string) => void;
	setCart: (bundles: IItemsBundle[]) => void;
	setEditBundleIdx: (idx: number) => void;
}

export const useCartStore = create<ICartStore>((set) => {
	return {
		cart: [],
		editBundleIdx: undefined,
		onAddCart: (bundle) =>
			set((state) => {
				state.cart.push(bundle);
				return { ...state, cart: [...state.cart] };
			}),
		onRemoveCart: (id) =>
			set((state) => {
				const oBundleIdx = state.cart.findIndex((b) => b.id === id);
				if (oBundleIdx > -1) {
					state.cart.splice(oBundleIdx, 1);
				}
				return { ...state, cart: [...state.cart] };
			}),
		setCart: (bundles) =>
			set((state) => {
				state.cart = bundles;
				return { ...state };
			}),
		setEditBundleIdx: (idx) =>
			set((state) => {
				state.editBundleIdx = idx;
				return { ...state };
			}),
	};
});
