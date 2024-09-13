import React, { Component } from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

class NotificationBlock extends Component {
  static propTypes = {
    isToggled: PropTypes.bool,
    type: PropTypes.object,
    reasons: PropTypes.object,
    afterChange: PropTypes.object
  }
  render () {
    const { isToggled, type, reasons, afterChange } = this.props

    return (
      <Wrapper isToggled={isToggled} type={type} afterChange={afterChange}>
        {
          reasons && reasons.length && reasons.map((reason, index) => {
            return (
              <div key={index}>
                <Title>{reason.title}</Title>
                <Reason>{reason.content}</Reason>
              </div>
            )
          })
        }
      </Wrapper>
    )
  }
}

export default NotificationBlock

const Wrapper = styled(Carousel)`
  margin-right: 30px;
  padding: ${props => props.isToggled ? '13px 20px' : '0'};
  margin-bottom: ${props => props.isToggled ? '10px' : '0'};
  height: ${props => props.isToggled ? 'auto' : '0'};
  border-radius: 5px;
  overflow: hidden;
  background: ${props => {
    switch (props.type) {
      case 'success': return 'rgba(82, 196, 26, 0.3)'
      case 'info': return 'rgba(110, 219, 255, 0.3)'
      default: return 'rgba(255, 163, 158, 0.3)'
    }
  }};
  
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return 'rgba(82, 196, 26, 0.9)'
      case 'info': return 'rgba(110, 219, 255, 0.9)'
      default: return 'rgba(255, 163, 158, 0.9)'
    }
  }};

  transform: translateY(${props => props.isToggled ? '0' : '-30%'});
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  opacity: ${props => props.isToggled ? '1' : '0'};
  will-change: transform, opacity;

  & .slick-slide {
    
  }
  
  & .slick-dots {
    width: auto;
  }
  
  & .slick-dots li button {
    width: 6px !important;
    height: 6px !important;
    background-color: ${props => {
    switch (props.type) {
      case 'success': return '#52C41A'
      case 'info': return '#6edbff'
      default: return '#F22735'
    }
  }} !important;
    border-radius: 50%;
  }

  & .slick-slide h3 {
    color: #fff;
  }
`

const Title = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #000;
`

const Reason = styled.div`
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
`
