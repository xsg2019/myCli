import { get } from '../congfig'

/**
 * 获取分类列表
 * @param data
 */
const FetchCategory = async () => {
  return await get(`/category`)
}

/**
 * 模糊搜索分类
 * @param data
 */
const FetchSearchDategory = async data => {
  return await get(`/search-category`, data)
}

export default {
  FetchCategory,
  FetchSearchDategory,
}
