import { get } from '../congfig'

/**
 * 获取对比项
 * @param data
 */
const FetchAppCompare = async data => {
  return await get(`/compare/app-compare`, data)
}

/**
 * 添加对比
 * @param data
 */
const FetchAppAdd = async data => {
  return await get(`/compare/app-add`, data)
}

/**
 * 删除对比
 * @param data
 */
const FetchAppDelete = async data => {
  return await get(`/compare/app-delete`, data)
}
/**
 * 清空对比
 * @param data
 */
const FetchAppDeleteAll = async data => {
  return await get(`/compare/app-delete-all`, data)
}

export default {
  FetchAppCompare,
  FetchAppAdd,
  FetchAppDelete,
  FetchAppDeleteAll,
}
