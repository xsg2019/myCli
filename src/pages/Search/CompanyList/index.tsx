import React from 'react'
import { observer } from 'mobx-react'
import TableList from '@/components/TableList'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import { useVisitCompany } from '@/hooks'
import QMEmpty from '@/components/QMEmpty'
import QMSpin from '@/components/QMSpin'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

const SearchPage = props => {
  const { loading, leftData, rightData, total, page, onPageChange, data } = props

  const { t } = useTranslation()
  const handleAddCompany = useVisitCompany()

  const leftColumns: ColumnsType = [
    {
      title: t('index'),
      dataIndex: 'index',
      align: 'center',
      width: 50,
      render: (text, _, index) => {
        return (page - 1) * 10 + index + 1
      },
    },
    {
      title: t('company'),
      dataIndex: i18n.language == 'zh_CN' ? 'companyName' : 'companyEnName',
      render: (text, record: any) => (
        <Link
          onClick={() => handleAddCompany(record)}
          className="table-company"
          to={`/company/scale/scale-active?companyId=${record.companyId}&name=${text}`}
          title={text}
        >
          {text}
        </Link>
      ),
      align: 'left',
    },
  ]

  const rightColumns: ColumnsType = [
    {
      title: t('num_of_apps'),
      dataIndex: 'appAmount',
      align: 'center',
    },
  ]

  return (
    <>
      <QMSpin spinning={loading}>
        <div style={{ display: data ? 'block' : 'none' }}>
          <TableList
            leftColumns={leftColumns}
            rightColumns={rightColumns}
            leftData={leftData}
            isShowMidTable={false}
            rightData={rightData}
            total={total}
            page={page}
            onPageChange={onPageChange}
          />
        </div>
        <div
          style={{
            minHeight: '50vh',
            display: data ? 'none' : 'block',
          }}
        >
          <QMEmpty
            style={{ lineHeight: '24px' }}
            description={
              <>
                <span>{t('no_search_results_found')}</span> <br />
                <span>{t('change_search')}</span>
              </>
            }
          />
        </div>
      </QMSpin>
    </>
  )
}

export default observer(SearchPage)
