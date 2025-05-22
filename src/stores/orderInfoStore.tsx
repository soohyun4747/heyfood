import { create } from 'zustand';

export interface IOrderInfo {
	comment: string;
	companyName: string;
	stickerFile: File | null;
	stickerPhrase: string;
	email: string;
	otherPhone: string;
}

interface OrderCommentStore {
	comment: string;
	setComment: (value: string) => void;
}

export const useOrderCommentStore = create<OrderCommentStore>((set) => {
	return {
		comment: '',
		setComment: (value) => set(() => ({ comment: value })),
	};
});

interface OrderCompanyNameStore {
	companyName: string;
	setCompanyName: (value: string) => void;
}

export const useOrderCompanyNameStore = create<OrderCompanyNameStore>((set) => {
	return {
		companyName: '',
		setCompanyName: (value) => set(() => ({ companyName: value })),
	};
});

interface OrderStickerFileStore {
	file: File | null;
	setFile: (value: File | null) => void;
}

export const useOrderStickerFileStore = create<OrderStickerFileStore>((set) => {
	return {
		file: null,
		setFile: (value) => set(() => ({ file: value })),
	};
});

interface OrderStickerPhraseStore {
	stickerPhrase: string;
	setStickerPhrase: (value: string) => void;
}

export const useOrderStickerPhraseStore = create<OrderStickerPhraseStore>((set) => {
	return {
		stickerPhrase: '',
		setStickerPhrase: (value) => set(() => ({ stickerPhrase: value })),
	};
});


interface OrderEmailStore {
	email: string;
	setEmail: (value: string) => void;
}

export const useOrderEmailStore = create<OrderEmailStore>((set) => {
	return {
		email: '',
		setEmail: (value) => set(() => ({ email: value })),
	};
});


interface OrderOtherPhoneStore {
	otherPhone: string;
	setOtherPhone: (value: string) => void;
}

export const useOrderOtherPhoneStore = create<OrderOtherPhoneStore>((set) => {
	return {
		otherPhone: '',
		setOtherPhone: (value) => set(() => ({ otherPhone: value })),
	};
});