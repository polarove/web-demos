<template>
	<div>
		<el-card
			v-for="(sheet, index) in useSheetStore.sheet"
			:key="index"
		>
			<template #header>
				{{ sheet.date }}
			</template>
			{{ sheet.members }}
		</el-card>
	</div>
</template>

<script lang='ts' setup>
import { sheetStore } from '~/store'

const useSheetStore = sheetStore()
onMounted(() => {
	if (useSheetStore.sheet.length == 0) {
		navigateTo('/')
	}
})
</script>

<style lang='scss' scoped>

</style>
