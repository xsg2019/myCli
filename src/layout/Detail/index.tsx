import React, { useEffect } from 'react'
import './style.less'
import { useStore } from '@/utils/context'
import { DetailMenus, DetailBlurMenus } from '@/router/menu'
import BasicLayout from '../components/BasicLayout'
import { observer } from 'mobx-react'
import { sesstion } from '@/utils/storage'
import { useLocation } from 'react-router-dom'
import { useCurrentPage } from '@/hooks'

const DetailLayout = props => {
  const detail = useCurrentPage('/details')
  const { pathname } = useLocation()

  const store = useStore().detailStore

  const [appId, setappId] = React.useState(
    pathname.slice(pathname.lastIndexOf('/') + 1, pathname.length)
  )

  useEffect(() => {
    const isSmallApp = new URLSearchParams(location.search).get('flag') === '1' ? 1 : 0
    sesstion.set('flag', isSmallApp)
    store.toggleSmallApp(isSmallApp)
    store.getAppInfo({ appId })
    sesstion.set('appid', appId)
  }, [appId])

  useEffect(() => {
    const appId = pathname.slice(pathname.lastIndexOf('/') + 1, pathname.length)
    setappId(appId)
  }, [pathname])

  props = {
    ...props,
    menus: store.isSmallApp ? DetailBlurMenus : DetailMenus,
    detail,
  }

  return <BasicLayout {...props} store={store} />
}

export default observer(DetailLayout)
