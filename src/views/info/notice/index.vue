<script setup>
import { getNoticeData } from "../../../api";
import { reactive } from "vue";
import Table from "../../../components/table.vue";
import Vue3Tinymce from '@jsdawn/vue3-tinymce'

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
      // 自定义 图片上传模式
      language: 'zh-Hans',
      language_url: 'https://unpkg.com/@jsdawn/vue3-tinymce@2.0.2/dist/tinymce/langs/zh-Hans.js',
    }
  },
  tableData: null,
  total: 0,
  page: 1,
  loading: true,
  showTable: false
})

const handleBack = () => {
  state.showTable = true
}

const getTableData = async () => {
  state.loading = true
  const { total, page, data } = await getNoticeData({ page: state.page })
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
  <Table v-if="state.showTable" :table-label="state.tableLabel" :table-data="state.tableData" :total="state.total"
    :page="state.page" :loading="state.loading" @page-change="handlePageChange" />
  <div v-else>
    <div class="top">
      <div class="title">通知编辑</div>
      <div style="display: flex;">
        <el-button type="primary" size="large">保存</el-button>
        <el-button type="" size="large" @click="handleBack">取消</el-button>
      </div>
    </div>
    <div class="card">
      <el-form :model="state.form" label-width="120px" label-position="left">
        <el-form-item label="标题" style="width: 50%;">
          <el-input v-model="state.form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="日期" style="width: 50%;">
          <el-date-picker v-model="state.form.date" type="date" placeholder="选择时间" style="width: 100%" />
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