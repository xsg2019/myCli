import React, { useState, useEffect, useRef } from 'react'
import { Button, Input, Spin, Empty } from 'antd'
import './style.less'
import Highlighter from 'react-highlight-words'
import api from '@/api'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { FixedSizeList as List } from 'react-window'
import { useHistory } from 'react-router-dom'
import { jsonify, setStorage } from '@/utils'
import { useCurrentPage } from '@/hooks'
import QMSpin from '@/components/QMSpin'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import QMEmpty from '@/components/QMEmpty'

const { FetchKW } = api

let timer = null

const Content = () => {
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const { push } = useHistory()
  const { t } = useTranslation()
  const {
    appList,
    seletedAppList,
    addSeletedAppList,
    showModel,
    changeAppList,
    seletedAppListClearAll,
    removeSeletedAppList,
    language,
    searchState,
    toggleSearchState,
    ForceUpdate,
    toggleAppCompareBox,
    isAppCompareBox,
  } = useStore().appStore

  let selectCount = seletedAppList.length

  const Row = ({ index, style }) => {
    const item = appList[index]

    return (
      <div key={item.appId} style={style}>
        <div className="item">
          <span className="name">
            <img width="20" height="20" src={item.icon} />
            <span>
              <Highlighter
                highlightClassName="active"
                searchWords={[keyword]}
                autoEscape={true}
                textToHighlight={i18n.language === 'zh_CN' ? item.appName : item.appEnName}
              />
            </span>
          </span>
          {item.contrast ? (
            <a>
              <span className="added">{t('already_add')}</span>
            </a>
          ) : (
            <a onClick={() => addSeletedAppList({ ...item, isSearch: true })}>
              <em className="bnadd">{t('app_add')}</em>
            </a>
          )}
        </div>
      </div>
    )
  }

  const getData = async value => {
    try {
      const { data } = await FetchKW({ keyword: value, language })
      setLoading(false)
      changeAppList(data.apps)
    } catch (e) {}
  }

  useEffect(() => {
    setKeyword('')
    changeAppList([])
  }, [searchState])

  useEffect(() => {
    if (!isAppCompareBox) {
      setKeyword('')
      changeAppList([])
    }
  }, [isAppCompareBox])

  useEffect(() => {
    if (keyword === '') {
      setLoading(false)
      changeAppList([])
    }
  }, [keyword])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target
    value = value.trim()
    setKeyword(value)
    setLoading(true)
    if (timer) {
      clearInterval(timer)
    }
    if (value !== '') {
      timer = setTimeout(() => {
        getData(value)
      }, 600)
    } else {
      clearInterval(timer)
      setLoading(false)
      changeAppList([])
    }
  }
  const handleSearch = (value: string) => {
    if (value.replace(/\s+/g, '') !== '') {
      setKeyword(value)
      setLoading(true)
      getData(value)
    }
  }
  const input = useRef(null)
  const handleFocus = () => {
    toggleSearchState(true)
    setTimeout(() => {
      input.current.focus()
    }, 200)
  }

  const isComparison = useCurrentPage('/comparison')

  const handleCompare = () => {
    const compareId = jsonify(seletedAppList)
      .map(item => item.compareId)
      .join('|')
    setStorage('truth-flash', 'compareId', compareId)
    toggleAppCompareBox(false)
    isComparison ? ForceUpdate() : push(`/comparison/scale/scale-active`)
  }
  return (
    <div className="cont">
      <div className="search-modal" style={{ display: showModel ? 'block' : 'none' }}>
        <div className="cont">{t('page_ten_contrast')}</div>
      </div>
      <div className="listbox" style={{ left: searchState ? -260 : 15 }}>
        <Input.Search
          placeholder={t('input_app')}
          style={{ width: '100%' }}
          onFocus={handleFocus}
          value={''}
        />
        <div className="list">
          {seletedAppList.length ? (
            <ul>
              {seletedAppList.map(item => {
                return (
                  <li key={item.compareId}>
                    <span className="name">
                      <img width="20" height="20" src={item.iconURL} />
                      <span>
                        {i18n.language === 'zh_CN' ? item.compareName : item.compareEnName}
                      </span>
                    </span>
                    <a onClick={() => removeSeletedAppList(item.compareId)}>
                      <em className="bndelete">
                        <i className="fa fa-trash-o"></i>
                      </em>
                    </a>
                  </li>
                )
              })}
            </ul>
          ) : null}
          {seletedAppList.length < 2 ? <div className="warning">{t('at_least_2_apps')}</div> : null}
        </div>
        <div className="bn">
          <div className="clearall">
            <Button type="link" disabled={selectCount === 0} onClick={seletedAppListClearAll}>
              {t('delete_all')}
            </Button>
          </div>
          <Button disabled={selectCount < 2} type="primary" onClick={handleCompare}>
            {t('page_contrast')}(<span className="num">{selectCount}</span>
            /10)
          </Button>
        </div>
      </div>
      <div className="searchbox" style={{ left: searchState ? 15 : 260 }}>
        <div className="input">
          <a className="bnback" onClick={() => toggleSearchState(false)}>
            <i className="fa fa-mail-reply" />
            {t('page_back')}
          </a>
          <Input.Search
            placeholder={t('input_app')}
            onSearch={value => handleSearch(value)}
            onChange={handleChange}
            value={keyword}
            style={{ width: 160 }}
            ref={input}
          />
        </div>
        <QMSpin spinning={loading}>
          <div className="list">
            {appList.length || keyword === '' || loading ? (
              <List height={240} itemCount={appList.length} itemSize={35} width={220}>
                {Row}
              </List>
            ) : (
              <QMEmpty
                description={
                  <>
                    <span>{t('no_app_matches')}</span> <br />
                    <span>{t('change_keyword')}</span>
                  </>
                }
              />
            )}
          </div>
        </QMSpin>
      </div>
    </div>
  )
}

export default observer(Content)
