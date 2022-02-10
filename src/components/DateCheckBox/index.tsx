import React, { useState, useEffect, FC } from 'react'
import { Radio } from 'antd'
import './style.less'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

interface IDateCheckBoxProps {
  noDay?: boolean
  noWeek?: boolean
  noMonth?: boolean
  value?: 'month' | 'week' | 'day'
  onChange: (e: any) => void
}

const DateCheckBox: FC<IDateCheckBoxProps> = (props: IDateCheckBoxProps) => {
  const { noDay, noWeek, noMonth, value, onChange } = props
  const { t } = useTranslation()
  return (
    <div className="qm-date-group">
      <Radio.Group buttonStyle="solid" onChange={onChange} value={value}>
        {noMonth ? null : <Radio.Button value="month">{t('month')}</Radio.Button>}
        {noWeek ? null : <Radio.Button value="week">{t('week')}</Radio.Button>}
        {noDay ? null : <Radio.Button value="day">{t('day')}</Radio.Button>}
      </Radio.Group>
    </div>
  )
}

export default observer(DateCheckBox)
