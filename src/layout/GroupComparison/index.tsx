import React, { useEffect } from 'react'
import './style.less'
import { useStore } from '@/utils/context'
import { GAppConMenus } from '@/router/menu'
import { useCurrentPage } from '@/hooks'
import BasicLayout from '../components/BasicLayout'

const ComparisonLayout = props => {
  const groupComparison = useCurrentPage('/groupcomparison') || useCurrentPage('/company')

  const store = useStore().comparisonStore

  props = { ...props, menus: GAppConMenus, groupComparison }

  return <BasicLayout {...props} store={store} />
}

export default ComparisonLayout
