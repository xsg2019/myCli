import React, { useEffect, useState } from 'react'
import './style.less'
import { useTranslation } from 'react-i18next'
import {
  scaleList,
  frequencyList,
  frequencyAvgList,
  timeList,
  timeAvgList,
  timeAvgDaysList,
  scaleSupplementList,
  frequencySupplementList,
  timeSupplementList,
  growthYoyList,
  growthMomList,
  growthCompoundList,
  growthSupplementList,
  modeList,
  qualityList,
  compoundDailyList,
  logType,
} from '@/constants'
import { useLogHook, useLogMenu } from '@/hooks'

function stepScroll(item, isReserve = false) {
  if (isReserve) {
    let start = window.scrollY
    return function step() {
      start -= 50
      window.scrollTo(0, start)
      if (0 < start) {
        window.requestAnimationFrame(step)
      } else {
        start = window.scrollY
      }
    }
  } else {
    let start = 0
    return function step() {
      start += 150
      window.scrollTo(0, start)
      if (item > start) {
        window.requestAnimationFrame(step)
      } else {
        start = 0
      }
    }
  }
}

const HelpPage = () => {
  const [index, setIndex] = useState(0)

  const { t } = useTranslation()

  useLogHook({ PrimaryMenu: '', SecondMenu: '', LogType: logType.HELP_CLICK })

  const helpList = [
    {
      title: t('users_analysis'),
    },
    {
      title: t('use_frequency'),
    },
    {
      title: t('user_time_spent'),
    },
    {
      title: t('growth_analysis'),
    },
    {
      title: t('cluster_analysis'),
    },
  ]

  useEffect(() => {
    const list = document.querySelectorAll('.help-text .tag a')
    list.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault()
        const current = e.currentTarget as any
        const id = current && current.getAttribute('href')
        const item = document.querySelector(id).offsetTop - 100
        window.requestAnimationFrame(stepScroll(item))
      })
    })
  }, [])
  return (
    <div className="qm-help-content">
      <div className="help-box" id="HelpBox">
        <div className="help-menu">
          <ul>
            {helpList.map((item, i) => (
              <li
                className={i === index ? 'active' : ''}
                onClick={() => {
                  setTimeout(() => {
                    window.requestAnimationFrame(stepScroll(0, true))
                  }, 0)
                }}
              >
                <a
                  onClick={() => {
                    setIndex(i)
                  }}
                >
                  <i className="iconfont icon-circle" /> {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="help-text">
          <div className="cout">
            <div className="tablist" style={{ display: index === 0 ? 'block' : 'none' }}>
              <div className="tag">
                {[...scaleList, ...scaleSupplementList].map((item, i) => {
                  return (
                    <a href={`#toA${i}`}>
                      {i + 1}.{t(item.title)}
                    </a>
                  )
                })}
              </div>

              <div className="text">
                <div className="p">
                  {[...scaleList, ...scaleSupplementList].map((item, i) => {
                    return (
                      <>
                        <p className="name" id={`toA${i}`}>
                          {i + 1}.{t(item.title)}
                        </p>
                        <p>{t(item.desc)}</p>
                      </>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="tablist" style={{ display: index === 1 ? 'block' : 'none' }}>
              <div className="tag">
                {[...frequencyList, ...frequencyAvgList, ...frequencySupplementList].map(
                  (item, i) => {
                    return (
                      <a href={`#toB${i}`}>
                        {i + 1}.{t(item.title)}
                      </a>
                    )
                  }
                )}
              </div>
              <div className="text">
                <div className="p">
                  {[...frequencyList, ...frequencyAvgList, ...frequencySupplementList].map(
                    (item, i) => {
                      return (
                        <>
                          <p className="name" id={`toB${i}`}>
                            {i + 1}.{t(item.title)}
                          </p>
                          <p>{t(item.desc)}</p>
                        </>
                      )
                    }
                  )}
                  <p>&nbsp;</p>
                </div>
              </div>
            </div>

            <div className="tablist" style={{ display: index === 2 ? 'block' : 'none' }}>
              <div className="tag">
                {[...timeList, ...timeAvgList, ...timeAvgDaysList, ...timeSupplementList].map(
                  (item, i) => {
                    return (
                      <a href={`#toC${i}`}>
                        {i + 1}.{t(item.title)}
                      </a>
                    )
                  }
                )}
              </div>
              <div className="text">
                <div className="p">
                  {[...timeList, ...timeAvgList, ...timeAvgDaysList, ...timeSupplementList].map(
                    (item, i) => {
                      return (
                        <>
                          <p className="name" id={`toC${i}`}>
                            {i + 1}.{t(item.title)}
                          </p>
                          <p>{t(item.desc)}</p>
                        </>
                      )
                    }
                  )}
                </div>
              </div>
            </div>

            <div className="tablist" style={{ display: index === 3 ? 'block' : 'none' }}>
              <div className="tag">
                {[
                  ...growthYoyList.slice(1, growthYoyList.length),
                  ...growthMomList,
                  ...growthCompoundList,
                  ...growthSupplementList,
                ].map((item, i) => {
                  return (
                    <a href={`#toD${i}`}>
                      {i + 1}.{t(item.title)}
                    </a>
                  )
                })}
              </div>
              <div className="text">
                <div className="p">
                  {[
                    ...growthYoyList.slice(1, growthYoyList.length),
                    ...growthMomList,
                    ...growthCompoundList,
                    ...growthSupplementList,
                  ].map((item, i) => {
                    return (
                      <>
                        <p className="name" id={`toD${i}`}>
                          {i + 1}.{t(item.title)}
                        </p>
                        <p>{t(item.desc)}</p>
                      </>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="tablist" style={{ display: index === 4 ? 'block' : 'none' }}>
              <div className="tag">
                {[
                  {
                    title: 'user_qual_type_analysis',
                    desc: 'user_qual_type_analysis_desc',
                  },
                  ...qualityList.slice(4, 5),
                  {
                    title: 'growth_pattern_analysis',
                    desc: 'growth_pattern_analysis_desc',
                  },
                  ...modeList.slice(1, 2),
                  ...compoundDailyList,
                ].map((item, i) => {
                  return (
                    <a href={`#toK${i}`}>
                      {i + 1}.{t(item.title)}
                    </a>
                  )
                })}
              </div>
              <div className="text">
                <div className="t">
                  <h3>
                    <strong id="toK0">1. {t('user_qual_type_analysis')}</strong>
                  </h3>
                </div>
                <div className="p">
                  <p>{t('user_qual_type_analysis_desc')}</p>
                </div>
                <img src={require('../../../public/images/help/' + t('qulity_img'))} width="784" />
                <div className="p">
                  {[
                    {
                      title: 'user_qual_type_analysis',
                      desc: 'user_qual_type_analysis_desc',
                    },

                    ...qualityList.slice(4, qualityList.length),
                  ].map((item, i) => {
                    if (item.title.match('_loyalt')) {
                      const tempArr = item.title.split('_')
                      const current =
                        tempArr[0].substring(0, 1).toLocaleUpperCase() +
                        tempArr[2].substring(0, 1).toLocaleUpperCase()
                      return (
                        <>
                          <p className="name">
                            1.{i + 1} {current}({t(item.title)})
                          </p>
                          <p>{t(item.desc)}</p>
                          <p>&nbsp;</p>
                        </>
                      )
                    }
                    return (
                      <>
                        <p className="name">
                          1.{i + 1} {t(item.title)}
                        </p>
                        <p>{t(item.desc)}</p>
                        <p>&nbsp;</p>
                      </>
                    )
                  })}
                </div>
                <div className="t">
                  <h3>
                    <strong id="toK1">2. {t(qualityList[4].title)}</strong>
                  </h3>
                </div>
                <div className="p">
                  <p>{t(qualityList[4].desc)}</p>
                </div>
                <div className="t">
                  <h3>
                    <strong id="toK2">3. {t('growth_pattern_analysis')}</strong>
                  </h3>
                </div>
                <div className="p">
                  <p>{t('growth_pattern_analysis_desc')}</p>
                </div>
                <div className="p">
                  {[...modeList.slice(2, modeList.length)].map((item, i) => {
                    return (
                      <>
                        <p className="name">
                          3.{i + 1} {t(item.title)}
                        </p>
                        <p>{t(item.desc)}</p>
                        <p>
                          <img
                            src={require('../../../public/images/help/' + t(item.img))}
                            width="784"
                          />
                        </p>
                        <p>&nbsp;</p>
                      </>
                    )
                  })}
                </div>

                <div className="t">
                  <h3>
                    <strong id="toK3">4. {t(modeList[1].title)}</strong>
                  </h3>
                </div>
                <div className="p">
                  <p>{t(modeList[1].desc)}</p>
                </div>
                <div className="t">
                  <h3>
                    <strong id="toK4">5. {t(compoundDailyList[0].title)}</strong>
                  </h3>
                </div>
                <div className="p">
                  <p>{t(compoundDailyList[0].desc)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage
