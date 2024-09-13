import React, { Suspense, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import ImagePage from './ImagePage'

import { extensionToMime } from 'utils/helpers/filesHelper'
import { NextButton, PrevButton } from './Buttons'
import mnpScanFilesPropType from 'constants/propTypes/mnpScanFilesPropType'
import { arrayOf, bool, func, number, node } from 'prop-types'
import { coordinatePropType } from 'constants/propTypes/recognitionValuesPropType'

const PdfPage = React.lazy(() => import('./PdfPage'))

const imageExtensions = ['png', 'jpg', 'jpeg', 'tiff']

const ScanViewer = ({ pages, width, height, selectedCoordinates, onBlurBox, isBoxInFocus, onFocusBox, ref }) => {
  const [pageNum, setPageNum] = useState(1)

  const handleFocusBox = useCallback(
    boxPage => {
      if (boxPage !== pageNum) {
        setPageNum(boxPage)
      }
      onFocusBox()
    },
    [pageNum]
  )

  const currentPage = useMemo(() => {
    if (pages.length > 0) {
      const page = pages[pageNum - 1]
      const extension = page?.extension?.replace('.', '')

      if (extension && imageExtensions.includes(extension)) {
        const mime = extensionToMime(extension)
        return (
          <ImagePage
            pageWidth={width}
            pageHeight={height}
            selectedCoordinates={selectedCoordinates}
            imageSrc={page?.base64Content}
            mime={mime}
            onBlurBox={onBlurBox}
            onFocusBox={handleFocusBox}
            isBoxInFocus={isBoxInFocus}
            currentPage={pageNum}
          />
        )
      } else if (extension === 'pdf') {
        return (
          <Suspense fallback={'Загрузка просмотра PDF'}>
            <PdfPage base64Content={page?.base64Content} pageWidth={width} />
          </Suspense>
        )
      }
    } else {
      return null
    }
  }, [pageNum, pages, selectedCoordinates, isBoxInFocus, height])

  const isPdfPage = useMemo(() => {
    if (pages.length > 0) {
      const page = pages[pageNum]
      return page?.extension?.replace('.', '') === 'pdf'
    }
    return false
  }, [pageNum, pages])

  const isFirstPage = useMemo(() => pageNum === 1, [pageNum, pages])
  const isLastPage = useMemo(() => pageNum === pages.length, [pageNum, pages])

  const handlePrevClick = useCallback(() => {
    if (pageNum > 1) {
      setPageNum(prevNum => prevNum - 1)
      onBlurBox && onBlurBox()
    }
  }, [setPageNum, pageNum])

  const handleNextClick = useCallback(() => {
    if (pageNum < pages.length) {
      setPageNum(prevNum => prevNum + 1)
      onBlurBox && onBlurBox()
    }
  }, [setPageNum, pageNum, pages])

  return (
    <Wrapper width={width} height={height} ref={ref}>
      {currentPage}
      {!isPdfPage && pages?.length !== 0 && (
        <>
          {!isFirstPage && <PrevButton onClick={handlePrevClick} />}
          {!isLastPage && <NextButton onClick={handleNextClick} />}
        </>
      )}
    </Wrapper>
  )
}

export default ScanViewer

ScanViewer.propTypes = {
  pages: mnpScanFilesPropType,
  width: number,
  height: number,
  selectedCoordinates: arrayOf(coordinatePropType),
  onBlurBox: func,
  isBoxInFocus: bool,
  onFocusBox: func,
  ref: node
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  align-items: center;
  margin: 5px auto 0px;
  will-change: height;
  transition: height 0.5s ease-in
`
