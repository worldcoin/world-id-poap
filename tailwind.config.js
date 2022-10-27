const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				white: '#ffffff',
				poap: {
					gray: {
						DEFAULT: '#473E6B',
						light: '#F1F5F8',
					},
					pink: '#E87C8A',
					purple: '#7E76F2',
					blue: '#4940E0',
				},
				'd1d3d4': '#d1d3d4',
			},
			fontSize: {
				h1: ['4rem', {
					lineHeight: '4.375rem',
					fontWeight: '300',
				}],
				h2: ['2rem', {
					lineHeight: '2.25rem',
					fontWeight: '400',
				}],
				lg: ['1.125rem', {
					lineHeight: '1.375rem',
				}],
				md: ['1rem', {
					lineHeight: '110%',
				}],
				sm: ['0.875rem', {
					lineHeight: '100%',
				}],
				xs: ['0.75rem', {
					lineHeight: '100%',
				}]
			},
			fontFamily: {
				sans: ['RubikVariable', ...defaultTheme.fontFamily.sans],
			},
			maxWidth: {
				'container': '68.5rem',
			}
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
