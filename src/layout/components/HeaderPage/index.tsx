import React, { FC } from 'react'
import './style.less'
import { Layout, Row, Col, Divider } from 'antd'
import NavIconGroup from './components/NavIconGroup'
import Logo from './components/Logo'
import NavSearch from './components/NavSearch'
import NavDropdown from './components/NavDropdown'
import { useTranslation } from 'react-i18next'

const { Header } = Layout

const HeaderPage: FC = () => {
  const { t } = useTranslation()
  return (
    <Header className="header">
      <Row>
        <Col span={5}>
          <Logo logoImage={t('logo')} />
        </Col>
        <Col span={6} style={{ position: 'absolute', left: 255 }}>
          <NavSearch />
        </Col>
        <Col style={{ position: 'absolute', right: 20 }}>
          <Row>
            <Col>
              <NavIconGroup />
            </Col>
            <Col style={{ textAlign: 'center', margin: '0 10px' }}>
              <Divider
                type="vertical"
                style={{
                  background: 'none',
                  height: 32,
                  borderLeft: '1px dotted rgb(89, 82, 86)',
                  marginTop: 3,
                }}
              />
            </Col>
            <Col>
              <NavDropdown />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default HeaderPage
