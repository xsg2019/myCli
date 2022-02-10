import React, { useState } from 'react'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { Checkbox, Spin } from 'antd'
import TableList from '@/components/TableList'
import PopoverCard from '@/components/PopoverCard'
import { Link } from 'react-router-dom'
import { ColumnsType } from 'antd/lib/table'
import cx from 'classnames'
import CollectModal from '@/components/CollectModal'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { useVisitCompany, useShowModal } from '@/hooks'
import QMEmpty from '@/components/QMEmpty'
import QMSpin from '@/components/QMSpin'
import i18n from '@/i18n'
import { useTranslation } from 'react-i18next'
import { toJS } from 'mobx'

const SearchPage = props => {
  const { loading, leftData, rightData, total, page, onPageChange, descs, setDescs, data } = props
  const {
    toggleAppCompareBox,
    addSeletedAppList,
    removeSeletedAppList,
    changeVisitedAppList,
  } = useStore().appStore

  const { visible, record, setVisible, showModal } = useShowModal()

  const hideModal = () => {
    setVisible(false)
  }

  const { t } = useTranslation()

  const handleAddCompany = useVisitCompany()

  const onCompareChange = (e: CheckboxChangeEvent, record) => {
    const isChecked = e.target.checked
    const { appId } = record
    if (isChecked) {
      addSeletedAppList(record)
    } else {
      removeSeletedAppList(appId)
    }
    toggleAppCompareBox(true)
  }

  const leftColumns: ColumnsType = [
    {
      title: t('page_attention'),
      dataIndex: 'appId',
      key: 'appId',
      align: 'center',
      width: 50,
      render: (text, record: any) =>
        record.attention ? (
          <i className="iconfont icon-collected" onClick={() => showModal(record)} />
        ) : (
          <i className="iconfont icon-collect" onClick={() => showModal(record)} />
        ),
    },
    {
      title: t('page_contrast'),
      dataIndex: 'appId',
      key: 'appId',
      align: 'center',
      width: 50,
      render: (text, record: any) => (
        <Checkbox onChange={e => onCompareChange(e, record)} checked={record.contrast === 1} />
      ),
    },
    {
      title: t('index'),
      dataIndex: 'totalRn',
      key: 'totalRn',
      align: 'center',
      width: 50,
      render: (text, _, index) => {
        return (page - 1) * 10 + index + 1
      },
    },
    {
      title: t('app_name_en'),
      key: 'appName',
      width: i18n.language == 'zh_CN' ? '100%' : 80,
      dataIndex: i18n.language == 'zh_CN' ? 'appName' : 'appEnName',
      render: (text, record: any) => (
        <div className="appName">
          <PopoverCard record={record} placement="right">
            <Link
              to={`/details/app-overview/${record.appId}?flag=${record.valueFlag}`}
              onClick={() => changeVisitedAppList(record)}
            >
              <span className="ico">
                <img
                  src={record.icon}
                  width="24"
                  alt={i18n.language == 'zh_CN' ? record.appName : record.appEnName}
                />
              </span>
              <span className="name">
                {' '}
                {i18n.language == 'zh_CN' ? record.appName : record.appEnName}
              </span>
            </Link>
          </PopoverCard>
        </div>
      ),
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

  const handleTitle = title => {
    switch (title) {
      case t('main_list'):
        return 'mainList'
      case t('ranking_by_category'):
        return 'categoryRank'
      case t('ranking_by_sub_category'):
        return 'clazzRank'
      default:
        break
    }
  }

  const TitleItem = ({ title }) => (
    <a
      onClick={() => setDescs(handleTitle(title))}
      className={cx({ active: handleTitle(title) === descs })}
    >
      {title} <i className="iconfont icon-jt-down" />
    </a>
  )

  const MyTitle = ({ title }) => (
    <span style={{ display: 'inline-block', width: '100%', height: '100%', textAlign: 'center' }}>
      {title}
    </span>
  )

  const rightColumns: ColumnsType = [
    {
      title: t('catetory'),
      dataIndex: ['category', i18n.language == 'zh_CN' ? 'categoryName' : 'categoryEnName'],
      align: 'center',
      render: text => {
        if (text === '' || !text) return '--'
        return <span title={text}>{text} </span>
      },
    },
    {
      title: i18n.language == 'zh_CN' ? t('sub_category') : <MyTitle title={t('sub_category')} />,
      dataIndex: ['clazz', i18n.language == 'zh_CN' ? 'clazzName' : 'clazzEnName'],
      render: text => {
        if (text === '' || !text) return '--'
        return <span title={text}>{text} </span>
      },
      align: i18n.language == 'zh_CN' ? 'center' : 'left',
    },
    {
      title: <MyTitle title={t('company')} />,
      dataIndex: ['company', i18n.language == 'zh_CN' ? 'companyName' : 'companyEnName'],
      align: 'left',
      width: 200,
      render: (text, record: any) => {
        if (text === '' || !text) return '--'
        return (
          <Link
            to={`/company/scale/scale-active?companyId=${record.company.companyId}&name=${text}`}
            onClick={() => handleAddCompany(record.company)}
            className="table-company"
            title={text}
          >
            {text}
          </Link>
        )
      },
    },

    {
      title: <TitleItem title={t('main_list')} />,
      dataIndex: 'mainList',
      align: 'right',
      render: text => {
        if (text === '' || !text) return '--'
        return text
      },
    },
    {
      title: <TitleItem title={t('ranking_by_category')} />,
      dataIndex: 'categoryRank',
      align: 'right',
      render: text => {
        if (text === '' || !text) return '--'
        return text
      },
    },
    {
      title: <TitleItem title={t('ranking_by_sub_category')} />,
      dataIndex: 'clazzRank',
      align: 'right',
      render: text => {
        if (text === '' || !text) return '--'
        return text
      },
    },
  ]

  const leftTableStyle = i18n.language == 'zh_CN' ? null : { width: 500 }

  return (
    <>
      <QMSpin spinning={loading}>
        <div style={{ display: data ? 'block' : 'none' }}>
          <TableList
            leftColumns={i18n.language == 'zh_CN' ? leftColumns : leftColumnsEn}
            rightColumns={rightColumns}
            leftData={toJS(leftData)}
            isShowMidTable={false}
            rightData={rightData}
            total={total}
            page={page}
            onPageChange={onPageChange}
            leftTableStyle={leftTableStyle}
          />
        </div>
        <div
          style={{
            minHeight: '50vh',
            display: data ? 'none' : 'block',
          }}
        >
          <QMEmpty
            style={{ lineHeight: '24px' }}
            description={
              <>
                <span>{t('no_app_matches')}</span> <br />
                <span>{t('change_search')}</span>
              </>
            }
          />
        </div>
      </QMSpin>
      <CollectModal visible={visible} hideModal={hideModal} record={record} />
    </>
  )
}

export default observer(SearchPage)
