import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const homeRoute = {
  path: '/home',
  component: lazy(() => import('../layout/Home')),
  meta: { requiresAuth: true },
  routes: [
    {
      path: '/home/scale/scale-active',
      component: lazy(() => import('../pages/Home/scale/scale-active')),
    },
  ],
}

const detaillRoute = {
  path: '/details',
  component: lazy(() => import('../layout/Detail')),
  meta: {
    requiresAuth: true,
  },
  routes: [],
}

const showpageRoute = {
  path: '/showpage',
  component: lazy(() => import('../layout/ShowPage')),
  meta: {
    requiresAuth: true,
  },
  routes: [],
}

const comparisonRoute = {
  path: '/comparison',
  component: lazy(() => import('../layout/Comparison')),
  meta: {
    requiresAuth: true,
  },
  routes: [],
}

const gcomparisonRoute = {
  path: '/groupcomparison',
  component: lazy(() => import('../layout/GroupComparison')),
  meta: {
    requiresAuth: true,
  },
  routes: [],
}

const companyRoute = {
  path: '/company',
  component: lazy(() => import('../layout/Company')),
  meta: {
    requiresAuth: true,
  },
  routes: [],
}

export const Routes = [
  homeRoute,
  detaillRoute,
  comparisonRoute,
  showpageRoute,
  gcomparisonRoute,
  companyRoute,
  {
    path: '/',
    exact: true,
    meta: {
      requiresAuth: true,
    },
    render: () => <Redirect to={'/home/scale/scale-active'} />,
  },
  {
    path: '/404',
    meta: {
      requiresAuth: true,
    },
    component: lazy(() => import('../pages/404')),
  },
  {
    path: '*',
    exact: true,
    render: () => <Redirect to={'/home/scale/scale-active'} />,
  },
]
