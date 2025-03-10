// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@unocss/nuxt', '@nuxt/eslint', '@element-plus/nuxt'],
	devtools: { enabled: false },
	app: {
		head: {
			link: [
				{ rel: 'stylesheet', href: '/stylesheets/normalize.css' },
				{ rel: 'stylesheet', href: '/stylesheets/scrollbar.css' }
			],
			htmlAttrs: {
				class: 'dark'
			}
		}
	},

	compatibilityDate: '2024-11-01',

	vite: {
		server: {
			cors: true,
			proxy: {
				'/admin': {
					target: 'http://localhost:53897',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/admin/, '/admin/api')
				},
				'/api': {
					target: 'http://localhost:64729',
					changeOrigin: true
					// rewrite: path => path.replace(/^\/api/, '/api')
				}
			}
		}
	},
	elementPlus: {
		themes: ['dark'],
		importStyle: 'scss'
	},
	eslint: {
		config: {
			stylistic: {
				commaDangle: 'never',
				semi: false,
				indent: 'tab',
				quotes: 'single'
			}
		}
	}
})
