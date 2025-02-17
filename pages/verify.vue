<template>
	<div>
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

		<el-text
			class="position-absolute right-4 top-4 cursor-pointer hover:color-[--el-color-primary]"
			size="large"
			@click="toggleDrawer"
		>
			{{ state.index + 1 }} / {{ useSheetStore.groups.length + 1 }}
		</el-text>

		<div class="pt-4">
			<h2 class="text-center">
				服务信息
			</h2>
			<div class="flex">
				<el-form inline>
					<el-form-item>
						<el-select
							v-model="form.service.region"
							style="width: 200px;"
						>
							<el-option
								label="国内导服"
								value="1"
							/>
							<el-option
								label="国外导服"
								value="2"
							/>
							<el-option
								label="跨国导服"
								value="3"
							/>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-select
							v-model="form.service.type"
							style="width: 200px;"
							class="ml-4"
						>
							<el-option
								label="送团接团"
								value="1"
							/>
							<el-option
								label="送团"
								value="2"
							/>
							<el-option
								label="接团"
								value="3"
							/>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-input-number
							v-model="form.travelDays"
							:min="1"
							:step="1"
						/>
					</el-form-item>
					<el-form-item>
						<el-input-number
							v-model="form.numberOfGuests"
							:min="1"
							:step="1"
						/>
					</el-form-item>
				</el-form>
			</div>
			<div v-if="form.service.type == '1' || form.service.type == '2'">
				<div>
					去程信息
				</div>
				<el-form inline>
					<el-form-item>
						<el-select
							v-model="form.go.airport"
						>
							<el-option
								label="[福州]福州长乐国际机场"
								value="1"
							/>
							<el-option
								label="[福州]福州机场"
								value="2"
							/>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-input
							v-model="form.go.flight"
							placeholder="航班/车次"
						/>
					</el-form-item>
					<el-form-item>
						<el-date-picker
							v-model="form.go.date"
							type="date"
							placeholder="出发日期"
						/>
					</el-form-item>
					<el-form-item>
						<el-time-picker
							v-model="form.go.time"
							placeholder="出发时间"
						/>
					</el-form-item>
					<el-form-item>
						<el-select v-model="form.go.operator">
							<el-option
								label="福州小丁[0]"
								value="1"
							/>
							<el-option
								label="福州小丁[1]"
								value="2"
							/>
							<el-option
								label="福州小丁[2]"
								value="3"
							/>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div v-if="form.service.type == '1' || form.service.type == '3'">
				<div>
					回程信息
				</div>
				<el-form :inline="true">
					<el-form-item>
						<el-select
							v-model="form.back.airport"
						>
							<el-option
								label="[福州]福州长乐国际机场"
								value="1"
							/>
							<el-option
								label="[福州]福州机场"
								value="2"
							/>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-input
							v-model="form.back.flight"
							placeholder="航班/车次"
						/>
					</el-form-item>
					<el-form-item>
						<el-date-picker
							v-model="form.back.date"
							type="date"
							placeholder="出发日期"
						/>
					</el-form-item>
					<el-form-item>
						<el-time-picker
							v-model="form.back.time"
							placeholder="出发时间"
						/>
					</el-form-item>
					<el-form-item>
						<el-select v-model="form.back.operator">
							<el-option
								label="福州小丁[0]"
								value="1"
							/>
							<el-option
								label="福州小丁[1]"
								value="2"
							/>
							<el-option
								label="福州小丁[2]"
								value="3"
							/>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
		</div>

		<div class="pt-4">
			<h2 class="text-center">
				客户信息
			</h2>
			<div class="grid cols-6 gap-8 ">
				<el-card
					v-for="(member, i) in currentGroup.members"
					:key="i"
				>
					<template #header>
						<div class="flex justify-between items-center">
							<span>{{ member.name }}</span>
							<el-popconfirm
								title="确认删除?"
								@confirm="handleDeleteMember(i)"
							>
								<template #reference>
									<span class="i-mdi:close cursor-pointer hover:color-[--el-color-primary]" />
								</template>
							</el-popconfirm>
						</div>
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
						<div
							class="text-ellipsis overflow-hidden text-nowrap cursor-pointer"
							@click="toggleRemarkDetail(member.name, member.remark)"
						>
							{{ member.remark }}
						</div>
					</template>
				</el-card>
			</div>
		</div>

		<div class="pt-4">
			<h2 class="text-center">
				附加信息
			</h2>

			<div class="grid cols-3 gap-4">
				<div>
					<div class="mb-4">
						内部备注
					</div>
					<el-input
						:rows="10"
						type="textarea"
					/>
				</div>

				<div>
					<div class="mb-4">
						客户备注
					</div>
					<el-input
						:rows="10"
						type="textarea"
					/>
				</div>

				<div>
					<div class="mb-4">
						确认说明
					</div>
					<el-input
						:rows="10"
						type="textarea"
					/>
				</div>
			</div>
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
							v-if="group.submitted ?? false"
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

const form = reactive({
	service: {
		region: '1',
		type: '1'
	},
	team: {
		type: '1'
	},
	travelDays: 1,
	numberOfGuests: 1,
	go: {
		airport: '1',
		flight: '',
		date: '',
		time: '',
		operator: ''
	},
	back: {
		airport: '2',
		flight: '',
		date: '',
		time: '',
		operator: ''
	}

})

const currentGroup = computed(() => useSheetStore.groups[state.index])

const toggleRemarkDetail = (name?: string | null, remark?: string | null) => {
	ElMessageBox.alert(remark ?? '客户未提供备注信息', name ?? '客户备注', {
		confirmButtonText: 'OK'
	})
}

const toggleDrawer = () => {
	state.dialog.visible = !state.dialog.visible
}

const handleDeleteMember = (e: number) => {
	useSheetStore.groups[state.index].members.splice(e, 1)
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
