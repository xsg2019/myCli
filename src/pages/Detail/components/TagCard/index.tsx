import React, { FC } from 'react'
import './style.less'
import { Popover, Skeleton } from 'antd'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import { useWaterMark } from '@/hooks'

interface IContent {
  title: string
  desc: string
}

interface TagCardProps {
  background?: string
  icon?: string
  num?: number | string
  title?: string
  style?: React.CSSProperties
  height?: number | string
  width?: number | string
  loading: boolean
  help?: boolean
  content?: IContent
}

const TagCard: FC<TagCardProps> = ({
  background,
  icon,
  num,
  title,
  style,
  height,
  width,
  loading,
  content,
  help = true,
}: TagCardProps) => {
  const { t } = useTranslation()
  const mark = useWaterMark({
    isCard: true,
  })
  return (
    <div className="tag-card" style={{ ...style, width }}>
      <dl style={{ height }}>
        <dt style={{ background, height }}>
          <i className={cx('icon', 'iconfont', icon)} />
        </dt>
        <dd ref={mark}>
          {help ? (
            <Popover
              content={
                <div className="text">
                  <b>{t(content.title)}：</b>
                  {t(content.desc)}
                  <br />
                </div>
              }
              title={t('instruction')}
              placement="bottomRight"
              overlayClassName="qm-popover-card--item"
            >
              <i className="icon iconfont icon-help" />
            </Popover>
          ) : null}

          <p>{title}</p>
          {loading ? (
            <Skeleton.Input style={{ width: '50%', marginTop: 10 }} active size="small" />
          ) : (
            <h5>{num}</h5>
          )}
        </dd>
      </dl>
    </div>
  )
}

export default TagCard
