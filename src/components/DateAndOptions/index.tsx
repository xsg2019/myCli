import React, { useState, useEffect, FC } from 'react'
import './style.less'
import { Row, Col } from 'antd'
import UserOptions from '../UserOptions'
import DateCheckBox from '../DateCheckBox'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { debounce } from 'lodash-es'
interface IDateAndOptionsProps {
  noDay?: boolean
  noWeek?: boolean
  noMonth?: boolean
  chartsShow?: boolean
  handleChartShow?: (flag: boolean) => void
  setOrderName?: any
  callback?: any
  onChange?: any
  tabkey?: any
}

const DateAndOptions: FC<IDateAndOptionsProps> = (props: IDateAndOptionsProps) => {
  const { noDay, noWeek, noMonth, setOrderName, callback, tabkey } = props

  const {
    changeDateType,
    dateType,
    setCurrentPage,
    ForceUpdate,
    setDownloadTabkey,
  } = useStore().appStore

  useEffect(() => {
    // 没有日的情况
    if (noDay && !noWeek && !noMonth) {
      if (dateType === 'day') {
        changeDateType('month')
      }
    }
    // 没有日和周,只有月的情况
    if (noDay && noWeek && !noMonth) {
      if (dateType === 'week' || dateType === 'day') {
        changeDateType('month')
      }
    }
  }, [changeDateType])
  const onChange = debounce(e => {
    setOrderName && setOrderName('')
    changeDateType(e.target.value)
    if (callback) {
      callback('1')
      setDownloadTabkey('1')
      setCurrentPage(1)
      ForceUpdate()
    }
  }, 200)

  return (
    <Row justify="space-between">
      <Col span={12}>
        <DateCheckBox
          value={dateType}
          onChange={onChange}
          noDay={noDay}
          noWeek={noWeek}
          noMonth={noMonth}
        />
      </Col>
      <Col span={12}>
        <UserOptions tabkey={tabkey} />
      </Col>
    </Row>
  )
}

export default observer(DateAndOptions)
