import React from 'react'
import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { observer } from 'mobx-react'
import { useStore } from '@/utils/context'
import QMEmpty from '@/components/QMEmpty'
import { useCurrentPage } from '@/hooks'
import QMSpin from '@/components/QMSpin'
import { useTranslation } from 'react-i18next'

interface IProps {
  appList: any
  keyword: string
  isVisible: boolean
  companyList?: any
  loading: boolean
  setKeyword?: (value: string) => void
  setIsVisible?: (flag: boolean) => void
}

const SearchBox = React.forwardRef(
  (
    { appList, companyList, isVisible, keyword, loading, setIsVisible, setKeyword }: IProps,
    ref: any
  ) => {
    const { ForceUpdate, changeVisitedAppList, changeComapnyAppList } = useStore().appStore

    const { t, i18n } = useTranslation()

    const { changeCompanyId } = useStore().comparisonStore
    const isComparison =
      useCurrentPage('/comparison') ||
      useCurrentPage('/company') ||
      useCurrentPage('/groupcomparison')

    const handleToCompany = item => {
      setIsVisible(false)
      setKeyword('')
      changeCompanyId(item.id)
      changeComapnyAppList(item)

      if (isComparison) ForceUpdate()
    }
    const handleVisited = item => {
      setIsVisible(false)
      setKeyword('')
      changeVisitedAppList(item)
    }

    return (
      <div className="qm-search-box" style={{ height: isVisible ? 335 : 0 }} ref={ref}>
        <div className="applist">
          <b>
            <i className="fa fa-sort-down" />
            {t('app')}
          </b>
          <QMSpin spinning={loading}>
            {appList.length || keyword == '' || loading ? (
              <ul>
                {appList.map(item => (
                  <li key={item.appId}>
                    <Link
                      to={`/details/app-overview/${item.appId}?flag=${item.valueFlag}`}
                      onClick={() => handleVisited(item)}
                    >
                      <img src={item.icon} width="24" className="ico" />
                      <Highlighter
                        highlightClassName="active"
                        searchWords={[keyword]}
                        autoEscape={true}
                        textToHighlight={i18n.language === 'zh_CN' ? item.appName : item.appEnName}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <QMEmpty
                description={
                  <>
                    <span>{t('no_app_matches')}</span>
                    <br /> <span>{t('change_search')}</span>
                  </>
                }
              />
            )}
          </QMSpin>
        </div>
        <div className="companylist">
          <b>
            <i className="fa fa-sort-down" />
            {t('company')}
          </b>
          <QMSpin spinning={loading}>
            {companyList.length || keyword == '' || loading ? (
              <ul>
                {companyList.map(item => (
                  <li key={item.companyId}>
                    <Link
                      to={`/company/scale/scale-active?companyId=${item.companyId}&name=${
                        i18n.language === 'zh_CN' ? item.companyName : item.companyEnName
                      }`}
                      onClick={() => handleToCompany(item)}
                      className="table-company"
                    >
                      <Highlighter
                        highlightClassName="active"
                        searchWords={[keyword]}
                        autoEscape={true}
                        textToHighlight={
                          i18n.language === 'zh_CN' ? item.companyName : item.companyEnName
                        }
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <QMEmpty
                description={
                  <>
                    <span>{t('no_search_results_found')}</span> <br />
                    <span>{t('change_keyword')}</span>
                  </>
                }
              />
            )}
          </QMSpin>
        </div>
      </div>
    )
  }
)

export default observer(SearchBox)
