import { post, get, baseURL, getHeaders } from '../congfig'
import { IScaleParams, LogParmasType } from '@/types'
import { storage } from '@/utils/storage'
import axios from 'axios'
import i18n from '@/i18n'
import { Guide } from '@/components/HomeGuidance'
import { getStorage, handleDateType, query, setStorage } from '@/utils'
import { logType } from '@/constants'

/**
 * 活跃用户数
 * @param data
 */
const FetchActiveUsers = async (data: IScaleParams) => {
  return await post('/scale/active-users', data)
}

/**
 * 日均活跃用户数
 * @param data
 */
const FetchDailyActiveUsers = async (data: IScaleParams) => {
  return await post('/scale/daily-active-users', data)
}

/**
 * 活跃渗透率
 * @param data
 */

const FetchActivePermeability = async (data: IScaleParams) => {
  return await post('/scale/active-permeability', data)
}

/**
 * 获取产品引导标识
 * @param data
 */
const FetchGuide = async () => {
  return await get('/guide')
}

/**
 * 更新产品引导标识
 * @param data
 */
const FetchUpdateGuide = async (data: Record<'guide', Guide>) => {
  return await get('/update-guide', data)
}

/**
 * 日均活跃渗透率
 * @param data
 */
const FetchDailyActivePermeability = async (data: IScaleParams) => {
  return await post('/scale/daily-active-permeability', data)
}

/**
 * 日志埋点
 * @param data
 */
export const SendLog = async (params: LogParmasType = {}) => {
  const userInfo = storage.get('truth-current-user')
  params = {
    URI: window.location.pathname,
    UserID: userInfo?.userId,
    ProductCode: 'flash',
    DataStartTime: getStorage('truth-flash', 'DataStartTime'),
    DataEndTime: getStorage('truth-flash', 'DataEndTime'),
    // PrimaryMenu: getStorage('truth-flash', 'PrimaryMenu') || '',
    // SecondMenu: getStorage('truth-flash', 'SecondMenu') || '',
    DateType: handleDateType(getStorage('truth-flash', 'dateType') || 'day'),
    ...params,
    LogContent: {
      // categoryId: getStorage('truth-flash', 'categoryId') || 0,
      // classId: getStorage('truth-flash', 'classId') || 0,
      companyId: new URLSearchParams(location.search).get('companyId') || '',
      // current: 1,
      // dsType: getStorage('truth-flash', 'dsType') || 0,
      // appId: getStorage('truth-flash', 'compareId') || '',
      // groupId: getStorage('truth-flash', 'groupId') || '',
      language: storage.get('language') || navigator.language.replace(/-/, '_').toLowerCase(),
      ...params.LogContent,
    },
  }

  return await axios({
    method: 'post',
    data: params,
    headers: { ...getHeaders, 'content-type': 'application/json' },
    url: '/log',
  })
}

/**
 * 率数据导出
 * @param data
 */
const ExportData = async (url: string, data) => {
  return await axios.post(baseURL + url, data, {
    responseType: 'arraybuffer',
    data: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      'Truth-Auth': `bearer ${storage.get('truth-token')}`,
      Authorization: 'Basic dHJ1dGg6dHJ1dGhfc2VjcmV0',
      'Accept-Language': i18n.language.replace('_', '-'),
    },
  })
}

export default {
  FetchActiveUsers,
  FetchDailyActiveUsers,
  FetchActivePermeability,
  FetchDailyActivePermeability,
  ExportData,
  FetchUpdateGuide,
  FetchGuide,
}
