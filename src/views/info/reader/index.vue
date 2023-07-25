<script setup>
import {getReaderData} from "../../../api";
import {reactive} from "vue";
import Table from "../../../components/table.vue";

const state = reactive({
  tableLabel: [
    {
      label: '读者ID',
      key: 'ReaderID'
    },
    {
      label: '姓名',
      key: 'Name'
    },
    {
      label: '手机号',
      key: 'Phone'
    },
    {
      label: '邮箱',
      key: 'Email'
    },
  ],
  tableData: null,
  total: 0,
  page: 1,
  loading: true
})

const getTableData = async () => {
  state.loading = true
  const {total, page, data} = await getReaderData({page: state.page})
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
  <Table :table-label="state.tableLabel" :table-data="state.tableData" :total="state.total"
         :page="state.page" :loading="state.loading" @page-change="handlePageChange"/>
</template>
