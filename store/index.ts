import type { IGroup } from '~/types/member'

export const sheetStore = defineStore('sheet', () => {
	const groups = ref<IGroup[]>([])
	return { groups }
})
