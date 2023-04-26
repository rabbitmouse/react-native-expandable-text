# react-native-expandable-text

<a href="./README.zh-CN.md">简体中文</a> | <a href="./README.md">English</a>

#### 简介
```zq-react-native-expandable-text```is an expandable and collapsible Text component. Support buttons trailing the end of the text when expanded. It has been adapted to iOS and Android, and supports certain UI configurations 

The core calculation logic is implemented through the ```onLayout``` and ```onTextLayout``` events that come with TextView, without relying on native code.

#### Demo
![demo](./expand.gif)

##### Manually import：
Copy the files and resources in the src directory to your project

##### NPM import:
npm install zq-react-native-expandable-text --save

#### Dependencies
The UI depends on the following items, please manually introduce these two items in the project's package.json, and execute ```pod install``` in the iOS directory
>react-native-fast-image
>
>react-native-linear-gradient

#### Basic use
```
<ExpandableText
  width={screenWidth - 2 * padding}
  content={text}
/>
```

#### Props

| Prop | Type | Required | Note |
|---|---|---|---|
| `width` | `number` | yes | Expandable text component width
| `content` | `string` | no | Component content, default is ""
| `numberOfLines` | `number` | no | Limit the number of lines, default is 2
| `textStyle` | `object` | no | {lineHeight, color, fontSize}，default is{lineHeight: 16}，If you set lineHeight, please also set lineHeight in buttonStyle
| `buttonConfig` | `object` | no | {iconPath, normalText, expandText}
| `buttonStyle` | `object ` | no | {lineHeight, color, fontSize}





