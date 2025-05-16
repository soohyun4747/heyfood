import { Timestamp } from 'firebase/firestore';
import { create } from 'zustand';

export interface IUser {
	id: string;
	name: string;
	email?: string;
	phone: string;
	address: string | null;
	addressDetail: string | null;
	createdAt: Timestamp;
    userType: IUserType;
	updatedAt: Timestamp | null;
}

export const UserType = {
	guest: 'guest',
	user: 'user',
} as const;

export type IUserType = (typeof UserType)[keyof typeof UserType];

interface UserStore {
	user: IUser | undefined;
	setUser: (value: IUser | undefined) => void;
}

export const useUserStore = create<UserStore>((set) => {
	return {
		user: undefined,
		setUser: (value) => set(() => ({ user: value })),
	};
});
