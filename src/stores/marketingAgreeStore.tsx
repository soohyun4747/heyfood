import { create } from 'zustand';

interface MargetingAgreeStore {
	marketingAgree: boolean;
	setMarketingAgree: (value: boolean) => void;
}

export const useMarketingAgreeStore = create<MargetingAgreeStore>((set) => ({
	marketingAgree: false,
	setMarketingAgree: (value) => set({ marketingAgree: value }),
}));
