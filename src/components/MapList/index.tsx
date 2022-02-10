import React, { ReactElement } from 'react'

interface MapList<T> {
  list: T[]
  renderItem: (item: T) => React.ReactNode
}

function MapList<T>({ list, renderItem }: MapList<T>): ReactElement<MapList<T>> {
  return <>{list.map(renderItem)}</>
}

export default MapList
