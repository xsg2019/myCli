import { types, flow, Instance } from 'mobx-state-tree'
import { storage } from '@/utils/storage'
import { getLanguage } from '@/i18n/getLocalLanguage'
import moment from 'moment'
import { autorun } from 'mobx'
import { dateType } from '@/types'
import api from '@/api'
import {
  jsonify,
  getStorage,
  setStorage,
  handleDateType,
  momentBeginMonth,
  momentEndMonth,
} from '@/utils'
import detailStore from './detailStore'
import { get } from '@/api/congfig'
import i18n from '@/i18n'

export const sixMonthAgo = value => {
  return moment(value).subtract(5, 'month').startOf('month').format('YYYY-MM-DD')
}

const setTimeRange = self => {
  self.rangeBeginTime = self.dictTime[0].minDate
  self.rangeEndTime = self.dictTime[0].maxDate
  self.rangeBeginMonthTime = self.dictTime[2].minDate
  self.rangeEndMonthTime = self.dictTime[2].maxDate
  self.changeClusterMonth(moment(self.rangeEndMonthTime).format('YYYY-MM'))
  self.changeCompoundDateText([
    sixMonthAgo(self.rangeEndMonthTime),
    moment(self.rangeEndMonthTime).format('YYYY-MM-DD'),
  ])

  self.changeDate([
    getStorage('truth-flash', 'beginDate')
      ? getStorage('truth-flash', 'beginDate')
      : moment(self.rangeEndTime).subtract(180, 'days').format('YYYY-MM-DD'),
    getStorage('truth-flash', 'endDate')
      ? getStorage('truth-flash', 'endDate')
      : moment(self.rangeEndTime).format('YYYY-MM-DD'),
  ])
}

const resetPage = self => {
  self.page = 1
  self.isForceUpdate = !self.isForceUpdate
}

const {
  FetchNotice,
  FetchNoticeState,
  FetchUpdateNoticeState,
  FetchAppAdd,
  FetchAppCompare,
  FetchAppDelete,
  FetchAppDeleteAll,
  FetchWatchGroup,
  FetchWatchAdd,
  FetchWatchDelete,
} = api
const token = storage.get('truth-token')
export type osType = 0 | 1 | 2
export type languageType = 'zh_CN' | 'en_US'
const categoryInfo = types.model({
  categoryName: types.optional(types.string, ''),
  categoryEnName: types.optional(types.string, ''),
  categoryId: types.optional(types.string, ''),
  order: types.optional(types.number, 0),
})
const clazz = types.model({
  clazzName: types.optional(types.string, ''),
  clazzId: types.optional(types.string, ''),
  clazzEnName: types.optional(types.string, ''),
  order: types.optional(types.number, 0),
  categoryId: types.optional(types.string, ''),
})
const companyInfo = types.model({
  companyName: types.optional(types.string, ''),
  companyEnName: types.optional(types.string, ''),
  companyId: types.optional(types.string, ''),
  appAmount: types.optional(types.union(types.number, types.string), ''),
})
const dictDateInfo = types.model({
  createDept: types.optional(types.string, ''),
  createTime: types.optional(types.string, ''),
  createUser: types.optional(types.string, ''),
  dateType: types.optional(types.union(types.number, types.string), ''),
  id: types.optional(types.string, ''),
  isDeleted: types.optional(types.union(types.number, types.string), ''),
  maxDate: types.optional(types.string, ''),
  minDate: types.optional(types.string, ''),
  productCode: types.optional(types.union(types.number, types.string), ''),
  productId: types.optional(types.string, ''),
  status: types.optional(types.union(types.number, types.string), ''),
  updateTime: types.optional(types.string, ''),
  updateUser: types.optional(types.string, ''),
})
const appInfo = types.model({
  compareEnName: types.optional(types.string, ''),
  compareId: types.optional(types.string, ''),
  type: types.optional(types.number, 0),
  status: types.optional(types.number, 0),
  iconURL: types.optional(types.string, ''),
  compareName: types.optional(types.string, ''),
  contrast: types.optional(types.number, 0),
  isTrial: types.optional(types.number, 0),
  isDeleted: types.optional(types.number, 0),
  appId: types.optional(types.string, ''),
  appEnName: types.optional(types.string, ''),
  appName: types.optional(types.string, ''),
  icon: types.optional(types.string, ''),
  attention: types.optional(types.number, 0),
  category: types.optional(categoryInfo, {}),
  mainList: types.optional(types.union(types.string, types.number), ''),
  categoryRank: types.optional(types.union(types.string, types.number), ''),
  clazzRank: types.optional(types.union(types.string, types.number), ''),
  clazz: types.optional(clazz, {}),
  valueFlag: types.optional(types.number, 0),
  companyId: types.optional(companyInfo, {}),
})
const dParams = types.model({
  dateType: types.optional(types.number, 0),
  beginDate: types.optional(types.string, ''),
  endDate: types.optional(types.string, ''),
  kpi: types.optional(types.number, 0),
  dsType: types.optional(types.number, 0),
  language: types.optional(types.number, 1),
  companyId: types.optional(types.number, 0),
  // 大类id
  categoryId: types.optional(types.number, 0),
  // 小类id，对于分类限制客户，默认传限制的所有分类id
  classId: types.optional(types.union(types.number, types.string), 0),
  appId: types.optional(types.string, ''),
  groupId: types.optional(types.union(types.string, types.number), ''),
  current: types.optional(types.number, 0),
  size: types.optional(types.number, 10),
  orderName: types.optional(types.string, ''),

  level: types.optional(types.number, 0),
  beginNum: types.optional(types.number, 0),
  endNum: types.optional(types.number, 0),
  monthOrWeek: types.optional(types.string, ''),
})

const Igroup = types.model({
  id: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  checked: types.optional(types.boolean, false),
})

const noticeModal = types.model({
  title: types.optional(types.string, ''),
  content: types.optional(types.string, ''),
  enTitle: types.optional(types.string, ''),
  enContent: types.optional(types.string, ''),
  createTime: types.optional(types.string, ''),
})

const AppStore = types
  .model('AppStore', {
    dateType: types.union(types.literal('week'), types.literal('day'), types.literal('month')),
    beginDate: types.optional(types.string, ''),
    endDate: types.optional(types.string, ''),
    compoundBeginTime: types.optional(types.string, ''),
    compoundEndTime: types.optional(types.string, ''),
    dsType: types.union(types.literal(0), types.literal(1), types.literal(2)),
    kpi: types.optional(types.number, 5),
    isLogin: types.optional(types.boolean, false),
    isAppCompareBox: types.optional(types.boolean, false),
    language: types.union(types.literal(1), types.literal(2)),
    level: types.optional(types.number, 1),
    clusterLevel: types.optional(types.number, 1),
    beginNum: types.optional(types.number, 0),
    endNum: types.optional(types.number, 0),
    clusterLevelTitle: types.optional(types.string, 'user_quality_analysis_pattern'),
    isOsTypeShow: types.optional(types.boolean, false),
    isQualityShow: types.optional(types.boolean, false),
    qualityType: types.optional(types.number, 0),
    isClusterMonthPickerShow: types.optional(types.boolean, false),
    isClusterRangePickerShow: types.optional(types.boolean, false),
    clusterMonth: types.optional(types.string, ''),
    isAllCateShow: types.optional(types.boolean, false),
    isDataEmpty: types.optional(types.boolean, false),
    dateFilter: types.optional(types.string, ''),
    // 公告部分
    noticeList: types.optional(types.array(noticeModal), []),
    noticeIsRead: types.optional(types.boolean, false),
    // 对比列表
    appList: types.optional(types.array(appInfo), []),
    seletedAppList: types.optional(types.array(appInfo), []),
    showModel: types.optional(types.boolean, false),
    searchState: types.optional(types.boolean, false),
    // 访问记录查询
    visitedAppList: types.optional(types.array(appInfo), []),
    visitedCompanyList: types.optional(types.array(companyInfo), []),
    // 关注对比table交互
    leftData: types.optional(types.array(appInfo), []),
    // 下载逻辑
    downloadParams: types.optional(dParams, {}),
    // 强制刷新当前组件
    isForceUpdate: types.optional(types.boolean, false),
    // 分类逻辑
    categoryId: types.optional(types.number, 0),
    classId: types.optional(types.union(types.number, types.string), 0),
    categoryName: types.optional(types.string, 'categories'),
    // 聚类模块大分类
    clusterCategoryId: types.optional(types.number, 0),
    clusterCategoryName: types.optional(types.string, 'categories'),
    // 时间范围
    dictTime: types.optional(types.array(dictDateInfo), []),
    rangeBeginTime: types.optional(types.string, ''),
    rangeEndTime: types.optional(types.string, ''),
    rangeBeginMonthTime: types.optional(types.string, ''),
    rangeEndMonthTime: types.optional(types.string, ''),
    // 聚类模块tab与radio
    downloadTabkey: types.union(types.literal('1'), types.literal('2')),
    downloadRadio: types.optional(types.number, 1),
    orderName: types.optional(types.string, ''),
    RorderName: types.optional(types.string, 'Ratio'),
    // 分页
    page: types.optional(types.number, 1),
    // 下载loading
    downloading: types.optional(types.boolean, false),
    // 关注列表
    attentionList: types.optional(types.array(Igroup), []),
    // 返回分页信息
    apiPage: types.optional(types.number, 1),
    // 是否为试用用户
    isTrial: types.optional(types.boolean, true),
    isTourOpen: types.optional(types.boolean, false),
  })
  .actions(self => ({
    setIsTourOpenOpen(flag: boolean) {
      self.isTourOpen = flag
    },
    toggleTrial(flag: boolean) {
      self.isTrial = flag
    },
    setApiPage(page) {
      self.apiPage = page
    },
    setAttentionList(list) {
      self.attentionList = list
    },
    setDownloading(flag: boolean) {
      self.downloading = flag
    },
    setPageChange(page: number) {
      self.page = page
      self.isForceUpdate = !self.isForceUpdate
    },
    setCurrentPage(page: number) {
      self.page = page
    },
    setOrderName(name: string) {
      self.orderName = name
    },
    setRodername(name: string) {
      self.RorderName = name
    },
    setDownloadTabkey(key: '1' | '2') {
      self.downloadTabkey = key
      self.beginNum = 0
      self.endNum = 0
    },
    setDownloadRadio(key: number) {
      self.downloadRadio = key
      self.beginNum = 0
      self.endNum = 0
    },
    ForceUpdate() {
      self.isForceUpdate = !self.isForceUpdate
    },
    changeDateType(type: dateType) {
      if (type === self.dateType) return
      setStorage('truth-flash', 'dateType', type)
      self.dateType = type
    },
    resetPage() {
      self.page = 1
      self.isForceUpdate = !self.isForceUpdate
    },
    changeCompoundDateText(date) {
      if (date[0] === self.compoundBeginTime && date[1] === self.compoundEndTime) return
      self.page = 1
      self.compoundBeginTime = date[0]
      self.compoundEndTime = date[1]
      // self.isForceUpdate = !self.isForceUpdate
    },
    toggleAppCompareBox(flag: boolean) {
      if (flag === true) {
        self.searchState = false
      }
      self.isAppCompareBox = flag
    },
    toggleLogin(flag: boolean) {
      self.isLogin = flag
    },
    changeDsType(type: osType) {
      if (type === self.dsType) return
      setStorage('truth-flash', 'dsType', type)
      self.dsType = type
      resetPage(self)
    },
    changeLanguage(type: languageType) {
      storage.set('language', type)
      self.language = type === 'zh_CN' ? 1 : 2
    },
    changeDate(range: string[]) {
      if (range[0] === self.beginDate && range[1] === self.endDate) return
      range[0] && setStorage('truth-flash', 'beginDate', range[0])
      range[1] && setStorage('truth-flash', 'endDate', range[1])
      self.page = 1
      self.beginDate = range[0]
      self.endDate = range[1]
    },
    changeLevel(level: number) {
      self.level = level
    },
    changeClusterLevel(level: number) {
      self.clusterLevel = level
    },
    resetClusterLevel() {
      self.beginNum = 0
      self.endNum = 0
      self.clusterLevel = 0
      self.page = 1
      self.level = 1
    },
    changeBeginNum(num: number) {
      self.beginNum = num
      resetPage(self)
    },
    changeEndNum(num: number) {
      self.endNum = num
      resetPage(self)
    },
    setBeginNum(num: number) {
      self.beginNum = num
    },
    setEndNum(num: number) {
      self.endNum = num
    },
    togglOsTypeShowShow(flag: boolean) {
      self.isOsTypeShow = flag
    },
    changeClusterLevelTitle(title: string) {
      self.clusterLevelTitle = title
    },
    togglQualityShow(flag: boolean) {
      self.isQualityShow = flag
    },
    changeQualityType(title: number) {
      self.qualityType = title
    },
    setAllCateShow(flag: boolean) {
      self.isAllCateShow = flag
    },
    togglClusterMonthPickerShow(flag: boolean) {
      self.isClusterMonthPickerShow = flag
    },
    changeClusterMonth(time: string) {
      if (time === self.clusterMonth) return
      self.page = 1
      self.clusterMonth = time
    },
    togglRangerMonthPickerShow(flag: boolean) {
      self.isClusterRangePickerShow = flag
    },
    toggleDataEmpty(flag: boolean) {
      self.isDataEmpty = flag
    },
    changeDateFilter(title: string) {
      self.dateFilter = title
    },
    changeAppList(list) {
      self.appList = list
    },
    toggleSearchState(flag: boolean) {
      self.searchState = flag
    },
    // 缓存最大保存十个记录
    changeVisitedAppList(newItem: Instance<typeof appInfo>) {
      if (getStorage('truth-flash', 'visitedApp')) {
        const visited = getStorage('truth-flash', 'visitedApp')
        const lens = visited.length
        for (let i = 0; i < lens; i++) {
          if (visited[i].appId === newItem.appId) {
            self.visitedAppList.splice(i, 1)
          }
        }
        if (lens > 10) {
          // 队列推出第一个
          self.visitedAppList.pop()
          // 尾部加入最新的列表
          self.visitedAppList.unshift(newItem)
          setStorage('truth-flash', 'visitedApp', self.visitedAppList)
          return
        }
      }
      self.visitedAppList.unshift(newItem)
      setStorage('truth-flash', 'visitedApp', self.visitedAppList)
    },
    // 与app历史列表相同
    changeComapnyAppList(newItem: Instance<typeof companyInfo>) {
      if (getStorage('truth-flash', 'visitedCompany')) {
        const visited = getStorage('truth-flash', 'visitedCompany')
        const lens = visited.length
        for (let i = 0; i < lens; i++) {
          if (visited[i].companyId === newItem.companyId) {
            self.visitedCompanyList.splice(i, 1)
          }
        }
        if (lens > 10) {
          self.visitedCompanyList.pop()
          self.visitedCompanyList.unshift(newItem)
          setStorage('truth-flash', 'visitedCompany', self.visitedCompanyList)
          return
        }
      }
      self.visitedCompanyList.unshift(newItem)
      setStorage('truth-flash', 'visitedCompany', self.visitedCompanyList)
    },
    // 下载逻辑
    getDownloadParams(data) {
      self.downloadParams = data
    },
    /**
     * 对比逻辑
     */
    addSeletedAppList: flow(function* (item) {
      if (self.seletedAppList.length === 10) {
        self.showModel = true
        const timer = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(false)
          }, 3000)
        })
        const res = yield timer
        self.showModel = res
        return
      }
      try {
        // id需要处理
        const { appName, appEnName, icon, appId, isSearch = false } = item
        if (!isSearch) {
          self.searchState = false
        }
        const res = yield FetchAppAdd({ appId })
        if (!res.data) {
          return
        }
        if (appId === detailStore.appId) {
          detailStore.changeAppContrast(1)
        }
        const zindex = self.leftData.length && self.leftData.findIndex(item => item.appId === appId)
        const sindex = self.appList.length && self.appList.findIndex(item => item.appId === appId)
        if (self.appList[sindex]) self.appList[sindex].contrast = 1
        if (self.leftData[zindex]) self.leftData[zindex].contrast = 1
        const tempObj = {
          compareName: appName,
          compareEnName: appEnName,
          iconURL: icon,
          compareId: appId,
        }
        let temp = { ...item, ...tempObj }
        self.seletedAppList.unshift(jsonify(temp))
      } catch (error) {
        console.error('Failed to fetch projects', error)
        // self.state = "error";
      }
    }),

    removeSeletedAppList: flow(function* (id: string) {
      try {
        // id需要处理
        const res = yield FetchAppDelete({ appId: id })
        if (!res.data) {
          return
        }
        if (id === detailStore.appId) {
          detailStore.changeAppContrast(0)
        }
        const sindex = self.appList.length && self.appList.findIndex(item => item.appId === id)
        const zindex = self.leftData.length && self.leftData.findIndex(item => item.appId === id)
        if (self.appList[sindex]) self.appList[sindex].contrast = 0
        if (self.leftData[zindex]) self.leftData[zindex].contrast = 0
        const index = self.seletedAppList.findIndex(item => item.compareId === id)
        self.seletedAppList.splice(index, 1)
      } catch (error) {
        console.error('Failed to fetch projects', error)
      }
    }),
    // 清空
    seletedAppListClearAll: flow(function* () {
      try {
        // id需要处理
        yield FetchAppDeleteAll('')
        detailStore.changeAppContrast(0)
        self.seletedAppList.length = 0
        self.appList &&
          self.appList.forEach(item => {
            item.contrast = 0
          })
        self.leftData &&
          self.leftData.forEach(item => {
            item.contrast = 0
          })
      } catch (error) {
        console.error('Failed to fetch projects', error)
        // self.state = "error";
      }
    }),
    // 查找
    getAddCompare: flow(function* () {
      try {
        const res = yield FetchAppCompare('')
        store.seletedAppList = res.data
      } catch (error) {
        console.error('Failed to fetch projects', error)
        // self.state = "error";
      }
    }),
    changeLeftData(data) {
      self.leftData = data
    },
    /**
     * 首页关注逻辑
     */
    addAttention: flow(function* (data, hideAttention = false) {
      try {
        yield FetchWatchAdd(data)
        const { appId } = data
        if (!hideAttention) {
          const zindex =
            self.leftData.length && self.leftData.findIndex(item => item.appId === appId)
          if (self.leftData[zindex]) self.leftData[zindex].attention = 1
        }
      } catch (error) {
        console.error('Failed to fetch projects', error)
        // self.state = "error";
      }
    }),
    removeAttention: flow(function* (data) {
      try {
        const { appId } = data
        yield FetchWatchDelete(data)
        const zindex = self.leftData.length && self.leftData.findIndex(item => item.appId === appId)
        if (self.leftData[zindex]) self.leftData[zindex].attention = 0
      } catch (error) {
        console.error('Failed to fetch projects', error)
        // self.state = "error";
      }
    }),

    /**
     * 公告逻辑
     */
    getNotice: flow(function* () {
      try {
        const res = yield FetchNotice({ productId: 11 })
        self.noticeList = res.data.data
      } catch (error) {
        console.error('Failed to fetch projects', error)
        // self.state = "error";
      }
    }),

    getNoticeState: flow(function* () {
      try {
        const { data } = yield FetchNoticeState({
          language: self.language,
          productId: 11,
        })
        self.noticeIsRead = !data.data
      } catch (error) {
        console.error('Failed to fetch projects', error)
        // self.state = "error";
      }
    }),
    getUpdateNoticeState: flow(function* () {
      try {
        const { data } = yield FetchUpdateNoticeState({
          language: self.language,
          productId: 11,
        })
        self.noticeIsRead = !data.data
      } catch (error) {
        console.error('Failed to fetch projects', error)
      }
    }),

    getDictTime: flow(function* () {
      try {
        const { data } = yield get('/dict-time')
        self.dictTime = data
        self.clusterMonth = moment(data[2].maxDate).format('YYYY-MM')
        detailStore.changeDateText(moment(data[2].maxDate).format('YYYY-MM'))
        setTimeRange(self)
      } catch (error) {
        console.error('Failed to fetch projects', error)
      }
    }),
    afterCreate() {
      // @ts-ignore
      self.getDictTime()
    },
    // 分类逻辑
    setCategoryId(id: number) {
      setStorage('truth-flash', 'categoryId', id)
      setStorage('truth-flash', 'classId', 0)
      self.orderName = ''
      self.categoryId = id
      self.classId = 0

      resetPage(self)
    },
    setResetCategory() {
      if (self.categoryId === 0 && self.classId === 0) return
      setStorage('truth-flash', 'categoryId', 0)
      setStorage('truth-flash', 'classId', 0)
      self.orderName = ''
      self.categoryId = 0
      self.classId = 0

      resetPage(self)
    },
    setClassId(id: number) {
      setStorage('truth-flash', 'classId', id)
      setStorage('truth-flash', 'categoryId', 0)
      self.orderName = ''
      self.classId = id
      self.categoryId = 0

      resetPage(self)
    },
    setClusterCategoryId(id: number) {
      setStorage('truth-flash', 'clusterCategoryId', id)
      self.clusterCategoryId = id

      resetPage(self)
    },
    resetCategory() {
      setStorage('truth-flash', 'classId', 0)
      setStorage('truth-flash', 'categoryId', 0)
      setStorage('truth-flash', 'clusterCategoryId', 0)
      setStorage('truth-flash', 'clusterCategoryName', i18n.t('all_categories'))
      setStorage('truth-flash', 'categoryName', i18n.t('all_categories'))
      self.categoryName = i18n.t('all_categories')
      self.categoryId = 0
      self.classId = 0
      self.clusterCategoryId = 0
      self.clusterCategoryName = i18n.t('all_categories')
    },
    setCategoryName(name: string) {
      setStorage('truth-flash', 'categoryName', name)
      self.categoryName = name
    },
    setCluterCategoryName(name: string) {
      setStorage('truth-flash', 'clusterCategoryName', name)
      self.clusterCategoryName = name
    },
    clearOrderName() {
      self.orderName = ''
    },
  }))
const store = AppStore.create({
  dateType: getStorage('truth-flash', 'dateType') || 'day',
  dsType: getStorage('truth-flash', 'dsType') || 0,
  language: getLanguage() == 'zh_CN' ? 1 : 2,
  beginDate: getStorage('truth-flash', 'beginDate') || undefined,
  endDate: getStorage('truth-flash', 'endDate') || undefined,
  visitedAppList: getStorage('truth-flash', 'visitedApp') || [],
  visitedCompanyList: getStorage('truth-flash', 'visitedCompany') || [],
  isLogin: process.env.NODE_ENV === 'development' ? true : token ? true : false,
  categoryName: getStorage('truth-flash', 'categoryName') || i18n.t('categories'),
  categoryId: getStorage('truth-flash', 'categoryId') || 0,
  classId: getStorage('truth-flash', 'classId') || 0,
  clusterCategoryId: getStorage('truth-flash', 'clusterCategoryId') || 0,
  clusterCategoryName: getStorage('truth-flash', 'clusterCategoryName') || i18n.t('categories'),
  downloadTabkey: '1',
})
autorun(() => {
  if (store.level !== 0) {
    store.changeBeginNum(0)
    store.changeEndNum(0)
  }
})
export interface IAppInfo extends Instance<typeof appInfo> {}
export interface IAppStore extends Instance<typeof AppStore> {}
export default store
