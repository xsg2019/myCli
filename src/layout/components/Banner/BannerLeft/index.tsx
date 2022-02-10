import React, { useState } from 'react'
import './style.less'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function BannerLeft(props) {
  const { collapsed, showpage } = props

  const history = useHistory()

  const { t } = useTranslation()

  const CollapsedStyle = {
    left: collapsed ? 75 : 245,
  }

  const handleGoback = () => {
    history.goBack()
  }

  return (
    <div className="tab-left" style={showpage ? null : CollapsedStyle}>
      <div className="bnback">
        <a onClick={handleGoback}>
          <i className="fa fa-mail-reply" /> {t('back')}
        </a>
      </div>
      {props.children}
    </div>
  )
}

export default BannerLeft
