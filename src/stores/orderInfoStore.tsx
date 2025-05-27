import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IOrderInfo {
	comment: string;
	companyName: string;
	stickerFile: File | null; // 실제 저장은 불가. isFile로 대체
	stickerPhrase: string;
	email: string;
	otherPhone: string;
}

interface OrderCommentStore {
	comment: string;
	setComment: (value: string) => void;
}

export const useOrderCommentStore = create(
	persist<OrderCommentStore>(
		(set) => ({
			comment: '',
			setComment: (value) => set(() => ({ comment: value })),
		}),
		{ name: 'order-comment' }
	)
);

interface OrderCompanyNameStore {
	companyName: string;
	setCompanyName: (value: string) => void;
}

export const useOrderCompanyNameStore = create(
	persist<OrderCompanyNameStore>(
		(set) => ({
			companyName: '',
			setCompanyName: (value) => set(() => ({ companyName: value })),
		}),
		{ name: 'order-company-name' }
	)
);

interface OrderIsStickerFileStore {
	isFile: boolean;
	setIsFile: (value: boolean) => void;
}

export const useOrderStickerFileStore = create(
	persist<OrderIsStickerFileStore>(
		(set) => ({
			isFile: false,
			setIsFile: (value) => set(() => ({ isFile: value })),
		}),
		{ name: 'order-sticker-file' }
	)
);

interface OrderStickerPhraseStore {
	stickerPhrase: string;
	setStickerPhrase: (value: string) => void;
}

export const useOrderStickerPhraseStore = create(
	persist<OrderStickerPhraseStore>(
		(set) => ({
			stickerPhrase: '',
			setStickerPhrase: (value) => set(() => ({ stickerPhrase: value })),
		}),
		{ name: 'order-sticker-phrase' }
	)
);

interface OrderEmailStore {
	email: string;
	setEmail: (value: string) => void;
}

export const useOrderEmailStore = create(
	persist<OrderEmailStore>(
		(set) => ({
			email: '',
			setEmail: (value) => set(() => ({ email: value })),
		}),
		{ name: 'order-email' }
	)
);

interface OrderOtherPhoneStore {
	otherPhone: string;
	setOtherPhone: (value: string) => void;
}

export const useOrderOtherPhoneStore = create(
	persist<OrderOtherPhoneStore>(
		(set) => ({
			otherPhone: '',
			setOtherPhone: (value) => set(() => ({ otherPhone: value })),
		}),
		{ name: 'order-other-phone' }
	)
);
