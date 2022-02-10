import React, { useEffect, useState } from 'react'
import './style.less'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import moment from 'moment'
import cx from 'classnames'
import i18n from '@/i18n'
import { useLogHook } from '@/hooks'
import { logType } from '@/constants'

const NoticePage = () => {
  const { noticeList } = useStore().appStore

  useLogHook({ PrimaryMenu: '', SecondMenu: '', LogType: logType.NOTICE_CLICK })

  const noticeDataList =
    i18n.language === 'zh_CN' ? noticeList : noticeList.filter(i => i.enTitle.trim() !== '')
  return (
    <div className="qm-showpage-content">
      {noticeDataList.length
        ? noticeDataList.map((item, i) => {
            // if (!(i18n.language === 'zh_CN') && item.enTitle.trim() === '') return null
            return (
              <div className="text">
                <div className={cx('t', i === 0 ? 'active' : '')}>
                  <h3>{i18n.language === 'zh_CN' ? item.title : item.enTitle}</h3>
                  <time>
                    <span>{moment(item.createTime).format('YYYY-MM-DD')}</span>
                  </time>
                </div>
                <div
                  className="p"
                  dangerouslySetInnerHTML={{
                    __html: i18n.language === 'zh_CN' ? item.content : item.enContent,
                  }}
                ></div>
              </div>
            )
          })
        : null}
    </div>
  )
}

export default observer(NoticePage)
