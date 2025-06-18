import { Common } from '@/layouts/Common';
import { Timestamp } from 'firebase/firestore';

export interface IReview {
	email: string;
	comment: string;
	imagePaths: string[];
	createdAt: Timestamp;
}

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
				<div className='flex flex-col justify-center items-start md:w-[1200px] self-stretch relative gap-5 md:self-center justify-self-center'>
					<p className=' text-lg text-left'>
						<span className=' text-lg font-medium text-left text-[#909090]'>
							총{' '}
						</span>
						<span className=' text-lg font-bold text-left text-[#0f0e0e]'>
							12개
						</span>
						<span className=' text-lg font-medium text-left text-[#909090]'>
							의 게시물이 있습니다.
						</span>
					</p>
					<div className='flex flex-col justify-start items-start self-stretch  relative'>
						<div className='md:w-[1200px] self-stretch h-[3px] bg-[#0F0E0E]' />
						{/* {filteredCategoryFaqs.map((faq) => (
							<Accordion
								key={faq.id}
								title={faq.title}
								content={faq.content}
							/>
						))} */}
					</div>
				</div>
			</div>
		</Common>
	);
}

export default ReviewPage;
