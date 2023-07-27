<script setup>
const emit = defineEmits(['submit'])
const props = defineProps({
  formData: Object,
  formLabel: Array
})
const submit = () => {
  emit('submit')
}
</script>
<template>
  <el-form :model="props.form" label-width="120px">
    <el-form-item v-for="(item, index) in props.formLabel" :key="index" :label="item.label">
      <template v-if="item.isInput">
        <el-input v-model="props.formData[item.key]" />
      </template>
      <template v-if="item.isSelect">
        <el-select v-model="props.formData[item.key]" placeholder="请选择图书类型">
          <el-option v-for="(itm, idx) in item.options" :key="idx" :label="itm.CategoryName" :value="itm.CategoryID" />
        </el-select>
      </template>
      <template v-if="item.isText">
        <el-input v-model="props.formData[item.key]" type="textarea" />
      </template>
      <template v-if="item.isDate">
        <el-date-picker v-model="props.formData[item.key]" type="date" placeholder="选择时间" style="width: 100%" />
      </template>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="large" @click="submit">确认提交</el-button>
    </el-form-item>
  </el-form>
</template>