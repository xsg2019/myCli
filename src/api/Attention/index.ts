import { get } from '../congfig'
import { dsType } from '@/types'

export type groupId = number

export interface IAttention {
  appId: string | number
  groupId?: groupId
}
export interface ICollect {
  dateText: string
  dsType: dsType
  groupId: groupId
  current?: number
  descs?: string
}

export interface IGroup {
  name?: string
  id?: string
}

/**
 * 添加关注
 * @param data
 */
const FetchWatchAdd = async (data: IAttention) => {
  return await get(`/watch/add`, data)
}

/**
 * 我的关注
 * @param data
 */
const FetchWatchCollect = async (data: ICollect) => {
  return await get(`/watch/collect`, data)
}

/**
 * 取消关注
 * @param data
 */
const FetchWatchDelete = async data => {
  return await get(`/watch/delete`, data)
}

/**
 * 获取关注分组列表
 */
const FetchWatchGroup = async () => {
  return await get(`/watch/group`)
}

/**
 * 添加分组
 * @param data
 */
const FetchWatchGroupAdd = async (data: IGroup) => {
  return await get(`/watch/group-add`, data)
}

/**
 * 删除分组
 * @param data
 */
const FetchWatchGroupDelete = async (data: IGroup) => {
  return await get(`/watch/group-delete`, data)
}

/**
 * 获取关注分组列表
 */
const FetchWatchGroupUpdate = async (data: IGroup) => {
  return await get(`/watch/group-update`, data)
}

/**
 * 获取App所属分组
 */
const FetchWatchSelectGroup = async (data: Pick<IAttention, 'appId'>) => {
  return await get(`/watch/select-group`, data)
}

export default {
  FetchWatchAdd,
  FetchWatchCollect,
  FetchWatchDelete,
  FetchWatchGroup,
  FetchWatchGroupAdd,
  FetchWatchGroupDelete,
  FetchWatchGroupUpdate,
  FetchWatchSelectGroup,
}
