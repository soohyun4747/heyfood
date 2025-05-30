import { ChangeEvent, useEffect, useState } from 'react';

interface IButtonCountProps {
	value: string;
	count?: number;
	disabled?: boolean;
	onBlurValue?: (numVal: number) => void;
	onClickPlus?: () => void;
	onClickMinus?: () => void;
}

export function ButtonCount(props: IButtonCountProps) {
	const [inputVal, setInputVal] = useState('');

	useEffect(() => {
		if (props.count) {
			setInputVal(props.count.toString());
		}
	}, [props.count]);

	// 엔터키 입력 시 blur 처리
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			// 해당 input 요소의 포커스를 제거하여 onBlur 핸들러 실행
			(e.target as HTMLInputElement).blur();
		}
	};

	const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
		if (props.onBlurValue) {
			const numVal = Number(e.target.value);
			if (isNaN(numVal)) {
				props.onBlurValue(props.count ?? 0);
				setInputVal(props.count?.toString() ?? '0');
			} else {
				props.onBlurValue(Math.trunc(numVal));
				setInputVal(Math.trunc(numVal).toString());
			}
		}
	};

	return (
		<>
			{props.count ? (
				<div className='select-none flex justify-center items-center self-stretch h-[34px] md:h-[54px] relative gap-2 rounded-[100px] bg-[#ffcd70]'>
					<p
						onClick={props.onClickMinus}
						className='hover:cursor-pointer flex-grow text-sm md:text-2xl font-bold text-center text-white'>
						-
					</p>
					<input
						className='w-[40px] md:w-[90px] text-sm md:text-2xl font-bold text-center text-white focus:outline-0 focus:text-black bg-transparent'
						value={inputVal}
						onChange={(e) => setInputVal(e.target.value)}
						onBlur={onBlur}
						onKeyDown={handleKeyDown}
					/>
					<p
						onClick={props.onClickPlus}
						className='hover:cursor-pointer flex-grow text-sm md:text-2xl font-bold text-center text-white'>
						+
					</p>
				</div>
			) : (
				<div
					onClick={props.onClickPlus}
					className={`select-none hover:cursor-pointer flex justify-center items-center self-stretch h-[34px] md:h-[54px] relative gap-2 rounded-[100px] ${
						props.disabled
							? 'bg-[#E5E5E5] text-[#909090]'
							: 'bg-white border text-[#f2ab27]'
					} border-[#ffc966] hover:bg-[#fffbea]`}>
					<p className='flex-grow text-[13px] md:text-xl text-center'>
						{props.value}
					</p>
				</div>
			)}
		</>
	);
}
