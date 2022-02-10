import React, { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react'
import EchartsHooks from '@/components/EchartsHooks'
import TableList from '@/components/TableList'
import { throttle } from 'lodash-es'
import { commafy, handlePieFormat, handleCropName, formatToPoiont } from '@/utils'
import ChartsCheckbox from '@/components/ChartsCheckbox'
import { useStore } from '@/utils/context'
import { useCurrentPage, useWaterMark } from '@/hooks'
import QMSpin from '@/components/QMSpin'
import { toJS } from 'mobx'

export interface ITabItem {
  /**
   *  请求loading
   */
  loading?: boolean
  /**
   * 左侧table样式
   */
  leftTableStyle?: React.CSSProperties
  /**
   *  显示图表
   */
  chartsShow?: boolean

  /**
   * 图表配置
   */
  option?: any[] | any
  /**
   * 左表格边栏属性
   */
  leftColumns?: any
  /**
   * 中间表格边栏属性
   */
  midColumns?: any
  /**
   * 右表格边栏属性
   */
  rightColumns?: any
  /**
   * 左表格数据
   */
  leftData?: any
  /**
   * 右表格数据
   */
  midData?: any
  /**
   * 右表格数据
   */
  rightData?: any
  /**
   *  开启联动
   */
  isConnected?: boolean
  /**
   *  多图表实例
   */
  isMultiple?: boolean
  /**
   *
   * 当前分页
   * @type {number}
   * @memberof ITabItem
   */
  page?: number
  total?: number
  onPageChange?: (e: number) => void
  title?: string
}

const TabItem: React.FC<ITabItem> = (props: ITabItem) => {
  const {
    loading,
    leftColumns,
    midColumns,
    rightColumns,
    leftData,
    midData,
    rightData,
    option,
    isConnected = false,
    isMultiple = false,
    page,
    onPageChange,
    total,
    leftTableStyle,
  } = props

  const { isAllCheckd, legend, collapsed } = useStore().homeStore
  const { collapsed: collapsed1 } = useStore().comparisonStore

  const NoHomePage = useCurrentPage('/home') || useCurrentPage('/company')

  const [selected, setselected] = useState([])
  const [indeterminate, setindeterminate] = useState(true)
  const [checkAll, setcheckAll] = useState(false)
  const ref = React.useRef(null)
  const ref1 = React.useRef(null)
  const isGrowthPage = useCurrentPage('/growth')

  useEffect(() => {
    if (loading) {
      setselected(legend)
    }
  }, [loading])

  useEffect(() => {
    setindeterminate(!isAllCheckd)
    setcheckAll(isAllCheckd)
  }, [isAllCheckd, loading])

  useEffect(() => {
    if (ref) {
      ref.current.el().on('legendselectchanged', event => {
        console.log(event)
        let temp = []
        for (let key in event.selected) {
          if (event.selected[key]) {
            temp.push(key)
          }
        }
        setselected(temp)

        setindeterminate(!!temp.length && temp.length < legend.length)
        setcheckAll(temp.length === legend.length)
      })
    }

    return () => {
      ref.current.el().off('legendselectchanged')
    }
  }, [selected.length, legend.length, ref.current])

  const onChangeLegend = e => {
    if (Array.isArray(option)) {
      const selected1 = option[0].legend[0].selected
      const selected2 = option[0].legend[1].selected

      for (let key in selected1) {
        selected1[key] = e.target.checked ? true : false
      }
      for (let key in selected2) {
        selected1[key] = e.target.checked ? true : false
      }

      ref.current.el().setOption(option[0])
      setselected(e.target.checked ? [...legend] : [])
      setindeterminate(false)
      setcheckAll(e.target.checked)
    } else {
      const selected1 = option.legend.selected
      for (let key in selected1) {
        selected1[key] = e.target.checked ? true : false
      }
      ref.current.el().setOption(option)
      setselected(e.target.checked ? [...legend] : [])
      setindeterminate(false)
      setcheckAll(e.target.checked)
    }
  }
  const isScaleActive =
    useCurrentPage('/scale/scale-active') || useCurrentPage('/scale/scale-share')
  useEffect(() => {
    if (isMultiple && isConnected && ref.current) {
      ref.current.el().on(
        'updateAxisPointer',
        throttle(event => {
          var xAxisInfo = event.axesInfo[0]
          if (
            xAxisInfo &&
            ref1.current.el().getOption() &&
            ref1.current.el().getOption().polar.length === 0 &&
            ref1.current.el().getOption().series[0].type !== 'pie'
          ) {
            var dimension = xAxisInfo.value + 1
            ref1.current.el().setOption({
              legend: {
                data: [
                  `${ref1.current
                    .el()
                    .getOption()
                    .dataset[0].source[0][dimension].replace(
                      '\n',
                      '~'
                    )} ${ref1.current
                    .el()
                    .getOption()
                    .legend[0].data[0].split(' ')
                    .slice(1)
                    .join(' ')}`,
                ],
                icon: 'none',
              },
              series: {
                name: `${ref1.current
                  .el()
                  .getOption()
                  .dataset[0].source[0][dimension].replace(
                    '\n',
                    '~'
                  )} ${ref1.current
                  .el()
                  .getOption()
                  .legend[0].data[0].split(' ')
                  .slice(1)
                  .join(' ')}`,
                type: 'bar',
                id: 'bar',
                encode: {
                  x: dimension,
                  y: 'appname',
                },
                label: {
                  formatter: param => {
                    if (param.value[dimension] === '0') return '--'
                    if (isScaleActive) {
                      return formatToPoiont(param.value[dimension], isScaleActive)
                    }
                    return commafy(param.value[dimension])
                  },
                },
              },
            })
          }
          if (
            xAxisInfo &&
            ref1.current.el().getOption() &&
            ref1.current.el().getOption().series[0].type === 'pie'
          ) {
            var dimension = xAxisInfo.value + 1
            ref1.current.el().setOption({
              legend: {
                data: [
                  `${ref1.current
                    .el()
                    .getOption()
                    .dataset[0].source[0][dimension].replace(
                      '\n',
                      '~'
                    )} ${ref1.current
                    .el()
                    .getOption()
                    .legend[0].data[0].split(' ')
                    .slice(1)
                    .join(' ')}`,
                ],
                icon: 'none',
              },
              series: {
                name: `${ref1.current
                  .el()
                  .getOption()
                  .dataset[0].source[0][dimension].replace(
                    '\n',
                    '~'
                  )} ${ref1.current
                  .el()
                  .getOption()
                  .legend[0].data[0].split(' ')
                  .slice(1)
                  .join(' ')}`,
                type: 'pie',
                id: 'pie',
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },

                tooltip: {
                  trigger: 'item',
                  formatter: param => {
                    return (
                      `${param.value[0].split('?qmid=')[0]}` +
                      '<br/>' +
                      (param.seriesName.split(' ')[1] +
                        ' : ' +
                        handlePieFormat(param.value[dimension]))
                    )
                  },
                },

                label: {
                  formatter: param => {
                    return (
                      `${handleCropName(param.value[0].split('?qmid=')[0])}: \n` +
                      handlePieFormat(param.value[dimension])
                    )
                  },
                  position: 'outside',
                  color: '#111111',
                  distanceToLabelLine: 5,
                  align: 'center',
                  lineHeight: 18,
                },
              },
            })
          }
        }, 500)
      )
    }
    return () => {
      if (ref.current) {
        ref.current.el().off('updateAxisPointer')
      }
    }
  }, [ref.current])
  const mark = useWaterMark()

  return (
    <>
      <QMSpin spinning={loading}>
        {!isGrowthPage ? (
          <ChartsCheckbox
            onChange={onChangeLegend}
            indeterminate={indeterminate}
            checkAll={checkAll}
          />
        ) : null}
        {isMultiple ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            ref={mark}
          >
            <EchartsHooks
              style={{
                flex: 1,
              }}
              collapsed={NoHomePage ? collapsed : collapsed1}
              option={loading ? null : option[0]}
              ref={ref}
            />
            <EchartsHooks
              style={{
                width: '460px',
              }}
              collapsed={NoHomePage ? collapsed : collapsed1}
              option={loading ? null : option[1]}
              ref={ref1}
            />
          </div>
        ) : (
          <div ref={mark}>
            <EchartsHooks
              collapsed={NoHomePage ? collapsed : collapsed1}
              option={loading ? null : option}
              ref={ref}
            />
          </div>
        )}
      </QMSpin>
      <QMSpin spinning={loading}>
        <div>
          <TableList
            leftColumns={leftColumns}
            midColumns={midColumns}
            rightColumns={rightColumns}
            leftData={toJS(leftData)}
            midData={midData}
            rightData={rightData}
            onPageChange={onPageChange}
            page={page}
            total={total}
            leftTableStyle={leftTableStyle}
          />
        </div>
      </QMSpin>
    </>
  )
}

export default observer(TabItem)
