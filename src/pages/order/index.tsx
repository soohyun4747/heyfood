import { useUserStore } from '@/stores/userStore';

function OrderPage() {
	const user = useUserStore((state) => state.user);

    console.log({user});
    

	return <></>;
}

export default OrderPage;
