<template>
	<div>
		<el-table :data="data">
			<el-table-column
				prop="id"
				label="id"
			/>
			<el-table-column
				prop="name"
				label="名称"
			/>
			<el-table-column
				prop="package"
				label="流量包类型"
			/>
			<el-table-column
				prop="regionType"
				label="地区类型"
			/>
			<el-table-column
				prop="region"
				label="关联地区"
			/>
			<el-table-column label="操作">
				<el-link
					type="primary"
					@click="toggleEditDialog"
				>
					编辑
				</el-link>
			</el-table-column>
		</el-table>
		<el-dialog v-model="editDialog.visible">
			<template #header>
				分销商 - 流量基础价格
			</template>
			<el-auto-resizer style="height: 400px;">
				<template #default="{ height, width }">
					<el-table-v2
						:columns="columns"
						:data="trafficSeriesData"
						:width="width"
						:height="height"
						fixed
					/>
				</template>
			</el-auto-resizer>
		</el-dialog>
	</div>
</template>

<script lang="tsx" setup>
import type { AnyColumn } from 'element-plus/es/components/table-v2/src/common.mjs'
import { reactive } from 'vue'
import type { IDistributorTrafficSeriesPrice } from '~/types'

const data = [
	{
		id: 1,
		name: '日本',
		package: '日租包',
		regionType: '单地区',
		region: '日本'
	}
]

const columns = reactive<AnyColumn[]>([
	{
		key: 'code',
		dataKey: 'code',
		title: '流量代码',
		width: 100
	},
	{
		key: 'specText',
		dataKey: 'specText',
		title: '流量规格',
		width: 100
	},
	{
		key: 'dayText',
		dataKey: 'dayText',
		title: '使用天数',
		width: 100
	},
	{
		key: 'priceText',
		dataKey: 'priceText',
		title: '基础价格',
		width: 100
	},
	{
		key: 'price1Text',
		dataKey: 'price1Text',
		title: '等级1',
		width: 100
	},
	{
		key: 'price2Text',
		dataKey: 'price2Text',
		title: '等级2',
		width: 100
	},
	{
		key: 'price3Text',
		dataKey: 'price3Text',
		title: '等级3',
		width: 100
	},
	{
		key: 'operation',
		dataKey: 'operation',
		title: '操作',
		width: 100,
		cellRenderer: ({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			column,
			rowIndex,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			columnIndex
		}) => <el-link class="text-primary font-bold" onClick={() => na(rowIndex)}>编辑</el-link>
	}
])

const na = (rowIndex: number) => {
	const obj = trafficSeriesData[rowIndex]
	sessionStorage.setItem(obj.id.toString(), JSON.stringify(obj))
	navigateTo(`detail/${obj.id}`)
}

const trafficSeriesData = reactive<IDistributorTrafficSeriesPrice[]>([
	{
		id: 2,
		code: 'SBK-1GB',
		spec: 1, specText: '1GB',
		day: 1, dayText: '1天',
		price: 1, priceText: '￥ 1',
		price1: 2, price1Text: '￥ 2',
		price2: 3, price2Text: '￥ 3',
		price3: 4, price3Text: '￥ 4'
	},
	{
		id: 124124,
		code: 'SBK-2GB',
		spec: 2, specText: '2GB',
		day: 1, dayText: '1天',
		price: 2, priceText: '￥ 2',
		price1: 4, price1Text: '￥ 4',
		price2: 8, price2Text: '￥ 8',
		price3: 16, price3Text: '￥ 16'
	},
	{
		id: 24325,
		code: 'SBK-3GB',
		spec: 3, specText: '3GB',
		day: 1, dayText: '1天',
		price: 3, priceText: '￥ 3',
		price1: 6, price1Text: '￥ 6',
		price2: 12, price2Text: '￥ 12',
		price3: 24, price3Text: '￥ 24'
	}
])

const editDialog = reactive({
	visible: false
})

const toggleEditDialog = () => {
	editDialog.visible = !editDialog.visible
}
</script>
