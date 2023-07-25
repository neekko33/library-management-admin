<script setup>
import {reactive, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import moment from 'moment'

const emit = defineEmits(['pageChange'])
const props = defineProps({
  tableLabel: Array,
  tableData: Array,
  total: Number,
  page: Number,
  loading: Boolean,
})

const state = reactive({
  tableHeight: '669',
  title: useRouter().currentRoute.value.meta.title,
})

const handlePageChange = (page) => {
  emit('pageChange', page)
}

const formatDate = (date) => {

  return date ? moment(date).format('YYYY-MM-D') : '--'
}

// 打开机构或股票详情页
// const handleClickName = (item, type) => {
//   if (!item.inst_id && !item.stock_id) return;
//   store.setDrawerType(type);
//   store.setDrawerId(type === "inst" ? item.inst_id : item.stock_id);
//   if (!store.showInfo) {
//     store.changeShowInfo(true);
//   } else {
//     if (props.type === "base_list") {
//       // store.refreshDrawer();
//       emit("refresh", true);
//     }
//   }
// };

// click pagination button.
</script>
<template>
  <div class="top">
    <div class="title">{{ state.title }}管理</div>
  </div>
  <div class="table">
    <el-table
        v-loading="props.loading"
        :data="props.tableData"
        header-row-class-name="table_header"
        stripe
        border
        table-layout="auto"
        style="width: 100%"
    >
      <template v-for="(item, index) in props.tableLabel" :key="index">
        <template v-if="item.isDate">
          <el-table-column min-width="180" :label="item.label">
            <template #default="scope">
              {{ formatDate(scope.row[item.key]) }}
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.isBool">
          <el-table-column min-width="180" :label="item.label">
            <template #default="scope">
              {{ scope.row[item.key] ? '是' : '否' }}
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column :fixed="index === 0" min-width="180" :label="item.label" :prop="item.key"></el-table-column>
        </template>
      </template>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
          background
          layout="prev, pager, next"
          :current-page="props.page"
          @current-change="handlePageChange"
          :page-size="13"
          :total="props.total"
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
