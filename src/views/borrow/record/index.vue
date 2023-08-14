<script setup>
import { getBorrowData, searchBorrow, addBorrow, renewBrrow, deleteBorrow } from '../../../api/borrows'
import { reactive } from 'vue'
import Table from '../../../components/table.vue'
import Form from "../../../components/form.vue"
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
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
      label: '截止时间',
      key: 'DueDate',
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
  formLabel: [
    {
      label: '读者ID',
      key: 'readerId',
      isInput: true
    },
    {
      label: '图书ID',
      key: 'bookId',
      isInput: true
    }
  ],
  formData: {
    readerId: '',
    bookId: ''
  },
  total: 0,
  page: 1,
  loading: true,
  placeholder: '请输入图书名称或读者名称',
  showDialog: false,
  idName: 'BorrowID'
})

const getTableData = async () => {
  state.loading = true
  const { total, page, data } = await getBorrowData({ page: state.page })
  state.total = total
  state.page = page
  state.tableData = data
  state.loading = false
}

const handleSearch = async (search) => {
  state.loading = true
  const { total, page, data } = await searchBorrow({ page: state.page, search })
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

const resetFormData = () => {
  state.formData.bookId = ''
  state.formData.readerId = ''
}

const handleAddData = async () => {
  resetFormData()
  state.showDialog = true
}

const handleSubmit = async () => {
  const { msg } = await addBorrow(state.formData)
  ElMessage({
    message: msg,
    type: 'success'
  })
  state.showDialog = false
  resetFormData()
  getTableData()
}

const handleEdit = async (borrowId) => {
  const { msg } = await renewBrrow(borrowId)
  ElMessage({
    message: msg,
    type: 'success'
  })
  getTableData()
}

const handleDelete = async (borrowId) => {
  const { msg } = await deleteBorrow(borrowId)
  ElMessage({
    message: msg,
    type: 'success'
  })
  state.page = 1
  getTableData()
}

const handleJump = borrowId => {
  router.push('/checkout/compensation?bId=' + borrowId)
}

getTableData()

</script>
<template>
  <Table :table-label="state.tableLabel" :table-data="state.tableData" :total="state.total" :page="state.page"
    :placeholder="state.placeholder" :loading="state.loading" :id-name="state.idName" @page-change="handlePageChange"
    @search="handleSearch" @add="handleAddData" @edit="handleEdit" @delete="handleDelete" @jump="handleJump"
    :is-borrow="true" />
  <el-dialog v-model="state.showDialog" title="图书详情">
    <Form :form-data="state.formData" :form-label="state.formLabel" @submit="handleSubmit" />
  </el-dialog>
</template>
