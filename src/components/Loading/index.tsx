import React from 'react'
import './style.less'
import { IQMSpin } from '../QMSpin'

interface IQMLoading extends Pick<IQMSpin, 'size'> {
  style?: React.CSSProperties
}

const QMLoading = ({ size, style }: IQMLoading) => {
  const defalutStyle = {
    transform: size == 'large' ? 'scale(1.2)' : 'scale(0.6)',
    ...style,
  }
  return (
    <div className="qm-loading" style={defalutStyle}>
      <svg viewBox="0 0 50 50" className="circular">
        <circle cx="25" cy="25" r="15" fill="none" className="path"></circle>
      </svg>
      <svg
        className="circularbg"
        x="0px"
        y="0px"
        width="56px"
        height="54px"
        viewBox="0 0 52 50"
        enableBackground="new 0 0 50 50"
        xmlSpace="preserve"
      >
        <path
          fill="#FFBE14"
          d="M44.258,32.509c0.887-2.423,1.367-5.038,1.367-7.766c0-12.49-10.121-22.615-22.611-22.615
          c-3.647,0-7.087,0.869-10.137,2.401l1.484,2.845c2.606-1.301,5.543-2.037,8.653-2.037c10.717,0,19.404,8.687,19.404,19.404
          c0,2.981-0.674,5.803-1.875,8.328l3.252,6.187l-6.828-1.029c-0.004,0.002-0.008,0.002-0.008,0.002
          c-3.529,3.646-8.471,5.918-13.944,5.918c-10.717,0-19.405-8.688-19.405-19.405c0-0.824,0.058-1.635,0.156-2.43l-3.172-0.491
          c-0.123,0.957-0.193,1.929-0.193,2.921c0,12.49,10.123,22.615,22.613,22.615c5.607,0,10.738-2.043,14.688-5.419l11.898,1.29
          L44.258,32.509z"
        />
        <path
          fill="#FFBE14"
          d="M4.392,19.285c1.231-4.208,3.849-7.821,7.326-10.316l-1.622-2.782C5.848,9.149,2.669,13.528,1.24,18.643
          L4.392,19.285z"
        />
        <path
          fill="#FFBE14"
          d="M25.762,24.589c0,1.519-1.23,2.75-2.748,2.75c-1.52,0-2.75-1.231-2.75-2.75c0-1.518,1.23-2.75,2.75-2.75
          C24.531,21.838,25.762,23.071,25.762,24.589"
        />
      </svg>
    </div>
  )
}
export default QMLoading
