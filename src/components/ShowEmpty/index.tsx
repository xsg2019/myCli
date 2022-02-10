import React, { FC } from 'react'
import EmptyState from '../ContentEmpty'
import QMSpin from '../QMSpin'

interface IShowEmpty {
  hasData: boolean
  children: React.ReactNode
  loading?: boolean
}

const ShowEmpty: FC<IShowEmpty> = (props: IShowEmpty) => {
  const { hasData, children, loading } = props
  return (
    <>
      <div style={{ display: hasData ? 'block' : 'none' }}>
        <QMSpin spinning={loading}>{children}</QMSpin>
      </div>
      <div style={{ display: !hasData ? 'block' : 'none' }}>
        <QMSpin spinning={loading}>
          <EmptyState />
        </QMSpin>
      </div>
    </>
  )
}

export default ShowEmpty
