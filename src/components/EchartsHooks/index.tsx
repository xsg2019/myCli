import React, { useEffect, useRef, FC, CSSProperties, useImperativeHandle, memo } from 'react'
import echarts from 'echarts'
import { debounce } from 'lodash-es'
import { theme } from '@/utils/echarts-theme'

echarts.registerTheme('qmechart', theme)

interface IEchartsHooksProps {
  option?: any
  style?: CSSProperties
  ref?: any
  collapsed?: boolean
}

const EchartsHooks: FC<IEchartsHooksProps> = React.forwardRef(
  (props: IEchartsHooksProps, ref: any) => {
    let { option, style, collapsed } = props

    const echartsInstance = useRef(null)

    const main = useRef(null)
    /**
     * 返回Echarts实例给父组件
     */
    useImperativeHandle(ref, () => ({
      el: () => {
        return echarts.init(main.current, 'qmechart')
      },
    }))

    useEffect(() => {
      window.addEventListener(
        'resize',
        debounce(() => {
          echartsInstance && echartsInstance.current.resize()
        }, 800)
      )
      return () => {
        window.removeEventListener(
          'resize',
          debounce(() => {
            echartsInstance && echartsInstance.current.resize()
          }, 800)
        )
      }
    }, [])

    useEffect(() => {
      echartsInstance.current = echarts.init(main.current, 'qmechart')
      if (echartsInstance.current && option) {
        // Reactd调度最后执行，折线图不显示加载动画
        setTimeout(() => {
          echartsInstance.current.setOption(option, true)
        }, 250)
      }
      return () => {
        if (echartsInstance.current) {
          echartsInstance.current.dispose()
        }
      }
    }, [option])

    useEffect(() => {
      setTimeout(() => {
        echartsInstance && echartsInstance.current.resize()
      }, 800)
    }, [collapsed])

    const newStyle = {
      height: 380,
      transition: 'all .3s',
      ...style,
    }
    return <div ref={main} style={newStyle} />
  }
)

export default memo(EchartsHooks)
