/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'gray-900': '#0F0E0E',
				'gray-700': '#909090',
				'gray-200': '#E5E5E5',
				'gray-100': '#F8F8F8',
				'brand-01': '#FFC966',
				'sub-01': '#F2AB27',
				'sub-02': '#FFEBC4',
				'sub-03': '#FFFBEA',
			},
			keyframes: {
				scroll: {
					'0%': { transform: 'translateX(0)' },
					// 전체 컨테이너 너비의 50%만큼 이동 → 원본 세트의 너비와 동일
					'100%': { transform: 'translateX(-50%)' },
				},
			},
			animation: {
				scroll: 'scroll 20s linear infinite',
			},
			height: {
				'screen-dynamic': 'calc(var(--vh) * 100)',
			},
			minHeight: {
				'screen-dynamic': 'calc(var(--vh) * 100)',
			},
			maxHeight: {
				'screen-dynamic': 'calc(var(--vh) * 100)',
			},
		},
	},
	plugins: [],
};
