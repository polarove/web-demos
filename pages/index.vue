<template>
	<div class="flex justify-center items-center h-90vh flex-col">
		<el-upload
			action="/admin/file/excel/read"
			:show-file-list="false"
			:on-success="handleSuccess"
		>
			<el-button size="large">
				选择文件
			</el-button>
		</el-upload>
		<el-button
			size="large"
			class="mt-2"
			@click="handleCreateOrder"
		>
			新建导服订单
		</el-button>
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
	useSheetStore.groups = groups
	navigateTo('/verify')
}

const handleCreateOrder = () => {
	const useSheetStore = sheetStore()
	useSheetStore.groups = [
		{
			hasProblem: false,
			submitted: false,
			members: [
				{
					age: '24',
					name: '张三',
					gender: '男',
					identity: '24',
					departingFlight: 'asf',
					arrivalFlight: 'asd',
					remark: '无'
				}
			]
		}
	]
	navigateTo('/verify')
}

// useFetch<{ data: { access_token: string, token_type: string }, code: number }>('/distributor/account/accountLogin', {
// 	body: {
// 		username: '18515430847',
// 		password: '123456'
// 	}
// }).then((res) => {
// 	if (res.error.value) {
// 		return Promise.reject()
// 	}
// 	else if (res.data.value) {
// 		localStorage.setItem('access_token', res.data.value.data.access_token)
// 		ElMessage.success('登录成功')
// 	}
// 	else {
// 		return Promise.reject()
// 	}
// }).catch((err) => {
// 	console.error(err)
// 	ElMessage.error('登录失败')
// })
</script>
