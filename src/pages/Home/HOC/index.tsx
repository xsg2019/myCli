import React, { useEffect, useState, useRef } from 'react'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import { Affix } from 'antd'
import DateAndOptions from '@/components/DateAndOptions'

interface IHomeHOC {
  children?: React.ReactNode

  /**
   * 不显示日
   */
  noDay?: boolean
  /**
   * 不显示周
   */
  noWeek?: boolean
  /**
   * 不显示月
   */
  noMonth?: boolean
  setOrderName?: any
  callback?: any
}

const HomeHOC: React.FC<IHomeHOC> = (props: IHomeHOC) => {
  const { children, noDay, noWeek, noMonth, setOrderName, callback } = props

  const [bgvisible, setBgvisible] = useState(false)

  const handlerChange = (flag: boolean) => {
    setBgvisible(flag)
  }

  return (
    <div className="qm-home--content">
      <Affix offsetTop={110} onChange={handlerChange}>
        <div className={bgvisible ? 'affix-background' : ''}>
          <DateAndOptions
            noMonth={noMonth}
            noDay={noDay}
            noWeek={noWeek}
            setOrderName={setOrderName}
            callback={callback}
          />
        </div>
      </Affix>
      {children}
    </div>
  )
}

export default observer(HomeHOC)
