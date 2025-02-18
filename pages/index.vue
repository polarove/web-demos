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
import type { IGroup, IMember } from '~/types/member'

const handleSuccess = (response: IMember[][]) => {
	const useSheetStore = sheetStore()
	const groups: IGroup[] = response.map((members, index) => ({
		submitted: false, // 或者根据业务逻辑设置为 true
		hasProblem: index % 2 === 0,
		members
	}))
	console.log(groups)

	useSheetStore.groups = groups
	navigateTo('/verify')
}
</script>
