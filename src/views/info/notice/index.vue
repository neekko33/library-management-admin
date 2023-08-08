<script setup>
import { getNoticeData, searchNotice, addNotice, editNotice, deleteNotice, getNoticeDataById } from "../../../api/notices";
import { reactive } from "vue";
import Table from "../../../components/table.vue";
import Vue3Tinymce from '@jsdawn/vue3-tinymce'
import { getUserId } from "../../../utils/auth";

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
      key: 'CreationDate',
      isDate: true
    },
    {
      label: '作者',
      key: 'Author'
    },
  ],
  form: {
    title: '',
    date: new Date(),
    content: '',
    setting: {
      menubar: false,
      height: 500,
      toolbar:
        'bold italic underline h1 h2 blockquote codesample numlist bullist link image | removeformat fullscreen',
      plugins: 'codesample link image table lists fullscreen',
      toolbar_mode: 'sliding',
      nonbreaking_force_tab: true,
      link_title: false,
      link_default_target: '_blank',
      content_style: 'body{font-size: 16px}',
      language: 'zh-Hans',
      language_url: 'https://unpkg.com/@jsdawn/vue3-tinymce@2.0.2/dist/tinymce/langs/zh-Hans.js',
    }
  },
  tableData: null,
  placeholder: '请输入通知标题',
  total: 0,
  page: 1,
  loading: true,
  showEdit: false,
  editId: 0,
  idName: 'NoticeID'
})

const handleBack = () => {
  state.showEdit = false
}

const getTableData = async () => {
  state.loading = true
  const { total, page, data } = await getNoticeData({ page: state.page })
  state.total = total
  state.page = page
  state.tableData = data
  state.loading = false
}

const handleSearch = async (search) => {
  state.loading = true
  const { total, page, data } = await searchNotice({ page: state.page, search })
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
  state.form.title = ''
  state.form.date = new Date()
  state.form.content = ''
}

const handleAddData = async () => {
  resetFormData()
  state.editId = 0
  state.showEdit = true
}

const handleEdit = async (noticeId) => {
  state.editId = noticeId
  const { data } = await getNoticeDataById(noticeId)
  state.form.title = data.Title
  state.form.date = data.CreationDate
  state.form.content = data.Content
  state.showEdit = true
}

const handleDelete = async (noticeId) => {
  const { msg } = await deleteNotice(noticeId)
  ElMessage({
    message: msg,
    type: 'success'
  })
  state.page = 1
  getTableData()
}

const handleSubmit = async () => {
  if (!state.editId) {
    const { msg } = await addNotice({
      title: state.form.title,
      content: state.form.content,
      creationDate: state.form.date,
      userId: getUserId()
    })
    ElMessage({
      message: msg,
      type: 'success'
    })
  } else {
    const { msg } = await editNotice(state.editId, {
      title: state.form.title,
      content: state.form.content,
    })
    ElMessage({
      message: msg,
      type: 'success'
    })
  }
  state.showEdit = false
  getTableData()
}

getTableData()

</script>
<template>
  <Table v-if="!state.showEdit" :table-label="state.tableLabel" :table-data="state.tableData" :total="state.total"
    :page="state.page" :placeholder="state.placeholder" :loading="state.loading" :id-name="state.idName"
    @page-change="handlePageChange" @search="handleSearch" @add="handleAddData" @edit="handleEdit"
    @delete="handleDelete" />
  <div v-else>
    <div class="top">
      <div class="title">通知编辑</div>
      <div style="display: flex;">
        <el-button type="primary" size="large" @click="handleSubmit">保存</el-button>
        <el-button type="" size="large" @click="handleBack">取消</el-button>
      </div>
    </div>
    <div class="card">
      <el-form :model="state.form" label-width="120px" label-position="left">
        <el-form-item label="标题" style="width: 50%;">
          <el-input v-model="state.form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="日期" style="width: 50%;">
          <el-date-picker v-model="state.form.date" type="date" placeholder="选择时间" style="width: 100%"
            :disabled="state.editId" />
        </el-form-item>
        <el-form-item label="内容">
          <vue3-tinymce v-model="state.form.content" :setting="state.form.setting" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
.top {
  display: flex;
  justify-content: space-between;
}

.top .title {
  margin-right: 30px;
}

.card {
  margin-top: 20px;
  padding-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  padding: 50px;
}

.tox-tinymce {
  width: 90%;
}
</style>