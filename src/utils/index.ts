import { dateType, handledateType } from '@/types'
import { storage } from './storage'
import i18n from '@/i18n'
import { isNumber, round } from 'lodash-es'
import moment from 'moment'
import { formatPatten } from '@/constants'

export const handleDecimal = (value: string | number) => {
  const index = String(value).indexOf('.')
  // 后面为.0000的情况
  if (index === -1) return String(value) + '.00'
  return String(value).substring(0, index + 4)
}

export const handleEnNum = (num: number | string, active = false): string => {
  if (num === '') return ''
  let temp =
    i18n.language === 'zh_CN' ? Number(handleDecimal(num)) : Number(handleDecimal(Number(num) * 10))

  if (isNumber(num) || isNumber(Number(num))) {
    if (active) {
      if (temp < 0.01 && temp > 0 && i18n.language === 'zh_CN') {
        return '0.00'
      }
      if (temp < 0.1 && temp > 0 && i18n.language !== 'zh_CN') {
        return '0.00'
      }
    }
  }
  return round(Number(temp), 2).toString()
}

export const handleRadioNum = (num: number | string): string => {
  if (num === '') return '--'
  if (isNumber(num) || isNumber(Number(num))) {
    return round(Number(num), 2).toFixed(2) + '%'
  }
}

export const handleRadioNumTable = (num: number | string): string => {
  if (num === '') return ''
  if (isNumber(num) || isNumber(Number(num))) {
    return round(Number(num), 2).toFixed(2)
  }
}

/**
 * 数字格式转换成千分位
 *@param{Object}num
 */
export const commafy = (val: number | string) => {
  if (val === '') return '--'
  if (typeof Number(val) === 'number') {
    return Number(val)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }
}

export const handleHomeData = records => {
  // table日期
  let title = Object.keys(records.length && records[0].kpiColumns)
  // table表格的数据
  let kpiData = []
  if (records.length) {
    for (let i = 0; i < records.length; i++) {
      const temp = {}
      for (let j = 0; j < title.length; j++) {
        temp[title[j]] = records[i].kpiColumns[title[j]]
      }
      kpiData.push(temp)
    }
  }
  // 百分比率
  const permKpiData = []
  if (records.length) {
    for (let i = 0; i < records.length; i++) {
      const temp = {}
      for (let j = 0; j < title.length; j++) {
        temp[title[j]] = records[i].permKpiColumns[title[j]]
      }
      permKpiData.push(temp)
    }
  }
  // 图表的数据
  let tempArr = []
  if (records.length) {
    for (let i = 0; i < records.length; i++) {
      const temp = [
        (i18n.language === 'zh_CN' ? records[i].appName : records[i].appEnName) +
          '?qmid=' +
          records[i].appId,
      ]
      for (let key in records[i].kpiColumns) {
        temp.push(records[i].kpiColumns[key])
      }
      tempArr.push(temp)
    }
  }
  let permKpiDataTempArr = []
  if (records.length) {
    for (let i = 0; i < records.length; i++) {
      const temp = [
        (i18n.language === 'zh_CN' ? records[i].appName : records[i].appEnName) +
          '?qmid=' +
          records[i].appId,
      ]
      for (let key in records[i].permKpiColumns) {
        temp.push(records[i].permKpiColumns[key])
      }
      permKpiDataTempArr.push(temp)
    }
  }

  const legendData =
    records.length &&
    records.map(
      item => (i18n.language === 'zh_CN' ? item.appName : item.appEnName) + '?qmid=' + item.appId
    )
  const MaxAndMinData =
    records.length &&
    records.map(item => {
      return [item.minValue, item.maxValue, item.avgValue]
    })

  return {
    tempArr,
    legendData,
    title,
    kpiData,
    permKpiData,
    MaxAndMinData,
    permKpiDataTempArr,
  }
}

/**
 * 精确两位小数，返回百分比
 * @param ratio
 */
export const getAbsoluteRatio = ratio => {
  if (Number(ratio) < 0.01 && Number(ratio) > 0) {
    // 0.00后的四舍五入
    if (Number(ratio) > 0.005) {
      return '0.01%'
    } else {
      return '0.00%'
    }
  }
  if (ratio === '<0.01') return '0.00%'
  if (Number(ratio) === 0) return '0.00%'
  return commafy(ratio) + '%'
}

/**
 * 2020-04 转 2020年4月
 * @param dateText
 */
export const RankDate = (dateText: string) => {
  let year: string = dateText.split('-')[0]
  let month: string = dateText.split('-')[1]
  if (Number(month) < 9) {
    month = '0' + month.substr(1, 1)
  }
  return year + '年' + month + '月'
}

/**
 * 日期转换0 1 2
 * @param type
 */
export const handleDateType = (type: dateType): handledateType => {
  switch (type) {
    case 'day':
      return 2
    case 'week':
      return 1
    default:
      return 0
  }
}

/**
 * 瀑布图参数转换
 * @param data
 * @param unit
 * @param ladder
 */

export const stepWatetFallParams = (data: any, unit: string, ladder: string) => {
  let total = new Array(data.length).fill('-')
  const subline = [Number(toFixedTwoPoint(data[0][unit]))]
  data = data.slice(1, data.length)
  const sdate = data.map(item => item.sdate)
  let lens = data.length
  for (let i = 1; i < lens; i++) {
    const prevLadder = Number(data[i - 1][ladder])
    const currentLadder = Number(data[i][ladder])
    const prevSubline = Number(subline[i - 1])
    let item
    if (prevLadder >= 0 && currentLadder >= 0) {
      item = prevSubline + prevLadder
    }
    if (prevLadder <= 0 && currentLadder <= 0) {
      item = prevSubline + currentLadder
    }
    if (prevLadder >= 0 && currentLadder <= 0) {
      item = prevSubline + prevLadder + currentLadder
    }
    if (prevLadder <= 0 && currentLadder >= 0) {
      item = prevSubline
    }
    subline.push(round(item, 2))
  }

  const positive = data.map((item, i) => {
    if (item[ladder] <= 0) {
      return '-'
    } else {
      return round(item[ladder], 2)
    }
  })
  const negative = data.map(item => {
    if (item[ladder] > 0) {
      return '-'
    } else {
      return -round(item[ladder], 2)
    }
  })

  return {
    sdate,
    total,
    subline,
    positive,
    negative,
  }
}

/**
 * 3789 -> 3000
 * @param number
 * @param done 向下取整
 */
export const NumberConvertToHead = (number: number, done?: boolean) => {
  const lens = String(done ? Math.floor(number) : Math.ceil(number)).length
  let temp = number / Math.pow(10, lens - 1)
  let head = done ? Math.floor(temp) : Math.ceil(temp)
  let res = head + '0'.repeat(lens - 1)
  return Number(res)
}

/**
 * 序列化深拷贝
 * @param val
 */
export const jsonify = (val: any) => {
  return JSON.parse(JSON.stringify(val))
}

/**
 * 排名处理
 * @param val
 */
export const formatRank = (val: string | number) => {
  if (val === '') return '--'
  return val
}

/**
 * 保留两位数字
 * @param value
 */
export const toFixedTwoPoint = (value: string | number) => {
  if (value === '--') return ''
  if (value === '' || value === 0) return '--'
  if (Number(value) === 0) return ''
  if (value && value < 0.01 && value > 0 && i18n.language === 'zh_CN') {
    return '0.010000'
  }
  if (value && value < 0.1 && value > 0 && i18n.language !== 'zh_CN') {
    return '0.100000'
  }
  return Number(value).toFixed(2).toString()
}

export const makeRadioFixed = (value: string | number) => {
  if (value > 0 && value < 0.01) return '0.00'
  if (value === '--') return '--'
  return Number(value)
}

/**
 * 退出操作
 */
export const handleExit = () => {
  storage.remove('truth-token')
  storage.remove('truth-current-user')
  storage.remove('truth-routes')
  storage.remove('truth-flash')
  const domain = window.location.href
  if (domain.indexOf('en.questmobile.com.cn') > -1) {
    window.location.href = '/login'
  } else {
    window.location.href = '/wechat'
  }
}

/**
 *
 * @param obj
 */

export const clearNoNum = value => {
  value = value.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
  value = value.replace(/^\./g, '') //必须保证第一个为数字而不是.
  value = value.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
  if (value.indexOf('.') < 0 && value != '') {
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    value = parseFloat(value)
  }
  return value
}

export const setStorage = (storageName, key, value) => {
  if (storage.get(storageName)) {
    const obj = storage.get(storageName)
    obj[key] = value
    storage.set(storageName, obj)
  } else {
    let obj = {}
    obj[key] = value
    storage.set(storageName, obj)
  }
}
// setStorage("truth-flash","compareId",compareId)
export const getStorage = (storageName, key) => {
  if (storage.get(storageName)) {
    const obj = storage.get(storageName)
    return obj[key] !== '' || obj[key] !== undefined || obj[key] !== null ? obj[key] : undefined
  } else {
    let obj = {}
    obj[key] = undefined
    storage.set(storageName, obj)
    return undefined
  }
}
// getStorage("truth-flash","compareId")
/**
 * 图表YAxisName切换
 * @param dateType
 * @param tabkey
 * @param name
 */

export const handleYAxisName = (dateType: dateType, tabkey: string, name: string[]) => {
  if (dateType === 'day') {
    return i18n.t(name[0])
  }

  if (tabkey === '1') {
    return i18n.t(name[0])
  } else {
    return i18n.t(name[1])
  }
}

export const handleCustomRange = (num: number) => {
  if (i18n.language !== 'zh_CN') {
    num = num / 10
  }
  return num
}

export const handleEnNumTen = (number: number): number | string => {
  if (number === 0) return ''
  return i18n.language === 'zh_CN' ? number : number * 10
}

/**
 * 处理饼状图0.01问题
 * @param value
 */

export const handlePieFormat = value => {
  if (value === '0') return '--'
  if (Number(value) > 0.01) {
    return value + '%'
  } else {
    return '0.00%'
  }
}

/**
 * 右侧表格滑动到右侧
 */

export const scorllTableRright = () => {
  const dom = document.querySelector('.ant-tabs-tabpane-active .tableRight')

  setTimeout(() => {
    dom && dom.scroll(9999999, 0)
  }, 0)
}

/**
 * 处理 0.01 与 0 的之间的数
 * @param num
 */

export const formatToPoiont = (num: string | number, isActive = false) => {
  if (num && num < 0.01 && num > 0 && i18n.language === 'zh_CN' && isActive) {
    return '<0.01'
  }

  if (num && num < 0.1 && num > 0 && i18n.language !== 'zh_CN' && isActive) {
    return '<0.10'
  }
  if (num === '0.00' && i18n.language === 'zh_CN') {
    return '<0.01'
  }
  if (num === '0.00' && i18n.language !== 'zh_CN') {
    return '<0.10'
  }
  if (num === '0.010' && i18n.language === 'zh_CN') {
    return '<0.01'
  }
  if (num === '0.100' && i18n.language !== 'zh_CN') {
    return '<0.10'
  }
  return commafy(num)
}

export const handleCropName = (params: string): string => {
  const lens = params.length
  if (i18n.language === 'zh_CN') {
    if (lens > 7) {
      params = params.substring(0, 7) + '...'
    } else {
      params = params
    }
    return params
  } else {
    if (lens > 12) {
      params = params.substring(0, 12) + '...'
    } else {
      params = params
    }
    return params
  }
}

export const hanldeRadioForEN = (number: string) => {
  if (number === '') return '0%'
  return number + '%'
}

/**
 * 15.555 -> 15.56
 * 15.00 -> 15.00
 * @param number 传入数字
 * @param precision 保留位数
 */
export const MyRound = (number: number, precision: number): string => {
  return (Math.round(Number(+number + 'e' + precision)) / Math.pow(10, precision)).toFixed(2)
}

export const isFrequency = () => getStorage('truth-flash', 'frequency')

export const query = (id: string) => {
  return document.querySelector(id)
}

export const queryAll = (id: string) => {
  return document.querySelectorAll(id)
}

export const momentEndMonth = (time: string) => {
  return moment(time).endOf('month').format(formatPatten)
}

export const momentBeginMonth = (time: string) => {
  return moment(time).startOf('month').format(formatPatten)
}
