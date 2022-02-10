import React from 'react'
import Highlighter from 'react-highlight-words'
import { observer } from 'mobx-react'
import { useCurrentPage, useSetCategroy, useSetFirstCategroy } from '@/hooks'
import i18n from '@/i18n'

const MapAllList = props => {
  const { keyword, setVisible, list } = props

  const { handleCategory, handleClass } = useSetCategroy(setVisible)

  return (
    <>
      {list.map(item => (
        <li key={item.id}>
          <span className="name">
            <a onClick={() => handleCategory(item)}>
              <Highlighter
                highlightClassName="active"
                searchWords={[keyword]}
                autoEscape={true}
                textToHighlight={item && i18n.language === 'zh_CN' ? item.name : item.enName}
              />
            </a>
          </span>
          {item.subList.length &&
            item.subList.map(item => (
              <a key={item.id} onClick={() => handleClass(item)}>
                <Highlighter
                  highlightClassName="active"
                  searchWords={[keyword]}
                  autoEscape={true}
                  textToHighlight={item && i18n.language === 'zh_CN' ? item.name : item.enName}
                />
              </a>
            ))}
        </li>
      ))}
    </>
  )
}

const MapFirstList = props => {
  const { keyword, setVisible, list } = props

  const { handleCategory } = useSetFirstCategroy(setVisible)

  return (
    <>
      {list.map(item => (
        <li key={item.id} className="first-categroy-list">
          <span className="first-categroy-name">
            <a onClick={() => handleCategory(item)}>
              <Highlighter
                highlightClassName="active"
                searchWords={[keyword]}
                autoEscape={true}
                textToHighlight={item && i18n.language === 'zh_CN' ? item.name : item.enName}
              />
            </a>
          </span>
        </li>
      ))}
    </>
  )
}

// 大分类 + 小分类
const SearchState = props => {
  const cluster = useCurrentPage('/home/cluster')
  return (
    <div className="listbox searchcont">
      <ul className="left yinyong none">
        {cluster ? <MapFirstList {...props} /> : <MapAllList {...props} />}
      </ul>
    </div>
  )
}

export default observer(SearchState)
