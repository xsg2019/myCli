import React, { Suspense } from 'react'
import { Routes } from './router.config'
import { renderRoutes } from 'react-router-config'
import { observer } from 'mobx-react'

export const RouterView = () => {
  return <Suspense fallback={''}>{renderRoutes(Routes)}</Suspense>
}

export default observer(RouterView)
