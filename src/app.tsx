import React from 'react'
import RouterView from '@/router/index'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'
import '@/styles/global.less'
import '@/styles/font-awesome.css'
import { useTranslation } from 'react-i18next'

const customizeRenderEmpty = () => <div style={{ textAlign: 'center' }}></div>

const App = () => {
  const { i18n } = useTranslation()

  return (
    <ConfigProvider
      locale={i18n.language === 'zh_CN' ? zhCN : enUS}
      renderEmpty={customizeRenderEmpty}
    >
      <RouterView />
    </ConfigProvider>
  )
}

export default App
