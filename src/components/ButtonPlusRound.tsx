import { Plus } from '@/icons/Plus';

export function ButtonPlusRound({
	disabled,
	onClick,
}: {
	disabled?: boolean;
	onClick?: () => void;
}) {
	return (
		<div
			onClick={onClick}
			className={`cursor-pointer rounded-full flex items-center justify-center size-[40px] ${
				disabled
					? 'bg-gray-200'
					: 'border border-brand-01 bg-white hover:bg-sub-03'
			}`}>
			<Plus color={disabled ? '#909090' : '#FFC966'} />
		</div>
	);
}
