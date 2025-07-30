import {
	IPaymentMethod,
	PaymentMethod,
} from '@/components/pages/profile/OrderInfo';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IOrderInfo {
	comment: string;
	companyName: string;
	stickerFile: File | null; // 실제 저장은 불가. isFile로 대체
	stickerPhrase: string;
	email: string;
	otherPhone: string;
	heating: boolean;
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

interface OrderHeatingStore {
	heating: boolean | undefined;
	setHeating: (value: boolean | undefined) => void;
}

export const useOrderHeatingStore = create(
	persist<OrderHeatingStore>(
		(set) => ({
			heating: undefined,
			setHeating: (value) => set(() => ({ heating: value })),
		}),
		{ name: 'order-heating' }
	)
);

interface OrderPaymentMethodStore {
	paymentMethod: IPaymentMethod;
	setPaymentMethod: (value: IPaymentMethod) => void;
}

export const useOrderPaymentMethodStore = create(
	persist<OrderPaymentMethodStore>(
		(set) => ({
			paymentMethod: PaymentMethod.offline,
			setPaymentMethod: (value) => set(() => ({ paymentMethod: value })),
		}),
		{ name: 'payment-method' }
	)
);

interface OrderIdStore {
	orderId: string;
	setOrderId: (value: string) => void;
}

export const useOrderIdStore = create(
	persist<OrderIdStore>(
		(set) => ({
			orderId: '',
			setOrderId: (value) => set(() => ({ orderId: value })),
		}),
		{ name: 'order-id' }
	)
);

interface OrderPriceStore {
	orderPrice: number;
	setOrderPrice: (value: number) => void;
}

export const useOrderPriceStore = create(
	persist<OrderPriceStore>(
		(set) => ({
			orderPrice: 0,
			setOrderPrice: (value) => set(() => ({ orderPrice: value })),
		}),
		{ name: 'order-price' }
	)
);
