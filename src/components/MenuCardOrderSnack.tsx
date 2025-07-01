import { ButtonCount } from './ButtonCount';
import Image from 'next/image';
import { Modal2 } from './Modal2';
import { useEffect, useState } from 'react';
import { CompositionItem, IMenu } from './LandingMenusTab';
import { fetchCollectionData } from '@/utils/firebase';
import { CheckRect } from './CheckRect';
import { CheckRound } from './CheckRound';

interface MenuCardOrderSnack {
	menu: IMenu;
	isAddressFilled: boolean;
	isDateTimeFilled: boolean;
	onAdd: (menu: IMenu, count: number) => void;
}

export function MenuCardOrderSnack(props: MenuCardOrderSnack) {
	const [price, setPrice] = useState(props.menu.price);
	const [count, setCount] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedDrink, setSelectedDrink] = useState<CompositionItem>();
	const [selectedSnacks, setSelectedSnacks] = useState<CompositionItem[]>([]);
	const [snacks, setSnacks] = useState<CompositionItem[]>([]);
	const [drinks, setDrinks] = useState<CompositionItem[]>([]);

	useEffect(() => {
		fetchCollectionData('snacks', setSnacks);
		fetchCollectionData('drinks', setDrinks);
	}, []);

	const onClickPlus = () => {
		setCount((prev) => prev + 1);
	};

	const onClickMinus = () => {
		setCount((prev) => {
			if (prev !== 1) {
				prev -= 1;
			}
			return prev;
		});
	};

	const onBlurCount = (numVal: number) => {
		if (numVal < 1) {
			setCount(numVal);
			setTimeout(() => {
				setCount(1);
			}, 50);
		} else {
			setCount(numVal);
		}
	};

	const addSnack = (snack: CompositionItem) => {
		if (selectedSnacks.length < 2) {
			setSelectedSnacks((prev) => {
				prev.push(snack);
				return [...prev];
			});
			if (snack.price > 0) {
				setPrice((prev) => prev + snack.price);
			}
		} else {
			setSelectedSnacks((prevSnacks) => {
				const priceDiff = snack.price - prevSnacks[1].price;
				setPrice((prevPrice) => prevPrice + priceDiff);
				prevSnacks[1] = snack;
				return [...prevSnacks];
			});
		}
	};

	const removeSnack = (idx: number) => {
		if (snacks[idx].price > 0) {
			setPrice((prev) => prev - snacks[idx].price);
		}
		setSelectedSnacks((prev) => {
			prev.splice(idx, 1);
			return [...prev];
		});
	};

	const onClickSnack = (snack: CompositionItem) => {
		const index = selectedSnacks.findIndex((item) => item.id === snack.id);
		if (index > -1) {
			removeSnack(index);
		} else {
			addSnack(snack);
		}
	};

	const onSetMenu = () => {
		if (!props.isDateTimeFilled) {
			alert('상단에 날짜 및 시간을 먼저 설정해주세요');
			return;
		}
		if (!props.isAddressFilled) {
			alert('상단에 배달주소를 먼저 설정해주세요');
			return;
		}
		setModalOpen(true);
	};

	const onClickDrink = (drink: CompositionItem) => {
		const drinkPriceDiff = selectedDrink
			? drink.price - selectedDrink.price
			: drink.price;

		setPrice((prev) => prev + drinkPriceDiff);

		setSelectedDrink(drink);
	};

	const onCloseModal = () => {
		setModalOpen(false);
		setSelectedSnacks([]);
		setSelectedDrink(undefined);
		setPrice(props.menu.price);
		setCount(1);
	};

	const onClickAdd = () => {
		if (selectedDrink && selectedSnacks.length > 0) {
			const newMenu = { ...props.menu };
			newMenu.price = price;
			newMenu.composition = {
				snacks: selectedSnacks,
				drinks: [selectedDrink],
			};
			props.onAdd(newMenu, count);
		}
		onCloseModal();
	};

	return (
		<>
			<div
				className={`hover:cursor-pointer flex flex-col gap-3 md:gap-8 items-center w-full md:w-[380px] p-2 pb-3 md:p-6 rounded-xl md:rounded-3xl bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]`}>
				<Image
					src={props.menu.imagePaths[0]}
					alt={props.menu.name}
					className='w-full h-[120px] md:h-[320px] object-cover rounded-xl md:rounded-3xl'
					width={332}
					height={320}
					priority
				/>
				<div className='self-stretch h-[1px] bg-[#E5E5E5] hidden md:block' />
				<div className='flex flex-col justify-start items-start self-stretch gap-3 md:gap-6'>
					<div className='flex flex-col justify-start items-start self-stretch relative md:gap-2 gap-[4px]'>
						<p className='self-stretch text-sm md:text-2xl font-bold text-left text-[#0f0e0e]'>
							{props.menu.name}
						</p>
						<p className='self-stretch text-sm md:text-[22px] font-light text-left text-[#0f0e0e]'>
							{props.menu.price.toLocaleString()}원 ~
						</p>
					</div>
					<div
						onClick={onSetMenu}
						className={`select-none hover:cursor-pointer flex justify-center items-center self-stretch h-[34px] md:h-[54px] relative gap-2 rounded-[100px] bg-white border text-[#f2ab27] border-[#ffc966] hover:bg-[#fffbea]`}>
						<p className='flex-grow md:text-xl text-center'>
							메뉴 담기
						</p>
					</div>
				</div>
			</div>
			{modalOpen && (
				<Modal2
					title={'메뉴 담기'}
					btnValue={`${(price * count).toLocaleString()}원 담기`}
					btnDisabled={selectedSnacks.length < 2 || !selectedDrink}
					content={
						<>
							<div className='flex flex-col justify-start items-center relative gap-1 bg-white self-stretch'>
								<div className='flex justify-start items-start self-stretch  relative gap-8'>
									<p className=' text-xl font-bold text-left text-[#0f0e0e]'>
										내맘대로 다과박스
									</p>
								</div>
								<p className='self-stretch text-xs text-left text-[#5c5c5c]'>
									구성: 메인류 2개 + 작은다과류 4개(랜덤) +
									팩음료 1개
								</p>
							</div>
							<div className='flex flex-col justify-start items-center relative gap-5 bg-white self-stretch'>
								<div className='flex flex-col justify-start items-start self-stretch  gap-3'>
									<div className='flex justify-start items-center self-stretch  relative gap-2'>
										<p className='flex-grow text-base font-bold text-left text-[#0f0e0e]'>
											메인류 선택 (2개 선택)
										</p>
										<div className='flex justify-center items-center  relative gap-2 px-1.5 py-1 rounded-[100px] bg-[#ffebc4]'>
											<p className=' text-xs font-bold text-left text-[#f2ab27]'>
												필수
											</p>
										</div>
									</div>
									<div className='grid grid-cols-1 md:grid-cols-2 justify-start items-start self-stretch  gap-3'>
										{snacks?.map((snack) => (
											<div
												key={snack.id}
												onClick={() =>
													onClickSnack(snack)
												}
												className='flex justify-start items-center  relative gap-2'>
												<CheckRect
													checked={selectedSnacks.some(
														(item) =>
															item.id === snack.id
													)}
												/>
												<div className='flex justify-start items-center  relative gap-0.5'>
													<p className=' text-sm text-left text-[#0f0e0e]'>
														{snack.name}{' '}
														{snack.price
															? `(+${snack.price.toLocaleString()})`
															: ''}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
								<div className='self-stretch h-[1px] bg-[#E5E5E5]' />
								<div className='flex flex-col justify-start items-start self-stretch  gap-3'>
									<div className='flex justify-start items-center self-stretch  relative gap-2'>
										<p className='flex-grow text-base font-bold text-left text-[#0f0e0e]'>
											음료 선택
										</p>
										<div className='flex justify-center items-center  relative gap-2 px-1.5 py-1 rounded-[100px] bg-[#ffebc4]'>
											<p className=' text-xs font-bold text-left text-[#f2ab27]'>
												필수
											</p>
										</div>
									</div>
									<div className='grid grid-cols-1 md:grid-cols-2 items-start self-stretch  gap-3'>
										{drinks.map((drink) => (
											<div
												key={drink.id}
												onClick={() =>
													onClickDrink(drink)
												}
												className='flex justify-start items-center  relative gap-2'>
												<CheckRound
													checked={
														selectedDrink?.id ===
														drink.id
													}
												/>
												<div className='flex justify-start items-center  relative gap-0.5'>
													<p className=' text-sm text-left text-[#0f0e0e]'>
														{drink.name}{' '}
														{drink.price
															? `(+${drink.price.toLocaleString()})`
															: ''}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className='flex w-full justify-end'>
								<div className='w-[130px] md:w-[200px]'>
									<ButtonCount
										value={''}
										count={count}
										onClickMinus={onClickMinus}
										onClickPlus={onClickPlus}
										onBlurValue={onBlurCount}
									/>
								</div>
							</div>
						</>
					}
					onBtnClick={onClickAdd}
					onClose={onCloseModal}
				/>
			)}
		</>
	);
}
