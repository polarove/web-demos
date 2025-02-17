<template>
	<div class="flex justify-center items-center h-90vh">
		<el-upload
			action="/admin/file/upload"
			:show-file-list="false"
			:on-success="handleSuccess"
		>
			<el-button>选择文件</el-button>
		</el-upload>
	</div>
</template>

<script setup lang="ts">
import { sheetStore } from '~/store'
import type { ISheet } from '~/types/sheet'

const handleSuccess = (response: ISheet[]) => {
	const useSheetStore = sheetStore()
	useSheetStore.sheet = response
	navigateTo('/verify')
}
</script>
