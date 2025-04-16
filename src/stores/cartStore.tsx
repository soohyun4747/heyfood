import { create } from 'zustand';
import { IItem } from './itemsStore';

interface IItemsBundle {
	id: string;
	addressFull: string;
	dateTime: Date;
	items: IItem[];
}

interface ICartStore {
	cart: IItemsBundle[];
	onAddCart: (bundle: IItemsBundle) => void;
	onRemoveCart: (id: string) => void;
	setCart: (bundles: IItemsBundle[]) => void;
}

export const useCartStore = create<ICartStore>((set) => {
	return {
		cart: [],
		onAddCart: (bundle) =>
			set((state) => {
				const oBundleIdx = state.cart.findIndex(
					(b) => b.id === bundle.id
				);
				if (oBundleIdx > -1) {
					state.cart[oBundleIdx].items.push(...bundle.items);
				} else {
					state.cart.push(bundle);
				}
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
	};
});
