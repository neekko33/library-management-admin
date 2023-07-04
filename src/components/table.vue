<script setup>
import { reactive, onMounted } from "vue";
import { CaretBottom, StarFilled, CaretTop } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import * as _ from "lodash";
import { useStore } from "../store";
import { getData, getQuarter, getRank } from "../api";

const store = useStore();
const props = defineProps({
  isRank: Boolean, // 是否是榜单页面的表格
  rankType: String, // 榜单类型
  showAll: Boolean, // 季度选择框是否显示全部选项
  show_title: Boolean,
  tableLabel: Array,
  target: String,
  type: String,
  instId: Number,
  stockId: Number,
});
const emit = defineEmits(["refresh"]);
const state = reactive({
  tableHeight: "669",
  loading: true,
  title: useRouter().currentRoute.value.meta.title,
  options: null,
  value: "",
  value_recent: "",
  activeSort: "",
  tableData: null,
  total: 0,
  page: 1,
  pageSize: props.show_title ? 15 : 10,
  selectedStatus: "全部", //控制详情页表格当季持有状况
});
const handleQuarter = async () => {
  if (!store.quarterList || store.quarterList.length === 0) {
    const { result: res } = await getQuarter();
    const temp = [];
    res.map((item) => {
      const data = {
        label: item.replace("Q", ".Q"),
        value: item,
      };
      temp.push(data);
    });
    store.setQuarterList(temp);
  }
  if (props.showAll) {
    const quarterList = _.cloneDeep(store.quarterList);
    quarterList.push({
      label: "全部",
      value: "全部",
    });
    state.options = quarterList;
  } else {
    state.options = store.quarterList;
  }
  state.value = state.options[state.options.length - 1].value;
};
// 打开机构或股票详情页
const handleClickName = (item, type) => {
  if (!item.inst_id && !item.stock_id) return;
  store.setDrawerType(type);
  store.setDrawerId(type === "inst" ? item.inst_id : item.stock_id);
  if (!store.showInfo) {
    store.changeShowInfo(true);
  } else {
    if (props.type === "base_list") {
      // store.refreshDrawer();
      emit("refresh", true);
    }
  }
};
// 排序函数
const handleClickArrow = (key) => {
  if (!document.getElementById(key)) return;
  const arrow = document.getElementById(key);
  // 默认排
  if (!state.activeSort) {
    state.activeSort = "-" + key;
    arrow.classList.add("active-sort");
  } // 其它排序
  else if (state.activeSort.replace("-", "") !== key) {
    const oldArrow = document.getElementById(state.activeSort.replace("-", ""));
    oldArrow.classList.remove("active-sort");
    oldArrow.querySelector("svg").classList.remove("active-sort-reverse");
    state.activeSort = "-" + key;
    arrow.classList.add("active-sort");
  } // 当前排序
  else {
    if (!state.activeSort.includes("-")) {
      arrow.querySelector("svg").classList.remove("active-sort-reverse");
      state.activeSort = "-" + key;
    } else {
      state.activeSort = state.activeSort.replace("-", "");
      arrow.querySelector("svg").classList.add("active-sort-reverse");
    }
  }
  // 排序后重新获取数据
  state.page = 1;
  getTableData();
};
// 获取表格数据
const getTableData = async () => {
  state.loading = true;
  if (props.isRank) {
    const data = {
      type: props.rankType,
      quarter:
        props.showAll && state.value === "全部"
          ? store.quarterList[store.quarterList.length - 1].value
          : state.value,
    };
    const { result: res } = await getRank(data);
    state.tableData = res;
  } else {
    const data = {
      type: props.type,
      quarter: props.show_title ? state.value : store.drawerQuarter,
      list: 1,
      page_size: state.pageSize,
      page: state.page,
    };
    // 添加排序
    if (state.activeSort) {
      data.rank = state.activeSort;
    }
    // 添加ID
    if (props.instId) {
      data.inst_id = props.instId;
    }
    if (props.stockId) {
      data.stock_id = props.stockId;
    }
    // 添加当季持有状况筛选
    if (state.selectedStatus && state.selectedStatus !== "全部") {
      data.hold_status = state.selectedStatus;
    }
    const {
      result: { count: total, results: res },
    } = await getData(props.target, data);
    const temp = [];
    res.forEach((item) => {
      if (item.inst_id) {
        item.data.inst_id = item.inst_id;
      }
      if (item.stock_id) {
        item.data.stock_id = item.stock_id;
      }
      temp.push(item.data);
    });
    state.tableData = temp;
    state.total = total;
  }
  state.loading = false;
};
// click pagination button.
const handlePageChange = (page) => {
  state.page = page;
  getTableData();
};
// click select button.
const handleSelectChange = () => {
  state.page = 1;
  getTableData();
};
// 点击详情页当前持有状态
const handleClickSelect = () => {
  console.log("click select");
};
// 详情页当前持有状态单选框切换
const handleStatusChange = () => {
  state.page = 1;
  getTableData();
};

onMounted(async () => {
  await handleQuarter();
  getTableData();
});
defineExpose({ state, getTableData });
</script>
<template>
  <div class="top" v-if="props.show_title">
    <div class="title">{{ state.title }}（{{ state.value }}）</div>
    <el-select
      v-model="state.value"
      class="m-2"
      placeholder="Select"
      @change="handleSelectChange"
    >
      <el-option
        v-for="item in state.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <div class="table">
    <el-table
      v-loading="state.loading"
      :data="state.tableData"
      header-row-class-name="table_header"
      stripe
      border
      table-layout="auto"
      style="width: 100%"
    >
      <template v-for="(item, index) in props.tableLabel" :key="index">
        <el-table-column :fixed="index === 0" min-width="180">
          <template v-if="item.sortable" #header>
            <div style="cursor: pointer" @click="handleClickArrow(item.key)">
              <span v-html="item.label"></span>
              <el-icon :id="item.key">
                <caret-bottom />
              </el-icon>
            </div>
          </template>
          <template v-else-if="item.star" #header>
            <div class="star" style="cursor: pointer">
              <el-icon>
                <star-filled />
              </el-icon>
              <span v-html="item.label"></span>
            </div>
          </template>
          <template v-else-if="item.selected" #header>
            <el-popover placement="top" :width="200" trigger="click">
              <el-radio-group
                v-model="state.selectedStatus"
                @change="handleStatusChange"
              >
                <el-radio label="全部">全部</el-radio>
                <el-radio label="新增">新增</el-radio>
                <el-radio label="增持">增持</el-radio>
                <el-radio label="减持">减持</el-radio>
                <el-radio label="继续持有">继续持有</el-radio>
                <el-radio label="退出">退出</el-radio>
              </el-radio-group>
              <template #reference>
                <div
                  style="cursor: pointer"
                  @click="handleClickSelect(item.key)"
                >
                  <span v-html="item.label"></span>
                  <el-icon :id="item.key">
                    <caret-top />
                  </el-icon>
                </div>
              </template>
            </el-popover>
          </template>
          <template v-else #header>
            <span v-html="item.label"></span>
          </template>
          <template #default="scope">
            <span
              v-if="item.linkedInst"
              class="linked"
              @click="handleClickName(scope.row, 'inst')"
              >{{ scope.row[item.key] }}</span
            >
            <span
              v-if="item.linkedStock"
              class="linked"
              @click="handleClickName(scope.row, 'stock')"
              >{{ scope.row[item.key] }}</span
            >
            <span
              v-if="item.colorful"
              style="font-weight: bold"
              :class="{
                red:
                  parseFloat(scope.row[item.key]) > 0 ||
                  scope.row[item.key] === '增持' ||
                  scope.row[item.key] === '新增',
                green:
                  parseFloat(scope.row[item.key]) < 0 ||
                  scope.row[item.key] === '减持' ||
                  scope.row[item.key] === '退出',
              }"
              >{{
                (parseFloat(scope.row[item.key]) > 0 ? "+" : "") +
                scope.row[item.key] +
                (item.unit && item.unit !== "%" ? " " : "") +
                (item.unit && !isNaN(scope.row[item.key]) ? item.unit : "")
              }}</span
            >
            <span
              v-if="!item.linkedInst && !item.linkedStock && !item.colorful"
              >{{
                scope.row[item.key] +
                (item.unit && item.unit !== "%" ? " " : "") +
                (item.unit && !isNaN(scope.row[item.key]) ? item.unit : "")
              }}</span
            >
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="state.page"
        @current-change="handlePageChange"
        :page-size="state.pageSize"
        :total="state.total"
        hide-on-single-page
      />
    </div>
  </div>
</template>
<style scoped>
.red {
  color: #ff2a2a;
}

.green {
  color: #458747;
}

.top {
  display: flex;
  justify-content: space-between;
}

.table {
  margin-top: 20px;
  padding-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
}

.pagination {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.el-icon {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
}

.star {
  padding-left: 20px;
}

.star .el-icon {
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #e6a23c;
}

.active-sort {
  color: #000;
}

.active-sort-reverse {
  transform: translateY(15%) rotate(180deg);
}

.linked {
  cursor: pointer;
  color: #1890ff;
  text-decoration: underline;
}
.el-radio-group .el-radio {
  margin-right: 0;
  justify-content: left;
}

.el-radio-group .el-radio:nth-child(odd) {
  width: 45%;
  margin-right: 10%;
}
</style>
