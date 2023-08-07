<template>
  <div class="btn" @click="handleClick">
    <el-icon v-if="!isCollapse">
      <fold />
    </el-icon>
    <el-icon v-else>
      <expand />
    </el-icon>
  </div>
  <el-menu :uniqueOpened="true" :collapse="isCollapse" :default-active="props.activeRoute" @select="handleSelect"
    class="el-menu-vertical-demo" text-color="#fff" active-text-color="#fff" background-color="#495060">
    <template v-for="(item, index) in routes" :key="index">
      <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
        <template #title>
          <el-icon>
            <document-copy />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <template v-for="(child, idx) in item.children" :key="idx">
          <el-menu-item v-if="!child.meta.hide" :index="`/${item.path}/${child.path}`">{{ child.meta.title
          }}</el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item v-else :index="`/${item.path}`">
        <el-icon v-if="index == 0">
          <house />
        </el-icon>
        <el-icon v-else>
          <document-copy />
        </el-icon>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { Fold, Expand, DocumentCopy, House } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const props = defineProps({
  activeRoute: String,
});
const isCollapse = ref(false);
const router = useRouter();
const routes = router.getRoutes().find((item) => item.path === "/").children;
const handleSelect = (index) => {
  router.push(index);
};
const handleClick = () => {
  isCollapse.value = !isCollapse.value;
};
</script>
<style scoped>
.btn {
  width: 100%;
  height: 50px;
  background-color: #495060 !important;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #ffff !important;
  cursor: pointer;
}

.el-menu-item i {
  color: #ffffff;
}

.el-menu-item [class^="el-icon"] {
  margin-right: 10px;
  text-align: left;
}

.btn:first-child {
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
}

.el-menu-item {
  text-align: center;
}

.el-menu {
  border: none;
  height: calc(100% - 50px) !important;
}

.is-active {
  background-color: #1890ff !important;
}
</style>
