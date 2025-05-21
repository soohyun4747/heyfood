// E.164 형식으로 변환하는 헬퍼 함수 (대한민국 예시)
export const formatPhoneNumberE164 = (num: string) => {
	// 숫자만 남기기 (공백, 하이픈 등 제거)
	const digits = num.replace(/\D/g, '');
	// 한국 번호의 경우, 앞의 0 제거 후 +82 접두어 추가
	if (digits.startsWith('0')) {
		return '+82' + digits.slice(1);
	}
	// 이미 국제번호 형식이면 그대로 반환 (앞에 +가 있는지 확인)
	if (num.startsWith('+')) {
		return num;
	}
	return num; // 기본적으로 num을 그대로 반환 (필요에 따라 수정)
};

export const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,16}$/;

export function extractNumbers(input: string): string {
	return input.replace(/\D/g, '');
  }