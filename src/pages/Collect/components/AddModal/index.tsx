import React, { useState } from 'react'
import { Modal, Button, Input, Form } from 'antd'
import api from '@/api'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'

const { FetchWatchGroup, FetchWatchGroupAdd } = api

const AddModal = ({ visible, setVisble, setGroupList }) => {
  const [addError, setAddError] = useState(false)
  const [errormsg, setErrormsg] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoaidng] = useState(false)

  const { t } = useTranslation()

  const [form] = Form.useForm()

  const addGroup = () => {
    if (value === '') {
      setAddError(true)
      setErrormsg(t('no_rename_group_tip'))
      setLoaidng(false)
      return
    }

    form.submit()
  }

  const hideModal = () => {
    setVisble(false)
    setAddError(false)
    setValue('')
    form.resetFields()
  }

  const onFinish = async values => {
    setLoaidng(true)
    const { data } = await FetchWatchGroupAdd(values)
    if (!data) {
      setErrormsg(t('please_rename'))
      setAddError(true)
      setLoaidng(false)
      return
    }
    try {
      const { data } = await FetchWatchGroup()
      setGroupList(data)
    } catch (e) {
      console.log(e)
    }
    setLoaidng(false)
    hideModal()
    setTimeout(() => {
      document.querySelector('.groupList').scroll(0, 99999999999)
    }, 0)
  }

  const onInputChange = e => {
    let value = e.target.value
    setValue(value)
    setAddError(false)
  }

  return (
    <Modal
      title={
        <>
          <i className="fa fa-plus" /> {t('new_group')}
        </>
      }
      maskClosable={false}
      visible={visible}
      onOk={hideModal}
      onCancel={hideModal}
      footer={null}
      zIndex={10000}
      cancelButtonProps={null}
      centered
      width={300}
      closable={false}
    >
      <Form name="name" form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          validateStatus={addError ? 'error' : 'validating'}
          help={addError ? errormsg : null}
          getValueFromEvent={event => {
            return event.target.value.replace(/\s+/g, '')
          }}
        >
          <Input
            placeholder={t('grouping_name')}
            value={value}
            onChange={onInputChange}
            autoComplete={'off'}
            maxLength={7}
          />
        </Form.Item>

        <Form.Item>
          <div className="form-group">
            <Button className="btn-cancel" size="small" onClick={hideModal}>
              {t('page_cancel')}
            </Button>
            <Button
              type="primary"
              disabled={value.replace(/\s+/g, '') === '' || value.length > 7}
              size="small"
              onClick={addGroup}
              loading={loading}
            >
              {t('create')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default observer(AddModal)
