<script setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue'
import Form from '../../../components/form.vue';
import { getUserId } from '../../../utils/auth'
import { getUserDataById, updatePassword, updateUserInfo } from '../../../api/users'

const state = reactive({
  infoFormLabel: [
    {
      label: '用户名',
      key: 'username',
      isInput: true
    },
    {
      label: '用户类型',
      key: 'userType',
      isInput: true,
      isDisabled: true
    },
  ],
  infoFormData: {
    username: '',
    userType: ''
  },
  pwFormLabel: [
    {
      label: '原密码',
      key: 'password',
      isInput: true,
      isPassword: true
    },
    {
      label: '新密码',
      key: 'newPassword',
      isInput: true,
      isPassword: true
    },
    {
      label: '确认密码',
      key: 'confirmPassword',
      isInput: true,
      isPassword: true
    },
  ],
  pwFormData: {
    password: '',
    newPassword: '',
    confirmPassword: ''
  },
  activeName: 'info',
  userId: 0
})

const userId = getUserId()
if (!userId) {
  ElMessage({
    message: '未找到用户ID，请重新登录！',
    type: 'error'
  })
}
state.userId = userId

const handleSubmitInfo = async () => {
  const { msg } = await updateUserInfo(state.userId, state.infoFormData)
  ElMessage({
    message: msg,
    type: 'success'
  })
  state.activeName = 'info'
  getUserInfo()
}

const handleSubmitPw = async () => {
  if (state.pwFormData.newPassword !== state.pwFormData.confirmPassword) {
    ElMessage({
      message: '两次输入不一致，请重新输入',
      type: 'error'
    })
    return
  }
  const { msg } = await updatePassword(state.userId, state.pwFormData)
  ElMessage({
    message: msg,
    type: 'success'
  })
  state.activeName = 'info'
  getUserInfo()
}

const getUserInfo = async () => {
  const { data: { Username, UserType } } = await getUserDataById(state.userId)
  state.infoFormData.username = Username
  state.infoFormData.userType = UserType == 'admin' ? '系统管理员' : '系统用户'
}

getUserInfo()

</script>
<template>
  <div class="top">
    <div style="display: flex;">
      <div class="title">个人信息编辑</div>
    </div>
  </div>
  <div class="card">
    <el-tabs v-model="state.activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="个人信息" name="info">
        <div class="tab-item">
          <Form :form-data="state.infoFormData" :form-label="state.infoFormLabel" @submit="handleSubmitInfo" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="密码修改" name="password">
        <div class="tab-item">
          <Form :form-data="state.pwFormData" :form-label="state.pwFormLabel" @submit="handleSubmitPw" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style  scoped>
.top {
  display: flex;
  justify-content: space-between;
}

.top .title {
  margin-right: 30px;
}

.card {
  margin-top: 20px;
  height: 80vh;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
}

.tab-item {
  width: 50%;
  margin: 20px auto;
}
</style>
