<script setup>
import { getUserData, searchUser, addUser, editUser, deleteUser, getUserDataById } from '../../../api/users'
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
      key: 'UserType',
      isUserType: true
    },
  ],
  formLabel: [
    {
      label: '用户名称',
      key: 'username',
      isInput: true
    },
    {
      label: '用户类型',
      key: 'userType',
      options: [{
        userTypeName: '系统管理员',
        userType: 'admin'
      }, {
        userTypeName: '系统用户',
        userType: 'user'
      }],
      isUserType: true
    }
  ],
  formData: {
    username: '',
    userType: 'user'
  },
  tableData: null,
  total: 0,
  page: 1,
  placeholder: '请输入用户名称',
  showDialog: false,
  dialogId: 0,
  loading: true,
  idName: 'UserID'
})

const getTableData = async () => {
  state.loading = true
  const { total, page, data } = await getUserData({ page: state.page })
  state.total = total
  state.page = page
  state.tableData = data
  state.loading = false
}

const handleSearch = async (search) => {
  state.loading = true
  const { total, page, data } = await searchUser({ page: state.page, search })
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
  state.formData.userType = 'user'
  state.formData.username = ''
}

const handleAddData = async () => {
  resetFormData()
  state.dialogId = 0
  state.showDialog = true
}

const handleEdit = async (userId) => {
  state.dialogId = userId
  const { data } = await getUserDataById(userId)
  state.formData.username = data.Username
  state.formData.userType = data.UserType
  state.showDialog = true
}

const handleSubmit = async () => {
  if (!state.dialogId) {
    const { msg } = await addUser(state.formData)
    ElMessage({
      message: msg,
      type: 'success'
    })
  } else {
    const { msg } = await editUser(state.dialogId, state.formData)
    ElMessage({
      message: msg,
      type: 'success'
    })
  }
  state.showDialog = false
  resetFormData()
  getTableData()
}

const handleDelete = async (userId) => {
  const { msg } = await deleteUser(userId)
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
  <el-dialog v-model="state.showDialog" title="用户详情">
    <Form :form-data="state.formData" :form-label="state.formLabel" @submit="handleSubmit" />
  </el-dialog>
</template>
