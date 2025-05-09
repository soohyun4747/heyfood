import { IIconProps } from '@/components/ButtonIcon';

export function Plus(props: IIconProps) {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M12.0002 7.2002L12.0002 16.8002M16.8002 12.0002L7.2002 12.0002'
				stroke={props.color ?? '#FFC966'}
				stroke-width='3'
				stroke-linecap='square'
			/>
		</svg>
	);
}
