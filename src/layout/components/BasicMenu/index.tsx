import React, { memo, useEffect, useMemo, useState } from 'react'
import { Menu } from 'antd'
import './style.less'
import { useLocation, Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { sesstion } from '@/utils/storage'
import { observer } from 'mobx-react'
import { useStore } from '@/utils/context'
import { useCurrentPage } from '@/hooks'

const BasicMenu = props => {
  const { changeLevel, changeClusterLevel, changeQualityType } = useStore().appStore
  const { collapsed, light, menus, isDetail } = props
  const { t } = useTranslation()
  const location = useLocation()
  const { push } = useHistory()

  const isCompany = useCurrentPage('/company')

  const url: string = location.pathname.substr(0, location.pathname.lastIndexOf('/'))

  const defaultopenKeys = url => {
    if (isDetail) {
      return url.substr(0, url.lastIndexOf('/'))
    }
    return url
  }
  const { companyId, companyName } = useStore().comparisonStore

  const openKeysLink = key => {
    if (isDetail) {
      return key + '/' + sesstion.get('appid') + '?flag=' + sesstion.get('flag')
    }
    if (isCompany) {
      return key + '?companyId=' + companyId + '&name=' + companyName
    }
    return key
  }

  const [openKeys, setOpenKeys] = useState([defaultopenKeys(url)])
  const [selectedKeys, setSelectedKeys] = useState([])

  useEffect(() => {
    const { pathname } = location
    getPath(pathname)
    if (collapsed) {
      setOpenKeys([])
    }
  }, [location.pathname])

  useEffect(() => {
    if (!collapsed) {
      setOpenKeys([defaultopenKeys(url)])
    } else {
      setOpenKeys([])
    }
  }, [collapsed])

  const getPath = pathname => {
    setSelectedKeys([defaultopenKeys(pathname)])
    setOpenKeys([defaultopenKeys(url)])
  }

  const onOpenChange = openKeys => {
    // 此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    if (openKeys.length === 0 || openKeys.length === 1) {
      setOpenKeys(openKeys)
      return
    }

    // 最新展开的菜单
    const latestOpenKey = openKeys[openKeys.length - 1]

    if (latestOpenKey.includes(openKeys[0])) {
      setOpenKeys(openKeys)
    } else {
      setOpenKeys([latestOpenKey])
    }
  }
  const renderMenuItem = ({ key, Icon, title }) => (
    <Menu.Item
      key={key}
      onClick={() => {
        push(openKeysLink(key))
      }}
      data-key={t(title, { lng: 'zh_CN' })}
    >
      <a>
        <Icon />
        <span>{t(title)}</span>
      </a>
    </Menu.Item>
  )
  const renderSubMenu = ({ key, Icon, title, subs, isNew = false }) => (
    <Menu.SubMenu
      popupClassName={light ? 'qm-light-popup' : 'qm-dark-popup'}
      key={key}
      data-key={t(title, { lng: 'zh_CN' })}
      title={
        <>
          <Icon />
          <span>{t(title)}</span>

          {isNew && !collapsed ? (
            <img
              className="qm-module--newImage"
              src={require('../../../../public/images/ico-new.svg')}
              alt=""
              height="15"
            />
          ) : null}
        </>
      }
    >
      {collapsed ? (
        <Menu.ItemGroup title={t(title)}>
          {subs &&
            subs.map(item =>
              item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
            )}
        </Menu.ItemGroup>
      ) : (
        subs &&
        subs.map(item =>
          item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
        )
      )}
    </Menu.SubMenu>
  )
  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={(key: any) => {
        if (key.key === selectedKeys[0]) return
        setSelectedKeys([key.key])
        changeLevel(1)
        changeClusterLevel(1)
        changeQualityType(0)
      }}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      theme={light ? 'light' : 'dark'}
      mode={collapsed ? 'vertical' : 'inline'}
    >
      {menus &&
        menus.map(item =>
          item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
        )}
    </Menu>
  )
}

export default memo(observer(BasicMenu))
