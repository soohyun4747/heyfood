import { auth, db, storage } from '@/configs/firebaseConfig';
import {
	ConfirmationResult,
	signInWithPhoneNumber,
	signOut,
	UserCredential,
} from 'firebase/auth';
import {
	addDoc,
	collection,
	doc,
	DocumentData,
	getCountFromServer,
	getDoc,
	getDocs,
	limit,
	query,
	QueryConstraint,
	QueryDocumentSnapshot,
	setDoc,
	startAfter,
	updateDoc,
	writeBatch,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Dispatch, SetStateAction } from 'react';
import { formatPhoneNumberE164 } from './string';

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

export const fetchCollectionTableDataWithConstraints = async (
	collectionName: string,
	startAfterDoc:
		| QueryDocumentSnapshot<DocumentData, DocumentData>
		| undefined,
	pageSize: number,
	constraints: QueryConstraint[],
	setStartAfterDoc: Dispatch<
		SetStateAction<
			QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
		>
	>
) => {
	try {
		const ref = collection(db, collectionName);

		let q;
		if (startAfterDoc) {
			q = query(
				ref,
				...constraints,
				startAfter(startAfterDoc),
				limit(pageSize)
			);
		} else {
			q = query(ref, ...constraints, limit(pageSize));
		}

		const snapshot = await getDocs(q);
		const startDocIdx = snapshot.docs.length - 1;
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		if (snapshot) {
			setStartAfterDoc(snapshot.docs[startDocIdx]);
		}

		return data;
	} catch (err) {
		console.error(err);
	}
};

export const fetchCollectionDataWithConstraints = async (
	collectionName: string,
	constraints: QueryConstraint[]
) => {
	try {
		const q = query(collection(db, collectionName), ...constraints);

		const snapshot = await getDocs(q);
		const items = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		return items;
	} catch (error) {
		console.error('Error fetching items:', error);
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
		const { id, ...dataWithoutId } = data;
		if (id) {
			const docRef = doc(db, collectionName, id); // "users" collection and custom document ID

			await setDoc(docRef, dataWithoutId);
			console.log('Data added successfully', id);
			return data;
		} else {
			const docRef = await addDoc(
				collection(db, collectionName),
				dataWithoutId
			);
			console.log('Data added successfully', docRef.id);
			return { id: docRef.id, ...dataWithoutId };
		}
	} catch (error) {
		console.error('Error adding document:', error);
		return false;
	}
};

export async function addMultipleDatas(collectionName: string, datas: any[]) {
	try {
		// 1. 배치 객체 생성
		const batch = writeBatch(db);

		// 2. 컬렉션 레퍼런스
		const colRef = collection(db, collectionName);

		// 3. items 배열 순회하며 batch에 추가
		datas.forEach((item) => {
			// 자동 ID 문서 레퍼런스
			const docRef = doc(colRef);

			// set 또는 create
			batch.set(docRef, {
				...item,
			});
		});

		// 4. 커밋
		await batch.commit();
		console.log('Batch write successful.');
		return true;
	} catch (error) {
		console.error('Error writing batch:', error);
		throw error; // 필요하다면 호출자에게 에러를 다시 전달
		return false;
	}
}

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

export const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error('로그아웃 실패:', error);
	}
};

export const uploadFileData = async (file: File, path: string) => {
	const fileRef = ref(storage, path); // Firebase Storage의 "uploads" 폴더에 파일 저장

	try {
		// Firebase Storage에 파일 업로드
		await uploadBytes(fileRef, file);
	} catch (error) {
		console.error(error);
	}
};

export async function updateData(
	collectionName: string,
	docId: string,
	updatedFields: Partial<any>
) {
	try {
		const docRef = doc(db, collectionName, docId);
		await updateDoc(docRef, updatedFields);
		console.log('Document updated successfully');
		return true;
	} catch (error) {
		console.error('Error updating document:', error);
		throw error;
		return false;
	}
}

export async function updateMultipleDatas(
	collectionName: string,
	updates: { id: string; data: Partial<any> }[]
) {
	const batch = writeBatch(db);
	try {
		updates.forEach(({ id, data }) => {
			const docRef = doc(db, collectionName, id);
			batch.update(docRef, data);
		});

		await batch.commit();
		console.log('Batch update successful.');
		return true;
	} catch (error) {
		console.error('Batch update failed:', error);
		throw error;
	}
}

export const createDocId = (collectionName: string) => {
	const colRef = collection(db, collectionName);
	const newDocRef = doc(colRef); // 자동 생성 ID를 가진 doc 참조

	return newDocRef.id;
};

// 인증번호(OTP) 전송 함수
export const sendVerificationCode = async (phone: string) => {
	// 입력된 번호를 E.164 형식으로 변환
	const formattedPhone = formatPhoneNumberE164(phone);

	// 간단한 E.164 정규식 검사
	const e164Regex = /^\+[1-9]\d{1,14}$/;
	if (!e164Regex.test(formattedPhone)) {
		alert('올바른 휴대폰 번호 형식이 아닙니다. 예: +821012345678');
		return;
	}

	try {
		const result = await signInWithPhoneNumber(
			auth,
			formattedPhone,
			window.recaptchaVerifier
		);
		alert('인증번호가 전송되었습니다.');
		return result;
	} catch (error: any) {
		alert('인증번호 전송을 실패하였습니다.');
		console.error({ error });
	}
};

// 사용자가 입력한 인증번호(OTP) 확인 함수
export const confirmVerificationCode = async (
	confirmResult: ConfirmationResult | undefined,
	code: string
) => {
	if (!confirmResult) {
		alert('먼저 인증번호를 발송해주세요.');
		return;
	}
	try {
		const userCredential = (await confirmResult.confirm(
			code
		)) as UserCredential;
		alert('인증이 성공되었습니다.');
		return userCredential.user;
		// 추가로 비회원 주문 진행 등 필요한 로직을 여기에 구현할 수 있습니다.
	} catch (error: any) {
		alert('인증을 실패하였습니다.');
		console.log('인증번호 확인 실패: ' + error.message);
	}
};

export const getDataCount = async (collectionName: string) => {
	const coll = collection(db, collectionName);
	const snapshot = await getCountFromServer(coll);
	return snapshot.data().count;
};