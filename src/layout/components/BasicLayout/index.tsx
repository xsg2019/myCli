import React, { useState, Suspense, FC } from 'react'
import './style.less'
import { Layout, Skeleton, BackTop } from 'antd'
import CollectModal from '@/components/CollectModal'
import { observer } from 'mobx-react'
import QABox from '@/components/QABox'
import AppCompare from '@/components/AppCompare'
import HeaderPage from '../HeaderPage'
import BasicSider from '../BasicSider'
import Banner from '../Banner'
import Footer from '../Footer'
import { renderRoutes } from 'react-router-config'
import PrivateRoute from '@/router/PrivateRoute'
import cx from 'classnames'
import { useStore } from '@/utils/context'
import moment from 'moment'
import { useKeyWord, useShowModal } from '@/hooks'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

const { Content } = Layout

interface IBasicLayout {
  menus: any
  detail?: boolean
  comparison?: boolean
  showpage?: boolean
  helpPage?: boolean
  searchPage?: boolean
  noticePage?: boolean
  groupComparison?: boolean
  company?: boolean
  collectPage?: boolean
  store?: any
  route?: any
}

const ComparePageShow = () => {
  const { t } = useTranslation()
  return (
    <h2 className="qm-comparison--back">
      <i className="icon iconfont icon-vs1" /> {t('app_comparison')}
    </h2>
  )
}

const GroupComparePageShow = () => {
  const { t } = useTranslation()
  return (
    <h2 className="qm-comparison--back">
      <i className="icon iconfont icon-collect" /> {t('app_analysis')}
    </h2>
  )
}

const CollectPageShow = () => {
  const { t } = useTranslation()
  return (
    <h2 className="qm-comparison--back">
      <i className="icon iconfont icon-collect" /> {t('page_myattention')}
    </h2>
  )
}

const HelpPageShow = () => {
  const { t } = useTranslation()
  return (
    <h2 className="qm-help--back">
      <i className="icon iconfont icon-help" /> {t('help')}
    </h2>
  )
}

const SeachPageShow = observer(() => {
  const keyword = useKeyWord()
  const { rangeEndMonthTime } = useStore().appStore
  const { totalResult, totalLoading } = useStore().showPageStore
  const { t } = useTranslation()
  return (
    <h2 className="qm-search--back">
      <i className="iconfont icon-search" /> {t('search_result_1')}
      {totalLoading ? (
        <Skeleton.Button active size="small" style={{ width: 34 }}></Skeleton.Button>
      ) : (
        totalResult
      )}
      {t('search_result_2')} “<b>{keyword}</b>” {t('search_result_3')} <em>|</em>{' '}
      <span className="date">
        {t('data_time')}：
        {moment(rangeEndMonthTime).format(i18n.language === 'zh_CN' ? 'YYYY年MM月' : 'YYYY.MM')}
      </span>
    </h2>
  )
})

const NoticePageShow = () => {
  const { t } = useTranslation()
  return (
    <h2 className="qm-help--back">
      <i className="icon iconfont icon-notice" /> {t('page_notice')}
    </h2>
  )
}
const CompanyPageShow = observer(() => {
  const { companyName } = useStore().comparisonStore
  return <h2 className="qm-help--back">{companyName}</h2>
})

const BasicLayout: FC<IBasicLayout> = (props: IBasicLayout) => {
  const {
    menus,
    detail,
    comparison,
    showpage,
    helpPage,
    searchPage,
    noticePage,
    groupComparison,
    collectPage,
    company,
    store,
    route,
  } = props

  const { meta } = route
  const { collapsed, toggleCollapsed } = store
  const {
    isAppCompareBox,
    getNotice,
    noticeList,
    getNoticeState,
    getAddCompare,
  } = useStore().appStore

  React.useEffect(() => {
    if (noticeList.length === 0) {
      getNotice()
      getNoticeState()
    }
    // 可以全局只请求一次进行优化
    getAddCompare()
  }, [])

  const { record, setVisible, visible, showModal } = useShowModal()

  const hideModal = () => {
    setVisible(false)
  }

  const {
    icon,
    appName,
    infoLoading,
    attention,
    contrast,
    appId,
    changeAppContrast,
    appEnName,
  } = useStore().detailStore

  const { addSeletedAppList, removeSeletedAppList, toggleAppCompareBox } = useStore().appStore

  const recordParams = {
    icon,
    appName,
    attention,
    contrast,
    appId,
    appEnName,
  }

  const { i18n } = useTranslation()

  const handleContrast = flag => {
    toggleAppCompareBox(true)
    changeAppContrast(flag)
    if (!flag) {
      removeSeletedAppList(appId)
    } else {
      addSeletedAppList(recordParams)
    }
  }

  const DetailPageShow = observer(() => (
    <>
      {infoLoading ? (
        <div>
          <Skeleton.Avatar style={{ marginTop: 4 }} active />
        </div>
      ) : (
        <>
          <div className="app-icon">
            <img src={icon} width="30" />
            <h2>{i18n.language === 'zh_CN' ? appName : appEnName}</h2>
          </div>
          {attention ? (
            <a onClick={() => showModal(recordParams)} className="collect collect-active">
              <i className="iconfont icon-collected" />
            </a>
          ) : (
            <a onClick={() => showModal(recordParams)} className="collect">
              <i className="iconfont icon-collect" />
            </a>
          )}
          {contrast ? (
            <a className="contrast contrast-active" onClick={() => handleContrast(0)}>
              <i className="iconfont icon-vs1" />
            </a>
          ) : (
            <a className="contrast" onClick={() => handleContrast(1)}>
              <i className="iconfont icon-vs1" />
            </a>
          )}
        </>
      )}
    </>
  ))

  const bannerProps = {
    collapsed,
    detail,
    noticePage,
    helpPage,
    showpage,
    comparison: comparison || groupComparison || company,
    collectPage,
    store,
    isAppCompareBox,
    toggleAppCompareBox,
  }
  return (
    <PrivateRoute isRequireAuth={meta.requiresAuth}>
      <Layout
        style={{ minHeight: '100vh' }}
        className={i18n.language !== 'zh_CN' ? 'qm-layout--en' : ''}
      >
        <HeaderPage />
        <Banner {...bannerProps}>
          {detail ? <DetailPageShow /> : null}
          {comparison ? <ComparePageShow /> : null}
          {company ? <CompanyPageShow /> : null}
          {searchPage ? <SeachPageShow /> : null}
          {helpPage ? <HelpPageShow /> : null}
          {noticePage ? <NoticePageShow /> : null}
          {groupComparison ? <GroupComparePageShow /> : null}
          {collectPage ? <CollectPageShow /> : null}
        </Banner>
        <Layout className="site-layout">
          {showpage ? null : (
            <BasicSider
              light={!!(detail || comparison || groupComparison || company)}
              menus={menus}
              collapsed={collapsed}
              toggleCollapsed={toggleCollapsed}
              isDetail={detail}
            />
          )}
          {showpage ? (
            <Content className="show-page">
              <Suspense fallback={null}>{renderRoutes(route.routes)}</Suspense>
            </Content>
          ) : (
            <Content className={cx('basic', { iscollapsed: !collapsed }, { isopened: collapsed })}>
              <Suspense fallback={null}>{renderRoutes(route.routes)}</Suspense>
            </Content>
          )}
        </Layout>
        <AppCompare />
        {/* QA弹框 */}
        <QABox />
        {/* 引导 */}
        {showpage ? <Footer noSider /> : <Footer collapsed={collapsed} />}
        <BackTop visibilityHeight={0} />
        {detail ? <CollectModal visible={visible} hideModal={hideModal} record={record} /> : null}
      </Layout>
    </PrivateRoute>
  )
}

export default observer(BasicLayout)
