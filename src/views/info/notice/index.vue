<script setup>
import {getNoticeData} from "../../../api";
import {reactive} from "vue";
import Table from "../../../components/table.vue";

const state = reactive({
  tableLabel: [
    {
      label: '通知ID',
      key: 'NoticeID'
    },
    {
      label: '标题',
      key: 'Title'
    },
    {
      label: '发布日期',
      key: 'CreationDate'
    },
    {
      label: '作者',
      key: 'Author'
    },
  ],
  tableData: null,
  total: 0,
  page: 1,
  loading: true
})

const getTableData = async () => {
  state.loading = true
  const {total, page, data} = await getNoticeData({page: state.page})
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
