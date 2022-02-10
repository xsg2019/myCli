import { types } from 'mobx-state-tree'

const ComparisonStore = types
  .model('ComparisonStore', {
    collapsed: types.optional(types.boolean, false),
    // 公司内对比信息
    companyId: types.optional(types.string, ''),
    companyName: types.optional(types.string, ''),
  })
  .actions(self => ({
    changeCompanyName(name) {
      self.companyName = name
    },
    changeCompanyId(id) {
      self.companyId = id
    },
    toggleCollapsed(flag) {
      self.collapsed = flag
    },
  }))
const store = ComparisonStore.create({
  companyId: '',
  companyName: '',
})

export default store
