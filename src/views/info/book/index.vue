<script setup>
import { getBookData, searchBook } from "../../../api";
import { reactive } from "vue";
import Table from "../../../components/table.vue";

const state = reactive({
  tableLabel: [
    {
      label: '图书ID',
      key: 'BookID'
    },
    {
      label: '标题',
      key: 'Title'
    },
    {
      label: '作者',
      key: 'Author'
    },
    {
      label: '出版社',
      key: 'PublishingHouse'
    },
    {
      label: 'ISBN',
      key: 'ISBN'
    },
    {
      label: '分类标识',
      key: 'Category'
    },
    {
      label: '在馆状态',
      key: 'AvailabilityStatus'
    },
    {
      label: '馆藏地址',
      key: 'Location'
    },
  ],
  tableData: null,
  total: 0,
  page: 1,
  loading: true,
  placeholder: '请输入图书名称、作者或ISBN'
})

const getTableData = async () => {
  state.loading = true
  const { total, page, data } = await getBookData({ page: state.page })
  state.total = total
  state.page = page
  state.tableData = data
  state.loading = false
}

const handleSearch = async (search) => {
  state.loading = true
  const { total, page, data } = await searchBook({ page: state.page, search })
  state.total = total
  state.page = page
  state.tableData = data
  state.loading = false
}

const handlePageChange = (page, search) => {
  state.page = page
  if (search.trim() === '') {
    getTableData()
  } else {
    handleSearch(search)
  }
}

getTableData()

</script>
<template>
  <Table :table-label="state.tableLabel" :table-data="state.tableData" :total="state.total" :page="state.page"
    :placeholder="state.placeholder" :loading="state.loading" @page-change="handlePageChange" @search="handleSearch" />
</template>
