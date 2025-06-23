export async function serverAuthVBank(
	orderId: string,
	price: number,
	goodsName: string,
	vbankHolder: string,
	returnUrl: string,
	method: string,
	buyerTel: string,
	buyerEmail: string
) {
	if (typeof window !== 'undefined') {
		const pay_obj: any = window;
		const { AUTHNICE } = pay_obj;

		await AUTHNICE.requestPay({
			//NOTE :: 발급받은 클라이언트키 clientId에 따라 Server / Client 방식 분리
			clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_KEY,
			method: method,
			vbankHolder: vbankHolder,
			orderId: orderId,
			amount: price,
			goodsName: goodsName,
			returnUrl: returnUrl,
			buyerTel: buyerTel,
			buyerEmail: buyerEmail,
			// NOTE :: err 발생시 실행 함수
			fnError: (result: any) => {
				console.log(result.errorMsg);
			},
		});
	}
}

export const bankOptions = [
	{ id: '001', label: '한국은행' },
	{ id: '002', label: '산업은행' },
	{ id: '003', label: '기업은행' },
	{ id: '004', label: '국민은행' },
	{ id: '005', label: '외환은행' },
	{ id: '007', label: '수협중앙회' },
	{ id: '008', label: '수출입은행' },
	{ id: '011', label: '농협중앙회' },
	{ id: '012', label: '농협회원조합' },
	{ id: '020', label: '우리은행' },
	{ id: '023', label: 'SC은행' },
	{ id: '026', label: '서울은행' },
	{ id: '027', label: '한국씨티은행' },
	{ id: '031', label: '대구은행' },
	{ id: '032', label: '부산은행' },
	{ id: '034', label: '광주은행' },
	{ id: '035', label: '제주은행' },
	{ id: '037', label: '전북은행' },
	{ id: '039', label: '경남은행' },
	{ id: '045', label: '새마을금고연합회' },
	{ id: '048', label: '신협중앙회' },
	{ id: '050', label: '상호저축은행' },
	{ id: '071', label: '우체국' },
	{ id: '081', label: '하나은행' },
	{ id: '088', label: '신한은행' },
	{ id: '089', label: '케이뱅크' },
	{ id: '090', label: '카카오뱅크' },
];
