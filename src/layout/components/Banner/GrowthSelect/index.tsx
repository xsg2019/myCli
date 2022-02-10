import React, { useState, useRef, FC } from 'react'
import { Input, Select, Button, Divider } from 'antd'
import './style.less'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { useCurrentPage, useOnClickOutside, usePrevious } from '@/hooks'
import { clearNoNum, handleCustomRange, handleEnNumTen } from '@/utils'
import { CaretDownOutlined } from '@ant-design/icons'

const { Option } = Select

const CustomInput = ({ setVisible, onChange, level }) => {
  const [startVal, setStartVal] = useState('')
  const [endVal, setEndVal] = useState('')
  const [errormsg, setErrormsg] = useState(false)
  const { t } = useTranslation()
  const handleStartVal = e => {
    let { value } = e.target
    if (errormsg) {
      setErrormsg(false)
    }

    setStartVal(clearNoNum(value))
  }
  const handleEndVal = e => {
    let { value } = e.target
    if (errormsg) {
      setErrormsg(false)
    }
    setEndVal(clearNoNum(value))
  }
  React.useEffect(() => {
    if (level !== 9) {
      setEndVal('')
      setStartVal('')
    }
  }, [level])
  const handleOk = () => {
    if (Number(startVal) < Number(endVal)) {
      onChange(startVal, endVal)
      setVisible(false)
    } else {
      setErrormsg(true)
    }
  }
  return (
    <div className="qm-custom--seleted__container">
      <div className="qm-custom--seleted__inner">
        <Input className="select-input--start" onChange={handleStartVal} value={startVal} />
        <span className="to"> ~ </span>
        <Input className="select-input--end" onChange={handleEndVal} value={endVal} />
        <span className="dw">{t('unit_million_peoples')}</span>
      </div>
      <div className="inputerror" style={{ display: errormsg ? 'block' : 'none' }}>
        {t('correct_value_range')}
      </div>
      <div className="button">
        <Button type="primary" size="small" onClick={handleOk}>
          {t('input_submit')}
        </Button>
      </div>
    </div>
  )
}

interface IGrowthSelect {
  collapsed?: boolean
}
let curOptions = ''
const GrowthSelect: FC<IGrowthSelect> = ({ collapsed }: IGrowthSelect) => {
  const dropdown = useRef()
  const { t } = useTranslation()
  const yoy = useCurrentPage('/home/growth/growth-yoy')
  const mom = useCurrentPage('/home/growth/growth-mom')
  const compound = useCurrentPage('/home/growth/growth-compound')
  let title = ''
  if (yoy) {
    title = t('page_range_monthly_dau')
  }
  if (mom) {
    title = t('page_range_monthly_dau')
  }
  if (compound) {
    title = t('page_range_monthly')
  }

  const menus = [
    t('PW_BX'),
    t('PW_0_1_W'),
    t('PW_1_2_W'),
    t('PW_2_3_W'),
    t('PW_3_4_W'),
    t('PW_4_5_W'),
    t('PW_5_6_W'),
    t('PW_100W'),
    t('page_custom_range'),
  ]

  const {
    changeLevel,
    level,
    changeBeginNum,
    changeEndNum,
    beginNum,
    endNum,
    ForceUpdate,
  } = useStore().appStore
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(level)
  const handleChange = val => {
    if (val === data) return
    if (val === 9) {
      curOptions = t('page_custom_range')
      setData(val)
      changeLevel(val)
      return
    } else {
      curOptions = ''
    }
    setData(val)
    changeLevel(val)
    ForceUpdate()
  }

  const prevLevel = usePrevious(data)

  React.useEffect(() => {
    setData(level)
    changeBeginNum(0)
    changeEndNum(0)
  }, [level])

  const onChange = (start, end) => {
    changeBeginNum(handleCustomRange(Number(start)))
    changeEndNum(handleCustomRange(Number(end)))
    ForceUpdate()
  }

  // React.useEffect(() => {
  //   return () => {
  //     return () => {
  //       changeBeginNum(0);
  //       changeEndNum(0);
  //       changeLevel(1);
  //     };
  //   };
  // }, []);

  React.useEffect(() => {
    if (level === 9 && beginNum !== 0 && endNum !== 0) {
      const el = document.querySelector('.app-growth-selector .ant-select-selection-item')

      el.innerHTML = `${handleEnNumTen(Number(beginNum))} ~ ${handleEnNumTen(Number(endNum))}${t(
        'unit_million_peoples'
      )}`
    }
  }, [beginNum, endNum, level])

  const handleVisible = open => {
    if (curOptions === t('page_custom_range')) {
      setVisible(true)
    } else {
      setVisible(open)
    }
  }

  useOnClickOutside(dropdown, () => {
    if (!beginNum && !endNum) {
      if (prevLevel && data === 9) {
        setData(prevLevel)
      }
    }
    setVisible(false)
  })

  return (
    <div className="app-growth-selector" style={{ left: collapsed ? 70 : 245 }} ref={dropdown}>
      {title}：
      <Select
        getPopupContainer={() => dropdown.current}
        value={data}
        dropdownMatchSelectWidth={150}
        onDropdownVisibleChange={open => handleVisible(open)}
        open={visible}
        onSelect={handleChange}
        suffixIcon={
          <>
            <Divider type="vertical" className="qm-level--select" />
            <CaretDownOutlined
              style={{ verticalAlign: 'middle' }}
              onClick={() => setVisible(!visible)}
            />
          </>
        }
        dropdownRender={menu => (
          <div>
            {menu}
            <div style={{ display: data === 9 ? 'block' : 'none' }}>
              <Divider style={{ margin: '4px 0' }} />
              <CustomInput setVisible={setVisible} onChange={onChange} level={level} />
            </div>
          </div>
        )}
      >
        {menus.map((item, i) => (
          <Option key={i} value={i + 1}>
            {item}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default observer(GrowthSelect)
