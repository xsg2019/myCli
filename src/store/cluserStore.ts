import { types, flow } from 'mobx-state-tree'

const CluserStore = types
  .model('CluserStore', {
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
  }))
const store = CluserStore.create({
  companyId: '',
  companyName: '',
})

export default store
