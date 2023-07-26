<script setup>
import { getFineData } from '../../../api'
import { reactive } from 'vue'
import Table from '../../../components/table.vue'

const state = reactive({
  tableLabel: [
    {
      label: '罚款ID',
      key: 'FineID'
    },
    {
      label: '借阅ID',
      key: 'BorrowID'
    },
    {
      label: '罚款金额',
      key: 'FineAmount'
    },
    {
      label: '是否支付',
      key: 'IsPaid',
      isBool: true
    },
  ],
  tableData: null,
  total: 0,
  page: 1,
  loading: true
})

const getTableData = async () => {
  state.loading = true
  const { total, page, data } = await getFineData({ page: state.page })
  state.total = total
  state.page = page
  state.tableData = data
  state.loading = false
}

const handlePageChange = (page) => {
  state.page = page
  getTableData()
}

getTableData()

</script>
<template>
  <Table :table-label="state.tableLabel" :table-data="state.tableData" :total="state.total" :page="state.page"
    :loading="state.loading" @page-change="handlePageChange" />
</template>
