import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import apiTable from "vitepress-api-table";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cliffor-UI",
  description: "跟学手写ElementUI组件库",
  appearance: false, // 关闭 darkMode @todo 深色模式完成后打开
  base: "/cliffor-ui/",
  head: [["link", { rel: "icon", href: "logo-blue.svg" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "开始使用", link: "/get-started" },
      { text: "组件", link: "/components/button" },
    ],
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "指南",
        collapsed: false,
        items: [{ text: "快速开始", link: "/get-started" }],
      },
      {
        text: "基础组件",
        collapsed: false,
        items: [
          { text: "Button 按钮", link: "components/button" },
          { text: "Collapse 折叠面板", link: "components/collapse" },
          { text: "Alert 提示", link: "components/alert" },
        ],
      },
      {
        text: "Vue基础",
        collapsed: false,
        items: [
          { text: "Vue底层原理", link: "components/Vue-principal" },
          {
            text: "JS数据结构与算法",
            link: "components/data-structure-and-algorithm",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/clifforid/cliffor-ui" },
    ],
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
      md.use(apiTable);
    },
  },
});
