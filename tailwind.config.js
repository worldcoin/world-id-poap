const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				poap: {
					gray: '#473E6B',
					pink: '#E87C8A',
					purple: '#7E76F2',
				},
			},
			fontFamily: {
				sans: ['RubikVariable', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
}
