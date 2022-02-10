import React, { useState } from 'react'
import { useStore } from '@/utils/context'
import { observer } from 'mobx-react'
import TableList from '@/components/TableList'
import { Checkbox, Modal, Button, Spin, Skeleton, Popconfirm } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import cx from 'classnames'
import './style.less'
import api from '@/api'
import { useRequest, useShowModal, usePrevious, useLogHook } from '@/hooks'
import AddModal from './components/AddModal'
import UpdateModal from './components/UpdateModal'
import moment from 'moment'
import { commafy, handleEnNum, setStorage, formatToPoiont, jsonify } from '@/utils'
import QMEmpty from '@/components/QMEmpty'
import TableAppInfo from '@/components/TableAppInfo'
import CollectModal from '@/components/CollectModal'
import QMSpin from '@/components/QMSpin'
import { useTranslation } from 'react-i18next'
import { round } from 'lodash-es'
import { toJS } from 'mobx'
import { logType } from '@/constants'

const { FetchWatchGroup, FetchWatchGroupDelete, FetchWatchDelete, FetchWatchCollect } = api

const CollectLeft = observer(({ groupList, setGroupList, groupIndex, setGroupIndex, loading }) => {
  const [addVisible, setAddVisible] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(false)
  const [allgroup, setAllgroup] = useState(true)
  const [nogroup, setNogroup] = useState(false)
  const [lastdelele, setLastdelele] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const { t } = useTranslation()

  const { ForceUpdate } = useStore().appStore

  const handleAllGroup = () => {
    if (groupIndex === 0) return
    setAllgroup(true)
    setNogroup(false)
    setLastdelele(false)
    setGroupIndex(0)
    ForceUpdate()
  }

  const handleNoGroup = () => {
    if (groupIndex === -1) return
    setAllgroup(false)
    setNogroup(true)
    setLastdelele(false)
    setGroupIndex(-1)
    ForceUpdate()
  }

  const handleIndex = id => {
    if (id === groupIndex) return
    setGroupIndex(id)
    setAllgroup(false)
    setNogroup(false)
    setLastdelele(false)
    ForceUpdate()
  }

  const handleLastdelele = () => {
    if (groupIndex === -2) return
    setGroupIndex(-2)
    setAllgroup(false)
    setNogroup(false)
    setLastdelele(true)
    ForceUpdate()
  }

  const handleAddBtn = () => {
    showModal()
  }

  const showModal = () => {
    setAddVisible(true)
  }

  const showConfirm = async ({ id, name }) => {
    try {
      // 如果当前删除id为选中id，跳转到全部关注
      await FetchWatchGroupDelete({ id })
      if (groupIndex === id) {
        handleAllGroup()
      }
    } catch (e) {
      console.log(e)
    }
    try {
      const { data } = await FetchWatchGroup()
      setGroupList(data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>, item) => {
    e.stopPropagation()
    setEditItem(item)
    setUpdateVisible(true)
  }

  return (
    <div className="collectLeft">
      <Button className="btn-add" onClick={handleAddBtn} data-tut="step5">
        {' '}
        <i className="fa fa-plus"></i> {t('new_group')}
      </Button>
      <ul>
        <li className={cx('allgroup', { active: allgroup })} onClick={handleAllGroup}>
          <a>
            <i className="iconfont icon-yonghu" />
            {t('follow_all_app')}
          </a>
        </li>
        <li className={cx('nogroup', { active: nogroup })}>
          <a onClick={handleNoGroup}>
            <i className="iconfont icon-yonghu" />
            {t('no_group')}
          </a>
        </li>
      </ul>
      {loading ? (
        <Skeleton active title={false} paragraph={{ rows: 4, width: '100%' }} />
      ) : (
        <ul className="groupList">
          {groupList.map(item => (
            <li
              key={item.id}
              className={groupIndex === item.id ? 'active' : ''}
              onClick={() => handleIndex(item.id)}
            >
              <a className="ggroup">
                <i className="iconfont icon-yonghu" />
                {item.name}
              </a>
              <a className="edit">
                <i className="fa fa-pencil-square-o" onClick={e => handleEdit(e, item)} />
              </a>
              <a className="delete" onClick={e => e.stopPropagation()}>
                <Popconfirm
                  placement="topLeft"
                  title={
                    <>
                      {t('delete_group')} <span style={{ color: '#ffbe14' }}>{item.name}</span>{' '}
                      {t('delete_group_add')}
                    </>
                  }
                  onConfirm={() => showConfirm(item)}
                  okText={t('page_deleteapp')}
                  cancelText={t('page_cancel')}
                >
                  <i className="iconfont icon-shanchu" />
                </Popconfirm>
              </a>
            </li>
          ))}
        </ul>
      )}

      <ul>
        <li
          className={cx('lastdelele', { active: lastdelele })}
          onClick={handleLastdelele}
          data-tut="step8"
        >
          <a>
            <i className="iconfont icon-huishou" />
            {t('apps_removed_from_watch_list')}
          </a>
        </li>
      </ul>
      <AddModal visible={addVisible} setVisble={setAddVisible} setGroupList={setGroupList} />
      <UpdateModal
        visible={updateVisible}
        setVisble={setUpdateVisible}
        setGroupList={setGroupList}
        editItem={editItem}
      />
    </div>
  )
})
// 已添加的分组
let group = []
const CollectRight = observer(({ groupId = 0, groupList, setGroupList }) => {
  const {
    toggleAppCompareBox,
    dsType,
    clusterMonth,
    leftData,
    changeLeftData,
    addSeletedAppList,
    removeSeletedAppList,
    addAttention,
    isForceUpdate,
    language,
  } = useStore().appStore

  const { verificationRefresh } = useStore().homeStore

  const { t, i18n } = useTranslation()

  const [visible, setVisble] = useState(false)
  const [descs, setDescs] = useState('uv')
  const [rightData, setRightData] = useState([])

  const [page, setPage] = useState(1)
  const [curId, setCurId] = useState('')

  let params = {
    current: page,
    dateText: moment(clusterMonth).format('YYYY-MM-DD'),
    dsType,
    groupId,
    descs,
  }

  const [apiPage, setApiPage] = useState(1)
  const [loading1, setLoading1] = useState(false)
  const [total, setTotal] = useState(0)

  const handleData = data => {
    const { records, total, current } = data
    setApiPage(current)
    changeLeftData(records)
    setRightData(records.map(item => ({ ...item, uv: handleEnNum(item.uv) })))
    setTotal(total)
  }

  const { loading } = useRequest(() => FetchWatchCollect({ ...params, current: 1 }), {
    handler: ({ data }) => {
      setPage(1)
      handleData(data)
    },
    onerror: e => {
      console.log(e)
    },
    Deps: [clusterMonth, dsType, descs, isForceUpdate, language, verificationRefresh],
  })

  const hanleUpdateGroup = async () => {
    if (!groupList.length) {
      hideModal()
      return
    }
    const groupId = group.length ? group.join(',') : ''

    const params = { appId: curId, groupId }
    try {
      const res = await addAttention(params)
      handleCollectCallBack()
      setVisble(false)
    } catch (e) {
      console.log(e)
    }
  }

  const hideModal = () => {
    setVisble(false)
    const temp = (record && record.groupList) || []
    if (temp.length === 0) {
      groupList.forEach(item => {
        item.flag = false
      })
    } else {
      for (let i = 0; i < groupList.length; i++) {
        const item = groupList[i]
        for (let j = 0; j < temp.length; j++) {
          const item1 = temp[j]
          if (item.id === item1.id) {
            item.flag = true
            break
          } else {
            item.flag = false
          }
        }
      }
    }

    setGroupList(jsonify(groupList))
  }

  const handleDelete = async (id, total) => {
    try {
      const res = await FetchWatchDelete({ appId: id })
    } catch (e) {}

    if (page > 1 && total % 10 === 1) {
      setPage(Math.ceil(total / 10) - 1)
      params = { ...params, current: Math.ceil(total / 10) - 1 }
    }
    const { data } = await FetchWatchCollect(params)
    const { records, total: total1, current } = data
    setApiPage(current)
    setTotal(total1)
    changeLeftData(records)
    setRightData(records.map(item => ({ ...item, uv: handleEnNum(item.uv) })))
  }

  const onCompareChange = (e, record) => {
    const isChecked = e.target.checked
    const { appId } = record
    if (isChecked) {
      addSeletedAppList({ ...record })
    } else {
      removeSeletedAppList(appId)
    }
    toggleAppCompareBox(true)
  }

  const onCheckChange = (e, id) => {
    const isChecked = e.target.checked
    if (isChecked) {
      const index = groupList.findIndex(item => item.id === id)
      groupList[index].flag = true
      group.push(id)
      setGroupList(jsonify(groupList))
    } else {
      const index = group.findIndex(item => item === id)
      const zindex = groupList.findIndex(item => item.id === id)
      groupList[zindex].flag = false
      group.splice(index, 1)
      setGroupList(jsonify(groupList))
    }
  }

  const {
    record,
    setVisible: setVisible1,
    visible: visible1,
    setRecord,
    showModal,
  } = useShowModal()

  const hideCollectModal = () => {
    setVisible1(false)
  }

  const leftColumns = [
    groupId !== -2
      ? {
          title: t('cancel_watch'),
          dataIndex: 'appId',
          key: 'appId',
          align: 'center',
          width: 50,
          render: (text, record) => (
            <i
              className="iconfont icon-shanchu"
              onClick={() => handleDelete(record.appId, total)}
            />
          ),
        }
      : {
          title: t('page_attention'),
          dataIndex: 'appId',
          align: 'center',
          width: 50,
          render: (text, record) =>
            record.attention ? (
              <i className="iconfont icon-collected" onClick={() => showModal(record)} />
            ) : (
              <i className="iconfont icon-collect" onClick={() => showModal(record)} />
            ),
        },

    {
      title: t('page_contrast'),
      dataIndex: 'appId',
      key: 'appId',
      align: 'center',
      width: 50,
      render: (text, record) => (
        <Checkbox onChange={e => onCompareChange(e, record)} checked={record.contrast === 1} />
      ),
    },
    {
      title: t('index'),
      dataIndex: 'totalRn',
      key: 'totalRn',
      align: 'center',
      width: 50,
      render: (text, _, index) => {
        return (apiPage - 1) * 10 + index + 1
      },
    },
    {
      title: t('app_name_en'),
      key: 'appName',
      dataIndex: 'appName',
      width: '100%',
      render: (text, record) => <TableAppInfo record={record} />,
    },
  ]

  const TitleItem = ({ title }) => (
    <a onClick={() => setDescs(title)} className={cx({ active: title === descs })}>
      {title === 'uv' ? t('active_users') + '(' + t('unit_million_peoples') + ')' : t('mom')}{' '}
      <i className="iconfont icon-jt-down" />
    </a>
  )

  const rightColumns = [
    {
      title: t('group'),
      dataIndex: 'appId',
      key: 'appId',
      align: 'center',
      width: 160,
      render: (text, record, i) => {
        return (
          <div className="sep-group-item" data-tut={i === 0 ? 'step6' : ''}>
            <a
              className="btn-group"
              style={{ display: 'block', width: '100%' }}
              onClick={() => handleCurrentId(record)}
            >
              <span className="text-group">
                {(record && record.groupList.map(item => item.name).join(',')) || t('no_group')}
              </span>
              <span className="caret" />
            </a>
          </div>
        )
      },
    },
    {
      title: t('catetory'),
      dataIndex: ['category', i18n.language === 'zh_CN' ? 'categoryName' : 'categoryEnName'],
      width: 100,
      align: 'center',
      render: text => {
        if (text === '') return '--'
        return (
          <span
            title={text}
            style={
              i18n.language === 'zh_CN'
                ? {}
                : { textAlign: 'left', display: 'inline-block', width: '100%' }
            }
          >
            {text}
          </span>
        )
      },
    },
    {
      title: t('sub_category'),
      dataIndex: ['clazz', i18n.language === 'zh_CN' ? 'clazzName' : 'clazzEnName'],
      width: 100,
      align: 'center',
      render: text => {
        if (!text)
          return (
            <span style={{ textAlign: 'left', display: 'inline-block', width: '100%' }}>--</span>
          )
        return (
          <span
            title={text}
            style={
              i18n.language === 'zh_CN'
                ? {}
                : { textAlign: 'left', display: 'inline-block', width: '100%' }
            }
          >
            {text}
          </span>
        )
      },
    },
    {
      title: <TitleItem title={'uv'} />,
      dataIndex: 'uv',
      align: 'right',
      render: text => {
        if (text === '') return '--'
        return formatToPoiont(text, true)
      },
    },
    {
      title: <TitleItem title={'monthRatio'} />,
      dataIndex: 'monthRatio',
      align: 'right',
      render: (text: number) => {
        if (!text) return '--'
        const isNegative = text < 0
        if (!isNegative) {
          return (
            <span className="up">
              {commafy(round(Number(text), 2))}%<i className="fa fa-long-arrow-up"></i>
            </span>
          )
        } else {
          return (
            <span className="down">
              {commafy(round(Number(text), 2))}%<i className="fa fa-long-arrow-down"></i>
            </span>
          )
        }
      },
    },
  ]
  if (groupId === -2) {
    rightColumns.splice(0, 1)
  }

  const handleCurrentId = record => {
    const { appId } = record
    setCurId(appId)
    setRecord(record)
    setVisble(true)
  }

  const onPageChange = async page => {
    setLoading1(true)
    const { data } = await FetchWatchCollect({ ...params, current: page })
    handleData(data)
    setPage(page)
    setLoading1(false)
  }

  const { push } = useHistory()

  const goGroupAppCompare = () => {
    setStorage('truth-flash', 'groupId', groupId)
    push('/groupcomparison/scale/scale-active')
  }

  React.useEffect(() => {
    const temp = (record && record.groupList) || []
    temp.forEach(item => {
      group.push(item.id)
    })
    return () => {
      group = []
    }
  }, [record])

  React.useEffect(() => {
    const temp = (record && record.groupList) || []
    if (temp.length === 0) {
      groupList.forEach(item => {
        item.flag = false
      })
    } else {
      for (let i = 0; i < groupList.length; i++) {
        const item = groupList[i]
        for (let j = 0; j < temp.length; j++) {
          const item1 = temp[j]
          if (item.id === item1.id) {
            item.flag = true
            break
          } else {
            item.flag = false
          }
        }
      }
    }
    setGroupList(jsonify(groupList))
  }, [record])

  const EmptyDescription = id => {
    switch (id) {
      case 0:
        return (
          <>
            <span className="noapp">{t('no_watched_app')}</span>
            <br />
            <span>
              {i18n.language === 'zh_CN' ? (
                <>
                  您可以在
                  <Link to="/home/scale/scale-active"> 首页 </Link>
                  或通过 搜索 关注App
                </>
              ) : (
                <>
                  You can add an app to watch-list from{' '}
                  <Link to="/home/scale/scale-active"> Homepage </Link> or Search.
                </>
              )}
            </span>
          </>
        )
      case -2:
        return <span>{t('removed_no_apps')}</span>
      default:
        return <span>{t('group_no_app')}</span>
    }
  }
  const handleCollectCallBack = async (data2 = null) => {
    if (page > 1 && total % 10 === 1) {
      setPage(Math.ceil(total / 10) - 1)
      params = { ...params, current: Math.ceil(total / 10) - 1 }
    }
    data2 && setGroupList(data2)
    const { data } = await FetchWatchCollect(params)
    const { records, total: total1, current } = data
    setTotal(total1)
    changeLeftData(records)
    setRightData(records.map(item => ({ ...item, uv: handleEnNum(item.uv) })))
    setApiPage(current)
  }

  const leftTableStyle = i18n.language == 'zh_CN' ? null : { width: 450 }

  return (
    <div className="collectRight">
      {rightData.length || loading ? (
        <>
          <div className="bn" style={{ display: groupId === -2 ? 'none' : 'block' }}>
            <Button className="btn-analysed" onClick={goGroupAppCompare} data-tut="step7">
              {t('app_analysis')}
            </Button>
          </div>
          <QMSpin spinning={loading || loading1}>
            <TableList
              leftTableStyle={leftTableStyle}
              leftColumns={leftColumns}
              rightColumns={rightColumns}
              leftData={toJS(leftData)}
              isShowMidTable={false}
              rightData={rightData}
              total={total}
              page={page}
              onPageChange={onPageChange}
            />
          </QMSpin>
        </>
      ) : (
        <QMEmpty
          style={{
            position: 'relative',
            top: '50%',
            margin: 0,
          }}
          description={EmptyDescription(groupId)}
        />
      )}

      <Modal
        title={t('select_watchlis')}
        visible={visible}
        onOk={hanleUpdateGroup}
        onCancel={hideModal}
        cancelButtonProps={null}
        footer={null}
        centered
      >
        <div className="group-list-container">
          <ul>
            {groupList.length ? (
              groupList.map(item => (
                <li key={item.id}>
                  <Checkbox onChange={e => onCheckChange(e, item.id)} checked={item.flag == true}>
                    {item.name}
                  </Checkbox>
                </li>
              ))
            ) : (
              <div className="empty">{t('no_watch_list')}</div>
            )}
          </ul>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" style={{ margin: '5px 0 0 0' }} onClick={hanleUpdateGroup}>
            {t('input_submit')}
          </Button>
        </div>
      </Modal>
      <CollectModal
        visible={visible1}
        // @ts-ignore
        cb={data => handleCollectCallBack(data)}
        hideModal={hideCollectModal}
        record={record}
      />
    </div>
  )
})

const Collect = () => {
  const [groupList, setGroupList] = useState([])
  const [groupIndex, setGroupIndex] = useState(0)

  const { verificationRefresh } = useStore().homeStore

  const { loading } = useRequest(() => FetchWatchGroup(), {
    handler: ({ data }) => {
      setGroupList(data)
    },
    onerror: e => {
      console.log(e)
    },
    Deps: [verificationRefresh],
  })

  useLogHook({ PrimaryMenu: '', SecondMenu: '', DateType: 0, LogType: logType.ATTENTION_CLICK })

  return (
    <div className="qm-collect-container">
      <CollectLeft
        groupIndex={groupIndex}
        setGroupIndex={setGroupIndex}
        groupList={groupList}
        setGroupList={setGroupList}
        loading={loading}
      />
      <CollectRight groupId={groupIndex} groupList={groupList} setGroupList={setGroupList} />
    </div>
  )
}

export default observer(Collect)
