<script setup>
import SideBar from "./components/sideBar.vue";
import NavBar from "./components/navBar.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getUserId } from "../../utils/auth";

const fatherTitle = ref("");
const pageTitle = ref("");
const activeRoute = ref("");
const router = useRouter();
const showDrawer = ref(false);

watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    if (newValue === "/login") return; // 退出到登陆页面
    showDrawer.value = newValue !== "/dashboard";
    activeRoute.value = router.currentRoute.value.path; // 路由更新时切换el-menu组件默认激活项
    const routes = router.currentRoute.value.matched;
    if (routes.length > 2) {
      fatherTitle.value = routes[1].meta.title;
      pageTitle.value = routes[2].meta.title;
    } else {
      fatherTitle.value = "";
      pageTitle.value = routes[1].meta.title;
    }
  },
  { immediate: true }
);

if (!getUserId()) {
  ElMessage({
    showClose: true,
    message: "登录失效,请重新登录",
    type: "warning",
  });
  router.push("/login");
}

</script>
<template>
  <el-header height="50px">
    <nav-bar></nav-bar>
  </el-header>
  <el-container>
    <el-aside width="auto">
      <side-bar :active-route="activeRoute"></side-bar>
    </el-aside>
    <el-main>
      <div class="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="fatherTitle">{{
            fatherTitle
          }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="pageTitle">{{
            pageTitle
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="view_container">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>

<style>
.el-aside {
  overflow-x: hidden;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  height: 100%;
}

.el-header {
  background: linear-gradient(to right, #0054a7, #42d0c5);
}

.el-main {
  padding: 0;
}

.el-container {
  height: calc(100% - 50px);
}

.bread {
  padding-left: 10px;
  border-bottom: 1px solid #e6e6e6;
}

.el-breadcrumb {
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.view_container {
  height: calc(100% - 51px);
  padding: 15px 20px;
  background-color: #f1f1f1;
}

/* .el-drawer {
  width: 40vw !important;
  background-color: #f1f1f1;
} */

.el-drawer .el-drawer__header {
  margin-bottom: 20px;
}

.el-drawer .el-drawer__body {
  padding-top: 0;
}

.el-drawer .el-drawer__header> :first-child {
  font-size: 22px;
  font-weight: bold;
  color: #2c3e50;
}

.drawer-header {
  display: flex;
  /*justify-content: space-between;*/
  padding-right: 20px;
  line-height: 50px;
}

.drawer-header span:nth-child(2) {
  margin-left: 20px;
  font-size: 16px;
  cursor: pointer;
  color: #1890ff;
  text-decoration: underline;
}

.form {
  padding-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
}
</style>
