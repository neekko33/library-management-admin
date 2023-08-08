<template>
  <div class="main">
    <div class="header">
      <div class="title">图书馆管理系统后台</div>
    </div>
    <div class="container">
      <div class="left"></div>
      <div class="right">
        <div class="title">系统后台登陆</div>
        <el-input v-model="user.account" placeholder="请输入用户名">
          <template #prefix>
            <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8>
              <path fill="currentColor"
                d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z" />
            </svg>
          </template>
        </el-input>
        <el-input v-model="user.password" placeholder="请输入密码" show-password>
          <template #prefix>
            <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8>
              <path fill="currentColor"
                d="M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32H224zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96z" />
              <path fill="currentColor"
                d="M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32zm192-160v-64a192 192 0 1 0-384 0v64h384zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64z" />
            </svg>
          </template>
        </el-input>
        <el-button type="primary" @click="handleClick">立&nbsp;即&nbsp;登&nbsp;录
        </el-button>
      </div>
    </div>
    <div class="footer">
      <div class="link">蜀ICP备17006376号</div>
      <div class="copy_right">Copyright © 2017-2018</div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { setToken, setUserInfo } from "../../utils/auth";
import { useStore } from '../../store'
import { login } from "../../api/users";

const user = reactive({
  account: "",
  password: "",
});
const store = useStore()
const router = useRouter();
const handleClick = async () => {
  // 非空判断
  if (user.account === "" || user.password === "") {
    ElMessage({
      showClose: true,
      message: "用户名或密码不能为空",
      type: "error",
    });
    return;
  }
  // 登录逻辑
  const {
    username, userType, userId, msg,
  } = await login(user);
  // setToken(token);
  setUserInfo(userId, username, userType)
  ElMessage({
    showClose: true,
    message: msg,
    type: "success",
  });
  await router.push("/");
};
</script>
<style scoped>
.main {
  width: 100%;
  font-size: 16px;
  line-height: 1;
  min-width: 1024px;
  height: 100%;
  margin: 0;
  background: url(../../assets/header.png) top repeat-x;
}

.header {
  padding-top: 100px;
  padding-bottom: 40px;
}

.header .title {
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 1.4px;
  color: #fff;
}

.container {
  position: relative;
  overflow: hidden;
  width: 740px;
  margin: auto;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 20px rgb(0 0 0 / 15%);
}

.container .left {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 360px;
  border: none;
  background: url(../../assets/card.png) 0 0 no-repeat;
  background-size: contain;
}

.container .right {
  float: right;
  width: 380px;
  min-height: 456px;
  padding: 40px;
}

.container .right .title {
  font-size: 20px;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 35px;
  color: #495060;
  text-align: left;
}

.el-input {
  height: 46px;
  line-height: 46px;
  margin-top: 10px;
}

.el-input ::v-deep() .el-input__inner {
  height: 46px;
  line-height: 46px;
  padding-left: 46px;
}

.el-input__icon {
  width: 46px;
  font-size: 18px;
  line-height: 46px;
}

.el-input ::v-deep() .el-input__prefix {
  left: 0;
}

.el-button {
  width: 100%;
  margin-top: 20px;
  line-height: 25px;
  font-size: 16px;
}

.footer {
  font-size: 12px;
  line-height: 18px;
  padding-top: 60px;
  padding-bottom: 40px;
  text-align: center;
}

.footer .link {
  margin-bottom: 10px;
}

.footer .copy_right {
  color: #b3b4b9;
}

.el-input ::v-deep() .el-input__prefix-inner {
  width: 40px;
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
}
</style>
