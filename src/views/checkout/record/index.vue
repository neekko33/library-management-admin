<script setup>
import {getBorrowData} from '../../../api'
import {reactive} from 'vue'
import Table from '../../../components/table.vue'

const state = reactive({
  tableLabel: [
    {
      label: '借阅ID',
      key: 'BorrowID'
    },
    {
      label: '读者ID',
      key: 'ReaderID'
    },
    {
      label: '读者名称',
      key: 'ReaderName'
    },
    {
      label: '图书名称',
      key: 'BookName'
    },
    {
      label: '借阅时间',
      key: 'BorrowDate',
      isDate: true
    },
    {
      label: '归还时间',
      key: 'ReturnDate',
      isDate: true
    },
    {
      label: '是否逾期',
      key: 'IsOverdue',
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
  const {total, page, data} = await getBorrowData({page: state.page})
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
