<script setup>
import { getCategoryData, addCategory, editCategory, deleteCategory, getCategoryDataById } from "../../../api/categories";
import { reactive } from "vue";
import Table from "../../../components/table.vue";
import Form from "../../../components/form.vue"
import { ElMessage } from "element-plus";

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
  formLabel: [
    {
      label: '分类名称',
      key: 'categoryName',
      isInput: true
    },
    {
      label: '分类字符',
      key: 'categoryChar',
      isInput: true
    },
  ],
  formData: {
    categoryName: '',
    categoryChar: ''
  },
  total: 0,
  page: 1,
  loading: true,
  showDialog: false,
  dialogId: 0,
  idName: 'CategoryID'
})

const getTableData = async () => {
  state.loading = true
  const { total, page, data } = await getCategoryData({ page: state.page })
  state.total = total
  state.page = page
  state.tableData = data
  state.loading = false
}

const handlePageChange = (page) => {
  state.page = page
  getTableData()
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
    const { msg } = await addCategory(state.formData)
    ElMessage({
      message: msg,
      type: 'success'
    })
  } else {
    const { msg } = await editCategory(state.dialogId, state.formData)
    ElMessage({
      message: msg,
      type: 'success'
    })
  }
  state.showDialog = false
  resetFormData()
  getTableData()
}

const handleEdit = async (categoryId) => {
  state.dialogId = categoryId
  const { data } = await getCategoryDataById(categoryId)
  state.formData.categoryName = data.CategoryName
  state.formData.categoryChar = data.CategoryChar
  state.showDialog = true
}

const handleDelete = async (categoryId) => {
  const { msg } = await deleteCategory(categoryId)
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
