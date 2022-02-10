import { get } from '../congfig'
import { IKW } from '@/types'

/**
 * 关键词搜索
 * @param data
 */
const FetchKW = async (data: IKW) => {
  return await get(`/kw`, data)
}

/**
 * 模糊搜索详情页-App列表分页
 * @param data
 */
const FetchKWAppList = async (data: IKW) => {
  return await get(`/kw-app-list`, data)
}

/**
 * 模糊搜索详情页-公司列表分页
 * @param data
 */
const FetchKWCompList = async (data: IKW) => {
  return await get(`/kw-comp-list`, data)
}

/**
 * 模糊搜索详情页
 * @param data
 */
const FetchKWTotal = async (data: IKW) => {
  return await get(`/kw-total`, data)
}

export default {
  FetchKW,
  FetchKWAppList,
  FetchKWCompList,
  FetchKWTotal,
}
