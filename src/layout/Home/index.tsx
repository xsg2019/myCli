import React, { useState, useEffect } from 'react'
import './style.less'
import { useStore } from '@/utils/context'
import { HomeMenus } from '@/router/menu'
import BasicLayout from '../components/BasicLayout'

const HomeLayout = props => {
  const store = useStore().homeStore

  props = { ...props, menus: HomeMenus }

  return <BasicLayout {...props} store={store} />
}

export default HomeLayout
