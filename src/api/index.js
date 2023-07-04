import { default as api } from "../utils/api";

// 将参数对象转换为为字符串形式
function transformData(data) {
  let str = "";
  for (let key in data) {
    str += `${key}=${data[key]}&`;
  }
  return str.substring(0, str.length - 1);
}

export const login = (userInfo) => {
  return api({
    url: "/login/",
    method: "POST",
    data:{
      account:userInfo.account,
      password: userInfo.password
    }
  })
}

// 首页&排行榜数据
export const getBaseData = (data) => {
  return api({
    url: "/history/data/?" + transformData(data),
    method: "GET",
  });
};

// 图表数据
export const getChartData = (target, data) => {
  return api({
    url: `/${target}/trend/?` + transformData(data),
    method: "GET",
  });
};

// 表格数据
export const getData = (target, data) => {
  return api({
    url: `/${target}/data/?` + transformData(data),
    method: "GET",
  });
};

// 排行榜数据
export const getRank = (data) => {
  return api({
    url: "/history/top/?" + transformData(data),
    method: "GET",
  });
};

// 季度数据-总
export const getQuarter = () => {
  return api({
    url: "/quarters/all/",
    method: "GET",
  });
};

// 季度数据-详情页
export const getInfoQuarter = (data) => {
  return api({
    url: "/quarters/base/?" + transformData(data),
    method: "GET",
  });
};
