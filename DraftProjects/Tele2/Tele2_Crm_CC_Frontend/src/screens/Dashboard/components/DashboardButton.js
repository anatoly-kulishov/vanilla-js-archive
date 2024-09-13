import React from 'react'
import styled from 'styled-components'
import LoadingSpinner from 'components/LoadingSpinner'

export default function DashboardButton ({ icon, loading, disabled, onClick, children }) {
  return (
    <Container disabled={disabled || loading} onClick={onClick}>
      <Icon>
        {loading ? <LoadingSpinner /> : icon}
      </Icon>
      <Title>{children}</Title>
    </Container>
  )
}

const Container = styled.button`
  display: flex;
  width: 100%;
  padding: 8px;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 1px 14px 0px rgba(31, 34, 41, 0.08);
  cursor: pointer;

  &:hover {
    background-color: #d9f5ff;
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.6);
    box-shadow: none;
    cursor: auto;
    color: grey;
  }
`

const Icon = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  word-break: break-all;
  align-items: center;
  background: #F2F3F5;
  color: #808080;
  border-radius: 12px;
  padding: 6px;
  min-width: 42px;
  min-height: 42px;
`

const Title = styled.span`
  font-family: T2_Rooftop_Regular;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
