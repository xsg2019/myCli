/**
 *  React.context 负责传递 store
 * */
import { useContext } from 'react'
import React from 'react'
import store from '@/store'

// react context
export const StoreContext = React.createContext(store)

// store数据
export const useStore = () => {
  return useContext(StoreContext)
}
