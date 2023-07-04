import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    showInfo: false,
    drawerTitle: "",
    drawerId: 0,
    drawerType: "",
    drawerQuarter: "",
    quarterList: [],
    dashboardTitle: "",
    showLink: false, // 控制跳转到股票详情页面按钮
  }),
  actions: {
    changeShowInfo(showInfo) {
      this.showInfo = showInfo;
    },
    setDrawerTitle(title) {
      this.drawerTitle = title;
    },
    setDrawerId(id) {
      this.drawerId = id;
    },
    setDrawerType(type) {
      this.drawerType = type;
    },
    setDrawerQuarter(quarter) {
      this.drawerQuarter = quarter;
    },
    setQuarterList(list) {
      this.quarterList = list;
    },
    setDashboardTitle(title) {
      this.dashboardTitle = title;
    },
    changeShowLink(bool) {
      this.showLink = bool;
    },
  },
});
