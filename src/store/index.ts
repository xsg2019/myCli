/**
 * mobx 状态管理
 * * */
import makeInspectable from 'mobx-devtools-mst'
import homeStore from './homeStore'
import detailStore from './detailStore'
import comparisonStore from './comparisonStore'
import appStore from './appStore'
import showPageStore from './showPageStore'
import cluserStore from './cluserStore'
import { unprotect } from 'mobx-state-tree'

const stores = {
  homeStore,
  detailStore,
  comparisonStore,
  appStore,
  showPageStore,
  cluserStore,
}

for (const key in stores) {
  makeInspectable(stores[key])
}

export default stores
