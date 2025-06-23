import { create } from 'zustand';

interface ProfileTabIdxStore {
	tabIdx: number;
	setTabIdx: (value: number) => void;
}

export const useProfileTabIdxStore = create<ProfileTabIdxStore>((set) => {
	return {
		tabIdx: 0,
		setTabIdx: (value) => set(() => ({ tabIdx: value })),
	};
});
