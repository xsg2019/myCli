import { post, get } from '../congfig'
import { IScaleParams } from '@/types'

/**
 * 使用时长
 * @param data
 */
const FetchUserTime = async (data: IScaleParams) => {
  return await post('/time/user-time', data)
}

/**
 * 日均使用时长
 * @param data
 */
const FetchDailyUserTime = async (data: IScaleParams) => {
  return await post('/time/daily-user-time', data)
}

/**
 * 使用时长渗透率
 * @param data
 */

const FetchTimePermeability = async (data: IScaleParams) => {
  return await post('/time/time-permeability', data)
}

/**
 * 日均使用时长渗透率
 * @param data
 */
const FetchDailyTimePermeability = async (data: IScaleParams) => {
  return await post('/time/daily-time-permeability', data)
}

/**
 * 人均使用时长
 * @param data
 */

const FetchAvgTime = async (data: IScaleParams) => {
  return await post('/time/avg-time', data)
}

/**
 * 人均单日使用时长
 * @param data
 */
const FetchDailyAvgTime = async (data: IScaleParams) => {
  return await post('/time/daily-avg-time', data)
}

/**
 * 人均使用天数
 * @param data
 */

const FetchAvgUserDays = async (data: IScaleParams) => {
  return await post('/time/avg-user-days', data)
}

export default {
  FetchUserTime,
  FetchDailyUserTime,
  FetchTimePermeability,
  FetchDailyTimePermeability,
  FetchAvgTime,
  FetchDailyAvgTime,
  FetchAvgUserDays,
}
