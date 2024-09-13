/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { debounce } from 'lodash'
import {
  ClientCategoryProps,
  ChannelProps
} from 'constants/reasonsList'
import { SyncOutlined } from '@ant-design/icons'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Row, Col, Select, Input, Button } from 'antd'

class ReasonFilter extends PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    clientCategories: PropTypes.arrayOf(
      ClientCategoryProps
    ).isRequired,
    channels: PropTypes.arrayOf(
      ChannelProps
    ).isRequired,
    isFilteredReasonsLoading: PropTypes.bool.isRequired,
    isClientCategoriesLoading: PropTypes.bool.isRequired,
    isChannelsLoading: PropTypes.bool.isRequired,
    MinLength: PropTypes.number,
    MaxLength: PropTypes.number,
    onSearch: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
    clientCategoryId: PropTypes.string,
    channelId: PropTypes.string,
    handleChangeState: PropTypes.func
  }

  static defaultProps = {
    isAdmin: false,
    MinLength: 3,
    MaxLength: 8,
    clientCategoryId: null,
    channelId: null
  }

  handleSubmit = event => {
    event.preventDefault()
    const { form, onSearch } = this.props
    const fields = form.getFieldsValue()

    onSearch(fields)
  }

  handleCategoryChange = clientCategoryId => {
    const { form, onSearch } = this.props
    const fields = form.getFieldsValue()

    onSearch({ ...fields, clientCategoryId })
  }

  handleChannelChange = channelId => {
    const { form, onSearch } = this.props
    const fields = form.getFieldsValue()

    onSearch({ ...fields, channelId })
  }

  handleNameSearch = debounce(reasonName => {
    const { MinLength, MaxLength, form, onSearch, handleChangeState } = this.props
    const length = reasonName.length

    if (length >= MinLength) {
      handleChangeState(true)
    } else {
      handleChangeState(false)
    }

    if (!length || (length >= MinLength && length <= MaxLength)) {
      const fields = form.getFieldsValue()
      onSearch({ ...fields, reasonName })
    }
  }, 200)

  handleNameChange = event => {
    const reasonName = event.target.value
    this.handleNameSearch(reasonName)
  }

  render () {
    const {
      form,
      clientCategories,
      channels,
      isFilteredReasonsLoading,
      isClientCategoriesLoading,
      isChannelsLoading,
      isAdmin,
      clientCategoryId,
      channelId
    } = this.props

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label='Категория клиента'
              colon={false}
            >
              {form.getFieldDecorator('clientCategoryId', { initialValue: clientCategoryId })(
                <StyledSelect
                  disabled={isFilteredReasonsLoading || isClientCategoriesLoading}
                  getPopupContainer={trigger => trigger.parentNode}
                  onChange={this.handleCategoryChange}
                >
                  <Select.Option value={null} key={null}>
                    Все
                  </Select.Option>
                  {clientCategories.map(categoty => (
                    <Select.Option value={categoty.Id} key={categoty.Id}>
                      {categoty.Name}
                    </Select.Option>
                  ))}
                </StyledSelect>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label='Канал обслуживания'
              colon={false}
            >
              {form.getFieldDecorator('channelId', { initialValue: channelId })(
                <StyledSelect
                  disabled={isFilteredReasonsLoading || isChannelsLoading}
                  getPopupContainer={trigger => trigger.parentNode}
                  onChange={this.handleChannelChange}
                >
                  <Select.Option value={null} key={null}>
                    Все
                  </Select.Option>
                  {channels.map(channel => (
                    <Select.Option value={channel.Id} key={channel.Id}>
                      {channel.Name}
                    </Select.Option>
                  ))}
                </StyledSelect>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={14}>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              label='Причина'
              colon={false}
            >
              {form.getFieldDecorator('reasonName')(
                <Input onChange={this.handleNameChange} />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            { isAdmin &&
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                label='Мнемо'
                colon={false}
              >
                {form.getFieldDecorator('mnemoCode')(
                  <Input disabled={isFilteredReasonsLoading} />
                )}
              </Form.Item>
            }
          </Col>
          <Col span={2}>
            <ControlsWrapper>
              <Button
                shape='circle'
                icon={<SyncOutlined />}
                type='primary'
                htmlType='submit'
                disabled={isFilteredReasonsLoading}
              />
            </ControlsWrapper>
          </Col>
        </Row>
      </StyledForm>
    )
  }
}

export default Form.create()(ReasonFilter)

const StyledForm = styled(Form)`
  padding: 10px 20px 10px 0;
  flex-shrink: 0;

  .ant-form-item {
    margin: 0;
  }
`

const StyledSelect = styled(Select)`
  width: 100%;
`

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 39px;
`
