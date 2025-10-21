// ReviewCarousel.tsx
import React from 'react';
import { Review, ReviewCard } from './ReviewCard';

export const ReviewCarousel: React.FC = () => {
	// 원본 후기 배열 – 필요한 만큼 데이터를 추가하세요.
	const reviews: Review[] = [
		{
			id: '1',
			title: '헤이김밥박스를 만나고 행사 도시락 고민을 덜었어요.',
			description:
				'매번 행사도시락 주문하면 용기도 크고 남는 음식물이 많아서 음식물 쓰레기 처리하기 힘들었는데, 호불호 없는 메뉴만 딱 들어가 있어서 드시는 분들이 모두 만족하셨어요!',
			author: 'J사 박*연 담당자님',
		},
		{
			id: '2',
			title: '맛, 가격, 비주얼 모두 갖춘 행사도시락은? 헤이푸드박스',
			description:
				'갑자기 생긴 행사일정에 만족스러운 업체를 못찾을까 걱정했는데, 행사 진행후 회사에서 칭찬받았습니다!! 맛과 가격도 맞춤일 뿐더러, 예쁜 도시락에 한껏 더 즐거운 행사를 진행했습니다. 다음 행사때도 이용할게요 :)',
			author: 'P사 김*아 담당자님',
		},
		{
			id: '3',
			title: '기본에 충실한 김밥과 구성이라 너무 좋아요!',
			description:
				'모두의 입맛에 호불호가 생기지않는 도시락이라 많은 인원수의 행사에 정말 도움이 됐어요 다들 불평불만 없이 드셔주시니 좋은 업체를 잘 찾은거같아 더 기분이 좋네요~ 주문부터 배송, 결제 시스템도 어렵지 않게 잘 되어있으니 이용이 너무 편리해서 다음에 또 주문하려구요! 잘 먹었습니다 :)',
			author: 'A사 이*진 담당자님',
		},
		{
			id: '4',
			title: '앞으로 행사 도시락은 무조건 여기로 정했어요.',
			description:
				'직원들 후기가 너무 좋아서 다음 달 행사도 헤이푸드박스로 바로 예약했어요! 처음엔 반신반의했는데 식사 후 피드백이 정말 좋았어요. ‘요즘 먹은 도시락 중 제일 맛있다’는 말이 나올 정도였고, 앞으로 행사 도시락은 무조건 여기로 정했어요!!',
			author: 'U사 주*정 담당자님',
		},
	];

	// 원활한 무한 슬라이드를 위해 원본 배열을 한 번 복제합니다.
	const allReviews = [...reviews, ...reviews];

	return (
		<div className='overflow-x-hidden'>
			<div className='inline-flex gap-8 animate-scroll h-[450px] items-center'>
				{allReviews.map((review, index) => (
					<ReviewCard
						key={index}
						review={review}
					/>
				))}
			</div>
		</div>
	);
};
