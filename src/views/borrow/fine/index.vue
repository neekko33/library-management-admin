<script setup>
import { getFineData, getFineDataByBorrowId, payFine } from '../../../api/fines'
import { reactive } from 'vue'
import Table from '../../../components/table.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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
  loading: true,
  idName: 'FineID',
  borrowId: 0
})

const { bId } = router.currentRoute.value.query
if (bId) state.borrowId = parseInt(bId)

const getTableData = async () => {
  state.loading = true
  let fines
  if (state.borrowId) {
    fines = await getFineDataByBorrowId(state.borrowId, { page: state.page })
  } else {
    fines = await getFineData({ page: state.page })
  }
  state.total = fines.total
  state.page = fines.page
  state.tableData = fines.data
  state.loading = false
}

const handlePageChange = (page) => {
  state.page = page
  getTableData()
}

const handleDelete = async (fineId) => {
  const { msg } = await payFine(fineId)
  ElMessage({
    message: msg,
    type: 'success'
  })
  state.page = 1
  getTableData()
}

getTableData()

</script>
<template>
  <Table :table-label="state.tableLabel" :table-data="state.tableData" :total="state.total" :page="state.page"
    :loading="state.loading" :id-name="state.idName" @page-change="handlePageChange" @delete="handleDelete"
    :is-fine="true" />
</template>
