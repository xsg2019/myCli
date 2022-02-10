import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@/utils/context'
import { useCurrentPage, useSetFirstCategroy, useSetCategroy } from '@/hooks'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import QMEmpty from '@/components/QMEmpty'

const MapAllList = ({ list, setVisible }) => {
  const { handleCategory, handleClass } = useSetCategroy(setVisible)
  const { t } = useTranslation()
  return (
    <>
      {list.length ? (
        list.map(item => (
          <li key={item.id}>
            <span className="name">
              <a onClick={() => handleCategory(item)}>
                {item && i18n.language === 'zh_CN' ? item.name : item.enName}
              </a>
            </span>
            {item.subList.length &&
              item.subList.map(item => (
                <a key={item.id} onClick={() => handleClass(item)}>
                  {item && i18n.language === 'zh_CN' ? item.name : item.enName}
                </a>
              ))}
          </li>
        ))
      ) : (
        <QMEmpty
          description={
            <>
              <span>{t('no_category_search')}</span>
            </>
          }
        />
      )}
    </>
  )
}

const MapFirstCateList = ({ list, setVisible }) => {
  const { handleCategory } = useSetFirstCategroy(setVisible)

  const { t } = useTranslation()

  return (
    <>
      {list.length ? (
        list.map(item => (
          <li key={item.id} className="first-categroy-list">
            <span className="first-categroy-name">
              <a onClick={() => handleCategory(item)}>
                {item && i18n.language === 'zh_CN' ? item.name : item.enName}
              </a>
            </span>
          </li>
        ))
      ) : (
        <QMEmpty
          description={
            <>
              <span>{t('no_category_search')}</span>
            </>
          }
        />
      )}
    </>
  )
}

const CategoryState = ({ list, setVisible }) => {
  const {
    setCategoryName,
    setClusterCategoryId,
    setCluterCategoryName,
    setResetCategory,
  } = useStore().appStore
  const { t } = useTranslation()
  const cluster = useCurrentPage('/home/cluster')
  const handleAllCategroy = () => {
    if (cluster) {
      setClusterCategoryId(0)
      setCluterCategoryName(t('categories'))
    } else {
      setResetCategory()
      setCategoryName(t('categories'))
    }
    setVisible(false)
  }

  return (
    <div className="listbox">
      <h3>
        <a onClick={handleAllCategroy}>{t('categories')}</a>
      </h3>
      <ul className="left yinyong none">
        {cluster ? (
          <MapFirstCateList list={list} setVisible={setVisible} />
        ) : (
          <MapAllList list={list} setVisible={setVisible} />
        )}
      </ul>
    </div>
  )
}

export default observer(CategoryState)
