import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface PromiseSectionProps {
	image: string;
	title: string;
	description: string[];
	reverse?: boolean;
}

function PromiseSection({
	image,
	title,
	description,
	reverse = false,
}: PromiseSectionProps) {
	return (
		<div
			className={`flex flex-col justify-start items-start md:w-[1200px] relative gap-[32px] md:gap-[60px] ${
				reverse ? 'md:flex-row-reverse' : 'md:flex-row'
			}`}>
			<Image
				className='w-[320px] md:w-[570px] h-[236px] md:h-[420px] rounded-2xl object-cover'
				src={image}
				alt={title}
				width={320}
				height={236}
			/>
			<div className='flex flex-col justify-start items-start relative gap-3 md:py-12'>
				<p className='text-[24px] md:text-[32px] font-bold text-left text-[#0f0e0e]'>
					{title}
				</p>
				<p className='self-stretch md:w-[570px] text-sm leading-[160%] md:text-xl text-left text-[#0f0e0e]'>
					{description.map((line, idx) => (
						<span key={idx}>
							{line}
							<br />
						</span>
					))}
				</p>
			</div>
		</div>
	);
}

const introImages = [
	'/images/heyfood_intro_1.jpg',
	'/images/heyfood_intro_2.jpg',
	'/images/heyfood_intro_3.jpg',
];

function HeyDeliBoxPage() {
	const router = useRouter();
	const basePath = router.basePath;

	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % introImages.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Common meta={<Meta />}>
			<>
				<div className='flex flex-col justify-start items-center self-stretch h-[1001px] relative gap-[60px] pt-[40px] md:pt-[100px] bg-white'>
					<div className='flex flex-col justify-start items-center self-stretch relative gap-2'>
						<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
							헤이델리박스
						</p>
						<p className='text-sm md:text-lg text-center text-[#0f0e0e]'>
							우리는 더 좋은 헤이델리박스를 위해 매일 노력합니다.
						</p>
					</div>
					<div className='self-stretch h-[731px] relative overflow-hidden'>
						{/* 데스크탑 슬라이드 (vw 단위로 컨테이너 지정) */}
						<motion.div
							className='flex absolute top-0 left-0'
							animate={{ x: `-${index * 100}vw` }}
							transition={{
								duration: 0.8,
								ease: 'easeInOut',
							}}
							style={{
								width: `${introImages.length * 100}vw`,
								height: '731px',
							}}>
							{introImages.map((src, i) => (
								<div
									key={i}
									className='w-screen h-[731px] relative'>
									<Image
										src={`${basePath}${src}`}
										alt={`intro-${i}`}
										fill
										className='object-cover'
									/>
								</div>
							))}
						</motion.div>
						<Image
							src={`${router.basePath}/images/heyfood_intro_mob.png`}
							className='md:hidden w-full h-[540px] absolute object-cover'
							alt={'heyfood_intro_mob'}
							fill
						/>
						<div className='w-full h-[731px] absolute opacity-[0.45] bg-[#0f0e0e]' />
						<div className='flex flex-col justify-center items-center relative gap-12 top-1/2 transform -translate-y-1/2'>
							<p className='text-[28px] md:text-[50px] font-bold text-center text-white'>
								<span>선물 같은 도시락, </span>
								<br />
								<span>행사를 빛내는 특별한 한 끼</span>
							</p>
							<p className='leading-[160%] md:text-xl text-center text-white'>
								<span className='font-bold '>
									실속 있는 가격과 호불호 없는 메뉴
								</span>
								<span>
									로 <br className='md:hidden' />
									남김없이 먹을 수 있습니다.
								</span>
								<br />
								<span className='font-bold '>
									맞춤형 스티커
								</span>
								<span>
									로 행사의 특별함을 더하고{' '}
									<br className='md:hidden' />
									받는 분 모두가{' '}
								</span>
								<br className='md:block hidden' />
								<span className='font-bold '>
									&apos;나만을 위한 도시락&apos;
								</span>
								<span>
									을 <br className='md:hidden' />
									느끼도록 정성을 담았습니다.
								</span>
							</p>
						</div>
						<div className='w-full h-[405px] absolute top-[325px] opacity-25 bg-gradient-to-b from-black/0 to-black' />
					</div>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch gap-[60px] md:px-[120px] py-40'>
					<div className='flex flex-col justify-start items-center relative gap-2'>
						<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
							기존 행사도시락 현황
						</p>
					</div>
					<div className='flex flex-col justify-start items-start md:w-[1200px] relative gap-8'>
						<div className='md:block hidden self-stretch h-[560px] w-auto'>
							<Image
								src={'/images/current_situation.png'}
								alt={'current_situation'}
								fill
							/>
						</div>
						<Image
							src={'/images/current_situation_mob.png'}
							alt={'current_situation_mob'}
							width={302}
							height={1500}
							className='md:hidden'
						/>
					</div>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch gap-[60px] px-[20px] md:px-[120px] py-40 bg-[#ffebc4]'>
					<div className='flex flex-col justify-start items-center relative gap-[24px] md:gap-2'>
						<p className='text-[28px] md:text-[32px] font-bold text-center text-[#0f0e0e]'>
							행사도시락을 고려할 때 <br className='md:hidden' />
							어떤 부분을 <br className='hidden md:block' />
							중점적으로 <br className='md:hidden' />
							고려하시나요?
						</p>
						<p className='text-center text-[#0f0e0e]'>
							도시락 이용 고객을 대상으로 설문조사를
							<br className='md:hidden' />
							진행하였습니다.
						</p>
					</div>
					<div className='w-[340px] h-[180px] md:w-[1200px] md:h-[593px] relative rounded-3xl'>
						<Image
							src={'/images/survey.png'}
							alt='survey'
							fill
						/>
					</div>
				</div>
				<div className='flex flex-col justify-start items-center self-stretch relative gap-[60px] md:gap-[100px] px-[20px] md:px-[120px] pt-[100px] pb-40'>
					<div className='w-full h-[412px] bg-[#fffbea] absolute top-[279px]' />
					<div className='w-full h-[623px] bg-[#fffbea] absolute top-[1138px]' />
					<div className='w-full h-[222px] bg-[#fffbea] absolute bottom-0' />
					<div className='flex flex-col justify-start items-center relative gap-2'>
						<p className='text-[28px] md:text-[50px] font-bold text-center text-[#0f0e0e]'>
							헤이델리박스의 약속
						</p>
						<p className='text-sm md:text-lg text-center text-[#0f0e0e]'>
							<span>
								헤이푸드서비스는 단순히 음식을 제공하는 것을
								넘어,{' '}
							</span>
							<br />
							<span>
								고객의 특별한 순간에 정성과 가치를 더하는{' '}
								<br className='md:hidden' />
								도시락을 만듭니다.
							</span>
						</p>
					</div>
					<div className='flex flex-col justify-center items-center md:w-[1200px] gap-[120px]'>
						<PromiseSection
							image={`${basePath}/images/hey_promise_1.jpg`}
							title='신선한 식재료 사용'
							description={[
								'모든 원재료는 인증된 재료와 자체 입고 기준에 적합한 제품만을 사용합니다. 사용 전 철저히 세척 및 소독해, 식재료부터 안전하고 위생적으로 관리하고 있습니다. 당일 생산 원칙을 준수하며, 고객에게 가장 신선한 상태로 제공하기 위해 노력합니다.',
							]}
						/>
						<PromiseSection
							image={`${basePath}/images/hey_promise_2.jpg`}
							title='당일 생산 원칙'
							description={[
								'김밥, 샌드위치, 닭강정 등 누구나 좋아할 만한 조합으로 구성된 메뉴를 제공합니다. 주기적인 선호도 조사와 트렌드 분석을 통해 고객의 다양한 입맛을 반영한 신메뉴를 꾸준히 개발해 고객들에게 선택의 즐거움을 제공하고자 합니다.',
							]}
							reverse
						/>
						<PromiseSection
							image={`${basePath}/images/hey_promise_3.png`}
							title='커스텀 스티커'
							description={[
								'고객 요청에 따라 원하는 문구를 담은 스티커를 제작하여 도시락에 부착해드립니다. 행사와 모임에서 특별한 감동을 더해줍니다.',
							]}
						/>
						<PromiseSection
							image={`${basePath}/images/hey_promise_4.jpg`}
							title='HACCP 인증 & 기업부설연구소 운영'
							description={[
								'HACCP 인증 공장에서 철저히 관리된 위생 환경에서 도시락을 생산합니다. 자체 기업부설연구소에서 실온김밥의 안전성을 연구하고 자가테스트를 통해 품질 유지 방안을 지속적으로 개발합니다.',
							]}
							reverse
						/>
					</div>
				</div>
				{/* <div className='self-stretch flex justify-center relative'>
					<Image
						src={`${router.basePath}/images/company_group.png`}
						className='object-cover w-full md:h-auto h-[250px]'
						alt={'company_group'}
						height={500}
						width={1440}
					/>
				</div> */}
			</>
		</Common>
	);
}

export default HeyDeliBoxPage;
