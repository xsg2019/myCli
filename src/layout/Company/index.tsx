import React from 'react'
import './style.less'
import { useStore } from '@/utils/context'
import { CompanyMenus } from '@/router/menu'
import { useLocation } from 'react-router-dom'
import BasicLayout from '../components/BasicLayout'
import { useCurrentPage } from '@/hooks'

const CompanyLayout = props => {
  const company = useCurrentPage('/company')

  const { changeCompanyId, changeCompanyName } = useStore().comparisonStore
  const { search } = useLocation()

  React.useEffect(() => {
    const id = new URLSearchParams(location.search).get('companyId')
    const name = new URLSearchParams(location.search).get('name')
    name && changeCompanyName(name)
    id && changeCompanyId(id)
  }, [search])

  const store = useStore().homeStore

  props = { ...props, menus: CompanyMenus, company }

  return <BasicLayout {...props} store={store} />
}

export default CompanyLayout
