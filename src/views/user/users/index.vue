<script setup>
import { getUserData } from '../../../api'
import { reactive } from 'vue'
import Table from '../../../components/table.vue'

const state = reactive({
  tableLabel: [
    {
      label: '用户ID',
      key: 'UserID'
    },
    {
      label: '用户名称',
      key: 'Username'
    },
    {
      label: '用户类型',
      key: 'UserType'
    },
  ],
  tableData: null,
  total: 0,
  page: 1,
  loading: true,
})

const getTableData = async () => {
  state.loading = true
  const { total, page, data } = await getUserData({ page: state.page })
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
