import React, { useState, FC } from 'react'
import './style.less'
import { Input } from 'antd'
import { useHistory } from 'react-router-dom'
import { useOnClickOutside } from '@/hooks'
import SearchBox from './component/SearchBox'
import api from '@/api'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { SendLog } from '@/api/Home/scale'
import { logType } from '@/constants'
import { toJS } from 'mobx'

const { FetchKW } = api

let timer = null

const NavSearch: FC = () => {
  const history = useHistory()

  const [keyword, setKeyword] = useState('')
  const [appList, setAppList] = useState([])
  const [companyList, setCompanyList] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const box = React.createRef<any>()

  const { t } = useTranslation()

  useOnClickOutside(box, () => setIsVisible(false))

  const { language, visitedAppList, visitedCompanyList } = useStore().appStore

  const getData = async value => {
    setLoading(true)
    try {
      if (value === '') {
        setAppList(visitedAppList)
        setCompanyList(visitedCompanyList)
        setLoading(false)
        return
      }
      SendLog({ LogType: logType.SEARCH_APP, LogContent: { keyword: value } })
      const { data } = await FetchKW({ language, keyword: value })
      setAppList(data.apps)
      setCompanyList(data.companies)
      setLoading(false)
    } catch (e) {
      // console.log(e);
    }
  }

  const searchResult = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setKeyword(value)

    if (value) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
      clearInterval(timer)
      return
    }
    if (value.trim() === '') return
    if (timer) {
      clearInterval(timer)
    }
    timer = setTimeout(() => {
      getData(value)
    }, 600)
  }

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (visitedAppList.length || visitedCompanyList.length) {
      setIsVisible(true)
      if (value === '') {
        setAppList(toJS(visitedAppList))
        setCompanyList(toJS(visitedCompanyList))
      }
    }
  }

  const handleSearch = value => {
    if (value === '') return
    history.push(`/showpage/search?keyword=${encodeURI(value)}`)
    setKeyword('')
    setIsVisible(false)
  }

  return (
    <div ref={box} style={{ width: 0 }}>
      <Input.Search
        style={{
          width: 300,
          transform: 'translate(50px,20px)',
        }}
        size="middle"
        placeholder={t('input_app_or_company')}
        enterButton
        value={keyword.trim()}
        onSearch={handleSearch}
        onChange={searchResult}
        onFocus={e => handleFocus(e)}
      />
      <SearchBox
        loading={loading}
        keyword={keyword}
        setKeyword={setKeyword}
        companyList={companyList}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        appList={appList}
      />
    </div>
  )
}

export default observer(NavSearch)
