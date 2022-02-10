import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import store from '@/store'
import { StoreContext, useStore } from '@/utils/context'
import App from './app'
import { useLocation } from 'react-router-dom'
import i18n from './i18n'
import { I18nextProvider } from 'react-i18next'
import QMSpin from './components/QMSpin'
import { observer } from 'mobx-react'
import { storage } from './utils/storage'
import { FetchUserRight } from './components/UserOptions'
import VerificationCode from './components/VerificationCode'
import { setStorage } from './utils'

const DownLoadingModal = observer(() => {
  const { downloading } = useStore().appStore
  return (
    <div className="qm-global--loading" style={{ display: downloading ? 'block' : 'none' }}>
      <QMSpin size="large" />
    </div>
  )
})
function ScrollToTop() {
  const { pathname } = useLocation()

  const {
    toggleAppCompareBox,
    changeLeftData,
    setDownloadRadio,
    setDownloadTabkey,
    toggleTrial,
  } = useStore().appStore

  React.useEffect(() => {
    window.scrollTo(0, 0)
    toggleAppCompareBox(false)
    changeLeftData([])
    setDownloadRadio(1)
    setDownloadTabkey('1')
  }, [pathname])

  const handleUserDownRight = async () => {
    const { userId } = storage.get('truth-current-user')
    const { data } = await FetchUserRight({
      userId,
      productId: 11,
    })
    toggleTrial(data.data.isTrial !== 0)
  }

  React.useLayoutEffect(() => {
    if (storage.get('truth-flash')?.frequency === null) {
      setStorage('truth-flash', 'frequency', false)
    }

    handleUserDownRight()

    if (storage.get('language') === 'zh_CN') {
      document.title = 'QuestMobile TRUTH-极速版'
    } else {
      document.title = 'QuestMobile TRUTH-Flash'
    }
  }, [])
  return null
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidCatch(error) {
    const pattern = /Loading chunk (\d)+ failed/g
    const isChunkLoadFailed = error.message.match(pattern)
    if (isChunkLoadFailed) {
      location.reload()
    }
  }
  render() {
    return this.props.children
  }
}
render(
  <StoreContext.Provider value={store}>
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary>
        <BrowserRouter basename="/flash">
          <ScrollToTop />
          <DownLoadingModal />
          <VerificationCode />
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </I18nextProvider>
  </StoreContext.Provider>,
  document.getElementById('root') as HTMLElement
)
