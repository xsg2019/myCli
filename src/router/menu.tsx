import React from 'react'
import SubMenuIcon from '@/components/SubMenuIcon'
import { IMenus } from '@/types'

export const HomeMenus: IMenus[] = [
  {
    title: 'users_analysis',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-user " />
      </span>
    ),
    key: '/home/scale',
    subs: [
      {
        key: '/home/scale/scale-active',
        title: 'active_users',
        Icon: SubMenuIcon,
      },
    ],
  },
]

export const DetailMenus: IMenus[] = [
  {
    title: 'app_total',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-gailan2" />
      </span>
    ),
    key: `/details/app-overview`,
  },
  {
    title: 'users_analysis',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-user " />
      </span>
    ),
    key: '/details/app-user',
  },
  {
    title: 'use_frequency',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-pingci" />
      </span>
    ),
    key: '/details/app-session',
  },
  {
    title: 'user_time_spent',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-shijian " />
      </span>
    ),
    key: '/details/app-duration',
  },
  {
    title: 'growth_analysis',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-chart " />
      </span>
    ),
    key: '/details/app-yeargrowth',
  },
  {
    title: 'cluster_analysis',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-julei" />
      </span>
    ),
    isNew: true,
    key: '/details/app-cluster',
    subs: [
      {
        key: '/details/app-cluster/quality',
        title: 'user_quality_analysis',
        Icon: SubMenuIcon,
      },
      {
        key: '/details/app-cluster/mode',
        title: 'growth_pattern_analysis',
        Icon: SubMenuIcon,
      },
    ],
  },
]

export const CompanyMenus: IMenus[] = HomeMenus.map(({ title, Icon, key, subs, isNew }) => {
  return {
    title,
    Icon,
    key: key.replace('home', 'company'),
    isNew,
    subs: subs.map(({ title, Icon, key }) => {
      return {
        title,
        Icon,
        key: key.replace('home', 'company'),
      }
    }),
  }
})

export const AppConMenus: IMenus[] = HomeMenus.map(({ title, Icon, key, subs, isNew }) => {
  return {
    title,
    Icon,
    key: key.replace('home', 'comparison'),
    isNew,
    subs: subs.map(({ title, Icon, key }) => {
      return {
        title,
        Icon,
        key: key.replace('home', 'comparison'),
      }
    }),
  }
})

export const GAppConMenus: IMenus[] = HomeMenus.map(({ title, Icon, key, subs, isNew }) => {
  return {
    title,
    Icon,
    isNew,
    key: key.replace('home', 'groupcomparison'),
    subs: subs.map(({ title, Icon, key }) => {
      return {
        title,
        Icon,
        key: key.replace('home', 'groupcomparison'),
      }
    }),
  }
})

export const DetailBlurMenus: IMenus[] = [
  {
    title: 'app_total',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-gailan" />
      </span>
    ),
    key: '/details/app-overview',
  },
  {
    title: 'users_analysis',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-user " />
      </span>
    ),
    key: '/details/app-user',
  },
  {
    title: 'growth_analysis',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-chart " />
      </span>
    ),
    key: '/details/app-yeargrowth',
  },
  {
    title: 'cluster_analysis',
    Icon: () => (
      <span className="anticon ">
        <i className="icon iconfont icon-julei" />
      </span>
    ),
    key: '/details/app-cluster',
    isNew: true,
    subs: [
      {
        key: '/details/app-cluster/mode',
        title: 'growth_pattern_analysis',
        Icon: SubMenuIcon,
      },
    ],
  },
]
