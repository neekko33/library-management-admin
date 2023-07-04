<script setup>
import { onMounted, reactive } from "vue";
import { useStore } from "../store";

const store = useStore();
const props = defineProps({
  show_select: Boolean,
  options: Array,
  cards_list: Array,
});
const emit = defineEmits(["refresh"]);
const state = reactive({
  quarter: "",
});
const handleSelectChange = (val) => {
  store.setDrawerQuarter(val);
  emit("refresh", false);
};
onMounted(() => {
  state.quarter = store.drawerQuarter;
});
</script>
<template>
  <el-select
    v-if="show_select"
    v-model="state.quarter"
    class="m-2"
    @change="handleSelectChange"
    placeholder="Select"
  >
    <el-option
      v-for="item in props.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <div class="cards">
    <div class="item" v-for="(item, index) in props.cards_list" :key="index">
      <div class="item_title">{{ item.title }}</div>
      <template v-if="item.color">
        <div class="item_count" :class="item.color">
          {{
            item.count + (item.unit ? " " : "") + (item.unit ? item.unit : "")
          }}
        </div>
      </template>
      <template v-else>
        <div class="item_count" v-html="item.count"></div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
}

.cards .item {
  height: 100px;
  margin-right: 25px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 15px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
}

.cards .item .item_title {
  font-size: 16px;
  color: #9a9a9a;
}

.cards .item .item_count {
  font-size: 22px;
  font-weight: bold;
}
</style>
