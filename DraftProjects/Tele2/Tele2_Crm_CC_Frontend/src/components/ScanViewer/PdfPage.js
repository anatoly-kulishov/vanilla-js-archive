import React, { useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { NextButton, PrevButton, ZoomInButton, ZoomOutButton } from './Buttons'
import { number, string } from 'prop-types'

const PdfPage = ({ base64Content, pageWidth }) => {
  const [pageNum, setPageNum] = useState(1)
  const [numPages, setNumPages] = useState(null)
  const zoomPinchRef = useRef(null)

  const handleLoadSuccess = useCallback(
    pdf => {
      setNumPages(pdf.numPages)
    },
    [setNumPages]
  )

  const handlePrevClick = useCallback(() => {
    if (pageNum > 1) {
      setPageNum(prevNum => prevNum - 1)
    }
  }, [setPageNum, pageNum])

  const handleNextClick = useCallback(() => {
    if (pageNum < numPages) {
      setPageNum(prevNum => prevNum + 1)
    }
  }, [setPageNum, pageNum, numPages])

  const handleZoomIn = useCallback(() => {
    zoomPinchRef.current.zoomIn()
  }, [zoomPinchRef])

  const handleZoomOut = useCallback(() => {
    zoomPinchRef.current.zoomOut()
  }, [zoomPinchRef])

  const wrapperStyle = useMemo(() => ({ width: pageWidth }), [pageWidth])

  return (
    <Container>
      <TransformWrapper ref={zoomPinchRef} limitToBounds={false} minScale={0.5} initialScale={0.75} centerOnInit>
        <TransformComponent wrapperStyle={wrapperStyle}>
          <Document
            className='pdf-scan-viewer'
            file={`data:application/pdf;base64,${base64Content}`}
            renderMode='svg'
            onLoadSuccess={handleLoadSuccess}
          >
            <Page pageNumber={pageNum} />
          </Document>
        </TransformComponent>
      </TransformWrapper>
      <PrevButton onClick={handlePrevClick} />
      <NextButton onClick={handleNextClick} />
      <ZoomInButton onClick={handleZoomIn} />
      <ZoomOutButton onClick={handleZoomOut} />
    </Container>
  )
}

export default PdfPage

PdfPage.propTypes = { base64Content: string, pageWidth: number }

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
