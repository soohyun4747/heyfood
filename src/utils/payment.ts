export async function serverAuthVBank(
	orderId: string,
	price: number,
	goodsName: string,
    vbankHolder: string,
    returnUrl: string
) {
	if (typeof window !== 'undefined') {
		const pay_obj: any = window;
		const { AUTHNICE } = pay_obj;
		await AUTHNICE.requestPay({
			//NOTE :: 발급받은 클라이언트키 clientId에 따라 Server / Client 방식 분리
			clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_KEY,
			method: 'vbank',
            vbankHolder: vbankHolder,
			orderId: orderId,
			amount: price,
			goodsName: goodsName,
			returnUrl: returnUrl,
			// NOTE :: err 발생시 실행 함수
			fnError: (result: any) => {
				alert(
					'고객용메시지 : ' +
						result.msg +
						'\n개발자확인용 : ' +
						result.errorMsg +
						''
				);
			},
		});
	}
}
