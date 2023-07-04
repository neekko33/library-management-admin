<script setup>
import { reactive, onMounted } from "vue";
import Cards from "../../components/cards.vue";
import Charts from "../../components/charts.vue";
import { getBaseData } from "../../api";
import { useStore } from "../../store";

const store = useStore();
const state = reactive({
  options: [
    { value: "value", label: "私募持股总价值" },
    { value: "hold_value", label: "继续持有股票价值" },
    { value: "increase_value", label: "增持股票价值" },
    { value: "decrease_value", label: "减持套现价值" },
    { value: "stock_count", label: "总持股支数" },
    { value: "hold_stock_count", label: "继续持有股票支数" },
    { value: "increase_stock_count", label: "增持股票支数" },
    { value: "decrease_stock_count", label: "减持股票支数" },
  ],
  cards_list: [
    {
      title: "私募持股总价值",
      key: "value",
      unit: "万",
      count: "",
      color: "blue",
    },
    {
      title: "继续持有股票价值",
      key: "hold_value",
      unit: "万",
      count: "",
      color: "blue",
    },
    {
      title: "增持股票价值",
      key: "increase_value",
      unit: "万",
      count: "",
      color: "red",
    },
    {
      title: "减持套现价值",
      key: "decrease_value",
      unit: "万",
      count: "",
      color: "green",
    },
    {
      title: "总持股支数",
      key: "stock_count",
      unit: "支",
      count: "",
      color: "blue",
    },
    {
      title: "继续持有股票支数",
      key: "hold_stock_count",
      unit: "支",
      count: "",
      color: "blue",
    },
    {
      title: "增持股票支数",
      key: "increase_stock_count",
      unit: "支",
      count: "",
      color: "red",
    },
    {
      title: "减持股票支数",
      key: "decrease_stock_count",
      unit: "支",
      count: "",
      color: "green",
    },
  ],
  chartData: null,
});

const getCardsData = async () => {
  const { result: res } = await getBaseData({ type: "base" });
  state.cards_list.forEach((item) => {
    item.count = res[item.key];
  });
};

onMounted(() => {
  getCardsData();
});
</script>
<template>
  <div class="container">
    <div class="top">
      <div class="title">历史累计数据（1985至今）</div>
      <Cards :cards_list="state.cards_list" />
    </div>
    <div class="bottom">
      <div class="title">{{ store.dashboardTitle }}</div>
      <Charts :options="state.options" />
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
}

.bottom {
  width: 100%;
  height: 100%;
  margin-top: 40px;
}

:deep(.cards .item) {
  width: 20%;
}
</style>
