/**
 自定义hooks
* */
import { useEffect, useState, useRef, useReducer } from 'react'
import { useStore } from '@/utils/context'
import {
  handleHomeData,
  handleDateType,
  scorllTableRright,
  handleEnNum,
  getStorage,
  isFrequency,
  setStorage,
} from '@/utils'
import { useLocation, useParams } from 'react-router'
import { sesstion, storage } from '@/utils/storage'
import moment from 'moment'
import { IScaleParams, IUseRequestFC, IUseRequestOpt, LogParmasType } from '@/types'
import Watermark from '@/utils/cwater-mark'
import homeStore from '@/store/homeStore'

/**
 *
 * @param ref
 * @param handler
 */
export const useOnClickOutside = (ref: any, handler: (e: () => void) => any) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener, true)
    document.addEventListener('touchstart', listener, true)

    return () => {
      document.removeEventListener('mousedown', listener, true)
      document.removeEventListener('touchstart', listener, true)
    }
  }, [ref, handler])
}

/**
 * 获取上一轮的状态
 * @param value
 */
export const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

/**
 * 请求封装
 * @param api
 * @param options
 */
export const useRequest = (api: any, options: IUseRequestOpt): IUseRequestFC => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const isCancelled = useRef(false)

  const { handler, Deps, onerror } = options

  const fetchData = async () => {
    try {
      isCancelled.current = false
      setLoading(true)
      const data = await api()
      if (!isCancelled.current) {
        setData(data)
        handler(data)
        setLoading(false)
      }
    } catch (e) {
      isCancelled.current = false
      setError(e)
      setLoading(false)
      e && onerror(e)
    }
  }

  useEffect(() => {
    if (isFrequency()) {
      homeStore.setVerificationType(true)
      return
    }
    fetchData()
    return () => {
      isCancelled.current = true
    }
  }, Deps || [])

  return { loading, data, error, setLoading }
}

/**
 * 首页请求参数
 * @param mergeParms
 */
export const useDefaultParams = (mergeParms: IScaleParams) => {
  const {
    beginDate,
    endDate,
    dsType,
    language,
    categoryId,
    classId,
    rangeBeginTime,
    rangeEndTime,
    clusterCategoryId,
    compoundEndTime,
    compoundBeginTime,
    clusterMonth,
    rangeEndMonthTime,
  } = useStore().appStore

  const [first, setRirst] = useState(true)
  useEffect(() => {
    setRirst(false)
  }, [])

  const cluster = useCurrentPage('/cluster')
  const isGrowth = useCurrentPage('/growth-mom') || useCurrentPage('/growth-yoy')
  const compound = useCurrentPage('/growth-compound')

  const handleBeginDate = () => {
    if (compound || cluster) {
      if (first) {
        if (cluster) {
          return sixMonthAgo(rangeEndMonthTime)
        } else {
          return moment(rangeEndMonthTime)
            .subtract(1, 'month')
            .startOf('month')
            .format('YYYY-MM-DD')
        }
      } else {
        return moment(compoundBeginTime).format('YYYY-MM-DD')
      }
    }
    if (moment(rangeBeginTime) > moment(beginDate)) {
      return rangeBeginTime
    }
    if (isGrowth) {
      if (first) {
        return moment(rangeEndMonthTime).startOf('month').format('YYYY-MM-DD')
      } else {
        return moment(clusterMonth).startOf('month').format('YYYY-MM-DD')
      }
    }
    return beginDate === '' ? sixMonthAgo(rangeEndTime) : beginDate
  }

  const handleEndDate = () => {
    if (isGrowth) {
      if (first) {
        return moment(rangeEndMonthTime).endOf('month').format('YYYY-MM-DD')
      } else {
        return moment(clusterMonth).endOf('month').format('YYYY-MM-DD')
      }
    }

    if (compound || cluster) {
      if (first) {
        return moment(rangeEndMonthTime).format('YYYY-MM-DD')
      } else {
        return moment(compoundEndTime).format('YYYY-MM-DD')
      }
    }
    if (moment(rangeEndTime) < moment(endDate)) {
      return rangeEndTime
    }
    return endDate
  }

  // setStorage('truth-flash', 'DataStartTime', handleBeginDate())
  // setStorage('truth-flash', 'DataEndTime', handleEndDate())

  const fetchData = {
    beginDate: handleBeginDate(),
    endDate: handleEndDate(),
    dsType,
    language,
    current: 1,
    size: 10,
    companyId: 0,
    categoryId: cluster ? clusterCategoryId : categoryId,
    classId: cluster ? 0 : classId,
    appId: '',
    ...mergeParms,
    dateType: handleDateType(mergeParms.dateType),
  }

  return fetchData
}

/**
 * 首页请求逻辑处理
 * @param param
 */
export const useFetchHomeData = param => {
  const { setIsAllCheckd, setLegend, verificationRefresh } = useStore().homeStore
  const {
    level,
    dateType: dateType1,
    beginNum,
    endNum,
    leftData,
    changeLeftData,
    isForceUpdate,
    categoryId,
    classId,
    ForceUpdate,
    setDownloadTabkey,
    page,
    setPageChange,
    setCurrentPage,
    changeClusterMonth,
    getDownloadParams,
    language,
    rangeEndMonthTime,
    setApiPage,
  } = useStore().appStore
  const {
    BasicApi,
    DayilyApi,
    ChartsOption,
    kpi,
    isPerKpi,
    dateType = dateType1,
    orderName,
    setOrderName,
    logMenus,
    isGrowth,
    isCompound,
  } = param

  const isArr = Array.isArray(ChartsOption)
  const [midData, setMidData] = useState([])
  const [rightData, setRightData] = useState([])
  const [option, setOption] = useState(isArr ? [] : null)
  const [title, setTitle] = useState([])
  const [total, setTotal] = useState(100)
  const [tabkey, setTabkey] = useState('1')
  const [first, setRirst] = useState(true)

  useEffect(() => {
    setRirst(false)
  }, [])

  const [loading1, setLoading1] = useState(false)

  const callback = async (key: '1' | '2') => {
    if (loading || loading1) return
    setCurrentPage(1)
    setTabkey(key)
    setDownloadTabkey(key)
    setLoading1(true)
    const { data } = await FetchTabData(
      { ...fetchData, dateType: handleDateType(dateType), current: 1 },
      handleDateType(dateType),
      key
    )()
    handleData(data, key)
    setLoading1(false)
  }

  const isComparison = useCurrentPage('/comparison')
  const isCompany = useCurrentPage('/company')
  const isGComparison = useCurrentPage('/groupcomparison')
  const id = new URLSearchParams(location.search).get('companyId')

  const handleLogType = () => {
    if (isComparison) {
      return logType.CONTRAST_CLICK
    }
    if (isCompany) {
      return logType.JUMP_DETITIAL
    }
    if (isGComparison) {
      return logType.ATTENTION_CLICK
    }
    return logType.MENU_CLICK
  }

  const handleTarget = tabkey => {
    if (tabkey === '1') {
      return logMenus.Target[0]
    } else {
      return logMenus.Target[1]
    }
  }

  const { beginDate, endDate } = useStore().appStore
  const [nodata, setNodata] = useState(false)

  useEffect(() => {
    if (!first) {
      setOrderName('')
      scorllTableRright()
      setCurrentPage(1)
      ForceUpdate()
    }
  }, [beginDate, endDate])

  useEffect(() => {
    return () => {
      setCurrentPage(1)
      changeClusterMonth(moment(rangeEndMonthTime).format('YYYY-MM'))
    }
  }, [])
  let userParams: any = {
    current: first ? 1 : page,
    kpi,
    orderName,
    level,
    beginNum,
    endNum,
    appId: isComparison ? getStorage('truth-flash', 'compareId') : '',
    groupId: isGComparison ? getStorage('truth-flash', 'groupId') : '',
    companyId: isCompany ? Number(id) : 0,
    dateType: handleDateType(dateType),
    categoryId: isCompany || isComparison || isGComparison ? 0 : categoryId,
    classId: isCompany || isComparison || isGComparison ? 0 : classId,
  }

  let fetchData: any = useDefaultParams(userParams)

  const FetchTabData = (fetchData, dateType, tabkey) => {
    //  更新下载状态
    getDownloadParams({ ...fetchData, tabkey })

    if (dateType === 'day') return () => BasicApi(fetchData)
    if (tabkey === '1') {
      return () => BasicApi && BasicApi(fetchData)
    } else {
      return () => DayilyApi && DayilyApi(fetchData)
    }
  }

  const isPer =
    useCurrentPage('/time/time-avg-spent') ||
    useCurrentPage('/time/time-avg-days') ||
    useCurrentPage('/frequency/frequency-avg-sessions')

  const isScaleActive = useCurrentPage('/growth') || useCurrentPage('/scale')
  const prevkey = usePrevious(tabkey)
  const isAvgDays = useCurrentPage('/time/time-avg-days')
  const handleAvgDaysDateType = dateType => {
    if (dateType === 'day' && isAvgDays) {
      return 0
    }
    return handleDateType(dateType)
  }

  const handleData = (data, tabkey) => {
    getDownloadParams({
      ...fetchData,
      dateType: handleAvgDaysDateType(dateType),
    })
    SendLog({
      PrimaryMenu: getCnName(logMenus.PrimaryMenu),
      SecondMenu: getCnName(logMenus.SecondMenu),
      LogType: handleLogType(),
      Target: getCnName(handleTarget(tabkey)),
      DateType: handleAvgDaysDateType(dateType),
      DataStartTime: fetchData.beginDate,
      DataEndTime: fetchData.endDate,
      LogContent: {
        appId: isComparison ? getStorage('truth-flash', 'compareId') : '',
        groupId: isGComparison ? getStorage('truth-flash', 'groupId') : '',
        current: fetchData.current,
        dsType: fetchData.dsType,
        categoryId: isGComparison || isComparison || isCompany ? '' : fetchData.categoryId,
        classId: isGComparison || isComparison || isCompany ? '' : fetchData.classId,
        level: isGrowth && !(isGComparison || isComparison || isCompany) ? fetchData.level : '',
      },
    })
    let { total, records, current } = data
    if (records.length == 0) {
      setNodata(true)
      setLoading(false)
      return
    } else {
      setNodata(false)
    }
    if (!isPer) {
      records = records.map(item => {
        const kpi = pick(item, ['kpiColumns']).kpiColumns

        let obj = {}
        for (let key in kpi) {
          if (key === 'Ratio') {
            obj[key] = kpi[key]
            continue
          }
          obj[key] = handleEnNum(kpi[key], isScaleActive)
        }
        return { ...item, kpiColumns: obj }
      })
    }

    records = records.map(item => {
      const permKpi =
        pick(item, ['permKpiColumns']) && pick(item, ['permKpiColumns']).permKpiColumns
      let obj1 = {}
      if (permKpi) {
        for (let key in permKpi) {
          if (permKpi[key] === '') {
            obj1[key] = '0'
          } else {
            obj1[key] = round(Number(permKpi[key]), 2).toFixed(2)
          }
        }
      }
      return { ...item, permKpiColumns: obj1 }
    })
    const {
      tempArr,
      legendData,
      title,
      kpiData,
      permKpiData,
      permKpiDataTempArr,
      MaxAndMinData,
    } = handleHomeData(records)
    setIsAllCheckd(true)
    setLegend(legendData)
    changeLeftData(records || [])
    setOption(
      title.length
        ? isArr
          ? ChartsOption.map(item =>
              item(title, tempArr, legendData, MaxAndMinData, permKpiDataTempArr, dateType, tabkey)
            )
          : ChartsOption(title, tempArr, legendData, MaxAndMinData, permKpiDataTempArr)
        : null
    )
    setTitle(title)

    if (orderName === '' && !isPer) {
      scorllTableRright()
      setOrderName(title.length && title[title.length - 1])
    }
    if (prevkey !== tabkey) {
      scorllTableRright()
    }
    if (orderName === '' && isPer) {
      scorllTableRright()
    }
    setTotal(total)
    setApiPage(current)
    setMidData(records)
    setRightData(isPerKpi ? permKpiData : kpiData)
  }

  let { loading, data, error, setLoading } = useRequest(
    FetchTabData(
      {
        ...fetchData,
        dateType: handleAvgDaysDateType(dateType),
        companyId: Number(id),
        language,
      },
      handleAvgDaysDateType(dateType),
      tabkey
    ),
    {
      handler: ({ data }) => {
        handleData(data, tabkey)
      },
      onerror: e => {
        console.log(e)
      },
      Deps: [isForceUpdate, id, language, verificationRefresh],
    }
  )
  const onPageChange = (page: number) => {
    setPageChange(page)
  }
  return {
    loading: loading1 || loading,
    option,
    leftData,
    midData,
    rightData,
    dateType,
    title,
    total,
    page,
    onPageChange,
    callback,
    orderName,
    setOrderName,
    tabkey,
    nodata,
    setOption,
    setTabkey,
  }
}

/**
 * 获取appid
 */
export const useSessionParams = () => {
  let params: { id: string } = useParams()
  sesstion.set('appid', params.id)
}

/**
 * 获取url搜索关键词
 */
export const useKeyWord = () => {
  const { search } = useLocation()
  const query = search.split('=')[1]

  return decodeURI(query)
}

/**
 * 清除table右侧动态表头信息
 * @param setTitle
 * @param deps
 */
export const useClearTitleAndCharts = (setTitle?: any, setOption?: any, deps?: any[]) => {
  const { changeLeftData } = useStore().appStore
  useEffect(
    () => {
      setTitle && setTitle([])
      setOption && setOption(null)
      changeLeftData([])
    },
    deps ? deps : []
  )
}

export const usePageChange = (tabkey, radio?) => {
  const [page, setPage] = useState(1)
  const [page1, setPage1] = useState(1)
  const [page2, setPage2] = useState(1)
  const [page3, setPage3] = useState(1)
  const { ForceUpdate } = useStore().appStore

  const onPagechange = (num: number) => {
    if (radio === 1 && tabkey === '1') {
      setPage(num)
      ForceUpdate()
      return
    }
    if (radio === 1 && tabkey === '2') {
      setPage1(num)
      ForceUpdate()
      return
    }
    if ((radio === 2 && tabkey === '1') || tabkey === '1') {
      setPage2(num)
      ForceUpdate()
      return
    }
    if ((radio === 2 && tabkey === '2') || tabkey === '2') {
      setPage3(num)
    }
  }

  const resPage = () => {
    if (radio === 1 && tabkey === '1') {
      return page
    }
    if (radio === 1 && tabkey === '2') {
      return page1
    }
    if ((radio === 2 && tabkey === '1') || tabkey === '1') {
      return page2
    }
    if ((radio === 2 && tabkey === '2') || tabkey === '2') {
      return page3
    }
  }

  const SetPage = num => {
    if (radio === 1 && tabkey === '1') {
      return setPage(num)
    }
    if (radio === 1 && tabkey === '2') {
      return setPage1(num)
    }
    if ((radio === 2 && tabkey === '1') || tabkey === '1') {
      return setPage2(num)
    }
    if ((radio === 2 && tabkey === '2') || tabkey === '2') {
      return setPage3(num)
    }
  }

  return { onPagechange, page: resPage(), setPage: num => SetPage(num) }
}

/**
 * 访问公司对比页面逻辑
 */
export const useVisitCompany = () => {
  const { changeComapnyAppList } = useStore().appStore
  const { changeCompanyId } = useStore().comparisonStore
  const handleAddCompany: (item: any) => void = item => {
    changeComapnyAppList(item)
    changeCompanyId(item.companyId)
  }
  return handleAddCompany
}

/**
 * 数据空状态判断
 * @param initValue
 */
export const useHasData = (initValue: boolean) => {
  const [hasData, sethasData] = useState(initValue)
  return {
    hasData,
    sethasData,
  }
}

/**
 * 判断是否在当前页面路径
 * @param url
 */
export const useCurrentPage = (url: string): boolean => {
  const { pathname } = useLocation()

  const hasPage = pathname.match(url)
  return hasPage ? true : false
}

export const handleName = item => {
  if (item.hasOwnProperty('categoryName')) {
    return i18n.language === 'zh_CN' ? item.categoryName : item.categoryEnName
  }
  if (item.hasOwnProperty('clazzName')) {
    return i18n.language === 'zh_CN' ? item.clazzName : item.clazzEnName
  }
  return i18n.language === 'zh_CN' ? item.name : item.enName
}

export const useSetCategroy = (setVisible?: (e: boolean) => void) => {
  const {
    setCategoryId,
    setClassId,
    setCategoryName,
    setCluterCategoryName,
    setClusterCategoryId,
  } = useStore().appStore

  const { i18n } = useTranslation()
  const handleCategory = item => {
    setCategoryId(Number(item.id) || Number(item.categoryId))
    setCategoryName(handleName(item))
    setVisible && setVisible(false)
  }

  const handleClass = item => {
    setClassId(Number(item.id) || Number(item.clazzId))
    setCategoryName(handleName(item))
    setVisible && setVisible(false)
  }
  const handleClusterClass = item => {
    setClusterCategoryId(Number(item.id) || Number(item.categoryId))
    setCluterCategoryName(handleName(item))
    setVisible && setVisible(false)
  }

  return { handleCategory, handleClass, handleClusterClass }
}

export const useSetFirstCategroy = (setVisible?: (e: boolean) => void) => {
  const { setClusterCategoryId, setCluterCategoryName } = useStore().appStore

  const handleCategory = item => {
    setClusterCategoryId(Number(item.id))
    setCluterCategoryName(handleName(item))
    setVisible && setVisible(false)
  }
  return { handleCategory }
}

/**
 * 处理公司跳转逻辑
 * @param item
 */
export const useHandleCompany = (): ((e) => void) => {
  const { changeCompanyId } = useStore().comparisonStore
  const { changeComapnyAppList } = useStore().appStore
  const handleCompany = item => {
    changeComapnyAppList(item)
    changeCompanyId(item.companyId)
  }
  return handleCompany
}

/**
 * 空状态判断
 */
export const useNoData = () => {
  const [data, setData] = useState(true)
  return { data, setData }
}

import api from '@/api'
import { pick, round } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import { sixMonthAgo } from '@/store/appStore'
import { SendLog } from '@/api/Home/scale'
import { logType } from '@/constants'

const { FetchWatchGroup, FetchWatchSelectGroup } = api

/**
 * 关注moadal逻辑
 */
export const useShowModal = () => {
  const [visible, setVisible] = useState(false) // 关注mddal
  const [record, setRecord] = useState(null)

  const { setAttentionList } = useStore().appStore

  const showModal = async record => {
    const { data } = await FetchWatchGroup()
    const temp = data.map(item => {
      return { ...pick(item, ['id', 'name']), checked: false }
    })
    if (record) {
      const res = await FetchWatchSelectGroup({ appId: record.appId })
      const selectId = res.data.map(item => item.id)
      for (let i = 0; i < temp.length; i++) {
        const item = temp[i]
        for (let j = 0; j < selectId.length; j++) {
          const item1 = selectId[j]
          if (item.id === item1) {
            item.checked = true
            break
          } else {
            item.checked = false
          }
        }
      }
    }
    setAttentionList(temp)
    setRecord(record)
    setVisible(true)
  }

  return { visible, record, setVisible, setRecord, showModal }
}

/**
 * 水印功能封装
 */

interface IuseWaterMark {
  isCard: boolean
}

export const useWaterMark = (parmas?: Partial<IuseWaterMark>) => {
  const mark = useRef(null)

  const email =
    storage.get('truth-current-user') && storage.get('truth-current-user').userName.split('@')[0]
  let userId: string = storage.get('truth-current-user') && storage.get('truth-current-user').userId
  const prodID = 11
  if (userId) {
    if (userId.length > 10) {
      userId = userId.substring(userId.length - 10, userId.length)
    } else {
      userId = '0'.repeat(10 - userId.length) + userId
    }
  }

  const doWaterMark = () => {
    if (parmas && parmas.isCard) {
      Watermark(mark.current, {
        texts: [userId, prodID, email], // 水印文字
        textColor: 'rgba(0,0,0,0.06)', // 文字颜色
        textFont: '18px PingFangSC-Regular,Arial', // 字体
        offsetHight: 80,
        offsetWidth: 5,
      })
    } else {
      Watermark(mark.current, {
        texts: [userId, prodID, email], // 水印文字
        textColor: 'rgba(0,0,0,0.06)', // 文字颜色
        textFont: 'bold 18px Microsoft YaHei', // 字体
        offsetHight: 30,
        offsetWidth: 80,
      })
    }
  }

  useEffect(() => {
    doWaterMark()
  }, [])

  return mark
}

interface UseLogMenu {
  PrimaryMenu: string
  SecondMenu?: string
  LogType?: number
  Target?: string
}

export const getCnName = (value: string) => {
  return i18n.t(value, { lng: 'zh_CN' })
}

/**
 * 侧边栏菜单埋点
 * @param  UseLogMenu
 */
export const useLogMenu = ({
  PrimaryMenu,
  SecondMenu = '',
  LogType,
  Target,
  LogContent = {},
}: LogParmasType) => {
  PrimaryMenu = getCnName(PrimaryMenu)
  SecondMenu = getCnName(SecondMenu)

  setStorage('truth-flash', 'PrimaryMenu', PrimaryMenu)
  setStorage('truth-flash', 'SecondMenu', SecondMenu)

  useLogHook({
    PrimaryMenu,
    SecondMenu,
    Target,
    LogType: LogType || logType.MENU_CLICK,
    LogContent,
  })
}

/**
 * 基础埋点钩子
 * @param  LOGPARMASTYPE
 */

export const useLogHook = (params: LogParmasType) => {
  useEffect(() => {
    SendLog(params)
  }, [])
}
