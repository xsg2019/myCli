import React, { FC } from 'react'
import { Radio, Tooltip } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import './style.less'

export interface ITabList {
  key: number
  title: string
  desc?: string
}

interface IRadioTab {
  list: ITabList[]
  onChange: (e: RadioChangeEvent) => void
  initValue?: number
  hasToolTip?: boolean
}
const RadioTab: FC<IRadioTab> = ({
  list,
  onChange,
  initValue,

  hasToolTip = false,
}: IRadioTab) => {
  return (
    <div className="qm-radio--container">
      <Radio.Group defaultValue={initValue || list[0].key} buttonStyle="solid" onChange={onChange}>
        {list.map(item => {
          if (hasToolTip) {
            return (
              <Tooltip placement="top" title={item.desc} key={item.key}>
                <Radio.Button value={item.key}>{item.title}</Radio.Button>
              </Tooltip>
            )
          } else {
            return (
              <Radio.Button key={item.key} value={item.key}>
                {item.title}
              </Radio.Button>
            )
          }
        })}
      </Radio.Group>
    </div>
  )
}

export default RadioTab
