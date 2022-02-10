import { post, get } from '../congfig'
import { IScaleParams } from '@/types'

/**
 * 使用次数
 * @param data
 */
const FetchUserFrequency = async (data: IScaleParams) => {
  return await post('/frequency/user-frequency', data)
}

/**
 * 日均使用次数
 * @param data
 */
const FetchDailyUserFrequency = async (data: IScaleParams) => {
  return await post('/frequency/daily-user-frequency', data)
}

/**
 * 使用次数渗透率
 * @param data
 */

const FetchFrequencyPermeability = async (data: IScaleParams) => {
  return await post('/frequency/frequency-permeability', data)
}

/**
 * 日均使用次数渗透率
 * @param data
 */
const FetchDailyFrequencyPermeability = async (data: IScaleParams) => {
  return await post('/frequency/daily-frequency-permeability', data)
}

/**
 * 人均使用次数
 * @param data
 */

const FetchAvgFrequency = async (data: IScaleParams) => {
  return await post('/frequency/avg-frequency', data)
}

/**
 * 人均单日使用次数
 * @param data
 */
const FetchDailyAvgFrequency = async (data: IScaleParams) => {
  return await post('/frequency/daily-avg-frequency', data)
}

export default {
  FetchUserFrequency,
  FetchDailyUserFrequency,
  FetchFrequencyPermeability,
  FetchDailyFrequencyPermeability,
  FetchAvgFrequency,
  FetchDailyAvgFrequency,
}
