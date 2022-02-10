import React, { useState, useEffect, FC, useRef } from 'react'
import { observer } from 'mobx-react'
import { Menu, Dropdown, Button, Modal } from 'antd'
import Content from './component/Content'
import './index.less'
import moment from 'moment'
import Picker from './component/Picker'
import { useStore } from '@/utils/context'
import { useOnClickOutside } from '@/hooks'
import i18n from '@/i18n'
interface DateItem {
  beginDate?: string
  endDate?: string
  isMonth?: boolean
  rangeBeginTime?: string
  rangeEndTime?: string
  onChangeDate?: (e) => void
  ForceUpdate?: () => void
  growth?: boolean
  maxRangeDate?: any[]
}
const DatePicker: FC<DateItem> = (props: DateItem) => {
  const { rangeEndMonthTime, rangeBeginMonthTime } = useStore().appStore
  const {
    onChangeDate,
    beginDate,
    endDate,
    rangeEndTime,
    rangeBeginTime,
    growth,
    ForceUpdate,
    maxRangeDate,
  } = props
  const picker = useRef(null)
  const [visible, setVisible] = useState(false) //时间选择器的显示与隐藏
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [inputStartValue, setInputStartValue] = useState('') //输入框输入的开始时间
  const [inputEndValue, setInputEndValue] = useState('') //输入框输入的结束时间

  const [start, setStart] = useState(beginDate) //时间面板选择的开始时间
  const [end, setEnd] = useState(endDate) //时间面板选择的结束时间
  const [defaultValue, setDefaultValue] = useState('请选择起止时间') //按钮中显示的已选择的起始时间
  const [checkType, setCheckType] = useState(0) // 时间段的类型
  const pickerProps = {
    visible,
    start,
    end,
    setStart,
    setEnd,
    defaultTime: growth ? rangeEndMonthTime : rangeEndTime,
    rangeBeginTime: growth ? rangeBeginMonthTime : rangeBeginTime,
    beginDate,
    endDate,
    inputStartValue,
    setInputStartValue,
    inputEndValue,
    setInputEndValue,
    maxRangeDate,
    checkType,
  }
  const contentRightProps = {
    setVisible,
    setStart,
    setEnd,
    setCheckType,
    checkType,
    defaultTime: growth ? moment(rangeEndMonthTime) : moment(rangeEndTime),
    start,
    end,
    onChangeDate,
    ForceUpdate,
    growth,
    inputStartValue,
    setInputStartValue,
    inputEndValue,
    setInputEndValue,
    maxRangeDate,
    visible,
    endDate,
    beginDate,
    setIsModalVisible,
  }
  //重置时间
  const resetDate = date => {
    // const tempEndTime = moment(date).add(maxRangeDate[0], maxRangeDate[1]).format('YYYY-MM-DD')
    setIsModalVisible(false)
    // setEnd(tempEndTime)
    if (inputStartValue) {
      setInputStartValue('')
    }
    if (inputEndValue) {
      setInputEndValue('')
    }
    // onChangeDate([start, tempEndTime])
    // if (growth) {
    //   ForceUpdate()
    // }
  }
  const DatePickerContent = (
    <div
      className="qm-date-picker-content"
      style={!checkType ? {} : { height: 255, float: 'right' }}
      // key={Number(visible)}
    >
      {visible ? <Picker {...pickerProps} /> : null}
      <Content {...contentRightProps}></Content>
      {isModalVisible ? (
        <div className="date-alert">
          <div className="date-alert-cont">
            <p style={{ fontSize: 13, fontWeight: 'bold' }}>{i18n.t('time_range_title')}</p>
            <p>{i18n.t('time_range_content')}</p>
            {/* <button
              className="alert-button"
              onClick={() => {
                resetDate(start)
              }}
            >
              {i18n.t('input_submit')}
            </button> */}
            <Button
              type={'primary'}
              onClick={() => {
                resetDate(start)
              }}
            >
              {i18n.t('input_submit')}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
  useEffect(() => {
    if (endDate && beginDate) {
      setDefaultValue(beginDate + ' ~ ' + endDate)
      setStart(beginDate)
      setEnd(endDate)
    } else {
      setDefaultValue('请选择起止时间')
    }
  }, [beginDate, endDate])
  useOnClickOutside(picker, () => {
    setStart(beginDate)
    setEnd(endDate)
    setInputStartValue('')
    setInputEndValue('')
    setIsModalVisible(false)
    setVisible(false)
  })
  return (
    <div className="qm-date-picker" ref={picker}>
      <Dropdown
        overlay={DatePickerContent}
        placement="bottomRight"
        trigger={['click']}
        visible={visible}
        getPopupContainer={() => picker.current}
      >
        <div className="picker">
          <span className="input-group-addon">
            <i className="fa fa-calendar"></i>
          </span>
          <Button
            style={{ height: 28, display: 'flex', alignItems: 'center', width: 185 }}
            className="my-btn"
            onClick={() => {
              setVisible(!visible)
            }}
          >
            {defaultValue}
          </Button>
        </div>
      </Dropdown>
    </div>
  )
}
export default observer(DatePicker)
