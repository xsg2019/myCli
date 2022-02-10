import React from 'react'
import './style.less'
import { useStore } from '@/utils/context'
import { AppConMenus } from '@/router/menu'
import BasicLayout from '../components/BasicLayout'
import { useCurrentPage } from '@/hooks'

const ComparisonLayout = props => {
  const comparison = useCurrentPage('/comparison')

  const store = useStore().comparisonStore

  props = { ...props, menus: AppConMenus, comparison }

  return <BasicLayout {...props} store={store} />
}

export default ComparisonLayout
