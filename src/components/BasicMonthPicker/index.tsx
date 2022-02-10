import React, { useState, useRef } from 'react'
import { DatePicker, Divider } from 'antd'
import moment from 'moment'
import './style.less'
import { useStore } from '@/utils/context'
import { CalendarOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import { momentBeginMonth, momentEndMonth, setStorage } from '@/utils'

interface IBasicMonthPicker {
  defaultDate?: string
  onChangeDate?: (e: any) => void
  rangeBeginTime: string
  rangeEndTime: string
  ForceUpdate: () => void
  isGrowth?: boolean
}

const BasicMonthPicker = (props: IBasicMonthPicker) => {
  const { defaultDate, onChangeDate } = props
  const datePicker = useRef(null)
  const [value, setValue] = useState<any>(moment(defaultDate))
  const { rangeEndMonthTime, rangeBeginMonthTime, ForceUpdate, setOrderName } = useStore().appStore

  React.useEffect(() => {
    setStorage('truth-flash', 'DataStartTime', momentBeginMonth(defaultDate))
    setStorage('truth-flash', 'DataEndTime', momentEndMonth(defaultDate))
    setValue(moment(defaultDate))
  }, [defaultDate])

  function onChange(date, dateString: string) {
    setValue(date)
    onChangeDate(dateString)
    setOrderName('')
    ForceUpdate()
  }
  function disabledDate(current) {
    if (current) {
      return current > moment(rangeEndMonthTime) || current < moment(rangeBeginMonthTime)
    }
    return false
  }
  return (
    <div className="qm-datepicker-month" ref={datePicker}>
      <DatePicker
        onChange={onChange}
        picker="month"
        value={value}
        suffixIcon={
          <>
            <span className="input-group-addon">
              <i className="fa fa-calendar"></i>
            </span>
          </>
        }
        allowClear={false}
        disabledDate={disabledDate}
        getPopupContainer={() => datePicker.current}
        inputReadOnly
      />
    </div>
  )
}

export default observer(BasicMonthPicker)
