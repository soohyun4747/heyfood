import { IOrderStatus, OrderStatus, orderStatusLabels } from './pages/profile/OrderInfo';

export function PaymentStatus({ status }: { status: IOrderStatus }) {
    const statusClassNames = {
        [OrderStatus.ready]: 'bg-[#FFF7D6] text-[#B28900]',
        [OrderStatus.paid]: 'bg-[#C4FFD3] text-[#005D40]',
        [OrderStatus.failed]: 'bg-[#FFE8E8] text-[#D93232]',
        [OrderStatus.cancelled]: 'bg-[#F0F0F0] text-[#999999]',
        [OrderStatus.expired]: 'bg-[#F0F0F0] text-[#999999]',
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
