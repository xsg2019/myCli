import React, { useCallback, useEffect, useState } from 'react'
import './style.less'
import PopoverCard from '@/components/PopoverCard'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { useLocation } from 'react-router-dom'
import api from '@/api'
import { useCurrentPage } from '@/hooks'
import {
  scaleList,
  frequencyAvgList,
  frequencyList,
  timeAvgList,
  timeAvgDaysList,
  timeList,
  growthYoyList,
  growthMomList,
  growthCompoundList,
  qualityList,
  modeList,
  detailGrowthCompoundList,
  detailQualityList,
  detailModeListList,
  logType,
} from '@/constants'
import { useTranslation } from 'react-i18next'
import { Button, notification } from 'antd'
import Axios from 'axios'
import { storage } from '@/utils/storage'
import i18n from '@/i18n'
import { SendLog } from '@/api/Home/scale'
import { toJS } from 'mobx'

const { ExportData } = api

export const FetchUserRight = params => {
  return Axios({
    method: 'get',
    params,
    headers: {
      'Truth-Auth': `bearer ${storage.get('truth-token')}`,
      Authorization: 'Basic dHJ1dGg6dHJ1dGhfc2VjcmV0',
      'Cache-Control': 'no-cache',
    },
    url: '/api/truth-admin-crm/client/user-right/info',
  })
}

const UserOpions = ({ tabkey }) => {
  const {
    downloadParams,
    downloadTabkey,
    downloadRadio,
    setDownloading,
    beginNum,
    endNum,
    level,
    isTrial,
  } = useStore().appStore

  const { t } = useTranslation()

  const { pathname } = useLocation()
  const detail = useCurrentPage('/details')
  const useLastQuery = (url: string) => {
    const lens = pathname.split('/').length
    return detail
      ? pathname.split('/')[lens - 2].match(url)
      : pathname.split('/')[lens - 1].match(url)
  }

  const downloadURLArr = {
    scaleActive: ['/scale/export-active-users', '/scale/export-daily-active-users'],
    scaleShare: ['/scale/export-active-permeability', '/scale/export-daily-active-permeability'],
    frequencySessions: [
      '/frequency/export-user-frequency',
      '/frequency/export-daily-user-frequency',
    ],
    frequencyShare: [
      '/frequency/export-frequency-permeability',
      '/frequency/export-daily-frequency-permeability',
    ],
    frequencyAvgSessions: [
      '/frequency/export-avg-frequency',
      '/frequency/export-daily-avg-frequency',
    ],
    timeSpent: ['/time/export-user-time', '/time/export-daily-user-time'],
    timeShare: ['/time/export-time-permeability', '/time/export-daily-time-permeability'],
    timeAvgSpent: ['/time/export-avg-time', '/time/export-daily-avg-time'],
    timeAvgDays: ['/time/export-avg-user-days'],

    growthYoy: [`/growth/export-year-growth?beginNum=${beginNum}&endNum=${endNum}&level=${level}`],
    growthMom: [`/growth/export-month-growth?beginNum=${beginNum}&endNum=${endNum}&level=${level}`],
    growthCompound: [
      `/growth/export-compound-growth?beginNum=${beginNum}&endNum=${endNum}&level=${level}`,
    ],
    quality: [
      ['/cluster/export-app-active-overview', '/cluster/export-app-active-trend'],
      ['/cluster/export-cate-active-overview', '/cluster/export-cate-active-trend'],
    ],
    mode: [
      ['/cluster/export-growth-trend'],
      ['/cluster/export-cate-overview', '/cluster/export-cate-trend'],
    ],
    appUser: '/detail/export-app-uv-data',
    appSession: '/detail/export-app-sessions-data',
    appDuration: '/detail/export-app-duration-data',
    appYeargrowth: '/detail/export-app-growth-data',
    appQuality: '/detail/export-app-active-data',
    appMode: '/detail/export-growth-model-data',
  }

  const getURL = (key, isCluster = false) => {
    if (downloadURLArr[key] instanceof Array) {
      if (isCluster) {
        return downloadURLArr[key][Number(downloadRadio) - 1][Number(downloadTabkey) - 1]
      } else {
        return downloadURLArr[key][Number(downloadTabkey) - 1]
      }
    } else {
      return downloadURLArr[key]
    }
  }

  const downLoad = async () => {
    let useDownLoadMatchList
    if (detail) {
      const appUser = useLastQuery('app-user')
      const appSession = useLastQuery('app-session')
      const appDuration = useLastQuery('app-duration')
      const appYeargrowth = useLastQuery('app-yeargrowth')
      const appQuality = useLastQuery('quality')
      const appMode = useLastQuery('mode')
      useDownLoadMatchList = () => {
        if (appUser) return getURL('appUser')
        if (appSession) return getURL('appSession')
        if (appDuration) return getURL('appDuration')
        if (appYeargrowth) return getURL('appYeargrowth')
        if (appQuality) return getURL('appQuality')
        if (appMode) return getURL('appMode')
      }
    } else {
      const scaleActive = useLastQuery('scale-active')
      const scaleShare = useLastQuery('scale-share')
      const frequencySessions = useLastQuery('frequency-sessions')
      const frequencyShare = useLastQuery('frequency-share')
      const frequencyAvgSessions = useLastQuery('frequency-avg-sessions')
      const timeSpent = useLastQuery('time-spent')
      const timeShare = useLastQuery('time-share')
      const timeAvgSpent = useLastQuery('time-avg-spent')
      const timeAvgDays = useLastQuery('time-avg-days')
      const growthYoy = useLastQuery('growth-yoy')
      const growthMom = useLastQuery('growth-mom')
      const growthCompound = useLastQuery('growth-compound')
      const mode = useLastQuery('mode')
      const quality = useLastQuery('quality')
      useDownLoadMatchList = () => {
        if (scaleActive) return getURL('scaleActive')
        if (scaleShare) return getURL('scaleShare')
        if (frequencySessions) return getURL('frequencySessions')
        if (frequencyShare) return getURL('frequencyShare')
        if (frequencyAvgSessions) return getURL('frequencyAvgSessions')
        if (timeSpent) return getURL('timeSpent')
        if (timeShare) return getURL('timeShare')
        if (timeAvgSpent) return getURL('timeAvgSpent')
        if (timeAvgDays) return getURL('timeAvgDays')
        if (growthYoy) return getURL('growthYoy')
        if (growthMom) return getURL('growthMom')
        if (growthCompound) return getURL('growthCompound')
        if (quality) return getURL('quality', true)
        if (mode) return getURL('mode', true)
      }
    }
    setDownloading(true)
    document.querySelector('body').style.overflow = 'hidden'
    try {
      const res = await ExportData(useDownLoadMatchList(), toJS(downloadParams))
      setDownloading(false)

      let fileName = decodeURIComponent(res.headers['content-disposition'].split('filename=')[1])
      var blob = new Blob([res.data], {
        type: 'application/vnd.ms-excel',
      })
      downFile(blob, fileName)
      SendLog({ LogType: logType.DOWNLOAD_CLCIK, LogContent: { fileName } })
    } catch (e) {
      notification.error({
        message: i18n.language === 'zh_CN' ? '下载失败' : 'download failed',
      })
      setDownloading(false)
    }
    document.querySelector('body').style.overflow = 'initial'
  }

  function downFile(blob, fileName) {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName)
    } else {
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
      window.URL.revokeObjectURL(link.href)
    }
  }

  const HelpTitle = () => <div className="qm-help--title">{t('instruction')}</div>

  const isYearGrowth = useCurrentPage('/details/app-yeargrowth')

  const HelpList = () => {
    if (detail) {
      const appUser = useLastQuery('app-user')
      const appSession = useLastQuery('app-session')
      const appDuration = useLastQuery('app-duration')
      const appYeargrowth = useLastQuery('app-yeargrowth')
      const appQuality = useLastQuery('quality')
      const appMode = useLastQuery('mode')
      if (appUser) {
        return scaleList
      }
      if (appSession) {
        return [...frequencyList, ...frequencyAvgList]
      }
      if (appDuration) {
        return [...timeList, ...timeAvgDaysList, ...timeAvgList]
      }
      if (appYeargrowth) {
        return detailGrowthCompoundList
      }
      if (appQuality) {
        return detailQualityList
      }
      if (appMode) {
        return detailModeListList
      }
    } else {
      const scaleActive = useLastQuery('scale-active')
      const scaleShare = useLastQuery('scale-share')
      const frequencySessions = useLastQuery('frequency-sessions')
      const frequencyShare = useLastQuery('frequency-share')
      const frequencyAvgSessions = useLastQuery('frequency-avg-sessions')
      const timeSpent = useLastQuery('time-spent')
      const timeShare = useLastQuery('time-share')
      const timeAvgSpent = useLastQuery('time-avg-spent')
      const timeAvgDays = useLastQuery('time-avg-days')
      const growthYoy = useLastQuery('growth-yoy')
      const growthMom = useLastQuery('growth-mom')
      const growthCompound = useLastQuery('growth-compound')
      const mode = useLastQuery('mode')
      const quality = useLastQuery('quality')
      if (scaleActive || scaleShare) {
        return scaleList
      }
      if (frequencySessions || frequencyShare) {
        return frequencyList
      }
      if (frequencyAvgSessions) {
        return frequencyAvgList
      }
      if (timeSpent || timeShare) {
        return timeList
      }
      if (timeAvgSpent) {
        return timeAvgList
      }
      if (timeAvgDays) {
        return timeAvgDaysList
      }
      if (growthYoy) {
        return growthYoyList
      }
      if (growthMom) {
        return growthMomList
      }
      if (growthCompound) {
        return growthCompoundList
      }
      if (quality) {
        return [
          {
            title: 'mon_dau_end_mon',
            desc: 'mon_dau_end_mon_desc',
          },
          ,
          ...qualityList,
        ]
      }
      if (mode) {
        return modeList
      }
    }
    return []
  }
  const HelpContent = () => (
    <div className="qm-help--content">
      {HelpList().map((item, i) => {
        if (item.title.match('_loyalt')) {
          const tempArr = item.title.split('_')
          const current =
            tempArr[0].substring(0, 1).toLocaleUpperCase() +
            tempArr[2].substring(0, 1).toLocaleUpperCase()
          return (
            <div key={i}>
              <b>
                {current}({t(item.title)})：
              </b>
              {t(item.desc)}
              <br />
            </div>
          )
        }
        return (
          <>
            <b>{t(item.title)}：</b>
            {t(item.desc)}
            <br />
          </>
        )
      })}
    </div>
  )

  return (
    <div
      style={{
        float: 'right',
      }}
      className="btn-group-vertical"
    >
      {tabkey == 2 && isYearGrowth ? null : !isTrial ? (
        <div className="btn  down disabled" onClick={downLoad}>
          <i className="iconfont icon-xiazai2" data-tut="step2" style={{ fontSize: 14 }}></i>
        </div>
      ) : (
        <Button type="primary" disabled>
          <i className="iconfont icon-xiazai2" data-tut="step2" style={{ fontSize: 14 }}></i>
        </Button>
      )}

      <PopoverCard title={<HelpTitle />} content={<HelpContent />} placement="bottomRight" isDesc>
        <div className="help">
          <i className="iconfont icon-bangzhu1" style={{ fontSize: 14 }}></i>
        </div>
      </PopoverCard>
    </div>
  )
}

export default observer(UserOpions)
