# react-native-expandable-text

<a href="./README.zh-CN.md">简体中文</a> | <a href="./README.md">English</a>

#### 简介
```zq-react-native-expandable-text```是一个可展开、收起的Text组件。展开后支持按钮尾随文字末尾。已适配iOS和Android，支持一定的UI配置。

核心计算逻辑通过TextView自带的```onLayout```和```onTextLayout```事件实现，不依赖原生代码。

#### demo演示
![demo](./expand.gif)

##### 手动导入：
拷贝src目录中的文件和资源到你的项目

##### NPM:
npm install zq-react-native-expandable-text --save

#### 依赖
UI实现依赖以下项目，请手动在项目的package.json中引入这两个项目，并在iOS目录下执行pod install
>react-native-fast-image
>
>react-native-linear-gradient

#### 基本使用
```
<ExpandableText
  width={screenWidth - 2 * padding}
  content={text}
/>
```

#### Props

| Prop | Type | Required | Note |
|---|---|---|---|
| `width` | `number` | yes | 可展开Text组件宽度
| `content` | `string` | no | 组件内容，默认为""
| `numberOfLines` | `number` | no | 限制行数，默认为2
| `textStyle` | `object` | no | {lineHeight, color, fontSize}，默认为{lineHeight: 16}，若设置lineHeight请同时设置buttonStyle中的lineHeight
| `buttonConfig` | `object` | no | {iconPath, normalText, expandText}
| `buttonStyle` | `object ` | no | {lineHeight, color, fontSize}

