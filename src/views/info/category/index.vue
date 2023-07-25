<script setup>
import {getCategoryData} from "../../../api";
import {reactive} from "vue";
import Table from "../../../components/table.vue";

const state = reactive({
  tableLabel: [
    {
      label: '分类ID',
      key: 'CategoryID'
    },
    {
      label: '分类名称',
      key: 'CategoryName'
    },
    {
      label: '分类字符（中图法）',
      key: 'CategoryChar'
    },
  ],
  tableData: null,
  total: 0,
  page: 1,
  pageSize: 13,
  loading: true
})

const getTableData = async () => {
  state.loading = true
  const {total, page, data} = await getCategoryData({page: state.page})
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
