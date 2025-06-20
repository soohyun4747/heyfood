import { CloseRound } from '@/icons/CloseRound';
import { PlusRound } from '@/icons/PlusRound';
import Image from 'next/image';
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';

interface IImageUploadProps {
	max: number;
	fileList: File[];
	setFileList: Dispatch<SetStateAction<File[]>>;
}

export function ImagesUpload(props: IImageUploadProps) {
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);

	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setPreviewUrls(props.fileList.map((file) => URL.createObjectURL(file)));
	}, [props.fileList]);

	const onDelete = (i: number) => {
		props.setFileList((prev) => {
			prev.splice(i, 1);
			return [...prev];
		});
	};

	const handleSelectClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0] ?? null;

		console.log({ selected });

		if (!selected) return;

		props.setFileList((prev) => {
			if (prev.length < 3) {
				prev.push(selected);
			} else {
				prev[2] = selected;
			}
			return [...prev];
		});
	};

	return (
		<div className='flex items-center gap-3'>
			{previewUrls.map((url, i) => (
				<div
					key={i}
					className='size-[92px] rounded-[8px] relative'>
					<Image
						src={url}
						width={92}
						height={92}
						className='w-full h-full rounded-[8px] object-cover'
						alt={'url'}
					/>
					<div
						className='absolute top-[6px] right-[6px] cursor-pointer'
						onClick={() => onDelete(i)}>
						<CloseRound />
					</div>
				</div>
			))}
			<div
				onClick={handleSelectClick}
				className='flex items-center justify-center size-[92px] border border-gray-200 rounded-[8px] bg-gray-100 cursor-pointer'>
				<div className='flex flex-col items-center gap-[6px]'>
					<PlusRound />
					<p className='text-gray-700 text-center'>사진 추가</p>
				</div>
			</div>
			{/* 파일 선택 인풋 (보이지 않음) */}
			<input
				type='file'
				accept='image/*'
				onChange={handleFileChange}
				ref={fileInputRef}
				className='hidden'
			/>
		</div>
	);
}
