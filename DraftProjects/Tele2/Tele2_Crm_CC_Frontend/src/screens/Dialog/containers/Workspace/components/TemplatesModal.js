/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState, useEffect } from 'react'
import { bool, func, string, number, shape, arrayOf } from 'prop-types'
import styled from 'styled-components'
import { Modal, List, Input, Collapse } from 'antd'
import HtmlRender from 'components/HtmlRender'

export default function TemplatesModal (props) {
  TemplatesModal.propTypes = {
    isModalVisible: bool,
    setModalVisible: func,
    messageTemplates: arrayOf(
      shape({
        Body: string,
        CreatedBy: string,
        CreatedOn: string,
        IsActive: bool,
        IsDeleted: bool,
        MessageTemplateId: number,
        ModifiedBy: string,
        ModifiedOn: string,
        Name: string,
        SectionTemplateId: number,
        SectionTemplateName: string
      })
    ),
    handleTemplateSelect: func
  }
  const { isModalVisible, setModalVisible, messageTemplates, handleTemplateSelect } = props

  const [renderingTemplates, setTemplates] = useState(messageTemplates)
  const [acriveKeys, setActiveKeys] = useState([])
  const [emptySearchIndicator, setEmptySearchIndicator] = useState(false)

  useEffect(() => {
    setTemplates(messageTemplates)
  }, [messageTemplates])

  const handleChange = (event) => {
    const { target: { value } } = event
    if (value.length >= 3) {
      handleSearch(value)
    }
    if (value.length === 0) {
      handleSearch('')
      setActiveKeys([])
    }
  }

  const handleSearch = (searchText) => {
    const findedTamplates = {}
    const activePanels = []
    for (const sectionId in messageTemplates) {
      Object.assign(findedTamplates, { [sectionId]: {} })
      findedTamplates[sectionId].name = messageTemplates[sectionId].name
      findedTamplates[sectionId].templates = messageTemplates[sectionId].templates
        .filter(template => template.Name.toLowerCase().includes(searchText.toLowerCase()))
      if (findedTamplates[sectionId].templates.length !== 0) {
        activePanels.push(+sectionId)
      }
      setEmptySearchIndicator(activePanels.length === 0)
    }
    setTemplates(findedTamplates)
    setActiveKeys(activePanels)
  }

  const templatePanels = () => {
    const panels = []
    for (const sectionId in renderingTemplates) {
      const isTemplateNotEmpty = renderingTemplates[sectionId].templates.length !== 0
      if (isTemplateNotEmpty) {
        panels.push(
          <Panel key={+sectionId} header={renderingTemplates[sectionId].name}>
            <List
              dataSource={renderingTemplates[sectionId].templates}
              renderItem={template => (
                <Template
                  onClick={() => {
                    setModalVisible(false)
                    handleTemplateSelect(template)
                  }}>
                  <b>{template.Name}</b>
                  <HtmlRender value={template.Body} />
                </Template>
              )}
            />
          </Panel>
        )
      }
    }
    return panels
  }

  return (
    <StyledModal
      footer={null}
      width='80%'
      title='Шаблоны письма'
      visible={isModalVisible}
      onCancel={() => { setModalVisible(false) }}
    >
      <Fragment>
        <SearchFieldWrapper>
          <Input.Search
            placeholder='Поиск по названию'
            onSearch={handleSearch}
            onChange={handleChange}
          />
        </SearchFieldWrapper>
        {emptySearchIndicator && <SearchIndicator>Не найдено ни одного шаблона</SearchIndicator>}
        <Collapse ghost activeKey={acriveKeys} onChange={(keys) => setActiveKeys(keys)}>
          {templatePanels()}
        </Collapse>
      </Fragment>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`
const SearchFieldWrapper = styled.div`
  margin: 8px 16px 8px 16px;
`
const Template = styled(List.Item)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 16px;
  cursor: pointer;
  .rdw-editor-main {
    padding-left: 0;
  }
  :hover {
    background: #f5f5f5;
  }
  transition: background 0.08s ease-in-out;
`
const Panel = styled(Collapse.Panel)`
  .ant-collapse-content-box {
    padding: 0;
  }
`
const SearchIndicator = styled.div`
  padding: 16px;
`
