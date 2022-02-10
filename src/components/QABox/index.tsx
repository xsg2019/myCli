import React, { useState } from 'react'
import { Modal, Tooltip } from 'antd'
import './style.less'
import i18n from '@/i18n'

const QABox = () => {
  const [visible, setVisible] = useState(false)
  // 0：建议 1：反馈
  const [boxType, setBoxType] = useState(0)

  const showModal = (type: 'suggest' | 'feedback') => {
    if (type === 'suggest') {
      setBoxType(0)
    } else {
      setBoxType(1)
    }
    setVisible(true)
  }

  const handleOk = e => {
    setVisible(false)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const SuggestContent = () => (
    <>
      <p>{i18n.t('page_to_bug_info')}</p>
      <p>{i18n.t('page_to_bug_info_two')}</p>
      <p className="ico">
        <span>
          <i className="fa fa-exclamation-circle"></i>
        </span>
      </p>
      <p className="mail">
        <a href="mailto:vip@questmobile.com.cn" target="_blank">
          vip@questmobile.com.cn
        </a>
      </p>
    </>
  )

  const FeedbackContent = () => (
    <>
      <p>{i18n.t('footer_info')}</p>
      <dl>
        <dt>
          <p className="step1">{i18n.t('footer_send_email')}</p>
          <p className="step1-mail">
            <img src="https://cdn.questmobile.cn/ui/truth/images/mail.svg" width="90" alt="" />
          </p>
          <p>
            <a href="mailto:databug@questmobile.com.cn" target="_blank">
              databug@questmobile.com.cn
            </a>
          </p>
        </dt>
        <dd>
          <p className="step2">{i18n.t('footer_scan')}</p>
          <p>
            <img
              src="https://cdn.questmobile.cn/ui/truth/images/ma.png"
              width="160"
              alt={i18n.t('questMobile_QR_code')}
            />
          </p>
        </dd>
      </dl>
    </>
  )

  return (
    <div className="qm-qabox">
      <Tooltip placement="left" title={i18n.t('page_to_bug')}>
        <div className="suggest-box" onClick={() => showModal('suggest')}>
          <i className="fa fa-exclamation-circle" />
        </div>
      </Tooltip>
      <Tooltip placement="left" title={i18n.t('page_customer_service')}>
        <div className="feedback-box" onClick={() => showModal('feedback')}>
          <i className="fa fa-commenting" />
        </div>
      </Tooltip>
      <Modal
        title={boxType === 0 ? i18n.t('page_to_bug') : i18n.t('page_customer_service')}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        zIndex={10000}
        centered
        footer={null}
      >
        {boxType === 0 ? <SuggestContent /> : <FeedbackContent />}
      </Modal>
    </div>
  )
}

export default QABox
