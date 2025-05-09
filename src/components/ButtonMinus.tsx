import { Plus } from '@/icons/Plus';
import { IButtonBasicProps } from './Button';
import { Minus } from '@/icons/Minus';

export function ButtonMinus(props: IButtonBasicProps) {
	return (
		<div
			className={`size-[40px] flex items-center justify-center ${
				props.disabled
					? 'bg-gray-200'
					: 'border border-brand-01 bg-white hover:bg-sub-03'
			}`}>
			<Minus color={props.disabled ? '#909090' : undefined} />
		</div>
	);
}
