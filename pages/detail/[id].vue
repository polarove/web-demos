<template>
	<div>
		<h1 class="text-center">
			{{ trafficPackage?.code }}
		</h1>
		<el-form
			:model="formularForm"
			label-position="top"
			:inline="true"
			class="justify-center"
		>
			<el-form-item label="操作">
				<el-button @click="syncPrices()">
					同步价格
				</el-button>
			</el-form-item>
			<el-form-item label="成本价格公式">
				<el-input
					v-model="formularForm.price"
					@input="handleFormularChange(formularForm.price)"
				/>
			</el-form-item>
			<el-form-item label="分销等级1价格公式">
				<el-input
					v-model="formularForm.price1"
					@input="handleFormularChange(formularForm.price1)"
				/>
			</el-form-item>
			<el-form-item label="分销等级2价格公式">
				<el-input
					v-model="formularForm.price2"
					@input="handleFormularChange(formularForm.price3)"
				/>
			</el-form-item>
			<el-form-item label="分销等级3价格公式">
				<el-input
					v-model="formularForm.price3"
					@input="handleFormularChange(formularForm.price3)"
				/>
			</el-form-item>
		</el-form>
		<p class="text-center ">
			<el-text type="info">
				<span class="i-mdi:information" />&nbsp;n 为天数
			</el-text>
		</p>
		<el-auto-resizer style="height: 800px; padding: 0px 40px;">
			<template #default="{ height, width }">
				<el-table-v2
					:columns="columns"
					:data="prices"
					:width="width"
					:height="height"
					fixed
				/>
			</template>
		</el-auto-resizer>
		<el-card class="fixed bottom-0 w-100vw flex justify-center">
			<el-button
				type="primary"
				@click="reset()"
			>
				重置
			</el-button>
			<el-button
				type="primary"
				@click="save()"
			>
				保存
			</el-button>
			<el-button
				@click="back()"
			>
				返回
			</el-button>
		</el-card>
	</div>
</template>

<script lang='tsx' setup>
import type { AnyColumn } from 'element-plus/es/components/table-v2/src/common.mjs'
import type { IDistributorTrafficSeriesPrice } from '~/types'

const id = useRoute().params.id
const trafficPackage = ref<IDistributorTrafficSeriesPrice | undefined>()

onMounted(() => {
	trafficPackage.value = JSON.parse(sessionStorage.getItem(id.toString())!) as IDistributorTrafficSeriesPrice
})

const formularForm = reactive({
	price: 'n * 2',
	price1: 'n * 3',
	price2: 'n * 4 - 1',
	price3: 'n * 6 + 1'
})

const columns = reactive<AnyColumn[]>([
	{
		key: 'day',
		dataKey: 'day',
		title: '天数',
		width: 100,
		cellRenderer: ({
			cellData
		}) => {
			return (
				<el-text>
					￥
					{cellData}
				</el-text>
			)
		}
	},
	{
		key: 'price',
		dataKey: 'price',
		title: '成本价格',
		width: 100,
		cellRenderer: ({
			cellData
		}) => {
			return (
				<el-text>
					￥
					{cellData}
				</el-text>
			)
		}
	},
	{
		key: 'price1',
		dataKey: 'price1',
		title: '分销等级1价格',
		width: 200,
		cellRenderer: ({
			cellData
		}) => {
			return (
				<el-text>
					￥
					{cellData}
				</el-text>
			)
		}
	},
	{
		key: 'price2',
		dataKey: 'price2',
		title: '分销等级2价格',
		width: 200,
		cellRenderer: ({
			cellData
		}) => {
			return (
				<el-text>
					￥
					{cellData}
				</el-text>
			)
		}
	},
	{
		key: 'price3',
		dataKey: 'price3',
		title: '分销等级3价格',
		width: 200,
		cellRenderer: ({
			cellData
		}) => {
			return (
				<el-text>
					￥
					{cellData}
				</el-text>
			)
		}
	}
])

const reset = () => {
	ElMessageBox.confirm('是否重置?').then(() => {
		formularForm.price = 'n * 2'
		formularForm.price1 = 'n * 3'
		formularForm.price2 = 'n * 4 - 1'
		formularForm.price3 = 'n * 6 + 1'
		initTable()
	}).catch(() => {})
}

const syncPrices = () => {
	if (columns.find(item => item.key === 'sync')) {
		columns.splice(2, 1)
	}
	columns.splice(2, 0, {
		key: 'sync',
		dataKey: 'sync',
		title: '同步后的成本价',
		width: 200,
		cellRenderer: ({
			cellData,
			rowIndex
		}) => {
			if (cellData > prices[rowIndex].price) {
				return (
					<div>
						<el-text>
							￥
							{cellData}
						</el-text>
						<div>
							<el-text type="primary">
								￥
								{cellData - prices[rowIndex].price}
							</el-text>
							<el-text type="info">&nbsp;(上升)</el-text>
						</div>
					</div>
				)
			}
			else if (cellData < prices[rowIndex].price) {
				return (
					<div>
						<el-text>
							￥
							{cellData}
						</el-text>
						<div>
							<el-text type="danger">
								-￥
								{Math.abs(cellData - prices[rowIndex].price)}
							</el-text>
							<el-text type="info">&nbsp;(下降)</el-text>
						</div>
					</div>
				)
			}
			else {
				return (
					<el-text>
						￥
						{cellData}
					</el-text>
				)
			}
		}
	})
	initTable(true)
}

const save = () => {
	ElMessageBox.confirm('是否保存?')
		.then(() => {
			const dayone = prices.find(item => item.day === 1)
			sessionStorage.setItem(dayone!.day.toString(), JSON.stringify(dayone))
		})
		.catch(() => {})
}

const back = () => {
	ElMessageBox.confirm('是否返回?')
		.then(() => { navigateTo('/') })
		.catch(() => {})
}

const handleFormularChange = (formular: string) => {
	if (checkCalcExpressionValid(formular)) {
		initTable()
	}
}

interface IPriceTable {
	day: number
	price: number
	sync?: number
	price1: number
	price2: number
	price3: number
}

const initTable = (flag?: boolean) => {
	prices.splice(0, prices.length)
	const seriesDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 45, 60, 91]

	for (let i = 0; i < seriesDays.length; i++) {
		const d = Math.random() > 0.5 ? '2' : '-2'
		const day = seriesDays[i]
		prices.push({
			day,
			price: calculate(formularForm.price, day.toString()),
			sync: flag ? i % 2 == 0 ? calculate(formularForm.price, day.toString()) : calculate(formularForm.price + d, day.toString())! : null,
			price1: calculate(formularForm.price1, day.toString()),
			price2: calculate(formularForm.price2, day.toString()),
			price3: calculate(formularForm.price3, day.toString())
		} as IPriceTable)
	}
}

onMounted(initTable)
const prices = reactive<IPriceTable[]>([])

const calculate = (formula: string, dayValue: string): number | null => {
	if (checkCalcExpressionValid(formula)) {
		return Math.round((new Function('n', 'return ' + formula)(dayValue)) * 10) / 10
	}
	else {
		return null
	}
}
function checkCalcExpressionValid(formula: string) {
	// 剔除空白符
	formula = formula.trim()
	// 错误情况，空字符串
	if ('' === formula) {
		return false
	}

	// 错误情况，运算符连续
	// eslint-disable-next-line no-useless-escape
	if (/[\+\-\*\/]{2,}/.test(formula)) {
		return false
	}

	// 空括号
	if (/\(\)/.test(formula)) {
		return false
	}

	// 空中括号
	if (/\[\]/.test(formula)) {
		return false
	}

	// 错误情况，括号不配对
	const stack = []
	for (let i = 0, item; i < formula.length; i++) {
		item = formula.charAt(i)
		if ('(' === item) {
			stack.push('(')
		}
		else if (')' === item) {
			if (stack.length > 0) {
				stack.pop()
			}
			else {
				return false
			}
		}
	}
	if (0 !== stack.length) {
		return false
	}

	// 错误情况，中括号不配对
	const stack2 = []
	for (let i = 0, item; i < formula.length; i++) {
		item = formula.charAt(i)
		if ('[' === item) {
			stack2.push('[')
		}
		else if (']' === item) {
			if (stack2.length > 0) {
				stack2.pop()
			}
			else {
				return false
			}
		}
	}
	if (0 !== stack2.length) {
		return false
	}

	// 错误情况，(后面是运算符
	// eslint-disable-next-line no-useless-escape
	if (/\([\+\-\*\/]/.test(formula)) {
		return false
	}

	// 错误情况，)前面是运算符
	// eslint-disable-next-line no-useless-escape
	if (/[\+\-\*\/]\)/.test(formula)) {
		return false
	}

	// 错误情况，[后面是运算符
	// eslint-disable-next-line no-useless-escape
	if (/\[[\+\-\*\/]/.test(formula)) {
		return false
	}

	// 错误情况，]前面是运算符
	// eslint-disable-next-line no-useless-escape
	if (/[\+\-\*\/]\]/.test(formula)) {
		return false
	}

	// 错误情况，运算符号不能在首末位
	// eslint-disable-next-line no-useless-escape
	if (/^[\+\-\*\/.]|[\+\-\*\/.]$/.test(formula)) {
		return false
	}

	// 错误情况，中括号结尾到下一个开始之间没有运算符
	if (/\]\[/.test(formula)) {
		return false
	}

	return true
}
</script>

<style lang='scss' scoped>

</style>
