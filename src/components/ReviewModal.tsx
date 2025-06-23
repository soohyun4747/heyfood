import { Close } from '@/icons/Close';
import { ButtonIcon } from './ButtonIcon';
import { ChangeEvent, useState } from 'react';
import { ImagesUpload } from './ImageUpload';
import { ButtonRectYellow } from './ButtonRectYellow';
import { addData, uploadFileData } from '@/utils/firebase';
import { useUserStore } from '@/stores/userStore';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';

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
		}
		setWordCount(value.length);
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
		<div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/40 flex items-center justify-center px-[20px] md:px-0'>
			<div className='flex flex-col justify-start items-start w-[612px] relative'>
				<div className='self-stretch h-[76px] relative rounded-tl-3xl rounded-tr-3xl bg-white border-t-0 border-r-0 border-b border-l-0 border-neutral-200 relative'>
					<p className='absolute left-[269px] top-[26px] text-lg font-bold text-left text-[#0f0e0e]'>
						후기 작성
					</p>
					<ButtonIcon
						icon={Close}
						className='absolute top-1/2 -translate-y-1/2 right-[30px]'
						onClick={onClose}
					/>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch gap-8 px-9 py-8 rounded-bl-3xl rounded-br-3xl bg-white'>
					<div className='flex flex-col justify-start items-center self-stretch gap-6'>
						<p className='self-stretch w-[540px] text-[22px] font-bold text-left text-[#5c5c5c]'>
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
								<p className='text-sm text-right text-[#a0a0a0]'>
									{wordCount} / {maxWordCount}
								</p>
							</div>
							<div className='flex flex-col justify-between items-start self-stretch h-[186px] px-9 py-6 rounded-2xl bg-gray-100'>
								<textarea
									value={comment}
									placeholder={
										'사용하신 만족도에 대한 후기를 남겨주세요. (최소 10자 이상)'
									}
									onChange={onChangeText}
									className='self-stretch h-full bg-gray-100 resize-none outline-none'
								/>
							</div>
						</div>
						<ButtonRectYellow
							value={'등록'}
							onClick={onAddComment}
							disabled={wordCount < minWordCount}
							className='w-full md:min-h-[68px] min-h-[58px]'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
