import React from 'react'
import Row from './Row'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const style = { fontSize: '90px', color: '#44CAFF' }

const TreeBody = props => {
  const { isVisible, templates, handleSelectTemplate, isAllTemplatesExpanded } = props

  if (!templates) {
    return (
      <LoaderWrapper>
        <LoadingOutlined style={style} />
      </LoaderWrapper>
    )
  } else {
    return (
      <Wrapper isVisible={isVisible}>
        {
          templates.length
            ? (
              templates.map((item, index) => {
                const isChild = item.Name && item.Name !== ''
                return (
                  <Row
                    key={index}
                    isChild={isChild}
                    template={item}
                    handleSelectTemplate={handleSelectTemplate}
                    isAllTemplatesExpanded={isAllTemplatesExpanded}
                  />
                )
              })
            )
            : (
              <NoResults>{isVisible && 'Нет результатов'}</NoResults>
            )
        }
      </Wrapper>
    )
  }
}

export default TreeBody

TreeBody.propTypes = {
  isVisible: PropTypes.bool,
  templates: PropTypes.object,
  handleSelectTemplate: PropTypes.func,
  isAllTemplatesExpanded: PropTypes.bool
}

const Wrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`

const LoaderWrapper = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const NoResults = styled.div`
  padding-left: 25px;
  padding-top: 15px;
`
