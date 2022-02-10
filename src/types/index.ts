import { logType } from '@/constants'
import { osType } from '@/store/appStore'

export type dateType = 'month' | 'week' | 'day'
/**
 * 日:2，周:1，月:0
 */
export type handledateType = 0 | 1 | 2
/**
 * 安卓:1，iOS:2，安卓和iOS:0
 */
export type dsType = 0 | 1 | 2

/**
 * 中文:1，英文:2
 */
export type languageType = 1 | 2

export interface IAppList {
  categoryId: number
  dateType: number
  enName: string
  fatherId: number
  flag: number
  id: number
  name: string
  iCON: string
}

export interface ICompanyList {
  categoryId: number
  dateType: number
  enName: string
  fatherId: number
  flag: number
  iCON: string
  id: number
  name: string
}

export interface IMenus {
  title: string
  Icon?: any
  key: string
  subs?: IMenus[]
  isNew?: boolean
}
/**
 * 请求参数
 */
export interface IScaleParams {
  dateType?: dateType
  beginDate?: string
  endDate?: string
  kpi?: number
  dsType?: dsType
  language?: languageType
  companyId?: number
  categoryId?: number
  classId?: number | string
  appId?: string
  current?: number
  size?: number
  orderName?: string
  beginNum?: number
  endNum?: number
  level?: number
  modelStr?: string
  monthOrWeek?: string
}
/**
 * useResquest返回参数
 */
export interface IUseRequestFC {
  data: any
  loading: boolean
  error: any
  setLoading: any
}
/**
 * useResquest函数参数
 */
export interface IUseRequestOpt {
  // 成功回调，对数据进行处理
  handler?: (data: any) => void
  // 失败回调
  onerror?: (err: any) => void
  // 需要监听的依赖
  Deps?: any[]
}

/**
 * 首页请求封装参数
 */

export interface IUseFetchHomeData {
  BasicApi: (e: IScaleParams) => void
  DayilyApi?: (e: IScaleParams) => void
  ChartsOption: any
  kpi?: number
  appId?: string
  isPerKpi?: boolean
  isGrowth?: boolean
  tabkey?: string
  dateType?: dateType
  isRadio?: boolean
  title?: string
  orderName?: string
  setOrderName?: any
}
/**
 *  模糊搜索
 */
export interface IKW {
  keyword: string
  language?: languageType
}
/**
 * App概览
 */
export interface IAppOverview {
  appId: string
  dateText: string
  dsType: dsType
  language?: languageType
}

// URI：当前需要埋点事件触发时的页面URI
//    Host：主机IP（可以不传）
//    UserID：用户ID
//    Browser：浏览器（可以不传）
//    LogType：日志类型
//    ProductCode：产品唯一表示
//    PrimaryMenu：一级菜单
//    SecondMenu：二级菜单
//    LogContent：日志详情
//    Target：对应页面的KPI名称,tab切换
//    DateType：数据日期，日/周/月
//    DataStartTime：数据开始时间
//    DataEndTime：数据结束结束时间
//    DeviceType：设备类型
//    CreateTime：日志记录时间（可以不传）
/**
 * 埋点参数
 */
interface LogParmas {
  URI: string
  UserID: string
  LogType: number
  ProductCode: string | number
  PrimaryMenu: string
  SecondMenu: string
  LogContent: Partial<LogContent>
  Target: string
  DateType: handledateType
  DataStartTime: string
  DataEndTime: string
  DeviceType: osType
}

/**
 *{
  "categoryId" : "大类别ID",
  "classId" : "小类别ID",
  "companyId" : "公司ID",
  "current" : "当前数据分页",
  "dsType" : "设备类型",
  "appId" : "App列表（对比和重合时）",
  "groupId" : "关注组ID",
  "language" : "语言版本",
  "fileName" : "下载时的文件名称"
}
 *
 * @interface LogContent
 */
interface LogContent {
  categoryId: number | string
  classId: number | string
  companyId: number | string
  current: number
  dsType: osType
  appId: string
  groupId: string | number
  language: 'zh_CN' | 'en_US'
  fileName: string
  level: number | string
  keyword: string
}

export type LogParmasType = Partial<LogParmas>
