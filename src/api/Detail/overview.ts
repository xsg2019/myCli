import { get } from '../congfig'
import { IAppOverview } from '@/types'

/**
 * App同类竞品
 * @param data
 */
const FetchAppCompetitor = async (data: IAppOverview) => {
  return await get(`/overview/app-competitor`, data)
}

export default {
  FetchAppCompetitor,
}
