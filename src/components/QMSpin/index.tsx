import React, { FC } from 'react'
import { Spin } from 'antd'
import './style.less'
import Loading from '../Loading'

export interface IQMSpin {
  spinning?: boolean
  children?: React.ReactNode
  size?: size
}

export type size = 'large' | 'small'

const QMSpin: FC<IQMSpin> = (props: IQMSpin) => {
  const { spinning = true, children, size } = props
  return (
    <Spin spinning={spinning} indicator={<Loading size={size} />}>
      {children}
    </Spin>
  )
}

export default QMSpin
