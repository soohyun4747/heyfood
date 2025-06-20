import { ReviewList } from '@/components/ReviewList';
import { Common } from '@/layouts/Common';

function ReviewPage() {
	return (
		<Common>
			<div className='flex flex-col items-center self-stretch  gap-[60px] px-[20px] md:px-[120px] pt-[40px] md:pt-[100px] pb-40 h-screen min-h-fit'>
				<div className='flex flex-col justify-center items-center self-stretch gap-2 md:gap-4'>
					<p className='text-[28px] md:text-5xl font-bold text-center text-[#0f0e0e] leading-[150%]'>
						고객 후기
					</p>
					<p className='text-sm md:text-base text-center text-[#0f0e0e] leading-[160%]'>
						저희 도시락을 이용해주신 고객님들의 후기입니다.
					</p>
				</div>
				<ReviewList />
			</div>
		</Common>
	);
}

export default ReviewPage;
