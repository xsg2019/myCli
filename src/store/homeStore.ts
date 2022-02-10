import { types } from 'mobx-state-tree'

const HomeStore = types
  .model('HomeStore', {
    collapsed: types.optional(types.boolean, false),
    isAllCheckd: types.optional(types.boolean, false),
    legend: types.optional(types.array(types.string), []),
    record: types.optional(types.boolean, true),
    // 验证码是否成功
    verificationType: types.optional(types.boolean, false),
    // 验证码强制刷新
    verificationRefresh: types.optional(types.boolean, false),
  })
  .actions(self => ({
    setVerificationType(flag: boolean) {
      console.log(flag)
      self.verificationType = flag
    },
    setVerificationRefresh(flag: boolean) {
      self.verificationRefresh = flag
    },
    toggleCollapsed(flag) {
      self.collapsed = flag
    },
    // 是否需要引导
    setRecord(flag: boolean) {
      self.record = flag
    },

    setIsAllCheckd(flag) {
      self.isAllCheckd = flag
    },
    setLegend(legend) {
      self.legend = legend
    },
  }))
const store = HomeStore.create({
  collapsed: false,
})

export default store
