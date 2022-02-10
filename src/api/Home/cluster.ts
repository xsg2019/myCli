import { post, get } from '../congfig'
import { IScaleParams } from '@/types'

/**
 * App活跃质量分析-活跃质量概览
 * @param data
 */
const FetchAppActiveOverview = async (data: IScaleParams) => {
  return await post('/cluster/app-active-overview', data)
}

/**
 * App活跃质量分析-活跃质量趋势
 * @param data
 */
const FetchAppActiveTrend = async (data: IScaleParams) => {
  return await post('/cluster/app-active-trend', data)
}

/**
 * App活跃质量分析-活跃质量趋势
 * @param data
 */
const FetchCateActiveOverview = async (data: IScaleParams) => {
  return await post('/cluster/cate-active-overview', data)
}

/**
 * App活跃质量分析-行业活跃质量趋势
 * @param data
 */
const FetchCateActiveTrend = async (data: IScaleParams) => {
  return await post('/cluster/cate-active-trend', data)
}

/**
 * 行业增长模式分析-增长模式概览
 * @param data
 */
const FetchCateOverview = async (data: IScaleParams) => {
  return await post('/cluster/cate-overview', data)
}

/**
 * 行业增长模式分析-增长模式趋势
 * @param data
 */

const FetchCateGrowthTrend = async (data: IScaleParams) => {
  return await post('/cluster/cate-trend', data)
}

/**
 * App增长模式分析-增长模式趋势
 * @param data
 */
const FetchAppGrowthTrend = async (data: IScaleParams) => {
  return await post('/cluster/growth-trend', data)
}

export default {
  FetchCateOverview,
  FetchCateGrowthTrend,
  FetchAppGrowthTrend,
  FetchAppActiveOverview,
  FetchAppActiveTrend,
  FetchCateActiveOverview,
  FetchCateActiveTrend,
}
