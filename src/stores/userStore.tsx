import { Timestamp } from 'firebase/firestore';
import { create } from 'zustand';

export interface IUser {
	id: string;
	name: string;
	email?: string;
	phone: string;
	address?: string;
	addressDetail?: string;
	createdAt: Timestamp;
    userType: IUserType;
	updatedAt?: Timestamp;
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
