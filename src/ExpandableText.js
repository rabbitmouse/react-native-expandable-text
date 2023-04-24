/* eslint-disable */
import React, { useState, useRef, useMemo } from 'react';
import {
  Platform,
  Pressable,
  Text,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient'

import styles from '../styles/expandableText';

const ICON_PATH = require('app/images/expandArrow.webp')

// 这个常量很重要，用于计算offset，如果文案发生改变，需要更新这个值
// const BUTTON_WIDTH = p(140)

/**
 * 展开、收起文本组件
 *
 * 支持场景(假设超过numberOfLines就需要换行)
 * 1. 文字内容少于numberOfLines：正常显示文字、无「展开」按钮
 * 2. 文字内容等于numberOfLines：正常显示文字、极端条件可能显示「展开」按钮
 * 3. 文字内容大于numberOfLines：只显示numberOfLines行文字，点击「展开」按钮显示所有内容
 *  3.1 展开后「收起」按钮尾随内容末尾
 *
 * 特殊情况处理
 * 1. iOS在文字接近边缘时，会重新计算textLayout，导致换行展示
 * 2. 点击「收起」按钮，由于「收起」按钮是绝对定位，UI上会有个闪烁
 * 3. iOS和Android在onTextLayout中返回数据不一致
 *    iOS返回numberOfLines对应的行数
 *    Android返回所有行数（例如numberOfLines = 2，实际返回5行内容）
 *    导致计算偏移量、初始化判断是否需要「展开」都需要区分平台
 * 4. 点击「展开」后，如果内容最后一行接近边缘，尾随的「收起」按钮会覆盖文字上方
 *    这种情况需要隐藏尾随「收起」按钮，显示一个备用的「收起」按钮
 */
const ExpandableText = (props) => {
  // 解构 Props参数 & 给定默认值
  const {
    width = 0,
    content = '',
    numberOfLines = 2,
    textStyle = {},
    buttonConfig = {},
    buttonStyle = {},
  } = props

  const { 
    lineHeight = 16, 
  } = textStyle

  const { 
    fontSize: buttonFontSize = 12,
  } = buttonStyle

  const {
    iconPath = ICON_PATH, 
    normalText = '展开', 
    expandText = '收起' 
  } = buttonConfig

  // 定义 State 相关变量
  // 真实偏移量
  const [realOffset, setRealOffset] = useState(0)
  // 绝对定位，控制按钮偏移位置
  const [right, setRight] = useState(0)
  // 初始化时根据Text高度计算是否需要展开 init:初始化 none:不需要 expand:需要
  const [needExpand, setNeedExpand] = useState('init')
  // 当前展开状态
  const [expand, setExpand] = useState(false)
  // 处理特殊情况「2」
  const [showExpand, setShowExpand] = useState(false)
  // 处理特殊请「4」
  const [showSpareButton, setShowSpareButton] = useState(false)

  // 定义 其他辅助变量
  // 按钮宽度，用于计算偏移量：字数 * 字体大小 +  icon宽度 + 固定渐变遮罩宽度
  const maskWidth = 30
  const buttonWidth = useMemo(()=> {
    return Math.max(normalText.length, expandText.length) * buttonFontSize + 12 + maskWidth
  }, [normalText, expandText, buttonFontSize]) 
  const currentLines = useRef([])

  /**
   * @returns numberOfLines
   * iOS上如果如果init时返回none，re-render时会导致组件高度明显变化
   */
  const automicLines = () => {
    /** 处理特殊情况「3」，iOS和Android初始化numberOfLine 需要区分 */
    if (needExpand === 'init') {
      return numberOfLines
    }
    if (needExpand === 'none') {
      return 0
    }
    if (needExpand === 'expand' && !expand) {
      return numberOfLines
    }
  }

  /**
   * @param {Text容器高度} boxHeight
   * @returns 是否支持展开
   *
   *  初始化时调用
   *  如果容器高度 > 行数*文字高度 则可能需要展开
   *  当显示行数正好等于numberofline时，需要借助偏移量进行判断
   */
  const checkNeedExpand = (boxHeight) => {
    /** 处理特殊情况「3」 */
    if (Platform.OS === 'ios') {
      return ((boxHeight >= numberOfLines * lineHeight) && realOffset <= 0)
        ? 'expand'
        : 'none'
    } else {
      return (currentLines.current.length > numberOfLines)
        ? 'expand'
        : 'none'
    }
  }

  /**
   * @param {TextLayout返回的最后一行数据} lastLine
   *
   * 核心计算逻辑：计算尾随「收起」按钮的位置
   */
  const coreOffsetCalculate = (lastLine) => {
    /** iOS中 处理特殊情况「3」 */
    const coreOffsetForIOS = (real) => {
      return Math.max(real, 0)
    }
    /** Android中 处理特殊情况「3」 */
    const coreOffsetForAndroid = (real) => {
      return (needExpand === 'expand' && expand) ? Math.max(real, 0) : 0
    }

    /** 核心逻辑：通过最后一行的text width计算按钮偏移量 */
    const realOffset = width - (lastLine.width + buttonWidth - maskWidth)
    /** 获取组件距右的位置，最小为0，不会超出父视图 */
    const offset = Platform.OS === 'ios'
      ? coreOffsetForIOS(realOffset)
      : coreOffsetForAndroid(realOffset)
    /** 处理特殊情况「4」 当最后一行文字接近容器边缘，隐藏尾随按钮，显示固定按钮 */
    setShowSpareButton(expand && realOffset <= 0)
    /** 保存真实偏移量 */
    setRealOffset(realOffset)
    /** 设置组件偏移量 */
    setRight(offset)
    /** 显示展开组件 */
    setShowExpand(true)
  }

  const renderExtraView = () => {
    if (needExpand !== 'none' && showSpareButton) {
      const dispaly = showExpand ? 'flex' : 'none'
      const transform = [{ rotate: '180deg' }]
      return (
        <Pressable
          onPress={() => {
            setShowExpand(false)
            setExpand(!expand)
          }}
          style={styles.expandWrapper}
        >
          {
            <View style={[styles.buttonWrapper, { display: dispaly }]}>
              <Text style={[styles.buttonText, { ...buttonStyle }]}>{expandText}</Text>
              <FastImage
                style={[styles.arrowIcon, { transform }]}
                source={iconPath}
              />
            </View>
          }
        </Pressable>
      )
    }
    return null
  }

  const renderControlView = () => {
    // 展开状态，不计算遮罩宽度
    const wrapperWidth = buttonWidth - (expand ? maskWidth : 0)
    if (needExpand !== 'none' && !showSpareButton) {
      const display = showExpand ? 'flex' : 'none'
      const rotate = [{ rotate: expand ? '180deg' : '0deg' }]
      return (
        <Pressable
          onPress={() => {
            setShowExpand(false)
            setExpand(!expand)
          }}
          style={[
            styles.expandWrapper,
            styles.addPosition,
            {
              width: wrapperWidth, 
              right: right
            }
          ]}
        >
          {
            <View style={[styles.buttonWrapper, { display: display }]}>
              {!expand && <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientView}
                colors={['#FFFFFF00', '#FFFFFF']}
              >
              </LinearGradient>
              }
              <View style={styles.buttonContent}>
                <Text style={[styles.buttonText, { ...buttonStyle }]}>
                  {expand ? expandText : normalText}
                </Text>
                <FastImage
                  style={[styles.arrowIcon, { transform: rotate }]}
                  source={iconPath}
                />
              </View>
            </View>
          }
        </Pressable>
      )
    }
    return null
  }

  // 处理边界
  if (!content) {
    return null
  }
  // 渲染组件
  return (
    <>
      <View>
        <Text
          style={[styles.descText, { ...textStyle }]}
          onTextLayout={(event) => {
            const { lines = [] } = event.nativeEvent
            currentLines.current = [...lines]
            coreOffsetCalculate(lines[lines.length - 1])
          }}
          onLayout={(e) => {
            if (needExpand !== 'init') {
              /** 该值只在初始化时更新一次 */
              return
            }
            setNeedExpand(checkNeedExpand(e.nativeEvent.layout.height))
          }}
          numberOfLines={automicLines()}
        >
          {content}
        </Text>
        { renderControlView() }
      </View>
      { renderExtraView() }
    </>
  )
}

export default React.memo(ExpandableText) 

