/* eslint-disable id-length */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { clamp } from 'lodash-es'
import { ChooseNextBox, ChoosePrevBox, ResetButton, ZoomInButton, ZoomOutButton } from './Buttons'
import { fillColors } from 'screens/MnpManualVerification/constants/fillColors'
import { arrayOf, bool, func, number, string } from 'prop-types'
import { coordinatesPropType } from 'constants/propTypes/mnpVerificationPropType'

const PAN_SENSITIVITY = 1
const SCROLL_SENSITIVITY = 0.001
const BUTTON_ZOOM_SENSITIVITY = 0.5
const MAX_ZOOM = 5
const MIN_ZOOM = 1

const DefaultZoom = 1

const ImagePage = ({
  imageSrc,
  pageWidth,
  pageHeight,
  mime,
  selectedCoordinates,
  onBlurBox,
  isBoxInFocus,
  onFocusBox,
  currentPage
}) => {
  const image = useMemo(() => new Image(), [imageSrc])
  const canvasRef = useRef(null)
  const [zoom, setZoom] = useState(DefaultZoom)
  const [offset, setOffset] = useState({ x: pageWidth / 2, y: pageHeight / 2 })
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0)

  const [dragging, setDragging] = useState(false)

  const imageRatio = useRef(1)
  const touch = useRef({ x: 0, y: 0 })

  const selectedCoordinatesLength = useMemo(() => selectedCoordinates?.length - 1 || 0, [selectedCoordinates])

  useEffect(() => {
    image.src = `data:${mime};base64, ${imageSrc}`
    image.onload = () => {
      const { width, height } = image
      const ratio = Math.min(pageWidth / width, pageHeight / height)
      imageRatio.current = ratio
      if (!isBoxInFocus) {
        resetZoomAndOffset()
      } else {
        draw()
      }
    }
  }, [image, mime, pageWidth, pageHeight])

  useEffect(() => {
    draw()
  }, [zoom, offset])

  useEffect(() => {
    if (selectedCoordinates && isBoxInFocus) {
      const currentBox = selectedCoordinates[currentBoxIndex]
      if (currentBox && currentPage !== currentBox.page) {
        onFocusBox(currentBox.page)
      }
      focusOnBox(currentBox)
    }
  }, [currentBoxIndex, isBoxInFocus, selectedCoordinates])

  useEffect(() => {
    if (selectedCoordinates) {
      setCurrentBoxIndex(0)
    }
  }, [selectedCoordinates])

  const resetZoomAndOffset = () => {
    const offset = getCenterOffset()
    setZoom(DefaultZoom)
    setOffset(offset)
  }

  const getCenterOffset = () => {
    const { width, height } = image

    const x = -((canvasRef.current.width - width * imageRatio.current) / 2)
    const y = -((canvasRef.current.height - height * imageRatio.current) / 2)

    return { x, y }
  }

  const draw = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      const { width, height } = image
      canvasRef.current.width = pageWidth
      canvasRef.current.height = pageHeight

      context.clearRect(0, 0, width, height)
      canvasRef.current.style.backgroundColor = '#CCCCCC'
      context.translate(-offset.x, -offset.y)
      context.scale(imageRatio.current * zoom, imageRatio.current * zoom)
      context.drawImage(image, 0, 0)

      if (selectedCoordinates) {
        drawBoxes(context)
      }
    }
  }

  const focusOnBox = box => {
    const { xcoordinate, ycoordinate, width, height } = box

    setZoom(4)
    setOffset({
      x: xcoordinate - (canvasRef.current.width - width) / 2,
      y: ycoordinate - (canvasRef.current.height - height) / 2
    })
  }

  const drawBox = (context, coord) => {
    const { width, height, xcoordinate, ycoordinate, percent } = coord

    const color = fillColors.find(({ value }) => value === +parseFloat(percent / 100).toFixed(1)).color

    const lineWidth = 5
    const margin = lineWidth + 2

    context.strokeStyle = color
    context.lineWidth = lineWidth
    context.strokeRect(xcoordinate - margin, ycoordinate - margin, width + margin * 2, height + margin * 2)
  }

  const drawBoxes = context => {
    selectedCoordinates.forEach(coord => {
      const { page } = coord
      if (page === currentPage) {
        drawBox(context, coord)
      }
    })
  }

  const handleMouseMove = useCallback(
    event => {
      const { clientX, clientY } = event

      if (dragging) {
        const { x, y } = touch.current

        setOffset(offset => ({
          x: offset.x + (x - clientX) * PAN_SENSITIVITY,
          y: offset.y + (y - clientY) * PAN_SENSITIVITY
        }))

        touch.current = { x: clientX, y: clientY }
      }
    },
    [dragging, setOffset]
  )

  const handleMouseDown = useCallback(
    event => {
      const { clientX, clientY } = event

      touch.current = { x: clientX, y: clientY }
      setDragging(true)
      onBlurBox && onBlurBox()
    },
    [setDragging]
  )

  const handleMouseUp = useCallback(() => setDragging(false), [setDragging])

  const handleMouseLeave = useCallback(() => {
    setDragging(false)
  })

  const handleWheel = useCallback(event => {
    const { deltaY, clientX, clientY } = event
    let isMaxZoomed

    setZoom(prevZoom => {
      const zoomToSet = clamp(prevZoom + deltaY * SCROLL_SENSITIVITY * -1, MIN_ZOOM, MAX_ZOOM)
      isMaxZoomed = zoomToSet === MAX_ZOOM || zoomToSet === MIN_ZOOM
      return zoomToSet
    })

    setOffset(prev => ({
      x: isMaxZoomed ? prev.x : prev.x + clientX * SCROLL_SENSITIVITY * -1,
      y: isMaxZoomed ? prev.y : prev.y + clientY * SCROLL_SENSITIVITY * -1
    }))

    onBlurBox && onBlurBox()
  }, [])

  const handleZoomIn = useCallback(() => {
    setZoom(prevZoom => (prevZoom === MAX_ZOOM ? prevZoom : prevZoom + BUTTON_ZOOM_SENSITIVITY))
    onBlurBox && onBlurBox()
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(prevZoom => (prevZoom === MIN_ZOOM ? prevZoom : prevZoom - BUTTON_ZOOM_SENSITIVITY))
    onBlurBox && onBlurBox()
  }, [])

  const handleReset = useCallback(() => {
    resetZoomAndOffset()
    onBlurBox && onBlurBox()
  }, [])

  const handleChooseNextBox = useCallback(() => {
    setCurrentBoxIndex(prev => (prev === selectedCoordinatesLength ? 0 : prev + 1))
    const currentBox = selectedCoordinates[currentBoxIndex]
    if (currentBox?.page) {
      onFocusBox(currentBox.page)
    }
  }, [selectedCoordinatesLength])

  const handleChoosePrevBox = useCallback(() => {
    setCurrentBoxIndex(prev => (prev === 0 ? selectedCoordinatesLength : prev - 1))
    const currentBox = selectedCoordinates[currentBoxIndex]
    if (currentBox?.page) {
      onFocusBox(currentBox.page)
    }
  }, [selectedCoordinatesLength])

  return (
    <Container>
      <canvas
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        width={pageWidth}
        height={pageHeight}
        ref={canvasRef}
      />
      <ZoomInButton onClick={handleZoomIn} />
      <ResetButton onClick={handleReset} />
      <ZoomOutButton onClick={handleZoomOut} />
      {selectedCoordinatesLength ? (
        <>
          <ChooseNextBox onClick={handleChooseNextBox} />
          <ChoosePrevBox onClick={handleChoosePrevBox} />
        </>
      ) : null}
    </Container>
  )
}

export default ImagePage

ImagePage.propTypes = {
  imageSrc: string,
  pageWidth: number,
  pageHeight: number,
  mime: string,
  selectedCoordinates: arrayOf(coordinatesPropType),
  onBlurBox: func,
  isBoxInFocus: bool,
  onFocusBox: func,
  currentPage: number
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
