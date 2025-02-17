import type { ISheet } from '~/types/sheet'

export const sheetStore = defineStore('sheet', () => {
	const sheet = ref<ISheet[]>([])
	return { sheet }
})
