import i18n from '@/i18n'
import store from '@/store/homeStore'
import { setStorage } from '@/utils'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './style.less'

const VerificationCode = () => {
  const {
    verificationType,
    setVerificationType,
    verificationRefresh,
    setVerificationRefresh,
  } = useStore().homeStore

  useEffect(() => {
    // @ts-ignore
    // prettier-ignore
    initNECaptcha && initNECaptcha({
        captchaId: "934304e859db401cb1bba7f4ad2fe659",
        element: "#captchaText",
        mode: "embed",
        width: "320px",
        lang: i18n.language === "zh_CN" ? "zh-CN" : "en",
        onVerify: function (err) {
          if (!err) {
            setStorage("truth-flash", "frequency", false);
            setVerificationRefresh(!verificationRefresh);
            setVerificationType(false);
          }
        },
      });
  }, [verificationType])
  return (
    <div
      className="qm-verificationCcode--box"
      style={{ display: verificationType ? 'block' : 'none' }}
    >
      <div className="cont">
        <div className="t">
          <h4>{i18n.t('captcha_operation')}</h4>
          <a className="bnclose" onClick={() => setVerificationType(false)}>
            <i className="fa fa-close"></i>
          </a>
        </div>
        <div id="captchaText"></div>
      </div>
    </div>
  )
}

export default observer(VerificationCode)
