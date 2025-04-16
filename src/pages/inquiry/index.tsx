import { ButtonMono } from '@/components/ButtonMono';
import { Common } from '@/layouts/Common';
import { Meta } from '@/layouts/Meta';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import emailjs from '@emailjs/browser';

const initPhoneNumbers = [
	'010',
	'011',
	'016',
	'017',
	'018',
	'019',
	'02',
	'031',
	'033',
	'043',
	'041',
	'063',
	'061',
	'053',
	'051',
	'064',
];

export const emailDomains = [
	'직접 입력',
	'gmail.com',
	'naver.com',
	'daum.net',
	'nate.com',
	'hotmail.com',
];

function InquiryPage() {
	const [name, setName] = useState<string>();
	const [phone1, setPhone1] = useState<string>('010');
	const [phone2, setPhone2] = useState<string>();
	const [phone3, setPhone3] = useState<string>();
	const [emailId, setEmailId] = useState<string>();
	const [emailDomain, setEmailDomain] = useState<string>();
	const [emailDomainSelectVal, setEmailDomainSelectVal] = useState<string>();
	const [event, setEvent] = useState<string>();
	const [delivery, setDelivery] = useState<string>();
	const [dosirakType, setDosirakType] = useState<string>();
	const [inquiry, setInquiry] = useState<string>();

	const onChangePhoneNumber = (
		e: ChangeEvent<HTMLInputElement>,
		setValue: Dispatch<SetStateAction<string | undefined>>
	) => {
		const numVal = Number(e.target.value);
		if (!isNaN(numVal)) {
			setValue(e.target.value);
		}
	};

	const onSelectEmailDomain = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value !== '직접 입력') {
			setEmailDomain(e.target.value);
			setEmailDomainSelectVal(e.target.value);
		}
	};

	const checkAllFilled = () => {
		if (
			name &&
			phone1 &&
			phone2 &&
			phone3 &&
			event &&
			delivery &&
			dosirakType &&
			inquiry
		) {
			return true;
		}
		return false;
	};

	const handleInquirySubmit = async () => {
		if (!checkAllFilled()) {
			alert('필수 항목들을 모두 채워주세요.');
			return;
		}
		// 전화번호, 이메일 조합
		const phoneNumber = `${phone1}-${phone2}-${phone3}`;
		const email = `${emailId}@${emailDomain}`;

		// EmailJS 템플릿에 전달할 파라미터 객체
		const templateParams = {
			name,
			phoneNumber,
			email,
			event,
			dosirakType,
			inquiry,
		};

		try {
			// EmailJS 서비스 호출
			// 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY'를 EmailJS 콘솔에서 발급받은 값으로 대체해야 합니다.
			await emailjs.send(
				'service_6yr6exn',
				'template_gxezdpu',
				templateParams,
				'ij-BVq_WZjD6bDiRt'
			);
			alert('문의 내용이 전송되었습니다.');
			// 전송 성공 후 상태 초기화 또는 다른 처리를 할 수 있습니다.
		} catch (error: any) {
			console.error('문의 전송 실패:', error);
			alert('문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
		}
	};

	const onChangeEmailDomainInput = (e: ChangeEvent<HTMLInputElement>) => {
		setEmailDomain(e.target.value);
		if (
			emailDomainSelectVal !== '직접 입력' &&
			e.target.value !== emailDomainSelectVal
		) {
			setEmailDomainSelectVal('직접 입력');
		}
	};

	return (
		<Common meta={<Meta />}>
			<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-[60px] px-[120px] pt-[100px] pb-40'>
				<div className='flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
					<p className='flex-grow-0 flex-shrink-0 text-5xl font-bold text-center text-[#0f0e0e] leading-[150%]'>
						문의하기
					</p>
					<p className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e] leading-[160%]'>
						<span className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
							고객님이 보내주신 문의에 대한 답변은 문의 등록 시
							기재해주신 이메일로 회신 드립니다.
						</span>
						<br />
						<span className='flex-grow-0 flex-shrink-0 text-base text-center text-[#0f0e0e]'>
							보내주신 문의사항에 대해서는 순차적으로 답변 전달
							드리고 있습니다.
						</span>
					</p>
				</div>
				<div
					className='flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[994px] gap-[60px] px-[120px] py-20 rounded-3xl bg-white'
					style={{ boxShadow: '0px 4px 20px 0 rgba(0,0,0,0.1)' }}>
					<div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-6'>
						<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-12'>
							<p className='flex-grow-0 flex-shrink-0 w-[110px] text-lg text-left text-[#0f0e0e]'>
								이름
							</p>
							<svg
								width={1}
								height={28}
								viewBox='0 0 1 28'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									x1='0.5'
									y1='2.18557e-8'
									x2='0.499999'
									y2={28}
									stroke='#D9D9D9'
								/>
							</svg>
							<input
								className='flex-grow text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
								placeholder='이름 입력'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<svg
							width={754}
							height={1}
							viewBox='0 0 754 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={754}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
						<div className='flex justify-start items-center w-full h-[34px] relative gap-12'>
							<p className='flex-grow-0 flex-shrink-0 w-[110px] text-lg text-left text-[#0f0e0e]'>
								연락처
							</p>
							<svg
								width={1}
								height={28}
								viewBox='0 0 1 28'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									x1='0.5'
									y1='2.18557e-8'
									x2='0.499999'
									y2={28}
									stroke='#D9D9D9'
								/>
							</svg>
							<div className='flex justify-start items-center gap-6 w-full overflow-hidden'>
								<select
									className='ui dropdown focus:outline-0 hover:cursor-pointer'
									onChange={(e) => setPhone1(e.target.value)}>
									{initPhoneNumbers.map((value) => (
										<option value={value}>{value}</option>
									))}
								</select>
								<p className='flex-grow-0 text-[22px] text-left text-[#0f0e0e]'>
									-
								</p>
								<input
									className='min-w-0 flex-1 text-xl text-left focus:outline-0'
									value={phone2}
									onChange={(e) =>
										onChangePhoneNumber(e, setPhone2)
									}
								/>
								<p className='flex-grow-0 text-[22px] text-left text-[#0f0e0e]'>
									-
								</p>
								<input
									className='min-w-0 flex-1 text-xl text-left focus:outline-0'
									value={phone3}
									onChange={(e) =>
										onChangePhoneNumber(e, setPhone3)
									}
								/>
							</div>
						</div>
						<svg
							width={754}
							height={1}
							viewBox='0 0 754 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={754}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
						<div className='flex justify-start items-center w-full relative gap-12'>
							<p className='flex-grow-0 flex-shrink-0 w-[110px] text-lg text-left text-[#0f0e0e]'>
								이메일 (선택)
							</p>
							<svg
								width={1}
								height={28}
								viewBox='0 0 1 28'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									x1='0.5'
									y1='2.18557e-8'
									x2='0.499999'
									y2={28}
									stroke='#D9D9D9'
								/>
							</svg>
							<div className='flex justify-start items-center w-full overflow-hidden gap-6'>
								<input
									className='min-w-0 flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
									placeholder='이메일 아이디 입력'
									value={emailId}
									onChange={(e) => setEmailId(e.target.value)}
								/>
								<p className='flex-grow-0 flex-shrink-0 text-xl text-left text-[#0f0e0e]'>
									@
								</p>
								<input
									className='min-w-0 flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
									placeholder='도메인 입력'
									value={emailDomain}
									onChange={onChangeEmailDomainInput}
								/>
								<svg
									width={2}
									height={28}
									viewBox='0 0 2 28'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className='flex-grow-0 flex-shrink-0'
									preserveAspectRatio='none'>
									<line
										x1='0.833008'
										y1='2.18557e-8'
										x2='0.833007'
										y2={28}
										stroke='#D9D9D9'
									/>
								</svg>
								<select
									value={emailDomainSelectVal}
									className='ui dropdown focus:outline-0 hover:cursor-pointer'
									onChange={onSelectEmailDomain}>
									{emailDomains.map((value) => (
										<option value={value}>{value}</option>
									))}
								</select>
							</div>
						</div>
						<svg
							width={754}
							height={1}
							viewBox='0 0 754 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={754}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
						<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-12'>
							<p className='flex-grow-0 flex-shrink-0 w-[110px] text-lg text-left text-[#0f0e0e]'>
								행사 일정
							</p>
							<svg
								width={1}
								height={28}
								viewBox='0 0 1 28'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									x1='0.5'
									y1='2.18557e-8'
									x2='0.499999'
									y2={28}
									stroke='#D9D9D9'
								/>
							</svg>
							<input
								className='min-w-0 flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
								placeholder='행사 일정 입력'
								value={event}
								onChange={(e) => setEvent(e.target.value)}
							/>
						</div>
						<svg
							width={754}
							height={1}
							viewBox='0 0 754 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={754}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
						<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-12'>
							<p className='flex-grow-0 flex-shrink-0 w-[110px] text-lg text-left text-[#0f0e0e]'>
								배달 장소
							</p>
							<svg
								width={1}
								height={28}
								viewBox='0 0 1 28'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									x1='0.5'
									y1='2.18557e-8'
									x2='0.499999'
									y2={28}
									stroke='#D9D9D9'
								/>
							</svg>
							<input
								className='min-w-0 flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
								placeholder='배달 장소 입력'
								value={delivery}
								onChange={(e) => setDelivery(e.target.value)}
							/>
						</div>
						<svg
							width={754}
							height={1}
							viewBox='0 0 754 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={754}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
						<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-12'>
							<p className='flex-grow-0 flex-shrink-0 w-[110px] text-lg text-left text-[#0f0e0e]'>
								도시락 종류
							</p>
							<svg
								width={1}
								height={28}
								viewBox='0 0 1 28'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									x1='0.5'
									y1='2.18557e-8'
									x2='0.499999'
									y2={28}
									stroke='#D9D9D9'
								/>
							</svg>
							<input
								className='min-w-0 flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
								placeholder='도시락 종류 입력'
								value={dosirakType}
								onChange={(e) => setDosirakType(e.target.value)}
							/>
						</div>
						<svg
							width={754}
							height={1}
							viewBox='0 0 754 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={754}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
						<div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-32 relative gap-12'>
							<p className='flex-grow-0 flex-shrink-0 w-[110px] text-lg text-left text-[#0f0e0e]'>
								문의사항
							</p>
							<svg
								width={1}
								height={128}
								viewBox='0 0 1 128'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='self-stretch flex-grow-0 flex-shrink-0'
								preserveAspectRatio='none'>
								<line
									x1='0.5'
									y1='2.18557e-8'
									x2='0.499994'
									y2={128}
									stroke='#D9D9D9'
								/>
							</svg>
							<input
								className='min-w-0 flex-1 text-lg text-left placeholder:text-[#cbcbcb] focus:outline-0'
								placeholder='문의사항 입력'
								value={inquiry}
								onChange={(e) => setInquiry(e.target.value)}
							/>
						</div>
						<svg
							width={754}
							height={1}
							viewBox='0 0 754 1'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='self-stretch flex-grow-0 flex-shrink-0'
							preserveAspectRatio='none'>
							<line
								y1='0.5'
								x2={754}
								y2='0.5'
								stroke='#D9D9D9'
							/>
						</svg>
					</div>
					<ButtonMono
						value={'문의하기'}
						onClick={handleInquirySubmit}
					/>
				</div>
			</div>
		</Common>
	);
}

export default InquiryPage;
