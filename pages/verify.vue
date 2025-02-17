<template>
	<div>
		<!-- <div
			v-for="(sheet, index) in useSheetStore.sheet"
			:key="index"
		>
			<div
				v-for="(members, i) in sheet.members"
				:key="i"
			>
				<div class="grid cols-6 gap-4 row-auto py-4">
					<el-card
						v-for="(member, e) in members"
						:key="e"
					>
						<template #header>
							{{ member.name }}
						</template>
						<div class="flex justify-between py-2">
							<span>年龄</span>
							{{ member.age }}
						</div>
						<div class="flex justify-between py-2">
							<span>性别</span>
							{{ member.gender }}
						</div>
						<div class="flex justify-between py-2">
							<span>出生年月</span>
							{{ member.birthday }}
						</div>
						<div class="flex justify-between py-2">
							<span>联系方式</span>
							{{ member.contact }}
						</div>
						<div class="flex justify-between py-2">
							<span>证件号码</span>
							{{ member.identity }}
						</div>
						<div class="flex justify-between py-2">
							<span>出发航班</span>
							{{ member.departingFlight }}
						</div>
						<div class="flex justify-between py-2">
							<span>到达航班</span>
							{{ member.arrivalFlight }}
						</div>
						<div class="flex justify-between py-2">
							<span>下单日期</span>
							{{ sheet.date }}
						</div>
						<template #footer>
							{{ member.remark }}
						</template>
					</el-card>
				</div>
			</div>
		</div> -->
		<div class="position-fixed bottom-0 w-100% h-67px bg-[--el-bg-color-overlay] flex justify-center items-center z-[999]">
			<el-button
				size="large"
				:disabled="currentGroup.submitted || currentGroup.hasProblem"
				@click="handleConfirm"
			>
				<div>
					{{ currentGroup.hasProblem ? '当前订单存在问题，请检查信息' : currentGroup.submitted ? '订单已提交' : '确认提交' }}
				</div>
			</el-button>
		</div>

		<el-button
			class="position-absolute right-0 top-50%"
			@click="toggleDrawer"
		>
			<el-icon>
				<el-icon-arrow-left />
			</el-icon>
			<div>
				{{ state.index + 1 }} / {{ useSheetStore.groups.length + 1 }}
			</div>
		</el-button>

		<div class="grid cols-5 gap-8">
			<el-card
				v-for="(member, i) in currentGroup.members"
				:key="i"
			>
				<template #header>
					{{ member.name }}
				</template>
				<div class="flex justify-between py-2">
					<span>年龄</span>
					{{ member.age }}
				</div>
				<div class="flex justify-between py-2">
					<span>性别</span>
					{{ member.gender }}
				</div>
				<div class="flex justify-between py-2">
					<span>出生年月</span>
					{{ member.birthday }}
				</div>
				<div class="flex justify-between py-2">
					<span>联系方式</span>
					{{ member.contact }}
				</div>
				<div class="flex justify-between py-2">
					<span>证件号码</span>
					{{ member.identity }}
				</div>
				<div class="flex justify-between py-2">
					<span>出发航班</span>
					{{ member.departingFlight }}
				</div>
				<div class="flex justify-between py-2">
					<span>到达航班</span>
					{{ member.arrivalFlight }}
				</div>
				<div class="flex justify-between py-2">
					<span>下单日期</span>
					{{ member.orderDate }}
				</div>
				<template #footer>
					{{ member.remark }}
				</template>
			</el-card>
		</div>

		<el-drawer
			v-model="state.dialog.visible"
			:show-close="false"
		>
			<template #header>
				待处理订单
			</template>
			<el-card
				v-for="(group, e) in useSheetStore.groups"
				:key="e"
				style="--un-scale-x:1.05; --un-scale-y:1.05"
				class="[&:nth-child(n-1)]:mt4 cursor-pointer hover:transform"
				@click="handleMemberCardClick(e)"
			>
				<div class="flex items-center">
					<div class="pr-4">
						<div
							v-if="group.submitted"
							class="i-mdi:check-circle color-[--el-color-success] text-[1.3rem]"
						/>
						<div
							v-else
							class="i-mdi:question-mark-circle-outline color-[--el-color-info] text-[1.3rem]"
						/>
						<div
							v-if="group.hasProblem"
							class="i-mdi:exclamation color-[--el-color-danger] text-[1.3rem]"
						/>
					</div>
					<div>{{ group.members.length }}人</div>
				</div>
			</el-card>
		</el-drawer>
	</div>
</template>

<script lang='ts' setup>
import { sheetStore } from '~/store'

const useSheetStore = sheetStore()

const state = reactive({
	dialog: {
		visible: false
	},
	index: 0
})

const currentGroup = computed(() => useSheetStore.groups[state.index])

const toggleDrawer = () => {
	state.dialog.visible = !state.dialog.visible
}

const handleConfirm = () => {
	const group = useSheetStore.groups[state.index]
	if (group.submitted) {
		ElMessage({
			type: 'info',
			message: '订单已提交!'
		})
	}
	else if (group.hasProblem) {
		ElMessage({
			type: 'warning',
			message: '订单存在问题, 请检查!'
		})
	}
	else {
		ElMessageBox.confirm(
			'确认提交订单?',
			'警告',
			{
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning'
			}
		)
			.then(() => {
				ElMessage({
					type: 'success',
					message: '提交成功'
				})
				group.submitted = true
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: 'Delete canceled'
				})
			})
	}
}

const handleMemberCardClick = (e: number) => {
	state.index = e
	state.dialog.visible = false
}

onMounted(() => {
	if (useSheetStore.groups.length == 0) {
		navigateTo('/')
	}
})
</script>

<style lang='scss'>
.el-drawer__header {
	display: none;
}
</style>
