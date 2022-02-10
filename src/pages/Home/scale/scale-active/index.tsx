import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { getCnName, useFetchHomeData, useLogMenu } from '@/hooks'
import HomeTab from '../../components/HomeTab'
import LineOptions from './charts/LineOptions'
import PieOptions from './charts/PieOptions'
import api from '@/api'
import { useTranslation } from 'react-i18next'

const { FetchActiveUsers, FetchDailyActiveUsers } = api

const logMenus = {
  PrimaryMenu: 'users_analysis',
  SecondMenu: 'active_users',
  Target: ['active_users', 'avg_daily_act_users'],
}

const kpi = 1

const ScaleActive = props => {
  const [orderName, setOrderName] = useState('')
  const { t } = useTranslation()

  const params = {
    BasicApi: FetchActiveUsers,
    DayilyApi: FetchDailyActiveUsers,
    ChartsOption: [LineOptions, PieOptions],
    title: t('active_users') + '(' + t('unit_million_peoples') + ')',
    kpi,
    logMenus,
  }
  const tab1Attr = {
    title: ['active_users', 'unit_million_peoples'],
    isMultiple: true,
    isConnected: true,
  }
  const tab2Attr = {
    title: ['avg_daily_act_users', 'unit_million_peoples'],
    isMultiple: true,
    isConnected: true,
  }

  const TabData = {
    tab1Attr,
    tab2Attr,
    ...useFetchHomeData({ ...params, orderName, setOrderName }),
  }

  return (
    <>
      <HomeTab {...TabData} />
    </>
  )
}

export default observer(ScaleActive)
