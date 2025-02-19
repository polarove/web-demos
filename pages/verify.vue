<template>
	<div class="p12 position-relative">
		<div class="position-fixed bottom-0 w-100% h-67px bg-[--el-bg-color-overlay] flex justify-center items-center z-[999]">
			<el-button
				size="large"
				:disabled="currentGroup.submitted || currentGroup.hasProblem"
				@click="handleConfirm"
			>
				{{ currentGroup.hasProblem ? '当前订单存在问题，请检查信息' : currentGroup.submitted ? '订单已提交' : '确认提交' }}
			</el-button>
			<el-button
				size="large"
			>
				暂时保存
			</el-button>
		</div>

		<el-tooltip
			content="点击此处查看订单列表"
			effect="dark"
			:visible="state.tooltip.visible"
		>
			<div
				ref="ref1"
				class="position-absolute right-4 top-4 cursor-pointer hover:color-[--el-color-primary] text-2xl"
				@click="toggleDrawer"
			>
				{{ state.index + 1 }} / {{ useSheetStore.groups.length }}
			</div>
		</el-tooltip>

		<h1 class="text-center">
			服务信息
		</h1>
		<el-form
			inline
			label-position="top"
			class
		>
			<el-form-item label="服务范围">
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
			<el-form-item label="服务类型">
				<el-select
					v-model="form.service.type"
					style="width: 200px;"
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
			<el-form-item label="旅游天数">
				<el-input-number
					v-model="form.travelDays"
					:min="1"
					:step="1"
				/>
			</el-form-item>
			<el-form-item label="游客人数">
				<el-input-number
					v-model="form.numberOfGuests"
					:min="1"
					:step="1"
					:disabled="true"
				/>
			</el-form-item>
		</el-form>
		<el-form
			v-if="form.service.type == '1' || form.service.type == '2'"
			inline
			label-position="top"
		>
			<el-form-item label="出发机场">
				<el-select
					v-model="form.go.airport"
					style="width: 200px;"
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
			<el-form-item label="航班/车次">
				<el-input
					v-model="form.go.flight"
					placeholder="航班/车次"
				/>
			</el-form-item>
			<el-form-item label="出发日期">
				<el-date-picker
					v-model="form.go.date"
					type="date"
					placeholder="出发日期"
				/>
			</el-form-item>
			<el-form-item label="出发时间">
				<el-time-picker
					v-model="form.go.time"
					placeholder="出发时间"
				/>
			</el-form-item>
			<el-form-item label="送机人员">
				<el-select
					v-model="form.go.operator"
					style="width: 200px;"
					placeholder="送机人员"
				>
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
		<el-form
			v-if="form.service.type == '1' || form.service.type == '3'"
			:inline="true"
			label-position="top"
		>
			<el-form-item label="回程机场">
				<el-select
					v-model="form.back.airport"
					style="width: 200px;"
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
			<el-form-item label="回程航班">
				<el-input
					v-model="form.back.flight"
					placeholder="航班/车次"
				/>
			</el-form-item>
			<el-form-item label="到达日期">
				<el-date-picker
					v-model="form.back.date"
					type="date"
					placeholder="到达日期"
				/>
			</el-form-item>
			<el-form-item label="到达时间">
				<el-time-picker
					v-model="form.back.time"
					placeholder="到达时间"
				/>
			</el-form-item>
			<el-form-item label="接机人员">
				<el-select
					v-model="form.back.operator"
					style="width: 200px;"
					placeholder="接机人员"
				>
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

		<h1 class="text-center mt-24">
			客户信息
		</h1>
		<el-scrollbar>
			<div class="flex">
				<transition-group name="slide-fade">
					<el-card
						class="shrink-0 min-w-[367px] max-w-[400px] m-4 cursor-pointer [&>div]:hover:text-[--el-color-primary]"
						@click="state.addCustomer.visible = true"
					>
						<div class="flex justify-center flex-col mt-32 items-center">
							<div class="i-mdi:plus text-5xl" />
							<div>
								添加新客户
							</div>
						</div>
					</el-card>
					<el-card
						v-for="(member, i) in currentGroup.members"
						:key="i"
						shadow="hover"
						class="shrink-0 min-w-[367px] max-w-[400px] m-4 cursor-pointer hover:b-[--el-color-primary]"
					>
						<template #header>
							<div class="flex justify-between items-center">
								<div>
									<span
										v-if="member.appended"
										class="i-mdi:star mx-2 color-[--el-color-warning]"
									/>
									<span>{{ member.name }}</span>
								</div>
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
						<div
							class="flex justify-between py-2"
							@click="toggleRemarkDetail(member.name, member.remark)"
						>
							<span>客户备注</span>
							<div class="max-w-120px text-ellipsis overflow-hidden text-nowrap cursor-pointer">
								{{ member.remark ?? '客户未提供备注信息' }}
							</div>
						</div>
						<template #footer>
							<el-button @click="handleReviseCustomer(member, i)">
								编辑
							</el-button>
							<el-popconfirm
								title="确认删除?"
								@confirm.prevent="handleDeleteMember(i)"
							>
								<template #reference>
									<el-button>
										删除
									</el-button>
								</template>
							</el-popconfirm>
						</template>
					</el-card>
				</transition-group>
			</div>
		</el-scrollbar>

		<h1 class="text-center mt-24">
			附加信息
		</h1>
		<el-form
			class="pb-70px"
			label-position="top"
			inline
		>
			<el-form-item
				label="内部备注"
				class="flex-1"
			>
				<el-input
					v-model="form.remarks.internal"

					:rows="10"
					type="textarea"
				/>
			</el-form-item>
			<el-form-item
				label="客户备注"
				class="flex-1"
			>
				<el-input
					v-model="form.remarks.customer"

					:rows="10"
					type="textarea"
				/>
			</el-form-item>
			<el-form-item
				label="确认说明"
				class="flex-1"
			>
				<el-input
					v-model="form.remarks.confirm"

					:rows="10"
					type="textarea"
				/>
			</el-form-item>
		</el-form>

		<el-drawer
			v-model="state.orderList.visible"
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
				:style="state.index === e ? 'border-color: var(--el-color-primary)' : ''"
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
		<el-dialog v-model="state.addCustomer.visible">
			<template #header>
				添加客户
			</template>
			<el-form label-position="top">
				<el-form-item label="客户姓名">
					<el-input />
				</el-form-item>
				<el-form-item label="客户年龄">
					<el-input />
				</el-form-item>
				<el-form-item label="出生年月">
					<el-input />
				</el-form-item>
				.... 等其他信息
			</el-form>
			<template #footer>
				<el-button @click="handleAddCustomer">
					确认添加
				</el-button>
			</template>
		</el-dialog>
		<el-dialog v-model="state.reviseCustomer.visible">
			<template #header>
				修改客户信息
			</template>
			<el-form label-position="top">
				<el-form-item label="客户姓名">
					<el-input v-model="state.reviseCustomer.member.name" />
				</el-form-item>
			</el-form>
			... 等其他可修改项目
			<template #footer>
				<el-button @click="confirmReviseCustomer">
					确认修改
				</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts' setup>
import { sheetStore } from '~/store'
import type { IMember } from '~/types/member'

const useSheetStore = sheetStore()

const state = reactive({
	addCustomer: {
		visible: false
	},
	orderList: {
		visible: false
	},
	reviseCustomer: {
		visible: false,
		member: {
			index: 0,
			name: ''
		}
	},
	index: 0,
	tooltip: {
		visible: false
	}

})

const ref1 = ref()

const currentGroup = computed(() => useSheetStore.groups[state.index])
const form = reactive({
	service: {
		region: '1',
		type: '1'
	},
	team: {
		type: '1'
	},
	travelDays: 1,
	numberOfGuests: currentGroup.value.members.length,
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
	},
	remarks: {
		internal: '',
		customer: '',
		confirm: ''
	}
})
const toggleRemarkDetail = (name?: string | null, remark?: string | null) => {
	ElMessageBox.alert(remark ?? '客户未提供备注信息', name ?? '客户备注', {
		confirmButtonText: 'OK'
	})
}

const toggleDrawer = () => {
	state.orderList.visible = !state.orderList.visible
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
	state.orderList.visible = false
}

const handleAddCustomer = () => {
	const customer = {
		name: `新客户${Date.now()}`,
		gender: '男',
		age: '23',
		birthday: '2024/11/16',
		contact: '13067265227',
		identity: '362330200105168426',
		departingFlight: 'S2C232',
		arrivalFlight: 'GR21232',
		orderDate: Date.now().toLocaleString(),
		remark: '客户有心脏病',
		appended: true
	}
	useSheetStore.groups[state.index].members.unshift(customer)
	state.addCustomer.visible = false
}

const handleReviseCustomer = (member: IMember, index: number) => {
	state.reviseCustomer.visible = true
	state.reviseCustomer.member.name = member.name ?? '未知客户'
	state.reviseCustomer.member.index = index
}

const confirmReviseCustomer = () => {
	state.reviseCustomer.visible = false
	currentGroup.value.members[state.reviseCustomer.member.index].name = state.reviseCustomer.member.name
}

onMounted(() => {
	if (useSheetStore.groups.length == 0) {
		navigateTo('/')
	}
	else {
		const totoal = useSheetStore.groups.length
		const errors = useSheetStore.groups.filter(group => group.hasProblem).length
		ElMessageBox.alert(h('div', [
			'系统已为您生成 ', h('span', { style: 'color: #67C23A' }, totoal), ' 份订单，其中 ', h('span', { style: 'color: #F56C6C' }, errors), ' 份订单的信息有错误，请及时处理。'
		]), '提示', {
			confirmButtonText: 'OK'
		}).then(() => {
			state.tooltip.visible = true
			setTimeout(() => {
				state.tooltip.visible = false
			}, 3000)
		}).catch(() => {
			state.tooltip.visible = true
			setTimeout(() => {
				state.tooltip.visible = false
			}, 3000)
		})
	}
})
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
