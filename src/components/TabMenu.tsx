import { ICategory } from './LandingMenusTab';

interface ITabMenuProps {
	menus: ICategory[];
	selectedIdx: number;
	onClickMenu: (i: number) => void;
}

export function TabMenu(props: ITabMenuProps) {
	return (
		<div className='flex justify-start items-start  gap-6'>
			{props.menus.map((category, i) => (
				<div
					key={i}
					style={{
						borderColor:
							i === props.selectedIdx ? '#f2ab27' : 'white',
					}}
					onClick={() => props.onClickMenu(i)}
					className='hover:cursor-pointer flex justify-center items-center  gap-2 px-6 py-2 border-b-[3px]'>
					<p
						style={{
							color:
								i === props.selectedIdx ? '#f2ab27' : '#909090',
							fontWeight: i === props.selectedIdx ? '700' : '400',
						}}
						className=' text-xl text-center'>
						{category.name}
					</p>
				</div>
			))}
		</div>
	);
}
