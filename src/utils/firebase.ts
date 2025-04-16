import { db, storage } from '@/configs/firebaseConfig';
import { IUser } from '@/stores/userStore';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { Dispatch, SetStateAction } from 'react';

export const addUser = async (userData: Omit<IUser, 'id'>) => {
	try {
		await addDoc(collection(db, 'users'), userData);
	} catch (error) {
		console.error('Error adding document: ', error);
	}
};

export const fetchImageUrls = async (
	paths: string[]
): Promise<string[] | undefined> => {
	const results: string[] = [];

	for (const path of paths) {
		if (!path) {
			console.error('Invalid path:', path);
			return undefined;
		}

		try {
			const url = await getDownloadURL(ref(storage, path));
			results.push(url);
		} catch (error) {
			console.error('Failed to get image URL:', error);
			return undefined;
		}
	}

	return results;
};

export const fetchCollectionData = async (
	collectionName: string,
	setData?: Dispatch<SetStateAction<any>>
) => {
	try {
		const querySnapshot = await getDocs(collection(db, collectionName));
		const documents = querySnapshot.docs.map((doc) => ({
			id: doc.id, // 문서 ID 포함
			...doc.data(), // 문서 데이터 포함
		}));
		if (setData) {
			setData(documents);
		}
		return documents;
	} catch (err) {
		console.error('Error fetching collection:', err);
	}
};

export const fetchDataWithDocId = async (
	collectionName: string,
	id: string,
	setData?: Dispatch<SetStateAction<any>>
) => {
	try {
		const docRef = doc(db, collectionName, id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const data = { id: docSnap.id, ...docSnap.data() };
			if (setData) {
				setData(data);
			}
			return data as any;
		} else {
			console.error(`No such document with id ${id}!`);
		}
	} catch (err) {
		console.error('Error fetching document:', err);
	}
};

export const addData = async (collectionName: string, data: any) => {
	try {
		const docRef = doc(db, collectionName, data.id); // "users" collection and custom document ID
		const { id, ...dataWithoutId } = data;

		await setDoc(docRef, dataWithoutId);
		return true;
	} catch (error) {
		console.error('Error adding document:', error);
		return false;
	}
};

export async function checkUser(email: string) {
	try {
		const response = await fetch('/api/check-user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		});
		const data = await response.json();
		if (data.exists) {
			return data.user;
		}
	} catch (error) {
		console.error('사용자 확인 중 오류 발생:', error);
	}
}
