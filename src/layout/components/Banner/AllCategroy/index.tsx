import React, { useRef, useState, useMemo, memo } from 'react'
import { CaretDownOutlined } from '@ant-design/icons'
import { Popover, Button, Divider, Input, Skeleton } from 'antd'
import './style.less'
import api from '@/api'
import { useRequest, useOnClickOutside } from '@/hooks'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import CategoryState from './components/CategoryState'
import SearchState from './components/SearchState'
import { useCurrentPage } from '@/hooks'
import QMEmpty from '@/components/QMEmpty'
import { useTranslation } from 'react-i18next'
import { SendLog } from '@/api/Home/scale'
import { logType } from '@/constants'

const GaiLan = memo(() => (
  <i style={{ verticalAlign: 'middle' }} className="iconfont icon-gailan" />
))

const { FetchCategory, FetchSearchDategory } = api
let timer
const CategoryContent = ({ allCategroy, visible, setVisible }) => {
  const [keyword, setkeyword] = useState('')
  // 0：全部分类 1：搜索状态 2：空状态
  const [searchState, setSearchState] = useState(0)
  const [searchCategroy, setSearchategroy] = useState([])
  const [loading, setLoading] = useState(false)
  const isCluster = useCurrentPage('/cluster')

  const { t } = useTranslation()

  const handleChange = async e => {
    const value = e.target.value.trim()
    setkeyword(value)
    if (timer) clearTimeout(timer)
    if (value === '') {
      setSearchState(0)
      setLoading(false)
      return
    } else {
      setSearchState(1)
      setLoading(true)
    }

    timer = setTimeout(async () => {
      let params
      if (isCluster) {
        params = { keyword: value, level: 1 }
      } else {
        params = { keyword: value, level: 0 }
      }
      const { data } = await FetchSearchDategory(params)
      if (!data.length) setSearchState(2)
      setSearchategroy(data)
      setLoading(false)
      SendLog({ LogType: logType.SEARCH_CATE, LogContent: { keyword: value } })
    }, 500)
  }

  React.useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setkeyword('')
        setSearchState(0)
      }, 500)
    }
  }, [visible, loading])

  return (
    <div className="category-listCont">
      <div className="content">
        <Input.Search
          placeholder={t('category')}
          onChange={handleChange}
          value={keyword}
          style={{ width: '100%' }}
        />

        <div style={{ display: searchState === 0 && !loading ? 'block' : 'none' }}>
          <CategoryState list={allCategroy} setVisible={setVisible} />
        </div>
        <div style={{ display: searchState === 1 && !loading ? 'block' : 'none' }}>
          <SearchState keyword={keyword} list={searchCategroy} setVisible={setVisible} />
        </div>
        <div style={{ display: searchState === 2 && !loading ? 'block' : 'none' }}>
          <QMEmpty
            description={
              <>
                <span>{t('no_category_search')}</span>
                <br />
                <span>{t('change_keyword')}</span>
              </>
            }
          />
        </div>
        <div style={{ display: loading ? 'block' : 'none' }}>
          <Skeleton />
        </div>
      </div>
    </div>
  )
}

const AllCategroy = observer(() => {
  const appList = useRef(null)
  const [allCategroy, setAllCategroy] = useState([])
  const [visible, setVisible] = useState(false)

  const cluster = useCurrentPage('/home/cluster')

  const { categoryName, clusterCategoryName, language } = useStore().appStore

  useRequest(() => FetchCategory(), {
    handler: ({ data }) => {
      setAllCategroy(data)
    },
    onerror: e => {
      console.log(e)
    },
    Deps: [],
  })

  useOnClickOutside(appList, () => {
    setVisible(false)
  })

  const handleVisible = () => {
    setVisible(!visible)
  }

  return (
    <div className="appList" ref={appList}>
      <Popover
        placement="bottomRight"
        content={
          <div>
            <CategoryContent setVisible={setVisible} visible={visible} allCategroy={allCategroy} />
          </div>
        }
        trigger="click"
        getPopupContainer={() => appList.current}
        visible={visible}
      >
        <Button icon={<GaiLan />} onClick={handleVisible}>
          <span style={{ paddingLeft: '5%', verticalAlign: 'middle' }}>
            {cluster ? clusterCategoryName : categoryName}
          </span>

          <Divider
            type="vertical"
            style={{
              height: '100%',
            }}
          />
          <CaretDownOutlined style={{ verticalAlign: 'middle' }} />
        </Button>
      </Popover>
    </div>
  )
})

export default AllCategroy
