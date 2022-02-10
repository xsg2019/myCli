import axios from 'axios'
import { message } from 'antd'
import { storage } from '@/utils/storage'
import { handleExit, setStorage } from '@/utils'
import store from '@/store/homeStore'

function frequecyLimit() {
  setStorage('truth-flash', 'frequency', true)
  store.setVerificationType(true)
}

export const baseURL = '/api/truth-flash'

export const getHeaders = {
  'Truth-Auth': `bearer ${storage.get('truth-token')}`,
  Authorization: 'Basic dHJ1dGg6dHJ1dGhfc2VjcmV0',
  'Cache-Control': 'no-cache',
}

export const PostHeaders = {
  'Truth-Auth': `bearer ${storage.get('truth-token')}`,
  Authorization: 'Basic dHJ1dGg6dHJ1dGhfc2VjcmV0',
  'Cache-Control': 'no-cache',
  'content-type': 'application/json',
}

const instance = axios.create({
  baseURL,
})

instance.interceptors.response.use(
  response => {
    // 响应信息处理

    if (response.status === 200) {
      return response.data
    } else {
      return response.data.statusText
    }
  },
  error => {
    let code = error.response && error.response.status
    switch (code) {
      case 401:
        if (process.env.NODE_ENV !== 'development') {
          handleExit()
        }
        break
      case 403:
        message.error('禁止访问')
        break
      case 404:
        message.error('没有找到相关页面')
        break
      case 429:
        frequecyLimit()
        break
      case 500:
        message.error('服务端错误,请重新尝试')
        break
      case 501:
        message.error('服务端错误,请重新尝试')
        break
      case 502:
        message.error('服务端错误,请重新尝试')
        break
      case 504:
        message.error('服务端连接超时')
        break
      default:
        break
    }

    return Promise.reject(error.response)
  }
)

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 *
 * @param url string
 * @param data
 */
export const post = async (url: string, data: any) => {
  return await instance({
    method: 'post',
    url,
    data: JSON.stringify(data),
    headers: PostHeaders,
  })
}
/**
 *
 * @param url string
 * @param params any
 */

export const get = async (url: string, params?: any) => {
  return await instance({
    method: 'get',
    params: params,
    headers: getHeaders,
    url,
  })
}
