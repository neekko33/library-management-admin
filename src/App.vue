<template>
  <router-view />
</template>

<script setup>
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { checkLogin } from "./utils/auth";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

// 通过cookie中的haslogin判断是否登陆失效
const router = useRouter();
const hasLogin = checkLogin();
if (!checkLogin()) {
  ElMessage({
    showClose: true,
    message: "登录失效,请重新登录",
    type: "warning",
  });
  router.push("/login");
}
</script>

<style>
#app {
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
