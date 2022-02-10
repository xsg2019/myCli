import React, { FC, useEffect } from 'react'
import './style.less'
import BasicSelect from './BasicSelect'
import BasicDatePicker from '../../../components/BasicDatePicker'
import DatePicker from '../../../components/DatePicker'
import AllCategroy from './AllCategroy'
import BasicMonthPicker from '../../../components/BasicMonthPicker'
import BannerLeft from './BannerLeft'
import moment from 'moment'
import GrowthSelect from './GrowthSelect'
import ClusterSelect from './ClusterSelect'
import QualitySelect from './QualitySelect'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { useCurrentPage } from '@/hooks'
import { useLocation } from 'react-router-dom'
import { sixMonthAgo } from '@/store/appStore'

interface IBanner {
  helpPage?: boolean
  noticePage: boolean
  children?: React.ReactNode
  /**
   * 侧边栏伸缩
   */
  collapsed?: boolean
  /**
   * 是否为showpage类型页面
   */
  showpage?: boolean
  detail: boolean
  comparison?: boolean
  isAppCompareBoxVisible?: boolean
  collectPage?: boolean
  toggleCheckboxChange?: (e: boolean) => void
  toggleAppCompareBox?: (e: boolean) => void
  store?: any
}

const Banner: FC<IBanner> = (props: IBanner) => {
  const { children, collapsed, showpage, detail, comparison, collectPage } = props

  const growth = useCurrentPage('/growth')
  const growthCompound =
    useCurrentPage('/growth-compound') || useCurrentPage('/details/app-yeargrowth')

  const overview = useCurrentPage('/details/app-overview')
  const detailCluster = useCurrentPage('/details/app-cluster')
  const cluster = useCurrentPage('/home/cluster')
  const comparisonCluster =
    useCurrentPage('/company/cluster/') ||
    useCurrentPage('/groupcomparison/cluster') ||
    useCurrentPage('/comparison/cluster')

  const {
    isQualityShow,
    isClusterMonthPickerShow,
    rangeBeginTime,
    rangeEndTime,
    ForceUpdate,
    isAllCateShow,
    beginDate,
    endDate,
    changeDate,
    compoundBeginTime,
    compoundEndTime,
    changeCompoundDateText,
    clusterMonth,
    changeClusterMonth,
    rangeEndMonthTime,
  } = useStore().appStore

  const { pathname } = useLocation()
  const { dateText, changeDateText } = useStore().detailStore

  const monthPickerProps = () => {
    let defaultDate: string
    let onChangeDate: (e: string[] | string) => void

    if (overview) {
      defaultDate = dateText
      onChangeDate = changeDateText
    }
    if (isClusterMonthPickerShow || collectPage || growth || detailCluster) {
      defaultDate = clusterMonth
      onChangeDate = changeClusterMonth
    }
    return {
      defaultDate,
      onChangeDate,
      rangeBeginTime,
      rangeEndTime,
      ForceUpdate,
      isGrowth: growth ? true : false,
    }
  }

  useEffect(() => {
    if (overview) {
      changeDateText(moment(rangeEndMonthTime).format('YYYY-MM'))
    }
    if (growth) {
      changeClusterMonth(moment(rangeEndMonthTime).format('YYYY-MM'))
    }
    if (cluster || comparisonCluster) {
      changeClusterMonth(moment(rangeEndMonthTime).format('YYYY-MM'))
      changeCompoundDateText([
        sixMonthAgo(rangeEndMonthTime),
        moment(rangeEndMonthTime).format('YYYY-MM-DD'),
      ])
    }
    if (growthCompound) {
      changeCompoundDateText([
        moment(rangeEndMonthTime).subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
        moment(rangeEndMonthTime).format('YYYY-MM-DD'),
      ])
    }
  }, [pathname])

  const BasicDatePickerProps = () => {
    const growth =
      useCurrentPage('/growth-compound') ||
      useCurrentPage('/app-yeargrowth') ||
      useCurrentPage('/quality') ||
      useCurrentPage('/mode')
    return {
      beginDate:
        growthCompound || cluster || detailCluster || comparisonCluster
          ? compoundBeginTime
          : beginDate,
      endDate:
        growthCompound || cluster || detailCluster || comparisonCluster ? compoundEndTime : endDate,
      onChangeDate:
        growthCompound || cluster || detailCluster || comparisonCluster
          ? changeCompoundDateText
          : changeDate,
      isMonth: false,
      rangeBeginTime,
      rangeEndTime,
      ForceUpdate,
      growth, //需要将范围定位到上个月
      maxRangeDate: [3, 'year'],
    }
  }

  return (
    <div className="banner-container">
      <div className="banner-box">
        {comparison || detail || showpage ? (
          <BannerLeft collapsed={collapsed} showpage={showpage}>
            {children}
          </BannerLeft>
        ) : null}
        {growth && !comparison ? <GrowthSelect collapsed={collapsed} /> : null}

        {cluster && !isQualityShow && !comparison ? <ClusterSelect collapsed={collapsed} /> : null}

        {isQualityShow && !comparison ? <QualitySelect collapsed={collapsed} /> : null}

        <div className="banner" style={{ right: showpage ? 0 : 20 }}>
          {showpage || detailCluster || cluster || comparisonCluster ? null : <BasicSelect />}

          {collectPage ? <BasicSelect /> : null}

          {showpage ? null : overview || (growth && !growthCompound) || isClusterMonthPickerShow ? (
            <BasicMonthPicker {...monthPickerProps()} />
          ) : (
            <div className="date-picker-wrapper">
              {/* <BasicDatePicker {...BasicDatePickerProps()} /> */}
              <DatePicker {...BasicDatePickerProps()}></DatePicker>
            </div>
          )}

          {collectPage ? <BasicMonthPicker {...monthPickerProps()} /> : null}

          {showpage || comparisonCluster || comparison || detail || isAllCateShow ? null : (
            <AllCategroy />
          )}
        </div>
      </div>
    </div>
  )
}

export default observer(Banner)
