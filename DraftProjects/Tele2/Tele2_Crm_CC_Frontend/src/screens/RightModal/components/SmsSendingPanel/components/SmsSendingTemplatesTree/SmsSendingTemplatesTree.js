import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import TreeHead from './components/TreeHead'
import TreeBody from './components/TreeBody'
import arrow from '../../../../assets/arrow.svg'
import SmartSearchLine from 'screens/RightModal/components/SmartSearchLine'

class SmsSendingTemplatesTree extends PureComponent {
  static propTypes = {
    selectedTemplate: PropTypes.object,
    fetchReasonCategoryCommentTemplates: PropTypes.func,
    filterTemplates: PropTypes.func,
    templateSearchName: PropTypes.object,
    selectTemplate: PropTypes.func,
    templates: PropTypes.object,
    firstBoot: PropTypes.object,
    isTableToggled: PropTypes.bool,
    toggleTable: PropTypes.func.isRequired
  }

  state = {
    templateSearchValue: ''
  }

  style = { fontSize: '90px', color: '#44CAFF' }

  componentDidMount () {
    const tree = document.querySelector('#templatesTree')

    document.addEventListener('click', this.myFunc(tree))
  }

  componentWillUnmount () {
    const tree = document.querySelector('#templatesTree')
    document.removeEventListener('click', this.myFunc(tree))
  }

  myFunc = (event, tree) => {
    const { isTableToggled, toggleTable } = this.props
    if (tree && !tree.contains(event.target)) {
      isTableToggled && toggleTable()
    }
  }

  handleSelectTemplate = template => {
    const { selectTemplate, fetchReasonCategoryCommentTemplates, toggleTable } = this.props

    selectTemplate({ template })
    fetchReasonCategoryCommentTemplates({ reasonId: template.ReasonId, categoryId: template.CategoryId })
    toggleTable()
  }

  onToggleTableClick = () => {
    const { isTableToggled, toggleTable } = this.props

    return !isTableToggled && toggleTable()
  }

  onSearchTemplate = value => {
    const { filterTemplates } = this.props
    filterTemplates({ field: 'templateName', value: value || '' })
    this.setState({ templateSearchValue: value })
  }

  handleTemplateClear = () => {
    const { selectTemplate, filterTemplates } = this.state
    this.setState({ templateSearchValue: '' })
    selectTemplate({ template: null })
    filterTemplates({ field: 'templateName', value: '' })
  }

  renderSearch = () => {
    const {
      selectedTemplate,
      templateSearchName,
      firstBoot,
      isTableToggled,
      toggleTable
    } = this.props
    const { templateSearchValue } = this.state
    const dictionary = JSON.parse(localStorage.getItem('searchingIrregularsDictionary'))

    let searchValue = ''
    if (isTableToggled) {
      searchValue = templateSearchName
    } else {
      searchValue = (selectedTemplate && selectedTemplate.Name) || templateSearchName
      this.setState({ templateSearchValue: selectedTemplate && selectedTemplate.Name })
    }

    if (!firstBoot) {
      return (
        <TableWrapper isTableToggled>
          <LoaderWrapper>
            <LoadingOutlined style={this.style} />
          </LoaderWrapper>
        </TableWrapper>
      )
    } else {
      return (
        <SearchWrapper>
          <Label>Шаблон SMS</Label>
          <InputSearchWrapper onClick={this.onToggleTableClick}>
            <SmartSearchLine
              dictionary={dictionary}
              value={templateSearchValue}
              onSearch={this.onSearchTemplate}
            />
            {searchValue && (
              <Clear
                onClick={this.handleTemplateClear}
              />
            )}
            <ArrowWrapper onClick={toggleTable}>
              <Arrow isactive={isTableToggled ? isTableToggled.toString() : 'false'} />
            </ArrowWrapper>
          </InputSearchWrapper>
        </SearchWrapper>
      )
    }
  }

  renderTable = () => {
    const { templates, templateSearchName } = this.props
    const { isTableToggled } = this.props

    const isAllTemplatesExpanded = !!templateSearchName && templateSearchName.length >= 3

    if (!templates && isTableToggled) {
      return (
        <TableWrapper isTableToggled>
          <LoaderWrapper>
            <LoadingOutlined style={this.style} />
          </LoaderWrapper>
        </TableWrapper>
      )
    } else {
      return (
        <TableWrapper isTableToggled={isTableToggled}>
          <TreeHead />
          <TableSection>
            <TableScroll>
              <TreeBody
                templates={templates}
                isVisible={isTableToggled}
                handleSelectTemplate={this.handleSelectTemplate}
                isAllTemplatesExpanded={isAllTemplatesExpanded}
              />
            </TableScroll>
          </TableSection>
        </TableWrapper>
      )
    }
  }

  render () {
    const { isTableToggled } = this.props

    return (
      <Wrapper id='templatesTree' isTableToggled={isTableToggled}>
        {this.renderSearch()}
        {this.renderTable()}
      </Wrapper>
    )
  }
}

export default SmsSendingTemplatesTree

const Wrapper = styled.div`
  height: ${props => (props.isTableToggled ? '100%' : 'unset')};
  background: #fff;
`

const TableWrapper = styled.div`
  will-change: transform, opacity;
  display: ${props => (props.isTableToggled ? 'flex' : 'none')};
  margin-bottom: ${props => (props.isTableToggled ? '25px' : '0')};
  height: 100%;
  margin-left: -25px;
  width: calc(100% + 35px);
  position: relative;
  padding: 0 10px 0 25px;
`

const TableSection = styled.div`
  position: relative;
  height: 70vh;
  width: 100%;
`

const TableScroll = styled.div`
  border-top: 45px solid transparent;
  position: absolute;
  top: 0;
  margin-left: auto;
  margin-right: auto;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  background: transparent;
`

const SearchWrapper = styled.div`

`

const InputSearchWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 15px;
`

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  color: black;
`

const ArrowWrapper = styled.div`
  position: absolute;
  right: 2px;
  top: 3px;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  z-index: 1;
  cursor: pointer;
`

const Arrow = styled(arrow)`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 15px;
  height: 15px;
  transform: rotate(${props => (props.isactive === 'true' ? '180deg' : '90deg')});
  transition: color 0.3s ease-out transform 0.3s ease-out;
  will-change: color, transform;

  &:hover {
    transform: scale(1.2) rotate(${props => (props.isactive === 'true' ? '180deg' : '90deg')});

    path {
      fill-opacity: 1;
    }
  }
`

const Clear = styled(CloseCircleOutlined)`
  position: absolute;
  font-size: 13px;
  right: 22px;
  top: 9px;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  z-index: 1;
  cursor: pointer;
  color: #C4C4C4;
  transition: color 0.3s ease-out;
  will-change: color, transform;

  &:hover {
    color: #000;
    transform: scale(1.2)
  }
`

const LoaderWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`
