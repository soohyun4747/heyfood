import { Footer } from '@/components/Footer';
import { GNB } from '@/components/GNB';
import { UserType, useUserStore } from '@/stores/userStore';
import { JSX } from 'react';

interface ICommonProps {
	children: JSX.Element;
	hideGnb?: boolean;
	hideFooter?: boolean;
	meta: JSX.Element;
}

export function Common(props: ICommonProps) {
	const user = useUserStore((state) => state.user);

	return (
		<div className='h-screen md:min-w-[1366px] flex flex-col'>
			{props.meta}
			{!props.hideGnb && <GNB type={user?.userType ?? UserType.guest} />}
			<div className='flex flex-col overflow-y-auto h-[calc(100%-113.6px)]'>
				{props.children}
				{!props.hideFooter && <Footer />}
			</div>
		</div>
	);
}
