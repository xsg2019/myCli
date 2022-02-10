import React, { useState, useRef, FC } from 'react'
import { Input, Select, Button, Divider } from 'antd'
import './style.less'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { clearNoNum, handleCustomRange, handleEnNumTen } from '@/utils'
import { CaretDownOutlined } from '@ant-design/icons'
import { useOnClickOutside, usePrevious } from '@/hooks'

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
    value = value.replace(/\D/g, '')
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

interface IClusterSelect {
  collapsed?: boolean
}

const ClusterSelect: FC<IClusterSelect> = ({ collapsed }: IClusterSelect) => {
  const dropdown = useRef()
  const { t } = useTranslation()

  const xmenus = [
    {
      id: 1,
      title: t('label_all'),
    },
    {
      id: 4,
      title: t('above_1'),
    },
    {
      id: 5,
      title: t('above_5'),
    },
    {
      id: 6,
      title: t('above_10'),
    },
    {
      id: 7,
      title: t('above_50'),
    },
    {
      id: 8,
      title: t('above_100'),
    },
    {
      id: 9,
      title: t('page_custom_range'),
    },
  ]

  const {
    changeClusterLevel,
    changeBeginNum,
    changeEndNum,
    clusterLevel,
    beginNum,
    endNum,
    clusterLevelTitle,
    ForceUpdate,
    setCurrentPage,
  } = useStore().appStore
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(clusterLevel)

  let curOptions = ''

  React.useEffect(() => {
    setData(clusterLevel)
  }, [clusterLevel])

  React.useEffect(() => {
    return () => {
      changeBeginNum(0)
      changeEndNum(0)
      changeClusterLevel(1)
    }
  }, [])

  React.useEffect(() => {
    if (clusterLevel === 9 && beginNum !== 0 && endNum !== 0) {
      const el = document.querySelector('.app-growth-selector .ant-select-selection-item')
      el.innerHTML = `${handleEnNumTen(Number(beginNum))} ~ ${handleEnNumTen(Number(endNum))}${t(
        'unit_million_peoples'
      )}`
    }
  }, [beginNum, endNum, clusterLevel])

  const handleChange = val => {
    if (val === data) return
    if (val === 9) {
      curOptions = t('page_custom_range')
      setData(val)
      changeClusterLevel(val)
      return
    } else {
      curOptions = ''
    }
    setData(val)
    changeClusterLevel(val)
    setCurrentPage(1)
    ForceUpdate()
  }

  const onChange = (start, end) => {
    changeBeginNum(handleCustomRange(Number(start)))
    changeEndNum(handleCustomRange(Number(end)))
    ForceUpdate()
  }

  const handleVisible = open => {
    if (curOptions === t('page_custom_range')) {
      setVisible(true)
    } else {
      setVisible(open)
    }
  }
  const prevLevel = usePrevious(data)
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
      {t(clusterLevelTitle)}：
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
              <CustomInput setVisible={setVisible} onChange={onChange} level={clusterLevel} />
            </div>
          </div>
        )}
      >
        {xmenus.map((item, i) => (
          <Option key={i} value={item.id}>
            {item.title}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default observer(ClusterSelect)
