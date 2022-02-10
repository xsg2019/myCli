import { post } from '../congfig'
import { IScaleParams } from '@/types'

/**
 * 同比增长
 * @param data
 */
const FetchYearGrowth = async (data: IScaleParams) => {
  return await post(
    `/growth/year-growth?beginNum=${data.beginNum}&endNum=${data.endNum}&level=${data.level}`,
    data
  )
}

/**
 * 环比增长
 * @param data
 */
const FetchMonthGrowth = async (data: IScaleParams) => {
  return await post(
    `/growth/month-growth?beginNum=${data.beginNum}&endNum=${data.endNum}&level=${data.level}`,
    data
  )
}

/**
 * 复合增长
 * @param data
 */

const FetchCompoundGrowth = async (data: IScaleParams) => {
  return await post(
    `/growth/compound-growth?beginNum=${data.beginNum}&endNum=${data.endNum}&level=${data.level}`,
    data
  )
}

export default {
  FetchYearGrowth,
  FetchMonthGrowth,
  FetchCompoundGrowth,
}
