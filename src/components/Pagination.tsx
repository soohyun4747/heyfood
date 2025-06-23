import { ChevronLeftSmall } from '@/icons/ChevronLeftSmall';
import { ButtonIcon } from './ButtonIcon';
import { ChevronRightSmall } from '@/icons/ChevronRightSmall';
import { useEffect, useState } from 'react';

interface IPaginationProps {
	total: number;
	page: number;
	pageSize: number;
	pageGroupMax: number;
	onChangePage: (page: number) => void;
}

export function Pagination(props: IPaginationProps) {
	const [totalPageGroups, setTotalPageGroups] = useState(1);
	const [pageGroup, setPageGroup] = useState(1);

	const totalPages = Math.ceil(props.total / props.pageSize);

	useEffect(() => {
		setTotalPageGroups(Math.ceil(totalPages / props.pageGroupMax));
	}, [totalPages, props.pageGroupMax]);

	const getCurrentPageGroupPages = () => {
		if (pageGroup <= totalPageGroups) {
			return Array.from(
				{ length: 10 },
				(_, i) => 10 * (pageGroup - 1) + i + 1
			);
		}
		return Array.from(
			{ length: totalPages % props.pageGroupMax },
			(_, i) => 10 * (pageGroup - 1) + i + 1
		);
	};

	const onClickPageGroupBack = () => {
		const newPageGroup = pageGroup - 1;
		props.onChangePage((newPageGroup - 1) * props.pageGroupMax + 1);
		setPageGroup(newPageGroup);
	};

	const onClickPageGroupForward = () => {
		const newPageGroup = pageGroup + 1;
		props.onChangePage((newPageGroup - 1) * props.pageGroupMax + 1);
		setPageGroup(newPageGroup);
	};

	return (
		<div className='flex items-center gap-2'>
			<ButtonIcon
				icon={ChevronLeftSmall}
				onClick={onClickPageGroupBack}
				disabled={pageGroup === 1 ? true : false}
			/>
			<div className='flex items-center gap-1'>
				{getCurrentPageGroupPages().map((val) => {
					if (val === props.page) {
						return (
							<div
								key={val}
								className='flex items-center justify-center cursor-pointer w-[34px] h-[32px] rounded-[6px] bg-brand-01 text-[15px] text-gray-900'>
								{val}
							</div>
						);
					} else {
						return (
							<div
								key={val}
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
				onClick={onClickPageGroupForward}
				disabled={pageGroup < totalPageGroups ? false : true}
			/>
		</div>
	);
}
