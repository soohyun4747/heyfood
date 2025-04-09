import { db, storage } from '@/configs/firebaseConfig';
import { IUser } from '@/stores/userStore';
import { addDoc, collection, getDocs } from 'firebase/firestore';
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
