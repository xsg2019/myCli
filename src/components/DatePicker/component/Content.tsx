import React, { useState, useEffect, FC } from 'react'
import { observer } from 'mobx-react'
import { Menu, Dropdown, Button, message, notification } from 'antd'
import moment from 'moment'
import i18n from '@/i18n'
interface PickerContent {
  setVisible?: (e) => void
  setStart?: (e) => void
  setEnd?: (e) => void
  setCheckType?: (e) => void
  checkType?: number
  start?: any
  end?: any
  onChangeDate?: (e) => void
  defaultTime?: moment.Moment
  growth?: boolean
  ForceUpdate?: () => void
  inputStartValue?: string
  setInputStartValue?: (e) => void
  inputEndValue?: string
  setInputEndValue?: (e) => void
  maxRangeDate?: any[]
  visible?: boolean
  beginDate?: string
  endDate?: string
  setIsModalVisible?: (e) => void
}
const DatePickerContent: FC<PickerContent> = (props: PickerContent) => {
  const {
    setVisible,
    setStart,
    setEnd,
    setCheckType,
    checkType,
    start,
    end,
    onChangeDate,
    defaultTime,
    growth,
    ForceUpdate,
    inputStartValue,
    setInputStartValue,
    inputEndValue,
    setInputEndValue,
    maxRangeDate,
    visible,
    beginDate,
    endDate,
    setIsModalVisible,
  } = props

  const data = [
    {
      value: '过去7天',
      value_en: 'Past 7 Days',
      id: 7,
    },
    {
      value: '过去14天',
      value_en: 'Past 14 Days',
      id: 14,
    },
    {
      value: '过去30天',
      value_en: 'Past 30 Days',
      id: 30,
    },
    {
      value: '过去60天',
      value_en: 'Past 60 Days',
      id: 60,
    },
    {
      value: '过去90天',
      value_en: 'Past 90 Days',
      id: 90,
    },
    {
      value: '自主选择',
      value_en: 'Free choice',
      id: 0,
    },
  ]
  const handleClose = () => {
    setStart(beginDate)
    setEnd(endDate)
    setInputStartValue('')
    setInputEndValue('')
    setIsModalVisible(false)
    setVisible(false)
  }
  // //重置时间
  // const resetDate = (key: string, date) => {
  //   const tempEndTime = moment(date).add(maxRangeDate[0], maxRangeDate[1]).format('YYYY-MM-DD')
  //   notification.close(key)
  //   setEnd(tempEndTime)
  //   if (inputStartValue) {
  //     setInputStartValue('')
  //   }
  //   if (inputEndValue) {
  //     setInputEndValue('')
  //   }
  //   onChangeDate([start, tempEndTime])
  //   if (growth) {
  //     ForceUpdate()
  //   }
  // }
  //确认
  const handleConfirm = () => {
    if (
      start &&
      end &&
      moment(start).valueOf() - moment(end).subtract(maxRangeDate[0], maxRangeDate[1]).valueOf() < 0
    ) {
      // resetDate( start)
      setIsModalVisible(true)
      // setVisible(false)
      return
    }
    if (inputStartValue) {
      setInputStartValue('')
    }
    if (inputEndValue) {
      setInputEndValue('')
    }
    onChangeDate([start, end])
    if (growth) {
      ForceUpdate()
    }
    setVisible(false)
  }
  //选择时间范围
  const handleClick = (id: number) => {
    setCheckType(id)
    if (!id) return
    setStart(moment(defaultTime).subtract(id, 'days').format('YYYY-MM-DD'))
    setEnd(moment(defaultTime).format('YYYY-MM-DD'))
    setInputStartValue('')
    setInputEndValue('')
    onChangeDate([
      moment(defaultTime).subtract(id, 'days').format('YYYY-MM-DD'),
      moment(defaultTime).format('YYYY-MM-DD'),
    ])
    if (growth) {
      ForceUpdate()
    }
    setVisible(false)
  }
  const handleMouseEnter = (id: number) => {
    if (!id) {
      setInputStartValue('')
      setInputEndValue('')
    }
    // if (moment(defaultTime).format('YYYY-MM-DD')) return
    setInputStartValue(moment(defaultTime).subtract(id, 'days').format('YYYY-MM-DD'))
    setInputEndValue(moment(defaultTime).format('YYYY-MM-DD'))
  }
  const handleMouseLeave = (id: number) => {
    setInputStartValue('')
    setInputEndValue('')
  }
  return (
    <>
      {visible && (
        <ul className="content-right">
          {data.map(item => (
            <li
              className={checkType === item.id ? 'right-selected' : 'right-select'}
              key={item.id}
              onClick={() => {
                handleClick(item.id)
              }}
              onMouseEnter={() => {
                handleMouseEnter(item.id)
              }}
              onMouseLeave={() => {
                handleMouseLeave(item.id)
              }}
            >
              {i18n.language !== 'zh_CN' ? item.value_en : item.value}
            </li>
          ))}
          <div className="but">
            <Button
              onClick={() => {
                handleConfirm()
              }}
              size={'small'}
              type="primary"
              style={{ minWidth: 46, height: 30 }}
            >
              {i18n.t('input_submit')}
            </Button>
            <Button
              onClick={() => {
                handleClose()
              }}
              size={'small'}
              style={{ marginLeft: 5, minWidth: 46, height: 30 }}
            >
              {i18n.t('page_cancel')}
            </Button>
          </div>
        </ul>
      )}
    </>
  )
}
export default observer(DatePickerContent)
