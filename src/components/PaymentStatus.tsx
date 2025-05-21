import { IOrderStatus, OrderStatus, orderStatusLabels } from './pages/profile/OrderInfo';

export function PaymentStatus({ status }: { status: IOrderStatus }) {
    const statusClassNames = {
        [OrderStatus.waitingPayment]: 'bg-[#FFF7D6] text-[#B28900]',
        [OrderStatus.paymentComplete]: 'bg-[#C4FFD3] text-[#005D40]',
        [OrderStatus.orderCanceled]: 'bg-[#F0F0F0] text-[#999999]',
    };
    
	return (
		<div
			className={`flex justify-center items-center relative px-2.5 pt-1.5 pb-1 rounded-md ${statusClassNames[status]}`}>
			<p className='h-6 text-base font-bold text-left'>
				{orderStatusLabels[status]}
			</p>
		</div>
	);
}
