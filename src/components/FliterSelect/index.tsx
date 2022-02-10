import React, { FC } from 'react'
import { Radio } from 'antd'
import './style.less'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { useStore } from '@/utils/context'

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '0',
}

interface IFliterSelect {
  menus?: string[]
  date?: string
  confirm?: any
  onChange?: (e: any, date: string) => void
  orderName?: any
  setOrderName?: any
  isReserver?: boolean
  setSelectedKeys?: (e: any) => void
  clearFilters?: () => void
  tabkey: string
  radio: number
  setCurrentPage: (page: number) => void
}

let tempObj = []

const FliterSelect: FC<IFliterSelect> = ({
  menus,
  date,
  confirm,
  setSelectedKeys,
  setOrderName,
  clearFilters,
  isReserver = false,
  orderName,
  setCurrentPage,
}: IFliterSelect) => {
  const { t } = useTranslation()
  const {
    isDataEmpty,
    changeDateFilter,
    dateFilter,
    toggleDataEmpty,
    ForceUpdate,
  } = useStore().appStore
  const [val, setVal] = React.useState(
    menus[0] === t('all_user_quality_analysis_pattern') || menus[0] === t('all_growth_pattern')
      ? 0
      : isReserver
      ? menus.length
      : 0
  )

  const ref = React.useRef(val)
  const onChange1 = e => {
    ref.current = val
    changeDateFilter(date)
    const value = e.target.value
    setVal(value)
    toggleDataEmpty(false)
    tempObj[date] = value
    let arr = []
    for (let key in tempObj) {
      arr.push(key + '_' + tempObj[key])
    }
    setOrderName(arr.join(','))
    setSelectedKeys(value ? [value] : [])
    confirm()
    setCurrentPage(1)
    ForceUpdate()
  }

  React.useEffect(() => {
    if (isDataEmpty && dateFilter === date) {
      setVal(ref.current)
      ref.current === 0 ? clearFilters() : null
      tempObj[date] = ref.current
      let arr = []
      for (let key in tempObj) {
        arr.push(key + '_' + tempObj[key])
      }
      setOrderName(arr.join(','))
    }
  }, [isDataEmpty])

  React.useEffect(() => {
    if (orderName === '') {
      setVal(0)
      setSelectedKeys([])
      tempObj = []
    }
  }, [orderName])

  return (
    <div className="qm-table--levelselect">
      <Radio.Group onChange={onChange1} value={val}>
        {menus.map((item, i, arr) => (
          <Radio
            key={i}
            style={radioStyle}
            value={
              item === t('all_user_quality_analysis_pattern') || item === t('all_growth_pattern')
                ? 0
                : isReserver
                ? arr.length - i
                : i
            }
          >
            {item}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  )
}

export default observer(FliterSelect)
