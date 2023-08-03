<script setup>
import { getReaderData, searchReader, addReader, editReader, deleteReader, getReaderDataById } from "../../../api/readers";
import { reactive } from "vue";
import Table from "../../../components/table.vue";
import Form from "../../../components/form.vue"
import { ElMessage } from "element-plus";

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
  formLabel: [
    {
      label: '姓名',
      key: 'name',
      isInput: true
    },
    {
      label: '手机号',
      key: 'phone',
      isInput: true
    },
    {
      label: '邮箱',
      key: 'email',
      isInput: true
    },
  ],
  formData: {
    name: '',
    phone: '',
    email: ''
  },
  total: 0,
  page: 1,
  loading: true,
  placeholder: '请输入读者名称、手机号或邮箱',
  showDialog: false,
  dialogId: 0,
  idName: 'ReaderID'
})

const getTableData = async () => {
  state.loading = true
  const { total, page, data } = await getReaderData({ page: state.page })
  state.total = total
  state.page = page
  state.tableData = data
  state.loading = false
}

const handleSearch = async (search) => {
  state.loading = true
  const { total, page, data } = await searchReader({ page: state.page, search })
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
  for (let key in state.formData) {
    state.formData[key] = ''
  }
}

const handleAddData = async () => {
  resetFormData()
  state.dialogId = 0
  state.showDialog = true
}

const handleSubmit = async () => {
  if (!state.dialogId) {
    const { msg } = await addReader(state.formData)
    ElMessage({
      message: msg,
      type: 'success'
    })
  } else {
    const { msg } = await editReader(state.dialogId, state.formData)
    ElMessage({
      message: msg,
      type: 'success'
    })
  }
  state.showDialog = false
  resetFormData()
  getTableData()
}

const handleEdit = async (readerId) => {
  state.dialogId = readerId
  const { data } = await getReaderDataById(readerId)
  state.formData.name = data.Name
  state.formData.phone = data.Phone
  state.formData.email = data.Email
  state.showDialog = true
}

const handleDelete = async (readerId) => {
  const { msg } = await deleteReader(readerId)
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
    :placeholder="state.placeholder" :loading="state.loading" :id-name="state.idName" @page-change="handlePageChange"
    @search="handleSearch" @add="handleAddData" @edit="handleEdit" @delete="handleDelete" />
  <el-dialog v-model="state.showDialog" title="图书详情">
    <Form :form-data="state.formData" :form-label="state.formLabel" @submit="handleSubmit" />
  </el-dialog>
</template>
