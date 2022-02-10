import React, { useState, useEffect, FC, useRef } from 'react'
import { observer } from 'mobx-react'
import { DatePicker, Input, notification, Button, message } from 'antd'
import moment from 'moment'
import i18n from '@/i18n'
interface PickerItem {
  visible?: boolean
  start?: string
  end?: string
  setStart?: (e) => void
  setEnd?: (e) => void
  defaultTime?: string
  rangeBeginTime?: string
  beginDate?: string
  endDate?: string
  inputStartValue?: string
  setInputStartValue?: (e) => void
  inputEndValue?: string
  setInputEndValue?: (e) => void
  checkType?: number
}
const DatePickerPicker: FC<PickerItem> = (props: PickerItem) => {
  const {
    visible,
    start,
    end,
    setStart,
    setEnd,
    defaultTime,
    rangeBeginTime,
    beginDate,
    endDate,
    inputStartValue,
    setInputStartValue,
    inputEndValue,
    setInputEndValue,
    checkType,
  } = props
  //设置结束时间
  const handleEndTimeChange = (date, dateString) => {
    if (start && moment(dateString) < moment(start)) {
      const d =
        moment(dateString) < moment(rangeBeginTime)
          ? moment(rangeBeginTime)
          : moment(dateString).subtract('2', 'days')
      setStart(d.format('YYYY-MM-DD'))
    }
    setEnd(dateString)
  }
  //设置开始时间
  const handleStartTimeChange = (date, dateString) => {
    if (end && moment(dateString) > moment(end)) {
      const d =
        moment(dateString).add('2', 'days') > moment(defaultTime)
          ? moment(defaultTime)
          : moment(dateString).add('2', 'days')
      setEnd(d.format('YYYY-MM-DD'))
    }
    setStart(dateString)
  }
  //自定义时间单元格
  const startDateItem = (currentDate, today) => {
    let className = ''
    if (start && end && moment(start) < currentDate && currentDate < moment(end)) {
      // background = 'rgba(255, 190, 20, 0.3)'
      className = 'selectedContent'
    }
    if (start === moment(currentDate).format('YYYY-MM-DD')) {
      // background = '#ffbe14'
      className = 'startAndEnd'
    }
    if (end === moment(currentDate).format('YYYY-MM-DD')) {
      // background = '#ffbe14'
      className = 'startAndEnd2'
    }
    if (start === end && start === moment(currentDate).format('YYYY-MM-DD')) {
      className = 'startAndEnd3'
    }
    if (currentDate > today) {
      return <div>{moment(currentDate).date()}</div>
    }
    return <div className={className}>{moment(currentDate).date()}</div>
  }
  //不可选择时间
  const disabledDate = current => {
    if (!rangeBeginTime) {
      return current && current > moment(defaultTime)
    }
    // if (end) {
    //     return current && (current > moment(end) || current < moment(rangeBeginTime))
    // }
    return current && (current > moment(defaultTime) || current < moment(rangeBeginTime))
  }
  const endDisabledDate = current => {
    if (!rangeBeginTime) {
      return current && current > moment(defaultTime)
    }
    // if (start) {
    //     return current && (current > moment(defaultTime) || current < moment(start))
    // }
    // if (end) {
    //     return current && (current > moment(end) || current < moment(rangeBeginTime))
    // }
    return current && (current > moment(defaultTime) || current < moment(rangeBeginTime))
  }
  const handleEnd = e => {
    let type = false
    let val = ''
    if (e.target.value.includes('-')) {
      type = true
      const arr = e.target.value.split('-')
      let yy = arr[0]
      let mm = arr[1]
      let dd = arr[2]
      if (mm.length < 2 && Number(mm) < 10) {
        mm = '0' + mm
      }

      if (dd.length < 2 && Number(dd < 10)) {
        dd = '0' + dd
      }
      val = yy + '-' + mm + '-' + dd
    }
    // const value = val
    let value = moment(type ? val : e.target.value).format('YYYY-MM-DD')
    if (value === 'Invalid date') {
      message.warning(i18n.t('date_error'))
      return
    }
    if (moment(value) < moment(rangeBeginTime)) {
      setInputEndValue(moment(rangeBeginTime).format('YYYY-MM-DD'))
      value = moment(rangeBeginTime).format('YYYY-MM-DD')
    }
    if (moment(value) > moment(defaultTime)) {
      setInputEndValue(moment(defaultTime).format('YYYY-MM-DD'))
      value = moment(defaultTime).format('YYYY-MM-DD')
    }
    setInputEndValue(value)
    handleEndTimeChange(moment(value), value)
  }
  const handleStart = e => {
    let type = false
    let val = ''
    if (e.target.value.includes('-')) {
      type = true
      const arr = e.target.value.split('-')
      let yy = arr[0]
      let mm = arr[1]
      let dd = arr[2]
      if (mm.length < 2 && Number(mm) < 10) {
        mm = '0' + mm
      }
      if (dd.length < 2 && Number(dd < 10)) {
        dd = '0' + dd
      }
      val = yy + '-' + mm + '-' + dd
    }
    // const value = val
    let value = moment(type ? val : e.target.value).format('YYYY-MM-DD')
    if (value === 'Invalid date') {
      message.warning(
        i18n.language !== 'zh_CN' ? 'Please enter the correct date' : '请输入正确的日期格式'
      )
      return
    }
    if (moment(value) < moment(rangeBeginTime)) {
      setInputEndValue(moment(rangeBeginTime).format('YYYY-MM-DD'))
      value = moment(rangeBeginTime).format('YYYY-MM-DD')
    }
    if (moment(value) > moment(defaultTime)) {
      setInputEndValue(moment(defaultTime).format('YYYY-MM-DD'))
      value = moment(defaultTime).format('YYYY-MM-DD')
    }
    setInputStartValue(value)
    handleStartTimeChange(moment(value), value)
  }
  return (
    <div className="content-left" style={checkType ? { display: 'none' } : {}}>
      <div className="picker-left">
        <div className="date-name">
          <span className="">{i18n.t('begin_time')}</span>
        </div>
        <div className="picker-input">
          <Input
            prefix={
              <i
                className="fa fa-calendar glyphicon glyphicon-calendar"
                style={{ marginRight: 5 }}
              ></i>
            }
            defaultValue={beginDate}
            value={inputStartValue ? inputStartValue : start}
            maxLength={10}
            onPressEnter={e => {
              handleStart(e)
            }}
            onBlur={e => {
              handleStart(e)
            }}
            onChange={e => {
              const { value } = e.target
              // const reg = /^[1-9]|-\d*$/
              // reg.test(value)
              // console.log(reg.test(value))
              setInputStartValue(value.replace(/[^0-9-]/g, '') || ' ')
            }}
          />
        </div>
        <div className="picker-con">
          <DatePicker
            className="my-picker"
            dropdownClassName={'picker-popup-content'}
            showToday={false}
            // key={Number(visible)}
            open={visible}
            dateRender={startDateItem}
            onChange={(date, dateString) => {
              setInputStartValue('')
              handleStartTimeChange(date, dateString)
            }}
            defaultPickerValue={
              beginDate ? moment(beginDate) : moment(defaultTime).subtract(1, 'months')
            }
            disabledDate={disabledDate}
            defaultValue={moment(beginDate)}
            value={moment(start)}
            allowClear={false}
            getPopupContainer={() => document.querySelector('.picker-left')}
          />
        </div>
      </div>
      <div className="picker-right">
        <div className="date-name">
          <span className="">{i18n.t('end_time')}</span>
        </div>
        <div className="picker-input">
          <Input
            prefix={
              <i
                className="fa fa-calendar glyphicon glyphicon-calendar"
                style={{ marginRight: 5 }}
              ></i>
            }
            defaultValue={endDate}
            value={inputEndValue ? inputEndValue : end}
            maxLength={10}
            onPressEnter={e => {
              handleEnd(e)
            }}
            onBlur={e => {
              handleEnd(e)
            }}
            onChange={e => {
              const value = e.target.value
              setInputEndValue(value.replace(/[^0-9-]/g, '') || ' ')
            }}
          />
        </div>
        <div className="picker-con">
          <DatePicker
            className="my-picker"
            dropdownClassName="picker-popup-content"
            showToday={false}
            // key={Number(visible)}
            open={visible}
            dateRender={startDateItem}
            onChange={(date, dateString) => {
              setInputEndValue('')
              handleEndTimeChange(date, dateString)
            }}
            defaultPickerValue={endDate ? moment(endDate) : moment(defaultTime)}
            disabledDate={endDisabledDate}
            defaultValue={moment(endDate)}
            value={moment(end)}
            allowClear={false}
            getPopupContainer={() => document.querySelector('.picker-right')}
          />
        </div>
      </div>
    </div>
  )
}
export default observer(DatePickerPicker)
