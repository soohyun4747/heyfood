import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { AppConfig } from '@/configs/AppConfig';
import { useRouter } from 'next/router';

type IMetaProps = {
	title?: string;
	description?: string;
	canonical?: string;
};

const Meta = (props: IMetaProps) => {
	const router = useRouter();
	

	return (
		<>
			<Head>
				<meta
					charSet='UTF-8'
					key='charset'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
				/>
				<meta
					name='naver-site-verification'
					content='6ce3a977023c658eb00380ac8a29df4ddec46a56'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href={`${router.basePath}/images/favicon-32.png`}
					key='icon32'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href={`${router.basePath}/images/favicon-16.png`}
					key='icon16'
				/>
				<link
					rel='icon'
					href={`${router.basePath}/images/favicon.png`}
					key='favicon'
				/>
			</Head>
			<NextSeo
				title={props.title ?? AppConfig.title}
				description={props.description ?? AppConfig.description}
				canonical={props.canonical ?? AppConfig.url}
				openGraph={{
					title: AppConfig.og.title,
					description: AppConfig.og.description,
					url: props.canonical,
					siteName: AppConfig.og.site_name,
					locale: AppConfig.locale,
					images: [
						{
							url: `${router.basePath}/images/sns-image.png`,
							width: 1200,
							height: 800,
						},
					],
				}}
				additionalMetaTags={[
					{
						name: 'author',
						content: '헤이푸드박스',
					},
					{
						name: 'keywords',
						content:
							'행사도시락, 도시락, 케이터링, 케이터링서비스, 부산행사도시락, 부산도시락, 부산케이터링, 부산케이터링서비스, 양산행사도시락, 양산도시락, 양산케이터링, 양산케이터링서비스, 울산행사도시락, 울산도시락, 울산케이터링, 울산케이터링서비스, 김해행사도시락, 김해도시락, 김해케이터링, 김해케이터링서비스',
					},
				]}
			/>
		</>
	);
};

export { Meta };
