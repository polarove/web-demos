import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
	theme: {
		// reference: https://element-plus.org/zh-CN/component/layout.html#col-attributes
		breakpoints: {
			xs: '576px',
			sm: '768px',
			md: '992px',
			lg: '1200px',
			xl: '1920px'
		}
	},
	presets: [
		presetUno(),
		presetIcons({
			extraProperties: {
				'display': 'inline-block',
				'vertical-align': 'middle'
			}
		})
	]
})
