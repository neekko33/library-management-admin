<script setup>
import { reactive } from "vue";
import Vue3Tinymce from '@jsdawn/vue3-tinymce'

const state = reactive({
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
  }
})
</script>
<template>
  <div class="top">
    <div class="title">通知编辑</div>
    <el-button type="primary" size="large">＋保存通知</el-button>
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
      <!-- <el-form-item>
        <el-button type="primary" size="large" @click="submit">确认提交</el-button>
      </el-form-item> -->
    </el-form>
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