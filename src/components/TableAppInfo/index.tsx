import React from 'react'
import PopoverCard from '@/components/PopoverCard'
import { Link } from 'react-router-dom'
import { useStore } from '@/utils/context'
import { useTranslation } from 'react-i18next'

const TableAppInfo = ({ record, isCluster = false }) => {
  const { changeVisitedAppList } = useStore().appStore
  const { i18n } = useTranslation()
  return (
    <div className="appName">
      <PopoverCard record={record} placement="right" isCluster={isCluster}>
        <Link
          to={`/details/app-overview/${record.appId}?flag=${record.valueFlag}`}
          onClick={() => changeVisitedAppList(record)}
        >
          <span className="ico">
            <img
              src={record.icon}
              width="24"
              alt={i18n.language == 'zh_CN' ? record.appName : record.appEnName}
            />
          </span>
          <span className="name">
            {i18n.language == 'zh_CN' ? record.appName : record.appEnName}
          </span>
        </Link>
      </PopoverCard>
    </div>
  )
}

export default TableAppInfo
