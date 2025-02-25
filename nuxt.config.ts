// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@unocss/nuxt', '@nuxt/eslint', '@element-plus/nuxt', '@pinia/nuxt'],
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
					target: 'http://localhost:44341',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/admin/, '/api/admin'),
					secure: false
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
