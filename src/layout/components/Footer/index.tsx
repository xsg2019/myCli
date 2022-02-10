import React from 'react'
import './style.less'
import cx from 'classnames'
import moment from 'moment'
import { observer } from 'mobx-react'
import { useStore } from '@/utils/context'
import i18n from '@/i18n'
import { useTranslation } from 'react-i18next'

// moment.locale(i18n.language === "zh_CN" ? "en" : "zh");

interface FooterProps {
  noSider?: boolean
  content?: string
  collapsed?: boolean
}

interface FootItemProps {
  overlayClassName?: any
}

const defalutProps = {
  noSider: false,
  collapsed: false,
}

const FootItem: React.FC<FootItemProps> = observer((props: FootItemProps) => {
  const { rangeEndTime, isTrial } = useStore().appStore
  const { i18n } = useTranslation()

  return (
    <div className={cx('qm-home--footer', props.overlayClassName)}>
      {!isTrial ? (
        i18n.language === 'zh_CN' ? (
          <span>
            {moment(rangeEndTime).subtract('2', 'day').format('YYYY年MM月DD日')}至
            {moment(rangeEndTime).format('YYYY年MM月DD日')}数据为预估值
          </span>
        ) : (
          <span>
            The data from {moment(rangeEndTime).subtract('2', 'day').format('MMM.D, YYYY')} to{' '}
            {moment(rangeEndTime).format('MMM.D, YYYY')} is estimated.
          </span>
        )
      ) : null}

      <br />
      <span> 2014 - {moment().format('YYYY')} Copyright © QuestMobile</span>
    </div>
  )
})

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  const { noSider, collapsed } = { ...defalutProps, ...props }

  return noSider ? (
    <FootItem overlayClassName={'no-sider'} />
  ) : (
    <FootItem overlayClassName={!collapsed ? 'iscollapsed' : 'isopened'} />
  )
}

export default Footer
