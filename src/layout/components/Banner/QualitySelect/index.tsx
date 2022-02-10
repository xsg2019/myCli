import React, { useState, useRef, FC } from 'react'
import { Select, Divider } from 'antd'
import './style.less'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { clusterActiveTypesKey } from '@/constants'
import { CaretDownOutlined } from '@ant-design/icons'

const { Option } = Select

interface IQualitySelect {
  collapsed?: boolean
}

const QualitySelect: FC<IQualitySelect> = ({ collapsed }: IQualitySelect) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const menus = [
    { title: t('label_all'), id: 0 },
    ...clusterActiveTypesKey.map((item, i, arr) => {
      return { title: item, id: arr.length - i }
    }),
  ]

  const {
    qualityType,
    clusterLevelTitle,
    changeQualityType,
    ForceUpdate,
    setCurrentPage,
  } = useStore().appStore

  const dropdown = useRef()
  return (
    <div className="app-growth-selector" style={{ left: collapsed ? 70 : 245 }} ref={dropdown}>
      {t(clusterLevelTitle)}：
      <Select
        getPopupContainer={() => dropdown.current}
        value={qualityType}
        open={visible}
        listHeight={5000}
        onDropdownVisibleChange={open => setVisible(open)}
        suffixIcon={
          <>
            <Divider type="vertical" className="qm-level--select" />
            <CaretDownOutlined
              style={{ verticalAlign: 'middle' }}
              onClick={() => setVisible(!visible)}
            />
          </>
        }
        onChange={val => {
          changeQualityType(val)
          setCurrentPage(1)
          ForceUpdate()
        }}
      >
        {menus.map((item, i) => (
          <Option key={i} value={item.id}>
            {item.title}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default observer(QualitySelect)
