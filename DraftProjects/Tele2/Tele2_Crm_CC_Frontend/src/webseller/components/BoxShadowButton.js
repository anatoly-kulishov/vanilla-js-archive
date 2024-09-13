import React from 'react'
import styled from 'styled-components'
import LoadingSpinner from 'components/LoadingSpinner'

export default function BoxShadowButton ({ icon, loading, disabled, onClick, children }) {
  return (
    <Container disabled={disabled || loading} onClick={onClick}>
      {loading ? <LoadingSpinner /> : icon}
      {children}
    </Container>
  )
}

const Container = styled.button`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    gap: 10px;
    flex: 1 0 0;
    border: none;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 1px 14px 0 rgba(31, 34, 41, 0.08);
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
    align-items: start;
    text-align: left;

    &:hover {
        background-color: ${({ onClick }) => (onClick ? '#d9f5ff' : 'auto')};
    }

    &:disabled {
        background: rgba(255, 255, 255, 0.6);
        box-shadow: none;
        cursor: auto;
        color: grey;
    }
`
