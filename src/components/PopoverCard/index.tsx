import React, { FC } from 'react'
import { Popover } from 'antd'
import './style.less'
import cx from 'classnames'
import { formatRank } from '@/utils'
import { useStore } from '@/utils/context'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

interface IPopoverCardProps {
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
  trigger?: 'click' | 'hover'
  title?: any
  content?: any
  record?: any
  dateText?: string
  children?: any
  isDesc?: boolean
  isCluster?: boolean
}

const PopoverCard: FC<IPopoverCardProps> = (props: IPopoverCardProps) => {
  const {
    record,
    placement,
    trigger,
    title,
    content,
    dateText = null,
    isDesc = null,
    isCluster = false,
  } = props

  const { t, i18n } = useTranslation()

  const { rangeEndMonthTime } = useStore().appStore

  const TitleContent = ({ record }) => {
    const { appName, icon, appEnName } = record
    return (
      <div className="qm-iconpopover-title">
        <img src={icon} width="24" alt="" />
        <div style={{ minHeight: 24 }}>{i18n.language === 'zh_CN' ? appName : appEnName}</div>
      </div>
    )
  }
  const PopoverContent = ({ record }) => (
    <div className="qm-iconpopover-content">
      <dl>
        <dt>
          {i18n.language === 'zh_CN'
            ? moment(dateText ? dateText : rangeEndMonthTime).format('YYYY年MM月') + '排名'
            : 'Ranking in ' + moment(dateText ? dateText : rangeEndMonthTime).format('YYYY.MM')}
        </dt>
        <dd>
          <span>
            <i className="fa fa-dot-circle-o" />
            {t('main_list')}
          </span>
          <em>
            <i className="iconfont icon-paiming" />
            {record && formatRank(record.mainList)}
          </em>
        </dd>
        <dd>
          <span>
            <i className="fa fa-dot-circle-o" />
            {record && i18n.language === 'zh_CN'
              ? record.category.categoryName
              : record.category.categoryEnName}
            {t('catetoryNum')}{' '}
          </span>
          <em>
            <i className="iconfont icon-paiming" />
            {record && formatRank(record.categoryRank)}
          </em>
        </dd>

        {record.valueFlag === 1 || (isEmpty(record.clazz) && !record.clazz.clazzId) ? null : (
          <dd>
            <span>
              <i className="fa fa-dot-circle-o" />
              {record && i18n.language === 'zh_CN'
                ? record.clazz.clazzName
                : record.clazz.clazzEnName}
              {t('sub_categoryNum')}{' '}
            </span>
            <em>
              <i className="iconfont icon-paiming" />
              {record && formatRank(record.clazzRank)}
            </em>
          </dd>
        )}
      </dl>
    </div>
  )
  const container = React.useRef(null)
  return (
    <Popover
      placement={placement}
      title={record ? <TitleContent record={record} /> : title}
      content={record ? <PopoverContent record={record} /> : content}
      trigger={trigger || 'hover'}
      overlayClassName={cx('qm-iconpopover', {
        'top-border': placement !== 'right',
      })}
      getPopupContainer={isDesc ? () => container.current : null}
    >
      {isDesc ? (
        <div ref={container} className="btn">
          <div className="ref-container">{props.children}</div>
        </div>
      ) : (
        props.children
      )}
    </Popover>
  )
}

export default PopoverCard
