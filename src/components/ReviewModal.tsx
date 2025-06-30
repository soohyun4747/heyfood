import { ChangeEvent, useState } from 'react';
import { ImagesUpload } from './ImageUpload';
import { addData, uploadFileData } from '@/utils/firebase';
import { useUserStore } from '@/stores/userStore';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';
import { Modal2 } from './Modal2';

const maxWordCount = 3000;
const minWordCount = 10;

export function ReviewModal({
	onClose,
	onRegistered,
}: {
	onClose: () => void;
	onRegistered: () => void;
}) {
	const [fileList, setFileList] = useState<File[]>([]);
	const [comment, setComment] = useState<string>('');
	const [wordCount, setWordCount] = useState(0);

	const user = useUserStore((state) => state.user);

	const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		if (value.length <= 3000) {
			setComment(value);
			setWordCount(value.length);
		}
	};

	const onAddComment = async () => {
		if (user) {
			const id = uuidv4();
			const imagePaths: string[] = [];

			let idx = 1;
			for (const file of fileList) {
				const path = `reviews/${id}_${idx++}`;
				await uploadFileData(file, path);
				imagePaths.push(path);
			}

			await addData('reviews', {
				id: id,
				email: user?.email,
				comment: comment,
				imagePaths: imagePaths,
				createdAt: Timestamp.now(),
			});
		}

		onRegistered();
	};

	return (
		<Modal2
			title={'후기 작성'}
			btnValue={'등록'}
			btnDisabled={wordCount < minWordCount}
			content={
				<div className='flex flex-col justify-start items-center self-stretch gap-8'>
					<div className='flex flex-col justify-start items-center self-stretch gap-6'>
						<p className='self-stretch md:text-[22px] font-bold text-left text-[#5c5c5c]'>
							어떤 점이 좋았나요?
						</p>
					</div>
					<div className='flex flex-col justify-start items-center self-stretch gap-6'>
						<div className='flex flex-col justify-start items-start self-stretch gap-3'>
							<div className='flex items-end justify-between self-stretch'>
								<ImagesUpload
									max={3}
									fileList={fileList}
									setFileList={setFileList}
								/>
							</div>
							<div className='flex flex-col justify-between items-start self-stretch h-[186px] md:px-9 md:py-6 p-5 rounded-2xl bg-gray-100 gap-2'>
								<textarea
									value={comment}
									placeholder={
										'사용하신 만족도에 대한 후기를 남겨주세요. (최소 10자 이상)'
									}
									onChange={onChangeText}
									className='self-stretch h-full bg-gray-100 resize-none outline-none md:text-base text-xs'
								/>
								<p className='text-xs md:text-sm text-right text-[#a0a0a0] self-end'>
									{wordCount} / {maxWordCount}
								</p>
							</div>
						</div>
					</div>
				</div>
			}
			onBtnClick={onAddComment}
			onClose={onClose}
		/>
	);
}
