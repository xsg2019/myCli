import React from 'react'
import QMEmpty from '../QMEmpty'
import './style.less'
import i18n from '@/i18n'

const EmptyState = () => (
  <div className="qm-content-empty">
    <QMEmpty
      description={
        <>
          <span className="decs">{i18n.t('sorry_tip')}</span>
          <span className="suggest">{i18n.t('reset_tip')}</span>
        </>
      }
    />
  </div>
)

export default EmptyState
