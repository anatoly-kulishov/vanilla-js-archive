import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

function useObserver (ref, onClick, isOpen) {
  // CLose modal if clicked on outside of element
  function handleClickOutside (event) {
    if (ref.current && !ref.current.contains(event.target)) {
      isOpen && onClick()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}

function Wrapper ({ children, onClick, isOpen }) {
  const wrapperRef = useRef(null)
  useObserver(wrapperRef, onClick, isOpen)

  return <div ref={wrapperRef}>{children}</div>
}

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
}

export default Wrapper
