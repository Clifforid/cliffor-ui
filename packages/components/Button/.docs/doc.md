# 需求分析 [XQFX]

## 用户调研摘要

### 用户痛点

- 用户在使用组件库时，经常需要不同的按钮样式来满足不同的设计需求，包括颜色、尺寸、形状等。
- 用户需要按钮具备易用性和可访问性，以确保良好的用户体验。

### 期望功能

- 用户期望按钮组件能够支持多种类型（如主按钮、成功、警告等），并能够通过简单的属性配置来实现不同的样式和行为，如禁用状态、加载状态、图标支持等。
- 用户还希望按钮能够适应不同的屏幕尺寸和设备。

### 安全性需求

- 用户需要确保按钮组件在不同浏览器和设备上的兼容性和安全性，避免XSS攻击和其它安全漏洞。

## 竞品对比报告

- 竞品如Bootstrap、Ant Design等都提供了丰富的按钮样式和功能，但Eric-UI的按钮组件在设计上更加灵活，支持更多的自定义选项，如节流模式、自定义标签等，这为用户提供了更多的控制权和个性化选项。

## 市场趋势分析

- 随着移动互联网的发展，用户对界面元素的响应性和交互性要求越来越高。
- 按钮作为最常见的交互元素之一，其设计和功能需要不断更新以满足市场的需求。
- 目前市场趋势倾向于更加简洁、直观的设计，同时要求组件能够快速响应用户操作。

# 功能点设计 [GNSJ]

## 功能描述

- **按钮组件**：支持多种类型（primary, success, warning, danger, info）、尺寸（large, default, small）、形状（plain, round, circle）和状态（disabled, loading）的按钮。
- **图标支持**：允许用户通过 `icon`属性添加图标，增强按钮的可读性和交互性。
- **自定义标签**：通过 `tag`属性，用户可以自定义按钮的HTML标签，如 `a`、`div`等，以适应不同的使用场景。
- **节流模式**：通过 `useThrottle`属性，用户可以控制按钮点击事件的触发频率，以提高性能。

## API 设计

### Props

| Name              | Description                       | Type              | Default    |
| ----------------- | --------------------------------- | ----------------- | ---------- |
| size              | 尺寸                              | `enum - 'large'   | 'default'  |
| type              | 类型                              | `enum - 'primary' | 'success'  |
| plain             | 是否为朴素按钮                    | `boolean`       | false      |
| round             | 是否为圆角按钮                    | `boolean`       | false      |
| circle            | 是否为圆形按钮                    | `boolean`       | false      |
| loading           | 是否为加载中状态                  | `boolean`       | false      |
| loading-icon      | 自定义加载中状态图标组件          | `string`        | spinner    |
| disabled          | 按钮是否为禁用状态                | `boolean`       | false      |
| icon              | 按钮图标                          | `string`        | -          |
| autofocus         | 是否自动聚焦(原生 autofocus 属性) | `boolean`       | false      |
| native-type       | 原生 type 属性                    | `enum - 'button'  | 'submit'   |
| tag               | 自定义元素标签                    | `string           | Component` |
| use-throttle      | 是否使用节流模式                  | `boolean`       | true       |
| throttle-duration | 节流模式下，节流时间间隔(ms)      | `number`        | 500        |

### Events

- `click`: `(event: MouseEvent) => void`

## 交互关系

- 用户可以通过设置不同的属性来配置按钮的行为和样式。
- 点击按钮时，如果启用了节流模式，将限制事件的触发频率。
- 按钮支持图标和文本的组合，用户可以通过插槽自定义按钮内容。
