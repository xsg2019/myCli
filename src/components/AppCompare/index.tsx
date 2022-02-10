import React, { useRef } from 'react'
import { Button, Drawer } from 'antd'
import './style.less'
import Content from './Content'
import Title from './Title'
import { useStore } from '@/utils/context'
import { useTranslation } from 'react-i18next'

const AppCompare = () => {
  const { isAppCompareBox, toggleAppCompareBox } = useStore().appStore

  const onChange = val => {
    toggleAppCompareBox(val)
  }

  const { t } = useTranslation()

  const appCompare = useRef(null)

  return (
    <div className="appButton" ref={appCompare}>
      <Button onClick={() => toggleAppCompareBox(!isAppCompareBox)} data-tut="step3">
        <i className="icon iconfont icon-vs1"></i>
        {t('app_comparison')}
      </Button>
      <Drawer
        title={<Title onChange={flag => toggleAppCompareBox(flag)} />}
        placement="right"
        closable={false}
        onClose={() => onChange(false)}
        visible={isAppCompareBox}
        className="appCompare"
        mask={false}
        style={{ height: 380 }}
      >
        <Content />
      </Drawer>
    </div>
  )
}

export default AppCompare
