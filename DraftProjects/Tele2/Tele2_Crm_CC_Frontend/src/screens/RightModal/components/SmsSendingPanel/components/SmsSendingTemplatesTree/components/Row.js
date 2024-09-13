/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import arrow from '../../../../../assets/arrow.svg'
import PropTypes from 'prop-types'

class Row extends Component {
  static propTypes = {
    template: PropTypes.object,
    isChild: PropTypes.bool,
    handleSelectTemplate: PropTypes.func,
    isAllTemplatesExpanded: PropTypes.bool
  }

  state = {
    isChildrenToggled: false
  }

  static getDerivedStateFromProps (props, state) {
    if (props.isAllTemplatesExpanded !== state.isChildrenToggled) {
      return {
        isChildrenToggled: true
      }
    }

    return null
  }

  toggleChildren () {
    if (this.props.template.Templates && this.props.template.Templates.length) {
      this.setState({
        isChildrenToggled: !this.state.isChildrenToggled
      })
    }
  }

  render () {
    const { template, isChild, handleSelectTemplate, isAllTemplatesExpanded } = this.props
    const { isChildrenToggled } = this.state

    const children = template.Templates
    const isChildren = children && children.length > 0
    const name = template.Name || template.TemplateGroup

    return (
      <Wrapper isChild={isChild} onClick={() => isChild && handleSelectTemplate(template)}>
        {
          isChildren &&
          <Arrow
            isactive={isChildrenToggled ? isChildrenToggled.toString() : 'false'}
            onClick={() => this.toggleChildren()}
          />
        }
        <Title
          onClick={() => this.toggleChildren()}
          className='rowTitle'
          isChildren={isChildren}
          bold={isChildrenToggled && isChildren}
        >
          {name}
        </Title>
        <ChildWrapper isVisible={isChildrenToggled}>
          {
            isChildrenToggled &&
            isChildren &&
            children.map((child, index) => (
              <Row
                key={index}
                template={child}
                isChild
                handleSelectTemplate={handleSelectTemplate}
                isAllTemplatesExpanded={isAllTemplatesExpanded}
              />
            ))
          }
        </ChildWrapper>
      </Wrapper>
    )
  }
}

export default Row

const Title = styled.div`
  font-size: 14px;
  font-weight: ${props => (props.bold ? 'bold' : '300')};
  color: black;
  width: 90%;
  padding: 12px 5px 12px 0px;
  margin-left: ${props => (!props.isChildren ? '25px' : '0')};
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 0 0 25px;
  cursor: pointer;
  transition: background-color 0.2s ease-out;
  will-change: background-color;
  position: relative;

  ${props =>
    props.isChild &&
    `
    &:hover .rowTitle {
      color: #48bfec;
    }
  `};
`

const ChildWrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  overflow: hidden;
  width: 100%;
`

const Arrow = styled(arrow)`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  transform: rotate(${props => (props.isactive === 'true' ? '180deg' : '90deg')});
  z-index: 1;
`
