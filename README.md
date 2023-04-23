# react-native-expandable-text

#### 简介
```zq-react-native-expandable-text```是一个可展开、收起的Text组件。展开后支持按钮尾随文字末尾。已适配iOS和Android，支持一定的UI配置（也可自行扩展）。

核心计算逻辑通过TextView自带的```onLayout```和```onTextLayout```事件实现，不依赖原生代码。

#### demo演示
<img src="https://raw.githubusercontent.com/rabbitmouse/react-native-expandable-text/main/expand.gif" height="50%", width="50%">

##### 手动导入：
拷贝src目录中的文件和资源到你的项目

##### npm:
npm install zq-react-native-expandable-text --save（还在测试中）

#### 依赖
UI实现依赖以下项目，可自行替换成其他组件
>react-native-fast-image
>
>react-native-linear-gradient】

#### 使用
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





