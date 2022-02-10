import { get, getHeaders } from '../congfig'
import { languageType } from '@/types'
import Axios from 'axios'
import { storage } from '@/utils/storage'

interface INoticeParam {
  language: languageType
  productId: number
}

type PartialINoticeParam = Partial<INoticeParam>

/**
 * 获取公告列表
 * @param data
 */
const FetchNotice = async (data: PartialINoticeParam) => {
  return Axios({
    method: 'get',
    params: data,
    headers: getHeaders,
    url: '/api/truth-admin-dict/client/dict/notice',
  })
}

/**
 * 获取公告阅读状态
 * @param data
 */
const FetchNoticeState = async (data: PartialINoticeParam) => {
  return Axios({
    method: 'get',
    params: data,
    headers: getHeaders,
    url: '/api/truth-admin-dict/client/dict/notice-state',
  })
}

/**
 * 更新公告阅读状态
 * @param data
 */
const FetchUpdateNoticeState = async (data: PartialINoticeParam) => {
  return Axios({
    method: 'get',
    params: data,
    headers: getHeaders,
    url: '/api/truth-admin-dict/client/dict/notice-update-state',
  })
}

export default {
  FetchNotice,
  FetchNoticeState,
  FetchUpdateNoticeState,
}
