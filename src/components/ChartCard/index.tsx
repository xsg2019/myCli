import React from 'react'
import { Card, Spin } from 'antd'
import './style.less'
import EchartsHooks from '@/components/EchartsHooks'
import EmptyState from '@/components/ContentEmpty'
import LazyLoad from 'react-lazyload'
import QMSpin from '../QMSpin'
import { useWaterMark } from '@/hooks'

interface ChartCardProp {
  width?: number | string
  height?: number | string
  option?: any
  title?: string
  help?: React.ReactNode
  style?: React.CSSProperties
  chartsStyle?: React.CSSProperties
  loading: boolean
  collapsed: boolean
  hasData?: boolean
  extra?: any
}

const ChartCard: React.FC<ChartCardProp> = (props: ChartCardProp) => {
  const {
    width = '100%',
    height = null,
    option = null,
    chartsStyle,
    title,
    help = null,
    style,
    loading,
    collapsed,
    hasData,
    extra,
  } = props

  const mark = useWaterMark()

  const defalutStyle = {
    width,
    height,
    marginBottom: '10px',
    ...style,
  }
  return (
    <Card
      title={
        <div className="qm-card--title">
          <span>
            <i className="fa fa-dot-circle-o"></i>
            {title}
          </span>
          {extra}
        </div>
      }
      extra={help}
      style={defalutStyle}
    >
      <QMSpin spinning={loading}>
        {!hasData ? (
          <EmptyState />
        ) : (
          <div ref={mark}>
            <LazyLoad height={200} once>
              <EchartsHooks option={option} collapsed={collapsed} style={chartsStyle} />
            </LazyLoad>
          </div>
        )}
      </QMSpin>
    </Card>
  )
}

export default ChartCard
