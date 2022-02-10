import React, { useState } from 'react'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { Tabs, Skeleton } from 'antd'
import './style.less'
import { useRequest, useKeyWord, useNoData, usePrevious, useLogHook } from '@/hooks'
import api from '@/api'
import AppList from './AppList'
import CompanyList from './CompanyList'
import i18n from '@/i18n'
import { logType } from '@/constants'

const { TabPane } = Tabs

const { FetchKWAppList, FetchKWCompList } = api

const TempleteTab = observer(({ api, ListNode, isCompany = false }) => {
  const [rightData, setRightData] = useState([])
  const [descs, setDescs] = useState('mainList')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [leftData1, setLeftData1] = useState([])
  const { data, setData } = useNoData()

  const keyword = useKeyWord()

  useLogHook({
    PrimaryMenu: '',
    SecondMenu: '',
    LogType: logType.SEARCH_APP,
    LogContent: { keyword },
  })

  const { language, leftData, changeLeftData } = useStore().appStore
  const { verificationRefresh } = useStore().homeStore

  const fetchData = {
    keyword,
    descs: isCompany ? '' : descs,
    language,
    current: page,
  }

  const onPageChange = page => {
    setPage(page)
  }

  const prevKeyword = usePrevious(keyword)
  const prevLanguage = usePrevious(language)

  const { loading } = useRequest(
    () =>
      api({
        ...fetchData,
        current: prevKeyword !== keyword || prevLanguage !== language ? 1 : page,
      }),
    {
      handler({ data }) {
        if (prevKeyword !== keyword || prevLanguage !== language) {
          setPage(1)
        }
        const { records, total } = data
        setData(records.length > 0)
        isCompany ? setLeftData1(records) : changeLeftData(records)
        setRightData(records)
        setTotal(total)
      },
      onerror(e) {
        console.log(e)
        setData(false)
      },
      Deps: [keyword, language, descs, page, verificationRefresh],
    }
  )

  const Listprops = {
    loading,
    leftData: isCompany ? leftData1 : leftData,
    rightData,
    total,
    page,
    onPageChange,
    descs,
    setDescs,
    data,
  }

  return <ListNode {...Listprops} />
})

const SearchPage = () => {
  const { appTotal, companyTotal, totalLoading, getResultTotal } = useStore().showPageStore
  const { language } = useStore().appStore

  const { verificationRefresh } = useStore().homeStore

  const keyword = useKeyWord()

  const fetchData = {
    keyword,
    language,
  }

  React.useEffect(() => {
    getResultTotal(fetchData)
  }, [keyword, language, verificationRefresh])

  const tab1 = {
    api: FetchKWAppList,
    ListNode: AppList,
  }

  const tab2 = {
    api: FetchKWCompList,
    ListNode: CompanyList,
    isCompany: true,
  }
  return (
    <div className="tab-container">
      <Tabs type="card">
        <TabPane
          tab={
            <span>
              <i className="iconfont icon-circle" />
              App
              {totalLoading ? (
                <Skeleton.Avatar active size="small" />
              ) : (
                <span className="num">({appTotal})</span>
              )}
            </span>
          }
          key="1"
        >
          <div className="searh-table">
            <TempleteTab {...tab1} />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <i className="iconfont icon-circle" />
              {i18n.t('company')}
              {totalLoading ? (
                <Skeleton.Avatar active size="small" />
              ) : (
                <span className="num">({companyTotal})</span>
              )}
            </span>
          }
          key="2"
        >
          <div className="searh-table">
            <TempleteTab {...tab2} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default observer(SearchPage)
