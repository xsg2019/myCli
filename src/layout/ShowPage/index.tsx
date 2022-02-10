import React, { useState, useEffect } from 'react'
import './style.less'
import { useStore } from '@/utils/context'
import BasicLayout from '../components/BasicLayout'
import { useCurrentPage } from '@/hooks'

const ShowPageLayout = props => {
  const showpage = useCurrentPage('/showpage')
  const helpPage = useCurrentPage('/showpage/help')
  const searchPage = useCurrentPage('/showpage/search')
  const noticePage = useCurrentPage('/showpage/notice')
  const collectPage = useCurrentPage('/showpage/collect')

  const store = useStore().detailStore

  props = {
    ...props,
    showpage,
    searchPage,
    helpPage,
    noticePage,
    collectPage,
  }

  return <BasicLayout {...props} store={store} />
}

export default ShowPageLayout
