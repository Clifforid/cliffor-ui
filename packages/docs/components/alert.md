---
title: Alert
description: Alert 组件文档

prev:
  link: /components/collapse
  text: Collapse 折叠面板
---

# Alert 提示

用于页面中展示重要的提示信息。

## 基础用法

Alert 组件不属于浮层元素，不会自动消失或关闭。

Alert 组件提供四种类型，由 `type` 属性指定，为 `success | warning | danger | info` , 默认值为 `info`。

::: preview
demo-preview=../demo/alert/Basic.vue
:::

## 主题

通过设置 `effect` 属性来改变主题(light|dark)，默认为 `light`。

::: preview
demo-preview=../demo/alert/Theme.vue
:::

## 展示图标

通过设置 `show-icon` 属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。

::: preview
demo-preview=../demo/alert/ShowIcon.vue
:::

## 文字居中

使用 `center` 属性来让文字水平居中。

::: preview
demo-preview=../demo/alert/TextCenter.vue
:::

## 文字描述

除了必填的 `title` 属性外，你可以设置 `description` 属性来帮助你更好地介绍，我们称之为辅助性文字。

::: preview
demo-preview=../demo/alert/Desc.vue
:::

## 带图标和描述

::: preview
demo-preview=../demo/alert/IconDesc.vue
:::

## Alert API

### Props

| Name        | Description  | Type                                                 | Default |
| ----------- | ------------ | ---------------------------------------------------- | ------- |
| title       | Alert 标题   | `string`                                             | —       |
| type        | Alert 类型   | `enum` - `'success'\| 'warning'\| 'danger'\| 'info'` | info    |
| description | 描述性文本   | `string`                                             | —       |
| closable    | 是否可以关闭 | `boolean`                                            | true    |
| center      | 文字是否居中 | `boolean`                                            | false   |
| show-icon   | 是否展示图标 | `boolean`                                            | false   |
| effect      | 主题样式     | `enum` - `'light'\| 'dark'\`                         | light   |

### Events

| Name  | Description             | Type                         |
| ----- | ----------------------- | ---------------------------- |
| close | 关闭 Alert 时触发的事件 | `(event: MouseEvent)=> void` |

### Slots

| Name    | Description                         |
| ------- | ----------------------------------- |
| default | 默认插槽，用于设置 Alert 的内容描述 |
| title   | 标题的内容                          |

### Expose

| Name  | Description | Type         |
| ----- | ----------- | ------------ |
| open  | 打开 Alert  | `() => void` |
| close | 关闭 Alert  | `() => void` |
