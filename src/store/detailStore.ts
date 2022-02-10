import { types, flow } from 'mobx-state-tree'
import moment from 'moment'

import api from '@/api'
import appStore from './appStore'
const { FetchAppinfo } = api

const DetailStore = types
  .model('DetailStore', {
    collapsed: types.optional(types.boolean, false),
    isSmallApp: types.optional(types.boolean, false),
    appId: types.optional(types.string, ''),
    appName: types.optional(types.string, ''),
    icon: types.optional(types.string, ''),
    infoLoading: types.optional(types.boolean, true),
    attention: types.optional(types.number, 0),
    contrast: types.optional(types.number, 0),
    appEnName: types.optional(types.string, ''),
    dateText: types.optional(types.string, moment().subtract(1, 'months').format('YYYY-MM')),
  })
  .actions(self => ({
    toggleCollapsed(flag: boolean) {
      self.collapsed = flag
    },
    toggleSmallApp(flag: 0 | 1) {
      self.isSmallApp = flag === 1 ? true : false
    },
    changeDateText(date: string) {
      if (date === 'Invalid date') return
      self.dateText = date
    },
    changeAppAttention(flag: number) {
      self.attention = flag
    },
    changeAppContrast(flag: number) {
      if (appStore.seletedAppList.length === 10 && flag === 1) return
      self.contrast = flag
    },

    getAppInfo: flow(function* getAppInfo(data) {
      try {
        self.infoLoading = true
        const res = yield FetchAppinfo(data)
        Object.assign(self, res.data)
        self.infoLoading = false
      } catch (error) {
        console.error('Failed to fetch projects', error)
        // self.state = "error";
      }
    }),
  }))
const store = DetailStore.create({
  collapsed: false,
  isSmallApp: false,
})

export default store
