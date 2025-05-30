import { ChangeEvent, CSSProperties } from 'react';

interface ITextFieldProps {
	value: string;
	placeholder?: string;
	style?: CSSProperties;
	multiline?: boolean;
	rows?: number; // ← 텍스트 영역 높이 지정
	onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onBlur?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function TextField(props: ITextFieldProps) {
	const commonClasses =
		'w-full text-sm md:text-base text-left placeholder:text-[#cbcbcb] focus:outline-0';

	return (
		<div
			style={props.style}
			className='w-full gap-2 px-5 py-3 rounded-lg border border-neutral-200'>
			<div className='w-full h-full flex justify-start items-start gap-2 py-[3px]'>
				{props.multiline ? (
					<textarea
						className={`${commonClasses} resize-none`}
						placeholder={props.placeholder}
						value={props.value}
						rows={props.rows}
						onChange={props.onChange}
						onBlur={props.onBlur}
					/>
				) : (
					<input
						className={commonClasses}
						type='text'
						placeholder={props.placeholder}
						value={props.value}
						onChange={props.onChange}
						onBlur={props.onBlur}
					/>
				)}
			</div>
		</div>
	);
}
