import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/",
    component: () => import("../views/layout/index.vue"),
    redirect: "/info/book",
    children: [
      // {
      //   path: "dashboard",
      //   component: () => import("../views/dashboard/index.vue"),
      //   name: "Dashboard",
      //   meta: { title: "首页" },
      // },
      {
        path: "info",
        component: () => import("../views/info/index.vue"),
        name: "Info",
        meta: { title: "信息管理" },
        children: [
          {
            path: "book",
            component: () => import("../views/info/book/index.vue"),
            meta: { title: "图书信息" },
          },
          {
            path: "category",
            component: () => import("../views/info/category/index.vue"),
            meta: { title: "分类信息" },
          },
          {
            path: "reader",
            component: () => import("../views/info/reader/index.vue"),
            meta: { title: "读者信息" },
          },
          {
            path: "notice",
            component: () => import("../views/info/notice/index.vue"),
            meta: { title: "通知信息" },
          },
        ],
      },
      {
        path: "checkout",
        component: () => import("../views/checkout/index.vue"),
        name: "Checkout",
        meta: { title: "借阅管理" },
        children: [
          {
            path: "record",
            component: () => import("../views/checkout/record/index.vue"),
            meta: { title: "借阅记录" },
          },
          {
            path: "compensation",
            component: () => import("../views/checkout/compensation/index.vue"),
            meta: { title: "图书赔失" },
          },
        ],
      },
      {
        path: "user",
        component: () => import("../views/user/index.vue"),
        name: "User",
        meta: { title: "用户管理" },
        children: [
          {
            path: "personal",
            component: () => import("../views/user/personal/index.vue"),
            meta: { title: "个人信息" },
          },
          {
            path: "users",
            component: () => import("../views/user/users/index.vue"),
            meta: { title: "用户信息" },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
