import { types, flow } from 'mobx-state-tree'
import api from '@/api'
import homeStore from './homeStore'
import { isFrequency } from '@/utils'

const { FetchKWTotal } = api

const showPageStore = types
  .model('showPageStore', {
    collapsed: types.optional(types.boolean, false),
    totalResult: types.optional(types.number, 0),
    appTotal: types.optional(types.number, 0),
    companyTotal: types.optional(types.number, 0),
    totalLoading: types.optional(types.boolean, true),
    attentionList: types.optional(types.array(types.null), []),
    record: types.optional(types.boolean, true),
  })
  .actions(self => ({
    toggleCollapsed(flag: boolean) {
      self.collapsed = flag
    },
    // 是否需要引导
    setRecord(flag: boolean) {
      self.record = flag
    },
    setAttentionList(list) {
      self.attentionList = list
    },
    getResultTotal: flow(function* getNotice(params) {
      try {
        if (isFrequency()) {
          homeStore.setVerificationType(true)
          return
        }
        self.totalLoading = true
        const res = yield FetchKWTotal(params)
        const { total, companyTotal, appTotal } = res.data
        self.appTotal = appTotal
        self.companyTotal = companyTotal
        self.totalResult = total
        self.totalLoading = false
      } catch (error) {
        console.error('Failed to fetch projects', error)
        // self.state = "error";
      }
    }),
  }))
const store = showPageStore.create({
  collapsed: false,
})

export default store
