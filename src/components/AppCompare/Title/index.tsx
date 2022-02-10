import React from 'react'
import './style.less'
import { useTranslation } from 'react-i18next'

const Title = ({ onChange }) => {
  const { t } = useTranslation()
  return (
    <div className="apptitle">
      <h3>{t('app_comparison')}</h3>
      <a className="bnclose" onClick={() => onChange(false)}>
        <i className="fa fa-close" />
      </a>
    </div>
  )
}

export default Title
