import React, { useState, FC } from 'react'
import { Modal, Checkbox, Button, notification, Input, Form } from 'antd'
import './style.less'
import { useStore } from '@/utils/context'
import api from '@/api'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import { debounce, pick } from 'lodash-es'
import { toJS } from 'mobx'

const { FetchWatchGroup, FetchWatchGroupAdd } = api

interface ICollectModalProps {
  visible: boolean
  hideModal: () => void
  record: any
  cb?: () => void
  showModal?: () => void
}
// 新增搜索框内容

const AddGroup = observer(({ setAttentionList, cb, appId, attentionList }) => {
  const [form] = Form.useForm()

  const [addError, setAddError] = useState(false)
  const [errormsg, setErrormsg] = useState('')
  const [showAddButton, setShowAddButton] = useState(true)
  const [value, setValue] = useState('')

  const { t } = useTranslation()

  // 获取关注分组回显
  const addGroup = () => {
    setShowAddButton(false)
  }

  const handleCancel = () => {
    setAddError(false)
    setShowAddButton(true)
    form.setFieldsValue({ name: '' })
    setValue('')
  }

  const saveNewGroup = async () => {
    if (value === '') {
      setAddError(true)
      setErrormsg(t('no_rename_group_tip'))
      return
    }
    const { data } = await FetchWatchGroupAdd({ name: value })

    if (!data) {
      setErrormsg(t('rename_group_tip'))
      setAddError(true)
      return
    }
    setShowAddButton(true)
    setValue('')
    form.setFieldsValue({ name: '' })

    try {
      const { data: data1 } = await FetchWatchGroup()
      cb && cb(data1)
      const temp = data1.map(item => {
        return { ...pick(item, ['id', 'name']), checked: false }
      })
      const res: any[] = toJS(attentionList)
      const selectId = res.filter(item => item.checked === true).map(item => item.id)
      for (let i = 0; i < temp.length; i++) {
        const item = temp[i]
        for (let j = 0; j < selectId.length; j++) {
          const item1 = selectId[j]
          if (item.id === item1) {
            item.checked = true
            break
          } else {
            item.checked = false
          }
        }
      }

      setAttentionList(temp)
      setTimeout(() => {
        document.querySelector('.zu ul').scroll(0, 999999)
      }, 0)
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    if (value !== '') {
      setAddError(false)
    }
  }, [value])

  const onInputChange = e => {
    const value = e.target.value
    setValue(value.trim())
  }

  return (
    <div className="new">
      <Button
        className="btn-add ant-btn-sm"
        onClick={addGroup}
        style={{ display: showAddButton ? 'block' : 'none' }}
      >
        <i className="fa fa-plus" /> {t('new_group')}
      </Button>

      <Form name="name" form={form} style={{ display: !showAddButton ? 'inline' : 'none' }}>
        <Form.Item
          name="name"
          validateStatus={addError ? 'error' : 'validating'}
          help={addError ? errormsg : null}
          getValueFromEvent={event => {
            return event.target.value.replace(/\s+/g, '')
          }}
        >
          <Input
            className="add-group-input"
            size="small"
            placeholder={t('grouping_name')}
            onChange={onInputChange}
            autoComplete={'off'}
            maxLength={7}
            value={value}
          />
        </Form.Item>
      </Form>
      <a
        className="cancel"
        onClick={handleCancel}
        style={{ display: !showAddButton ? 'inline' : 'none' }}
      >
        <i className="iconfont icon-error"></i>
      </a>
      <a
        className="btncj"
        onClick={saveNewGroup}
        style={{ display: !showAddButton ? 'inline' : 'none' }}
      >
        <i className="iconfont icon-right"></i>
      </a>
    </div>
  )
})

const CollectModal: FC<ICollectModalProps> = (props: ICollectModalProps) => {
  const { visible, hideModal, record, cb = null } = props

  const { addAttention, removeAttention, attentionList, setAttentionList } = useStore().appStore

  const { changeAppAttention } = useStore().detailStore

  // 已添加的分组
  const [group, setGroup] = useState([])

  React.useEffect(() => {
    let arr = []
    attentionList.forEach(item => {
      if (item.checked === true) {
        arr.push(item.id)
      }
    })

    setGroup(arr)
  }, [record])

  const handleCollect = async () => {
    const groupId = group.length ? group.join(',') : ''
    const params = { appId: record.appId, groupId }
    // 处理关注页面逻辑
    await addAttention(params, cb)
    cb && cb()
    !cb && changeAppAttention(1)
    notification.success({
      message: i18n.t('succeeded'),
      description: i18n.t('already_watched'),
    })
    handleHideModal()
  }

  const handleHideModal = () => {
    setGroup([])
    hideModal()
  }

  const handleCancelCollect = () => {
    const params = { appId: record.appId }
    removeAttention(params)
    changeAppAttention(0)
    handleHideModal()
  }

  const onCheckChange = (e, id) => {
    const isChecked = e.target.checked
    const temp = toJS(attentionList)
    const index = temp.findIndex(item => item.id === id)
    if (isChecked) {
      temp[index].checked = true
      group.push(id)
      setGroup(group)
      setAttentionList(temp)
    } else {
      temp[index].checked = false
      setAttentionList(temp)
      const zindex = group.findIndex(item => item === id)
      group.splice(zindex, 1)
      setGroup(group)
    }
  }

  const ModalTitle = () => <div className="qm-modal--title">{i18n.t('attention_grouping')}</div>

  const ModalChildren = observer(() => (
    <div className="qm-collect">
      <h5>{i18n.t('grouped_attention')}</h5>
      <div className="zu">
        <ul>
          {attentionList.length ? (
            attentionList.map(item => (
              <li key={item.id}>
                <Checkbox onChange={e => onCheckChange(e, item.id)} checked={item.checked}>
                  {item.name}
                </Checkbox>
              </li>
            ))
          ) : (
            <div className="empty">{i18n.t('no_watch_list')}</div>
          )}
        </ul>
        <AddGroup
          setAttentionList={setAttentionList}
          cb={cb}
          appId={record.appId}
          attentionList={attentionList}
        />
      </div>
      <div className="bn">
        <Button type="primary" onClick={debounce(handleCollect, 500)}>
          {i18n.t('page_attention')}
        </Button>
        {record && record.attention ? (
          <Button type="link" onClick={debounce(handleCancelCollect, 500)}>
            {i18n.t('cancel_watch')}
          </Button>
        ) : null}
      </div>
    </div>
  ))

  return (
    <Modal
      title={<ModalTitle />}
      visible={visible}
      onOk={hideModal}
      onCancel={hideModal}
      zIndex={10000}
      footer={null}
      centered
      maskClosable={false}
      wrapClassName="qm-modal--container"
    >
      <ModalChildren />
    </Modal>
  )
}

export default observer(CollectModal)
