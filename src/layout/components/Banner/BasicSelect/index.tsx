import React, { useRef, useState, FC } from 'react'
import { Select, Divider } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { useCurrentPage } from '@/hooks'
const { Option } = Select

interface IBasicSelect {
  noiOSAndAndroid: boolean
  noiOS: boolean
  noAndroid: boolean
}

const BasicSelect: FC<Partial<IBasicSelect>> = (props: Partial<IBasicSelect>) => {
  const dropdown = useRef(null)
  const { noiOSAndAndroid, noiOS, noAndroid } = props
  const { dsType, changeDsType } = useStore().appStore
  const { isSmallApp } = useStore().detailStore
  const details = useCurrentPage('/details')
  const [open, setOpen] = useState(false)
  if (isSmallApp && details) {
    if (dsType !== 0) {
      changeDsType(0)
    }
  }
  function handleChange(value) {
    changeDsType(value)
  }

  return (
    <div className="dropdown-wrapper system-dropdown" ref={dropdown}>
      <Select
        value={dsType}
        style={{
          marginTop: 6,
          height: 28,
          fontSize: 12,
        }}
        getPopupContainer={() => dropdown.current}
        onChange={handleChange}
        open={open}
        onDropdownVisibleChange={open => setOpen(open)}
        suffixIcon={
          <>
            <Divider type="vertical" className="qm-ostype--divider" />
            <CaretDownOutlined onClick={() => setOpen(!open)} />
          </>
        }
        dropdownAlign={{
          points: ['tr', 'cr'],
          offset: [0, 15],
        }}
      >
        {noiOSAndAndroid ? null : (
          <Option value={0}>
            <i className="iconfont icon-iOS" /> iOS &amp; <i className="iconfont icon-android" />{' '}
            Android
          </Option>
        )}
        {isSmallApp && details ? null : (
          <Option value={2}>
            <i className="iconfont icon-iOS" /> iOS
          </Option>
        )}
        {isSmallApp && details ? null : (
          <Option value={1}>
            <i className="iconfont icon-android" /> Android
          </Option>
        )}
      </Select>
    </div>
  )
}
export default observer(BasicSelect)
