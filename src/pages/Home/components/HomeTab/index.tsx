import React from 'react'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { Tabs, Checkbox } from 'antd'
import HomeHOC from '../../HOC'
import TabItem, { ITabItem } from '../TabItem'
import CollectModal from '@/components/CollectModal'
import { commafy, formatToPoiont, getAbsoluteRatio } from '@/utils'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { useCurrentPage, useSetCategroy, useHandleCompany, useShowModal } from '@/hooks'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import TableAppInfo from '@/components/TableAppInfo'
import ShowEmpty from '@/components/ShowEmpty'
import { useTranslation } from 'react-i18next'
import { debounce, round } from 'lodash-es'

const { TabPane } = Tabs

const HomeTab = props => {
  const {
    toggleAppCompareBox,
    addSeletedAppList,
    removeSeletedAppList,
    ForceUpdate,
    apiPage,
  } = useStore().appStore

  const {
    dateType,
    loading,
    leftData,
    midData,
    rightData,
    option,
    title,
    total,
    tab1Attr,
    tab2Attr,
    page,
    onPageChange,
    callback,
    isLine = false,
    orderName,
    setTabkey,
    setOrderName,
    noDay,
    noWeek,
    noTab2 = false,
    isGrowth = false,
    isCompound = false,
    tabkey,
    nodata,
  } = props

  const mom = useCurrentPage('/growth/growth-mom')

  const isScaleActive =
    useCurrentPage('/scale/scale-active') || useCurrentPage('/scale/scale-share')

  const isPer =
    useCurrentPage('/time/time-avg-spent') ||
    useCurrentPage('/time/time-avg-days') ||
    useCurrentPage('/frequency/frequency-avg-sessions')
  const { handleCategory, handleClass } = useSetCategroy()
  const handleCompany = useHandleCompany()
  const { t, i18n } = useTranslation()

  const { visible, record, setVisible, showModal } = useShowModal()
  const hideModal = () => {
    setVisible(false)
  }

  const handleOrderName = title => {
    if (!isPer && orderName == title && orderName !== '') return
    if (isPer && orderName === title) {
      setOrderName('')
    } else {
      setOrderName(title)
    }
    ForceUpdate()
  }

  const onCompareChange = debounce(
    (e: CheckboxChangeEvent, record) => {
      const isChecked = e.target.checked
      const { appId } = record
      if (isChecked) {
        addSeletedAppList({ ...record })
      } else {
        removeSeletedAppList(appId)
      }
      toggleAppCompareBox(true)
    },
    1000,
    { leading: true }
  )
  const MyTitle = ({ title }) => (
    <span style={{ display: 'inline-block', width: '100%', height: '100%', textAlign: 'center' }}>
      {title}
    </span>
  )

  const leftColumns = [
    {
      title: t('page_attention'),
      dataIndex: 'appId',
      align: 'center',
      width: 50,
      render: (text, record) =>
        record.attention ? (
          <i className="iconfont icon-collected" onClick={() => showModal(record)} />
        ) : (
          <i className="iconfont icon-collect" onClick={() => showModal(record)} />
        ),
    },
    {
      title: t('page_contrast'),
      dataIndex: 'appId',
      align: 'center',
      width: 50,
      render: (text, record) => {
        return (
          <Checkbox onChange={e => onCompareChange(e, record)} checked={record.contrast === 1} />
        )
      },
    },
    {
      title: t('index'),
      dataIndex: 'indexId',
      align: 'center',
      width: 50,
      render: (text, _, index) => {
        return (apiPage - 1) * 10 + index + 1
      },
    },
    {
      title: t('app_name_en'),
      dataIndex: i18n.language == 'zh_CN' ? 'appName' : 'appEnName',
      width: i18n.language == 'zh_CN' ? '100%' : 80,
      render: (text, record) => <TableAppInfo record={record} />,
    },
  ]
  const leftColumnsEn = [
    ...leftColumns,
    {
      title: t('app_name_cn'),
      dataIndex: 'appName',
      // width: 600,
      render: (text, record) => {
        return (
          <span className="en_app" title={text}>
            {text}
          </span>
        )
      },
    },
  ]

  const isGroupPage =
    useCurrentPage('groupcomparison') || useCurrentPage('comparison') || useCurrentPage('company')

  const midColumns = [
    {
      title: <MyTitle title={t('catetory')} />,
      dataIndex: ['category', i18n.language == 'zh_CN' ? 'categoryName' : 'categoryEnName'],
      render: (text, record) =>
        isGroupPage ? (
          <span className="table-class--category">{text}</span>
        ) : (
          <a
            className="table-class--category"
            onClick={() => handleCategory(record.category)}
            title={text}
          >
            {text}
          </a>
        ),
      align: i18n.language == 'zh_CN' ? 'center' : 'left',
    },
    {
      title: <MyTitle title={t('sub_category')} />,
      dataIndex: ['clazz', i18n.language == 'zh_CN' ? 'clazzName' : 'clazzEnName'],
      render: (text, record) => {
        if (text === '') return '--'
        return isGroupPage ? (
          <span title={text} className="table-class--sub_category">
            {text}
          </span>
        ) : (
          <a
            className="table-class--sub_category"
            onClick={() => handleClass(record.clazz)}
            title={text}
          >
            {text}
          </a>
        )
      },
      align: i18n.language == 'zh_CN' ? 'center' : 'left',
    },
    {
      title: <MyTitle title={t('company')} />,
      dataIndex: ['company', i18n.language == 'zh_CN' ? 'companyName' : 'companyEnName'],
      render: (text, record) => {
        if (!text) return '--'
        return (
          <Link
            to={`/company/scale/scale-active?companyId=${record.company.companyId}&name=${text}`}
            onClick={() => handleCompany(record.company)}
            className="table-company"
            title={text}
          >
            {text}
          </Link>
        )
      },
      align: 'left',
    },
  ]
  // APP增速模块title转换
  const handleTitle = (title: string): string => {
    switch (title) {
      case 'DAUB':
        return t('spec_mon_num') + '(' + t('unit_million_peoples') + ')'
      case 'DAUA':
        if (mom) {
          return t('prev_mon_num') + '(' + t('unit_million_peoples') + ')'
        }
        return t('last_year_num') + '(' + t('unit_million_peoples') + ')'
      case 'Ratio':
        if (isCompound) {
          return t('mon_comp_growth')
        }
        if (mom) {
          return t('mom')
        }
        return t('yoy')
      case 'avalue':
        return t('mon_dau_end_mon') + '(' + t('unit_million_peoples') + ')'
      default:
        return title
    }
  }

  const TitleItem = ({ title }) => {
    return (
      <a onClick={() => handleOrderName(title)} className={cx({ active: title === orderName })}>
        {handleTitle(title)} <i className="iconfont icon-jt-down" />
      </a>
    )
  }

  const defaultRightColumns = title.map(item => {
    const item1 = {
      title: <TitleItem title={item} />,
      dataIndex: item,
      align: 'right',
      render: isLine
        ? (text, record) => {
            if (text === '' || text === '0') return '--'
            return (
              <span className="percent">
                <em style={{ width: getAbsoluteRatio(text) }}></em>
                <i>{getAbsoluteRatio(text)}</i>
              </span>
            )
          }
        : (text, record) => {
            if (text === '' || text === '0') return '--'
            return formatToPoiont(text, isScaleActive)
          },
    }
    return item1
  })
  const GrowthRightColumns = title
    .slice(0, length - 1)
    .map(item => {
      const item1 = {
        title: <TitleItem title={item} />,
        dataIndex: item,
        align: 'right',
        render: text => {
          if (text === '') return '--'
          return <span>{formatToPoiont(text, true)}</span>
        },
      }
      return item1
    })
    .concat([
      {
        title: <TitleItem title={title[title.length - 1]} />,
        dataIndex: title[title.length - 1],
        align: 'right',
        render: (text: string) => {
          if (text === '') return '--'
          if (!text) {
            return (
              <span className="up">
                0.00%<i className="fa fa-long-arrow-up"></i>
              </span>
            )
          }
          const isNegative = Number(text) < 0
          if (!isNegative) {
            return (
              <span className="up">
                {commafy(round(Number(text), 2))}%<i className="fa fa-long-arrow-up"></i>
              </span>
            )
          } else {
            return (
              <span className="down">
                {commafy(round(Number(text), 2))}%<i className="fa fa-long-arrow-down"></i>
              </span>
            )
          }
        },
      },
    ])

  const rightColumns = isGrowth ? GrowthRightColumns : defaultRightColumns

  // app 增速页面取前一百
  const growhTotal = isGrowth && total > 1000 ? 1000 : total

  const leftTableStyle = i18n.language == 'zh_CN' ? null : { width: 500 }

  const TabData: ITabItem = {
    loading,
    option,
    leftColumns: i18n.language == 'zh_CN' ? leftColumns : leftColumnsEn,
    midColumns,
    rightColumns,
    leftTableStyle,
    leftData,
    midData,
    rightData,
    page,
    total: growhTotal,
    onPageChange,
  }

  const handleCallback = key => {
    if (key === tabkey || loading) return
    callback(key)
  }

  return (
    <HomeHOC noDay={noDay} noWeek={noWeek} callback={setTabkey} setOrderName={setOrderName}>
      <div className="tab-container">
        <Tabs onChange={key => handleCallback(key)} type="card" activeKey={tabkey}>
          <TabPane
            tab={
              <span>
                <i className="iconfont icon-circle" />
                {tab1Attr.title.length > 1
                  ? t(tab1Attr.title[0]) + '(' + t(tab1Attr.title[1]) + ')'
                  : t(tab1Attr.title[0])}
              </span>
            }
            key="1"
          >
            <ShowEmpty hasData={!nodata} loading={false}>
              <TabItem {...TabData} {...tab1Attr} />
            </ShowEmpty>
          </TabPane>
          {dateType !== 'day' && noTab2 === false && !isGrowth ? (
            <TabPane
              tab={
                <span
                  data-key={
                    tab2Attr &&
                    (tab2Attr.title.length > 1
                      ? t(tab2Attr.title[0], { lng: 'zh_CN' }) +
                        '(' +
                        t(tab2Attr.title[1], { lng: 'zh_CN' }) +
                        ')'
                      : t(tab2Attr.title[0], { lng: 'zh_CN' }))
                  }
                >
                  <i className="iconfont icon-circle" />
                  {tab2Attr &&
                    (tab2Attr.title.length > 1
                      ? t(tab2Attr.title[0]) + '(' + t(tab2Attr.title[1]) + ')'
                      : t(tab2Attr.title[0]))}
                </span>
              }
              key="2"
            >
              <ShowEmpty hasData={!nodata} loading={false}>
                <TabItem {...TabData} {...tab2Attr} />
              </ShowEmpty>
            </TabPane>
          ) : null}
        </Tabs>
      </div>
      <CollectModal visible={visible} hideModal={hideModal} record={record} />
    </HomeHOC>
  )
}

export default observer(HomeTab)
