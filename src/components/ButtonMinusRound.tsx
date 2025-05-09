import { Minus } from '@/icons/Minus';
import { Plus } from '@/icons/Plus';

export function ButtonMinusRound({
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
			<Minus color={disabled ? '#909090' : '#FFC966'} />
		</div>
	);
}
