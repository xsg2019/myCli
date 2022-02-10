import React, { useRef } from 'react'
import './style.less'
import { Popover, Tooltip, Badge } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import { storage } from '@/utils/storage'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { handleExit } from '@/utils'
import { useCurrentPage } from '@/hooks'
import Axios from 'axios'
import moment from 'moment'
import { SendLog } from '@/api/Home/scale'
import { logType } from '@/constants'

const userLoginOutTitle: JSX.Element = (
  <h3>{(storage.get('truth-current-user') && storage.get('truth-current-user').nickName) || ''}</h3>
)

const LoginOut = () => {
  return Axios({
    method: 'get',
    headers: {
      'Truth-Auth': `bearer ${storage.get('truth-token')}`,
      Authorization: 'Basic dHJ1dGg6dHJ1dGhfc2VjcmV0',
      'Cache-Control': 'no-cache',
    },
    url: '/api/truth-auth/oauth/logout',
  })
}

const NavIconGroup = () => {
  const home = useRef(null)
  const notice = useRef(null)
  const collect = useRef(null)
  const user = useRef(null)
  const help = useRef(null)
  const languagef = useRef(null)
  const matchHome = useCurrentPage('/home')
  const matchCollect = useCurrentPage('/showpage/collect')
  const matchNotice = useCurrentPage('/showpage/notice')
  const matchHelp = useCurrentPage('/showpage/help')

  const { push } = useHistory()

  const {
    language,
    changeLanguage,
    noticeList,
    noticeIsRead,
    getUpdateNoticeState,
    setCurrentPage,
    resetCategory,
  } = useStore().appStore

  const { i18n } = useTranslation('ns1', { useSuspense: false })

  const transLang = () => {
    if (language === 1) {
      changeLanguage('en_US')
      document.title = 'QuestMobile TRUTH-Flash'
      storage.set('language', 'en_US')
      i18n.changeLanguage('en_US')
    } else {
      document.title = 'QuestMobile TRUTH-极速版'
      changeLanguage('zh_CN')
      i18n.changeLanguage('zh_CN')
    }
    resetCategory()
    setCurrentPage(1)
    push('/home/scale/scale-active')
    SendLog({
      LogType: logType.LANGUAGE_CLICK,
      LogContent: { language: i18n.language as any },
    })
  }

  const handleUserLoginOut = async () => {
    try {
      SendLog({ LogType: logType.LOGIN_OUT })
      await LoginOut()
      handleExit()
    } catch (e) {
      console.log(e)
    }
  }
  const noticeData = noticeList.find(item => item.enTitle.trim() !== '')
  return (
    <div className="navicongroup-container">
      <Link to="/home/scale/scale-active">
        <Tooltip
          placement="bottom"
          title={i18n.t('homepage')}
          getPopupContainer={() => home.current}
        >
          <i
            className={cx('navicongroup', 'iconfont', 'icon-home', {
              active: matchHome,
            })}
            ref={home}
          />
        </Tooltip>
      </Link>

      <Link to="/showpage/collect">
        <Tooltip
          placement="bottom"
          title={i18n.t('page_myattention')}
          getPopupContainer={() => collect.current}
        >
          <i
            className={cx('navicongroup', 'iconfont', 'icon-collect', {
              active: matchCollect,
            })}
            ref={collect}
            data-tut="step1"
          />
        </Tooltip>
      </Link>

      <Link
        to="/showpage/notice"
        onClick={() => {
          getUpdateNoticeState()
        }}
      >
        <Popover
          content={
            <>
              <div
                className="qm-notice--container"
                dangerouslySetInnerHTML={{
                  __html: noticeList.length
                    ? i18n.language === 'zh_CN'
                      ? noticeList[0].content
                      : noticeData
                      ? noticeData.enContent
                      : ''
                    : '',
                }}
              />
              <div style={{ textAlign: 'right' }}>
                <Link to="/showpage/notice" className="btn-more">
                  {i18n.t('more_announce')} <i className="fa fa-angle-double-right" />
                </Link>
              </div>
            </>
          }
          title={
            <>
              <h3
                dangerouslySetInnerHTML={{
                  __html: noticeList.length
                    ? i18n.language === 'zh_CN'
                      ? noticeList[0].title
                      : noticeData
                      ? noticeData.enTitle
                      : ''
                    : '',
                }}
              />
              {i18n.language === 'zh_CN' ? (
                <em>
                  {noticeList.length ? moment(noticeList[0].createTime).format('YYYY-MM-DD') : ''}
                </em>
              ) : (
                <em>
                  {noticeList.length && noticeData
                    ? moment(noticeData.createTime).format('YYYY-MM-DD')
                    : ''}
                </em>
              )}
            </>
          }
          getPopupContainer={() => notice.current}
          overlayStyle={{ width: 500 }}
        >
          <Badge dot={noticeIsRead} offset={[-5, 8]}>
            <i
              className={cx('navicongroup', 'iconfont', 'icon-notice', {
                active: matchNotice,
              })}
              ref={notice}
            />
          </Badge>
        </Popover>
      </Link>

      <Popover
        content={
          <p>
            <button className="btn-exit" onClick={handleUserLoginOut}>
              {i18n.t('login_sign')}
            </button>
          </p>
        }
        title={userLoginOutTitle}
        getPopupContainer={() => user.current}
      >
        <a>
          <i className={cx('navicongroup', 'iconfont', 'icon-user')} ref={user} />
        </a>
      </Popover>
      <Link to="/showpage/help">
        <Tooltip placement="bottom" title={i18n.t('help')} getPopupContainer={() => help.current}>
          <i
            className={cx('navicongroup', 'iconfont', 'icon-help', {
              active: matchHelp,
            })}
            ref={help}
          />
        </Tooltip>
      </Link>

      <a>
        <Tooltip
          placement="bottom"
          title={i18n.t('language_version')}
          getPopupContainer={() => languagef.current}
        >
          <i
            className={cx('navicongroup', 'iconfont', {
              'icon-en': language === 1,
              'icon-cn': language === 2,
            })}
            ref={languagef}
            onClick={transLang}
          />
        </Tooltip>
      </a>
    </div>
  )
}

export default observer(NavIconGroup)
