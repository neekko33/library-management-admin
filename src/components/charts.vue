<script setup>
import { reactive, onMounted, nextTick, markRaw, onBeforeUnmount } from "vue";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { SVGRenderer } from "echarts/renderers";
import { getBaseData, getChartData } from "../api";
import { useStore } from "../store";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
]);
const store = useStore();
const props = defineProps({
  target: String,
  options: Array,
});
const state = reactive({
  radio: "全部",
  value: "",
  radios: [
    { label: "近1年", value: "1" },
    { label: "近3年", value: "3" },
    { label: "近5年", value: "5" },
    { label: "近10年", value: "10" },
    { label: "全部", value: "all" },
  ],
});
// 单选框回调函数
const handleVideoChange = () => {
  changeChartOption();
};
// 下拉选单回调函数
const handleSelectChange = (val) => {
  store.setDashboardTitle(
    props.options.find((item) => item.value === state.value).label
  );
  changeChartOption();
};
const changeChartOption = async () => {
  const years = state.radios.find((item) => item.label === state.radio).value;
  let chartsData = null;
  if (!props.target) {
    const { result: res } = await getBaseData({
      type: "base_list",
      years: years,
      trend_type: state.value,
    });
    chartsData = res;
  } else {
    const data = {
      type: state.value,
      years: years,
    };
    if (store.drawerType === "inst") {
      data.inst_id = store.drawerId;
    } else {
      data.stock_id = store.drawerId;
    }
    const { result: res } = await getChartData(props.target, data);
    chartsData = res;
  }
  const xArray = [];
  const yArray = [];
  chartsData.map((item) => {
    xArray.push(item.quarter);
    yArray.push(item.trend);
  });
  const option = {
    xAxis: {
      type: "category",
      data: xArray,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      show: true,
      trigger: "axis",
    },
    series: [
      {
        data: yArray,
        type: "line",
      },
    ],
  };
  state.myChart.setOption(option);
};
const resizeHandler = () => {
  window.setTimeout(() => {
    const chartBox = document.getElementById("main");
    chartBox.style.width =
      document.querySelector(".chart").clientWidth - 30 + "px";
    // 解决获取不到 state.myChart 报错的 bug
    if (state.myChart) {
      state.myChart.resize();
    }
  }, 300);
};
onMounted(async () => {
  window.removeEventListener("resize", resizeHandler);
  state.value = props.options[0].value;
  store.setDashboardTitle(
    props.options.find((item) => item.value === state.value).label
  );
  await nextTick(); // 等待drawer中页面加载完成
  const chartBox = document.getElementById("main");
  chartBox.style.width =
    document.querySelector(".chart").clientWidth - 30 + "px";
  state.myChart = markRaw(echarts.init(chartBox)); // 转换为非响应式对象
  // 根据窗口宽度变化自适应宽度
  window.addEventListener("resize", resizeHandler);
  await changeChartOption();
});

onBeforeUnmount(() => {
  if (state.myChart) {
    state.myChart.clear();
    state.myChart.dispose();
    state.myChart = null;
  }
});
</script>

<template>
  <div class="chart">
    <div class="menus">
      <el-radio-group v-model="state.radio" @change="handleVideoChange">
        <template v-for="(item, index) in state.radios" :key="index">
          <el-radio-button :label="item.label" />
        </template>
      </el-radio-group>
      <el-select
        v-model="state.value"
        @change="handleSelectChange"
        class="m-2"
        placeholder="Select"
      >
        <el-option
          v-for="item in props.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div id="main" style="height: 350px; width: auto"></div>
  </div>
</template>

<style scoped>
.chart {
  /*width: 93%;*/
  margin-top: 25px;
  height: 45vh;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  padding: 20px 15px;
}

.chart .menus {
  display: flex;
  justify-content: space-between;
}
</style>
