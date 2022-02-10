import React, { FC, ReactChild } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useStore } from '@/utils/context'
import { handleExit } from '@/utils'
interface IPrivateRoute {
  isRequireAuth?: boolean
  children?: ReactChild
}

const PrivateRoute: FC<IPrivateRoute> = ({ children, isRequireAuth }: IPrivateRoute) => {
  const { isLogin } = useStore().appStore
  return <>{isRequireAuth ? (isLogin ? children : handleExit()) : { children }}</>
}
export default PrivateRoute
