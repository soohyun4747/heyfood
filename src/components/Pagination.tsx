import { ChevronLeftSmall } from '@/icons/ChevronLeftSmall';
import { ButtonIcon, IIconProps } from './ButtonIcon';
import { ChevronRightSmall } from '@/icons/ChevronRightSmall';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IPaginationProps {
	totalPages: number;
	pageGroupMax: number;
	page: number;
	onChangePage: (page: number) => void;
}

export function Pagination(props: IPaginationProps) {
	const [totalPageGroups, setTotalPageGroups] = useState(1);
	const [pageGroup, setPageGroup] = useState(1);

	const getCurrentPageGroupPages = () => {
		if (pageGroup < totalPageGroups) {
			return Array.from(
				{ length: 10 },
				(_, i) => 10 * (pageGroup - 1) + i + 1
			);
		}
		return Array.from(
			{ length: props.totalPages % props.pageGroupMax },
			(_, i) => i + 1
		);
	};

	useEffect(() => {
		setTotalPageGroups(Math.ceil(props.totalPages / props.pageGroupMax));
	}, [props.totalPages]);

	return (
		<div className='flex items-center gap-2'>
			<ButtonIcon
				icon={ChevronLeftSmall}
				onClick={() => setPageGroup((prev) => prev - 1)}
				disabled={pageGroup === 1 ? true : false}
			/>
			<div className='flex items-center gap-1'>
				{getCurrentPageGroupPages().map((val) => {
					if (val === props.page) {
						return (
							<div className='flex items-center justify-center cursor-pointer w-[34px] h-[32px] rounded-[6px] bg-brand-01 text-[15px] text-gray-900'>
								{val}
							</div>
						);
					} else {
						return (
							<div
								onClick={() => props.onChangePage(val)}
								className='flex items-center justify-center cursor-pointer w-[34px] h-[32px] rounded-[6px] hover:bg-gray-900/9 text-[15px] text-gray-900'>
								{val}
							</div>
						);
					}
				})}
			</div>
			<ButtonIcon
				icon={ChevronRightSmall}
				onClick={() => setPageGroup((prev) => prev + 1)}
				disabled={pageGroup < totalPageGroups ? false : true}
			/>
		</div>
	);
}
