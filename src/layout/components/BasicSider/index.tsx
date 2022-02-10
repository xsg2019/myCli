import React, { memo, useCallback, useEffect } from 'react'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import cx from 'classnames'
import BasicMenu from '../BasicMenu'
import './style.less'
import { IMenus } from '@/types'

const { Sider } = Layout

interface IProps {
  collapsed: boolean
  toggleCollapsed: (key: boolean) => void
  light: boolean
  menus: IMenus[]
  isDetail?: boolean
}

const BasicSider = (props: IProps) => {
  const { collapsed, toggleCollapsed, light, menus, isDetail } = props

  useEffect(
    () => () => {
      toggleCollapsed(false)
    },
    []
  )

  const ToggleBtn = ({ light }) => {
    return (
      <div
        className={cx(
          { 'light--background': light },
          { 'dark--background': !light },
          'triggerwrap',
          { 'trigger-center': collapsed },
          { 'trigger-right': !collapsed }
        )}
      >
        <span className="trigger" onClick={() => toggleCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
      </div>
    )
  }

  return (
    <div className={light ? 'qm-light-sider qm-sider-toggle' : 'qm-dark-sider qm-sider-toggle'}>
      <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={50} width={220}>
        <ToggleBtn light={light} />
        <BasicMenu light={light} isDetail={isDetail} collapsed={collapsed} menus={menus} />
      </Sider>
    </div>
  )
}

export default memo(BasicSider)
