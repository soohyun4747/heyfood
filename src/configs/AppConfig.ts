export const AppConfig = {
	site_name: process.env.NEXT_PUBLIC_SITE_NAME,
	title: process.env.NEXT_PUBLIC_TITLE,
	description: process.env.NEXT_PUBLIC_DESCRIPTION,
	url: process.env.NEXT_PUBLIC_ORIGIN_PATH,
	locale: process.env.NEXT_PUBLIC_LOCALE,
	og: {
		site_name: process.env.NEXT_PUBLIC_OG_SITE_NAME,
		title: process.env.NEXT_PUBLIC_OG_TITLE,
		description: process.env.NEXT_PUBLIC_OG_DESCRIPTION,
	},
};
