import React, { useState, useEffect, useRef, FC } from 'react'
import './style.less'
import { Menu, Dropdown, Button, message, Modal, notification } from 'antd'
import { CaretDownOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import Axios from 'axios'
import { storage } from '@/utils/storage'
import ProductListInfo from '@/utils/product-apply'
import i18n from '@/i18n'

const userId = storage.get('truth-current-user') && storage.get('truth-current-user').userId

const FetchData = () => {
  return Axios.get(`/api/truth-admin-crm/product/auth/${userId}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: 'Basic dHJ1dGg6dHJ1dGhfc2VjcmV0',
      'Truth-Auth': `bearer ${storage.get('truth-token')}`,
      'Cache-Control': 'no-cache',
    },
  })
}

const FetchTrial = params => {
  return Axios.post('/api/truth-admin-crm/client/email/apply-trial', params, {
    headers: {
      'content-type': 'application/json',
      Authorization: 'Basic dHJ1dGg6dHJ1dGhfc2VjcmV0',
      'Truth-Auth': `bearer ${storage.get('truth-token')}`,
      'Cache-Control': 'no-cache',
    },
  })
}

const FULLVIEW = 24
const FLASH = 11
const Professional = 10
const MINI_PROGRAM = 20
const DarkHorseList = 17

// prettier-ignore
const isEnList = item => item.id === Professional || item.id === FLASH || item.id === MINI_PROGRAM || item.id === FULLVIEW || item.id === DarkHorseList

const NavDropdown: FC = () => {
  const container = useRef(null)
  const [visible, setVisble] = useState(false)
  const [prodList, setProdList] = useState([])
  const { t } = useTranslation()
  const [modalTitle, setModalTitle] = useState('')
  const [record, setRecord] = useState(null)

  const getProductList = async () => {
    const { data } = await FetchData()
    let tempNoProds
    let tempProds

    if (i18n.language === 'zh_CN') {
      tempNoProds = data.data.noProds
        .filter(item => item.sort !== -1)
        .map(item => ({ ...item, disabled: true }))
      tempProds = data.data.ownProds
        .filter(item => item.sort !== -1)
        .map(item => ({ ...item, disabled: false }))
    } else {
      tempNoProds = data.data.noProds
        .filter(item => isEnList(item))
        .map(item => ({ ...item, disabled: true }))
      tempProds = data.data.ownProds
        .filter(item => isEnList(item))
        .map(item => ({ ...item, disabled: false }))
    }

    setProdList(
      [...tempProds, ...tempNoProds]
        .sort((x, y) => x.sort - y.sort)
        .map(item => {
          if (item.id === Professional) {
            return { ...item, enName: 'TRUTH-Professional' }
          }
          if (item.id === FLASH) {
            return { ...item, enName: 'TRUTH-Flash' }
          }
          if (item.id === MINI_PROGRAM) {
            return { ...item, enName: 'TRUTH-Mini Program' }
          }
          if (item.id === FULLVIEW) {
            return { ...item, enName: 'TRUTH-Fullview' }
          }
          if (item.id === DarkHorseList) {
            return { ...item, enName: 'TRUTH-Dark Horse List' }
          }
          return item
        })
    )
  }

  const handleMenuClick = item => {
    if (item.disabled) {
      const tempRecord = ProductListInfo.find(item1 => item1.code === item.code)
      setModalTitle(
        (i18n.language === 'zh_CN' ? tempRecord.name : tempRecord.enName) + ' ' + t('apply_use')
      )
      setRecord(tempRecord)
      showModal()
    } else {
      window.open(item.home)
      // window.open(i18n.language === 'zh_CN' ? item.home : item.enHome)
    }
  }

  useEffect(() => {
    getProductList()
  }, [i18n.language])
  const menu = () => (
    <Menu>
      {prodList.map(item => (
        <Menu.Item
          key={item.id}
          onClick={() => handleMenuClick(item)}
          style={{ color: item.disabled ? '#949494' : '' }}
        >
          {item.disabled ? <LockOutlined /> : <UnlockOutlined />}
          <div className={cx('content-item')}>
            <b>{i18n.language === 'zh_CN' ? item.name : item.enName}</b>
            <div style={{ width: '85px', textAlign: 'right' }}>
              {item.disabled ? t('version_unaccessible') : t('version_accessible')}
            </div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  )

  const showModal = () => {
    setVisble(true)
  }

  const hideModal = () => {
    setVisble(false)
  }
  const handleSubmit = async () => {
    const { userName, userId, nickName, tenantId, tenantName } = storage.get('truth-current-user')
    const params = {
      channel: 0,
      email: userName,
      product: record.name,
      userId,
      userName: nickName,
      tenantId,
      companyName: tenantName,
    }
    //   channel=0                产品线内部渠道
    //  email=userName           邮箱
    //  product=                 产品名称
    //  userId=userId            用户ID
    //  userName=nickName        用户昵称
    //  tenantId=tenantId        公司ID
    //  companyName=tenantName   公司名称
    const data = await FetchTrial(params)
    if (data.data) {
      setVisble(false)
      notification.success({
        message: t('apply_use_success'),
      })
    } else {
      setVisble(false)
      notification.success({
        message: t('apply_use_error'),
      })
    }
  }
  return (
    <div className="navdropdonw-container" ref={container}>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="bottomRight"
        getPopupContainer={() => container.current}
      >
        <Button>
          <span className="menu-tab">{t('other_product')}</span>{' '}
          <CaretDownOutlined style={{ marginLeft: 30 }} />
        </Button>
      </Dropdown>
      <Modal
        title={modalTitle}
        visible={visible}
        onCancel={hideModal}
        centered
        width={440}
        wrapClassName="qm-modal--trial"
        footer={null}
        zIndex={10000}
      >
        <div className="tbanner">
          <img src={record && record.img} style={{ width: '100%' }} />
        </div>
        <h4>{record && (i18n.language === 'zh_CN' ? record.title : record.enTitle)}</h4>
        <ul>
          {record &&
            (i18n.language === 'zh_CN' ? record.cont : record.enCont).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
        </ul>
        <div className="btn-wrapper">
          <Button onClick={handleSubmit} size="middle" type="primary">
            {t('submit')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default NavDropdown
