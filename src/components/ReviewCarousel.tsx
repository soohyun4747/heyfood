// ReviewCarousel.tsx
import React from 'react';
import { Review, ReviewCard } from './ReviewCard';

export const ReviewCarousel: React.FC = () => {
	// 원본 후기 배열 – 필요한 만큼 데이터를 추가하세요.
	const reviews: Review[] = [
		{
			id: '1',
			title: '쾌적한 환경을 제공할 수 있게 돼서 직원들이 더 만족해요!',
			description:
				'회계처리나 뒷정리, 위생 문제같은 일이 산더미였는데 헤이델리박스를 이용하고 신경 쓸 일이 줄었어요.',
			author: 'OO 병원 관계자',
		},
		{
			id: '2',
			title: '오랜만에 누군가 나를 위해 준비한 밥을 먹는 기분이었어요.',
			description:
				'늘 바쁜 일상 속에서 식사는 대충 해결하기 일쑤였는데, 정성스럽게 준비된 한 끼를 받아보니 기분까지 따뜻해졌어요.',
			author: 'OO 병원 관계자',
		},
		{
			id: '3',
			title: '오늘 점심, 뭐 먹지? 매일같은 고민을 편하게 해결 했어요!',
			description:
				'근처에 밥집이 별로 없어서 선택지가 한정적이었는데, 다양한 메뉴를 먹을 수 있어 직원들의 만족도가 높아요.',
			author: 'OO 병원 관계자',
		},
		{
			id: '4',
			title: '한 끼지만, 그 이상을 챙겨주는 시간이었어요.',
			description:
				'단순히 배를 채우는 식사가 아니라, 오랜만에 제대로 된 한 끼를 대접받는 느낌이었어요. 따뜻한 음식이 주는 위로 덕분에 몸도 마음도 한층 가벼워졌어요.',
			author: 'OO 병원 관계자',
		},
	];

	// 원활한 무한 슬라이드를 위해 원본 배열을 한 번 복제합니다.
	const allReviews = [...reviews, ...reviews];

	return (
		<div className=''>
			{/* inline-flex와 whitespace-nowrap로 내부 컨테이너의 너비가 콘텐츠 만큼 확장되게 함 */}
			<div className='inline-flex gap-8 animate-scroll'>
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
