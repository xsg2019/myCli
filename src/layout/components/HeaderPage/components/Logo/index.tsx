import React, { FC } from 'react'
import './style.less'
import { Link } from 'react-router-dom'

interface IProps {
  logoImage: string
}

const Logo: FC<IProps> = ({ logoImage }: IProps) => (
  <div className="logo">
    <Link to="/home/scale/scale-active">
      <img src={logoImage} alt="QuestMobile" />
    </Link>
  </div>
)

export default Logo
