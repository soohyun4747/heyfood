import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IItem } from './itemsStore';

export interface IItemsBundle {
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

export const useCartStore = create<ICartStore>()(
	persist(
		(set) => ({
			cart: [],
			editBundleIdx: undefined,
			onAddCart: (bundle) =>
				set((state) => ({
					cart: [...state.cart, bundle],
				})),
			onRemoveCart: (id) =>
				set((state) => ({
					cart: state.cart.filter((b) => b.id !== id),
				})),
			setCart: (bundles) => set({ cart: bundles }),
			setEditBundleIdx: (idx) => set({ editBundleIdx: idx }),
		}),
		{
			name: 'cart-storage', // localStorage에 저장될 key 이름
			partialize: (state) => ({ cart: state.cart }), // 필요한 값만 저장
		}
	)
);
