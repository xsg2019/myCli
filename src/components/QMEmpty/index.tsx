import React, { FC } from 'react'
import { Empty } from 'antd'

interface IQMEmpty {
  description?: string | React.ReactNode
  style?: React.CSSProperties
  noImage?: boolean
}

const QMEmpty: FC<IQMEmpty> = ({ description = '暂无数据', style, noImage }: IQMEmpty) => {
  return (
    <Empty
      style={style}
      image={noImage ? false : require('public/images/nodata.svg')}
      description={description}
    />
  )
}

export default QMEmpty
