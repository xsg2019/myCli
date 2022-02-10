import React, { useState } from 'react'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import './style.less'
import { useTranslation } from 'react-i18next'

interface IChartsCheckbox {
  onChange: (e: CheckboxChangeEvent) => void
  indeterminate: boolean
  checkAll: boolean
}

const ChartsCheckbox = ({ onChange, indeterminate, checkAll }: IChartsCheckbox) => {
  const onCheckAllChange = e => {
    onChange(e)
  }
  const { t } = useTranslation()

  return (
    <div className="qm-charts--checkbox">
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        {t('select_all')}
      </Checkbox>
    </div>
  )
}

export default ChartsCheckbox
