import React, { useState, useEffect, useRef, memo } from 'react'
import cx from 'classnames'
import './style.less'
import { Table, Pagination } from 'antd'
import { useWaterMark } from '@/hooks'

interface ITableListProps {
  isShowLeftTable?: boolean
  isShowMidTable?: boolean
  /**
   *  中间右侧加一个列table，如：App聚类模块
   */
  isShowMidRTable?: boolean
  isShowRightTable?: boolean
  leftData?: any[]
  midData?: any[]
  midRData?: any
  rightData?: any[]
  leftColumns?: any[]
  midColumns?: any[]
  midRColumns?: any[]
  rightColumns?: any[]
  style?: React.CSSProperties
  leftTableStyle?: React.CSSProperties
  midTableStyle?: React.CSSProperties
  total?: number
  page?: number
  onPageChange?: (page: number) => void
}
const defaultProps = {
  isShowLeftTable: true,
  isShowMidTable: true,
  isShowRightTable: true,
  isShowMidRTable: false,
  leftData: [],
  midData: [],
  rightData: [],
  leftColumns: [],
  midColumns: [],
  rightColumns: [],
}
const TableList: React.FC<ITableListProps> = (userProps: ITableListProps) => {
  const [middleShow, setMiddleShow] = useState(false)
  const [leftRow, setLeftRow] = useState(null)
  const [midRRow, setMidRRow] = useState(null)
  const [midRow, setMidRow] = useState(null)
  const [rightRow, setRightRow] = useState(null)

  const tableRight = useRef(null)

  const props = { ...defaultProps, ...userProps }
  const {
    isShowLeftTable = null,
    isShowMidTable,
    isShowMidRTable,
    isShowRightTable = null,
    leftData,
    midData,
    midRData,
    rightData,
    leftColumns,
    midColumns,
    midRColumns,
    rightColumns,
    style,
    page,
    total,
    onPageChange,
    leftTableStyle,
    midTableStyle,
  } = props

  const handleToggle = () => {
    setMiddleShow(!middleShow)
  }

  const mark = useWaterMark()

  useEffect(() => {
    const tabsActive = document.querySelector('.ant-tabs-tabpane-active .tableBox')
    const lefttr: NodeListOf<Element> = document.querySelectorAll(
      tabsActive
        ? '.ant-tabs-tabpane-active .tableLeft .ant-table-row'
        : '.tableLeft .ant-table-row'
    )
    const middletr: NodeListOf<Element> = document.querySelectorAll(
      tabsActive
        ? '.ant-tabs-tabpane-active .tableMiddle .ant-table-row'
        : '.tableMiddle .ant-table-row'
    )
    const middleRtr: NodeListOf<Element> = document.querySelectorAll(
      tabsActive
        ? '.ant-tabs-tabpane-active .tableRMiddle .ant-table-row'
        : '.tableRMiddle .ant-table-row'
    )
    const righttr: NodeListOf<Element> = document.querySelectorAll(
      tabsActive
        ? '.ant-tabs-tabpane-active .tableRight .ant-table-row'
        : '.tableRight .ant-table-row'
    )

    setLeftRow(lefttr)
    setMidRow(middletr)
    setRightRow(righttr)
    setMidRRow(middleRtr)
  }, [leftData, midData, rightData, midRData])
  function onChange(pageNumber) {
    onPageChange(pageNumber)
  }
  const usrStyle = {
    ...style,
  }

  return (
    <div className="qm-table--watermark">
      <div className="tableBox" ref={mark} style={usrStyle}>
        <div className="tableLeft" style={leftTableStyle}>
          <Table
            dataSource={leftData}
            columns={leftColumns}
            rowKey={(record, i) => i}
            pagination={false}
            onRow={(record, index) => ({
              onMouseEnter: event => {
                leftRow[index].classList.add('high')
                midRow.length && midRow[index].classList.add('high')
                midRRow.length && midRRow[index].classList.add('high')
                rightRow[index].classList.add('high')
              },

              onMouseLeave: e => {
                leftRow[index].classList.remove('high')
                midRow.length && midRow[index].classList.remove('high')
                midRRow.length && midRRow[index].classList.remove('high')
                rightRow[index].classList.remove('high')
              },
            })}
          />
          {isShowMidTable ? (
            <a
              className={cx({ bnclose: !middleShow }, 'toggle')}
              onClick={handleToggle}
              data-tut="step4"
            >
              <span></span>
            </a>
          ) : null}
        </div>
        {isShowMidTable ? (
          <div
            className="tableMiddle"
            style={{
              width: middleShow ? (midTableStyle ? midTableStyle.width : 400) : 0,
            }}
          >
            <Table
              dataSource={midData}
              pagination={false}
              rowKey={(record, i) => i}
              columns={midColumns}
              onRow={(record, index) => ({
                onMouseEnter: e => {
                  leftRow[index].classList.add('high')
                  midRow.length && midRow[index].classList.add('high')
                  midRRow.length && midRRow[index].classList.add('high')

                  rightRow[index].classList.add('high')
                },
                onMouseLeave: e => {
                  leftRow[index].classList.remove('high')
                  midRow.length && midRow[index].classList.remove('high')
                  midRRow.length && midRRow[index].classList.remove('high')
                  rightRow[index].classList.remove('high')
                },
              })}
            />
          </div>
        ) : null}
        {isShowMidRTable ? (
          <div className="tableRMiddle" style={{ minWidth: 150 }}>
            <Table
              dataSource={midRData}
              pagination={false}
              rowKey={(record, i) => i}
              columns={midRColumns}
              onRow={(record, index) => ({
                onMouseEnter: e => {
                  leftRow[index].classList.add('high')
                  midRow.length && midRow[index].classList.add('high')
                  midRRow.length && midRRow[index].classList.add('high')
                  rightRow[index].classList.add('high')
                },
                onMouseLeave: e => {
                  leftRow[index].classList.remove('high')
                  midRow.length && midRow[index].classList.remove('high')
                  midRRow.length && midRRow[index].classList.remove('high')
                  rightRow[index].classList.remove('high')
                },
              })}
            />
          </div>
        ) : null}
        <div className="tableRight" ref={tableRight}>
          <Table
            dataSource={rightData}
            pagination={false}
            columns={rightColumns}
            rowKey={(record, i) => i}
            getPopupContainer={() => tableRight.current}
            onRow={(record, index) => ({
              onMouseEnter: e => {
                leftRow[index].classList.add('high')
                midRow.length && midRow[index].classList.add('high')
                midRRow.length && midRRow[index].classList.add('high')
                rightRow[index].classList.add('high')
              },
              onMouseLeave: e => {
                leftRow[index].classList.remove('high')
                midRow.length && midRow[index].classList.remove('high')
                midRRow.length && midRRow[index].classList.remove('high')
                rightRow[index].classList.remove('high')
              },
            })}
          />
        </div>
      </div>
      <div className="qm-table-pagination">
        <Pagination
          hideOnSinglePage
          showQuickJumper
          current={page}
          total={total || 10}
          showSizeChanger={false}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
export default memo(TableList)
