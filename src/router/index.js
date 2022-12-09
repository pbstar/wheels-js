import Vue from "vue";
import VueRouter from "vue-router";
import doc from "../views/doc";
import docIntroduce from "../views/doc/introduce";
import docExportExcel from "../views/doc/exportExcel";
import doc404 from "../views/doc/404";

import blog from "../views/blog";
import page404 from "../views/404";

const routes = [
  {
    path: "/",
    name: "index",
    redirect: "/doc",
  },
  {
    path: "/doc",
    name: "doc",
    component: doc,
    redirect: "/doc/introduce",
    meta: {
      title: "wheels-js-文档"
    },
    children: [
      {
        path: "introduce",
        name: "docIntroduce",
        component: docIntroduce,
      }, {
        path: "exportExcel",
        name: "docExportExcel",
        component: docExportExcel,
      }, {
        path: "*",
        name: "doc404",
        component: doc404,
      }
    ],
  }, {
    path: "/blog",
    name: "blog",
    component: blog,
    meta: {
      title: "wheels-js-博客"
    },
  }, {
    path: "*",
    name: "page404",
    component: page404,
    meta: {
      title: "wheels-js-404"
    },
  }
];

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
