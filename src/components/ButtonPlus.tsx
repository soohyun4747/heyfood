import { Plus } from '@/icons/Plus';
import { IButtonBasicProps } from './Button';

export function ButtonPlus(props: IButtonBasicProps) {
	return (
		<div
			className={`size-[40px] flex items-center justify-center ${
				props.disabled
					? 'bg-gray-200'
					: 'border border-brand-01 bg-white hover:bg-sub-03'
			}`}>
			<Plus color={props.disabled ? '#909090' : undefined} />
		</div>
	);
}
