import React, { useRef, useEffect } from 'react'
import './style.less'
import { Row, Col } from 'antd'
import PopoverCard from '@/components/PopoverCard'
import { RankDate, formatRank } from '@/utils'
import { Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import { useStore } from '@/utils/context'
import { useSetCategroy, useHandleCompany } from '@/hooks'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { observer } from 'mobx-react'

export interface IAppInfo {
  isSmallApp?: boolean
  record?: any
  competitorApp?: any
  dateText?: string
  loading: boolean
}

const AppInfo: React.FC<IAppInfo> = (props: IAppInfo) => {
  const { isSmallApp, dateText, record, loading, competitorApp } = props

  const { changeVisitedAppList } = useStore().appStore

  // const { dateText } = useStore().detailStore;

  console.log(dateText)

  const { t, i18n } = useTranslation()

  const { handleCategory, handleClass } = useSetCategroy()

  const handleCompany = useHandleCompany()

  const link = useRef(null)

  return (
    <div className="qm-appinfo">
      <Row>
        <Col style={{ width: 52 }}>
          <Skeleton loading={loading} active avatar>
            <div className="app-icon">
              <img src={record && record.icon} />
            </div>
          </Skeleton>
        </Col>
        <Col style={{ width: '68%' }}>
          <Skeleton loading={loading} active>
            <div className="main-info">
              <div className="title">
                <div className="appName">
                  {i18n.language === 'zh_CN'
                    ? record && record.appName
                    : record && `${record.appEnName}(${record.appName})`}
                </div>
              </div>
              <ul className="categroy-list">
                <li>
                  <i className="caret-right" /> {t('catetory')}：
                  <Link
                    to={'/home/scale/scale-active'}
                    onClick={() => handleCategory(record.category)}
                  >
                    {i18n.language === 'zh_CN'
                      ? record && record.category.categoryName
                      : record && record.category.categoryEnName}
                  </Link>
                </li>
                <li>
                  <i className="caret-right" /> {t('sub_category')}：
                  {isSmallApp ? (
                    '--'
                  ) : (
                    <Link to={'/home/scale/scale-active'} onClick={() => handleClass(record.clazz)}>
                      {i18n.language === 'zh_CN'
                        ? record && record.clazz.clazzName
                        : record && record.clazz.clazzEnName}
                    </Link>
                  )}
                </li>
                <li>
                  <i className="caret-right" /> {t('company')}：
                  <Link
                    to={`/company/scale/scale-active?companyId=${
                      record && record.company.companyId
                    }&name=${
                      i18n.language === 'zh_CN'
                        ? record && record.company.companyName
                        : record && record.company.companyEnName
                    }`}
                    onClick={() => handleCompany(record.company)}
                    className="table-company"
                    title={
                      i18n.language === 'zh_CN'
                        ? record && record.company.companyName
                        : record && record.company.companyEnName
                    }
                  >
                    {i18n.language === 'zh_CN'
                      ? record && record.company.companyName
                      : record && record.company.companyEnName}
                  </Link>
                </li>
              </ul>
              <dl className="rank-list">
                <dt>
                  {i18n.language === 'zh_CN'
                    ? RankDate(dateText) + '排名'
                    : 'Ranking in ' + moment(dateText).format('YYYY.MM')}
                </dt>
                <dd>
                  <span>
                    <i className="iconfont icon-circle" /> {t('main_list')}
                  </span>
                  <em>
                    <i className="iconfont icon-paiming" /> {record && formatRank(record.mainList)}
                  </em>
                </dd>
                <dd>
                  <span>
                    <i className="iconfont icon-circle" />{' '}
                    {i18n.language === 'zh_CN'
                      ? record && record.category.categoryName
                      : record && record.category.categoryEnName}
                    {t('catetoryNum')}{' '}
                  </span>
                  <em>
                    <i className="iconfont icon-paiming" />{' '}
                    {record && formatRank(record.categoryRank)}
                  </em>
                </dd>
                {isSmallApp ? null : (
                  <dd>
                    <span>
                      <i className="iconfont icon-circle" />{' '}
                      {i18n.language === 'zh_CN'
                        ? record && record.clazz.clazzName
                        : record && record.clazz.clazzEnName}
                      {t('sub_categoryNum')}{' '}
                    </span>
                    <em>
                      <i className="iconfont icon-paiming" />{' '}
                      {record && formatRank(record.clazzRank)}
                    </em>
                  </dd>
                )}
              </dl>
            </div>
          </Skeleton>
        </Col>
        <Col
          style={{
            width: 'calc(100% - 68% - 60px)',
            borderLeft: '1px solid #e4e3e3',
          }}
        >
          <dd className="competition">
            <dl className="competition-list">
              <dt>
                <i className="iconfont icon-xingye" /> {t('competitors')}
              </dt>

              <dd>
                <Skeleton loading={loading} paragraph={{ rows: 2 }}>
                  {competitorApp &&
                    competitorApp.map((item, i) => (
                      <PopoverCard record={item} dateText={dateText} placement="bottom" key={i}>
                        <Link
                          onClick={() => changeVisitedAppList(item)}
                          to={`/details/app-overview/${item.appId}?flag=${item.valueFlag}`}
                          className="ico-jp"
                          ref={link}
                        >
                          <img src={item.icon} width="40" height="40" />
                        </Link>
                      </PopoverCard>
                    ))}
                </Skeleton>
              </dd>
            </dl>
          </dd>
        </Col>
      </Row>
    </div>
  )
}

export default observer(AppInfo)
