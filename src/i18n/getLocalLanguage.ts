import { storage } from '@/utils/storage'

export const getLanguage = () => {
  let language = storage.get('language') || 'zh_CN'
  // || navigator.userLanguage; // 常规浏览器语言和IE浏览器
  const lang = navigator.language
  language = language || lang
  language = language.replace(/-/, '_').toLowerCase()
  if (language === 'zh_cn' || language === 'zh') {
    language = 'zh_CN'
  } else {
    language = 'en_US'
  }
  return language
}
