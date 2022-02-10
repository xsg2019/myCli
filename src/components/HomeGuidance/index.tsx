import { useCurrentPage } from '@/hooks'
import i18n from '@/i18n'
import { Button } from 'antd'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import React, { useEffect, useState } from 'react'
import Tour, { ReactourStep } from 'reactour'
import api from '@/api'
import './style.less'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'

const { FetchGuide, FetchUpdateGuide } = api

const accentColor = '#ffbe14'

const guidanceClass = 'qm-guidance--container'

const homeTourConfig: ReactourStep[] = [
  {
    selector: '[data-tut="step0"]',
    content: function DemoHelperComponent({ goTo }) {
      return <div></div>
    },
  },
  {
    selector: '[data-tut="step1"]',
    position: 'left',
    content: function DemoHelperComponent({ goTo }) {
      return (
        <div className={guidanceClass}>
          <img src={require('public/images/ico/ico-step-1.png')} alt="" />
          <div dangerouslySetInnerHTML={{ __html: i18n.t('index_step_1') }}></div>
          <Button
            type="primary"
            onClick={() => {
              goTo(2)
            }}
          >
            {i18n.t('next')}
          </Button>
        </div>
      )
    },
  },
  {
    selector: '[data-tut="step2"]',
    content: function DemoHelperComponent({ goTo }) {
      return (
        <div className={guidanceClass}>
          <img src={require('public/images/ico/ico-step-2.png')} alt="" />
          <div dangerouslySetInnerHTML={{ __html: i18n.t('index_step_2') }}></div>
          <Button
            type="primary"
            onClick={() => {
              goTo(3)
            }}
          >
            {i18n.t('next')}
          </Button>
        </div>
      )
    },
  },

  {
    selector: '[data-tut="step3"]',
    content: function DemoHelperComponent({ goTo }) {
      return (
        <div className={guidanceClass}>
          <img src={require('public/images/ico/ico-step-3.png')} alt="" />
          <div dangerouslySetInnerHTML={{ __html: i18n.t('index_step_3') }}></div>
          <Button
            type="primary"
            onClick={() => {
              goTo(4)
            }}
          >
            {i18n.t('next')}
          </Button>
        </div>
      )
    },
  },
  {
    selector: '[data-tut="step4"]',
    content: function DemoHelperComponent({ close }) {
      return (
        <div className={guidanceClass}>
          <img src={require('public/images/ico/ico-step-4.png')} alt="" />
          <div dangerouslySetInnerHTML={{ __html: i18n.t('index_step_4') }}></div>

          <Button type="primary" onClick={close}>
            {i18n.t('finish')}
          </Button>
        </div>
      )
    },
  },
]

const completeGuide = async (type: Guide, close: () => void) => {
  const { data } = await FetchUpdateGuide({ guide: type })
  if (data) {
    close()
  }
}

let collectTourConfig1: ReactourStep[] = [
  {
    selector: '[data-tut="step5"]',
    position: 'right',
    content: function DemoHelperComponent({ goTo }) {
      return (
        <div className={guidanceClass}>
          <img src={require('public/images/ico/ico-step-5.png')} alt="" />
          <div dangerouslySetInnerHTML={{ __html: i18n.t('collect_step_1') }}></div>
          <Button
            type="primary"
            onClick={() => {
              goTo(1)
            }}
          >
            {i18n.t('next')}
          </Button>
        </div>
      )
    },
  },
  {
    selector: '[data-tut="step6"]',
    content: function DemoHelperComponent({ goTo }) {
      return (
        <div className={guidanceClass}>
          <img src={require('public/images/ico/ico-step-6.png')} alt="" />
          <div dangerouslySetInnerHTML={{ __html: i18n.t('collect_step_2') }}></div>
          <Button
            type="primary"
            onClick={() => {
              goTo(2)
            }}
          >
            {i18n.t('next')}
          </Button>
        </div>
      )
    },
  },

  {
    selector: '[data-tut="step7"]',
    content: function DemoHelperComponent({ goTo }) {
      return (
        <div className={guidanceClass}>
          <img src={require('public/images/ico/ico-step-7.png')} alt="" />
          <div dangerouslySetInnerHTML={{ __html: i18n.t('collect_step_3') }}></div>
          <Button
            type="primary"
            onClick={() => {
              goTo(3)
            }}
          >
            {i18n.t('next')}
          </Button>
        </div>
      )
    },
  },
  {
    selector: '[data-tut="step8"]',
    content: function DemoHelperComponent({ close }) {
      return (
        <div className={guidanceClass}>
          <img src={require('public/images/ico/ico-step-8.png')} alt="" />
          <div dangerouslySetInnerHTML={{ __html: i18n.t('collect_step_4') }}></div>

          <Button type="primary" onClick={close}>
            {i18n.t('finish')}
          </Button>
        </div>
      )
    },
  },
]

export type Guide = 'index' | 'watch'

const Guidance = ({ hasList = false }) => {
  const [collectTourConfig, setCollectTourConfig] = useState(collectTourConfig1)

  const disableBody = target => disableBodyScroll(target)
  const enableBody = target => enableBodyScroll(target)

  useEffect(() => {
    if (!hasList) {
      setCollectTourConfig([...collectTourConfig1.slice(0, 1), ...collectTourConfig1.slice(3, 4)])
    } else {
      setCollectTourConfig(collectTourConfig1)
    }
  }, [hasList])

  const { isTourOpen, setIsTourOpenOpen } = useStore().appStore
  const { record: homeRecord, setRecord: setHomeRecord } = useStore().homeStore
  const { record: watchRecord, setRecord: setWatchRecord } = useStore().showPageStore

  const isCollectPage = useCurrentPage('/showpage/collect')
  const isHomePage = useCurrentPage('/home/scale/scale-active')

  const getGuide = async () => {
    const { data } = await FetchGuide()
    if (isHomePage) {
      if (!data.match('index') && homeRecord) {
        // 防止其他数据返回过慢。引起闪烁
        setTimeout(() => {
          setIsTourOpenOpen(true)
          setHomeRecord(false)
        }, 1000)
      } else {
        setHomeRecord(false)
      }
    } else {
      if (!data.match('watch') && isCollectPage && watchRecord) {
        setTimeout(() => {
          setIsTourOpenOpen(true)
          setWatchRecord(false)
        }, 1000)
      } else {
        setWatchRecord(false)
      }
    }
    // 测试代码
    //  setTimeout(() => {
    //   setIsTourOpenOpen(true);
    //   setHomeRecord(false);
    // }, 1000);
  }

  useEffect(() => {
    if ((watchRecord && isCollectPage) || (homeRecord && isHomePage)) {
      getGuide()
    }
  }, [watchRecord, homeRecord])

  return (
    <Tour
      onAfterOpen={disableBody}
      onBeforeClose={enableBody}
      onRequestClose={() => {
        completeGuide(isHomePage ? 'index' : 'watch', () => {
          isHomePage ? setHomeRecord(false) : setWatchRecord(false)
          setIsTourOpenOpen(false)
        })
      }}
      steps={isCollectPage ? collectTourConfig : homeTourConfig}
      isOpen={isTourOpen}
      accentColor={accentColor}
      closeWithMask={false}
      showNavigation={false}
      rounded={5}
      showCloseButton={false}
      showButtons={false}
      startAt={isCollectPage ? 0 : 1}
    />
  )
}

export default observer(Guidance)
