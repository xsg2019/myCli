import React, { useRef, useState, FC, useEffect } from 'react'
import { DatePicker, Divider, notification, Button } from 'antd'
import moment from 'moment'
import './style.less'
import { observer } from 'mobx-react'
import { CalendarOutlined } from '@ant-design/icons'
import { useStore } from '@/utils/context'
import { useCurrentPage, usePrevious } from '@/hooks'
import i18n from '@/i18n'
import { setStorage } from '@/utils'

const { RangePicker } = DatePicker

interface IBasicDatePicker {
  beginDate?: string
  endDate?: string
  /**
   *初始化不继承，默认一个月
   *
   * @type {boolean}
   * @memberof IBasicDatePicker
   */
  isMonth?: boolean
  onChangeDate?: (e: any) => void
  rangeBeginTime: string
  rangeEndTime: string
  ForceUpdate: () => void
}

const BasicDatePicker: FC<IBasicDatePicker> = (props: IBasicDatePicker) => {
  const {
    beginDate,
    endDate,
    isMonth,
    onChangeDate,
    rangeBeginTime,
    rangeEndTime,
    ForceUpdate,
  } = props

  const { rangeEndMonthTime, rangeBeginMonthTime } = useStore().appStore
  const datePicker = useRef(null)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<[moment.Moment | null, moment.Moment | null] | null>([
    moment(beginDate),
    moment(endDate),
  ])

  const growth =
    useCurrentPage('/growth-compound') ||
    useCurrentPage('/app-yeargrowth') ||
    useCurrentPage('/quality') ||
    useCurrentPage('/mode')

  useEffect(() => {
    setStorage('truth-flash', 'DataStartTime', beginDate)
    setStorage('truth-flash', 'DataEndTime', endDate)
    setValue([moment(beginDate), moment(endDate)])
  }, [beginDate, endDate])

  useEffect(() => {
    // 需要根据datetype来判断时间范围是否越界
    if (moment(endDate) > moment(rangeEndTime)) {
      setValue([moment(beginDate), moment(rangeEndTime)])
    } else if (moment(beginDate) < moment(rangeBeginTime)) {
      setValue([moment(rangeBeginTime), moment(endDate)])
    } else {
      setValue([moment(beginDate), moment(endDate)])
    }
  }, [isMonth, rangeEndTime, rangeBeginTime, rangeEndMonthTime, rangeBeginMonthTime])
  /**
   * 结束时间自动选择为后四年
   * @param key
   * @param date 开始选择时间
   */
  const resetDate = (key: string, date) => {
    const tempEndTime = moment(date).add(3, 'years')
    notification.close(key)
    setValue([moment(date), tempEndTime])
    onChangeDate([date, tempEndTime.format('YYYY-MM-DD')])
    if (growth) {
      ForceUpdate()
    }
  }

  function disabledDate(current) {
    if (current) {
      if (growth) {
        return current > moment(rangeEndMonthTime) || current < moment(rangeBeginMonthTime)
      }
      return current > moment(rangeEndTime) || current < moment(rangeBeginTime)
    }
    return false
  }

  const onOpenChange = value => {
    setOpen(value)
  }

  const onCalendarChange = (date: moment.Moment[], dateString, range, isLabel) => {
    // 点击label
    if (isLabel) {
      setValue(dateString.map(item => moment(item)))
      onChangeDate(dateString)

      if (growth) {
        ForceUpdate()
      }
      return
    }

    // 判断是否超3四年
    const lastDay = date[1].subtract(3, 'years').valueOf()
    const key = `open${Date.now()}`
    const btn = (
      <Button type="primary" size="small" onClick={() => resetDate(key, dateString[0])}>
        确定
      </Button>
    )
    if (date[0].valueOf() - lastDay < 0) {
      notification.error({
        message: i18n.t('time_range_title'),
        btn,
        key,
        description: i18n.t('time_range_content'),
        duration: null,
      })
      return
    }
    onChangeDate(dateString)
    if (growth) {
      ForceUpdate()
    }
  }

  const CNList = {
    过去7天: [
      moment(growth ? rangeEndMonthTime : rangeEndTime).subtract(7, 'days'),
      moment(growth ? rangeEndMonthTime : rangeEndTime),
    ],
    过去14天: [
      moment(growth ? rangeEndMonthTime : rangeEndTime).subtract(14, 'days'),
      moment(growth ? rangeEndMonthTime : rangeEndTime),
    ],
    过去30天: [
      moment(growth ? rangeEndMonthTime : rangeEndTime).subtract(30, 'days'),
      moment(growth ? rangeEndMonthTime : rangeEndTime),
    ],
    过去60天: [
      moment(growth ? rangeEndMonthTime : rangeEndTime).subtract(60, 'days'),
      moment(growth ? rangeEndMonthTime : rangeEndTime),
    ],
    过去90天: [
      moment(growth ? rangeEndMonthTime : rangeEndTime).subtract(90, 'days'),
      moment(growth ? rangeEndMonthTime : rangeEndTime),
    ],
  }

  const EnList = {
    'Past 7 Days': [
      moment(growth ? rangeEndMonthTime : rangeEndTime).subtract(7, 'days'),
      moment(growth ? rangeEndMonthTime : rangeEndTime),
    ],
    'Past 14 Days': [
      moment(growth ? rangeEndMonthTime : rangeEndTime).subtract(14, 'days'),
      moment(growth ? rangeEndMonthTime : rangeEndTime),
    ],
    'Past 30 Days': [
      moment(growth ? rangeEndMonthTime : rangeEndTime).subtract(30, 'days'),
      moment(growth ? rangeEndMonthTime : rangeEndTime),
    ],
    'Past 60 Days': [
      moment(growth ? rangeEndMonthTime : rangeEndTime).subtract(60, 'days'),
      moment(growth ? rangeEndMonthTime : rangeEndTime),
    ],
    'Past 90 Days': [
      moment(growth ? rangeEndMonthTime : rangeEndTime).subtract(90, 'days'),
      moment(growth ? rangeEndMonthTime : rangeEndTime),
    ],
  }

  return (
    <div className="qm-date-picker" ref={datePicker}>
      <RangePicker
        // @ts-ignore：value类型错误
        value={value}
        onOpenChange={onOpenChange}
        open={open}
        // @ts-ignore：value类型错误
        onCalendarChange={onCalendarChange}
        // @ts-ignore：value类型错误
        ranges={i18n.language === 'zh_CN' ? CNList : EnList}
        suffixIcon={
          <>
            <Divider type="vertical" className="qm-datepicker--divider" />
            <CalendarOutlined style={{ verticalAlign: 'middle' }} />
          </>
        }
        allowClear={false}
        inputReadOnly
        disabledDate={disabledDate}
        // onChange={onChange}
        getPopupContainer={() => datePicker.current}
      />
    </div>
  )
}

export default observer(BasicDatePicker)
