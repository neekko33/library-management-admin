<template>
  <div class="nav">
    <div class="logo">
      <img src="/logo.png" alt="" />
      图书馆管理系统后台
    </div>
    <div class="dropdown">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link" style="color: #ffffff; font-size: 16px; padding-right: 25px">
          {{ username }}
          <svg height="20" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" style="
              position: absolute;
              top: 50%;
              right: 0px;
              transform: translateY(-50%);
            " data-v-ba633cb8="">
            <path fill="currentColor"
              d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z">
            </path>
          </svg>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item command="register">账号注册</el-dropdown-item> -->
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { removeToken } from "../../../utils/auth";
import { useStore } from '../../../store'
export default defineComponent({
  setup() {
    const router = useRouter();
    const username = ref("");
    const store = useStore()
    username.value = store.username;
    const handleCommand = (command) => {
      // 退出登录
      if (command === "logout") {
        ElMessage({
          showClose: true,
          message: "退出成功",
          type: "success",
        });
        removeToken();
        router.push("/login");
      }
    };
    return {
      handleCommand,
      username,
    };
  },
});
</script>
<style scoped>
.nav {
  width: 100%;
  height: 100%;
  display: flex;
  line-height: 50px;
  justify-content: space-between;
}

.dropdown {
  cursor: pointer;
}

.el-dropdown {
  vertical-align: middle;
}

.logo {
  line-height: 50px;
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  position: relative;
  padding-left: 100px;
  letter-spacing: 2px;
}

.logo img {
  position: absolute;
  width: 85px;
  left: 0;
  top: 50%;
  transform: translateY(-55%);
}
</style>
