/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { useDropzone } from 'react-dropzone'

import DownloadIcon from './assets/download-icon.svg'
import DeleteIcon from './assets/delete-icon.svg'

function Dropzone ({
  label,
  handleDrop,
  defaultOverlay: DefaultOverlay,
  activeOverlay: ActiveOverlay,
  allowMultipleFiles,
  maxSize,
  allowedTypes,
  onDownload,
  onDelete,
  isUseRequest,
  filesList,
  setFiles
}) {
  Dropzone.propTypes = {
    label: PropTypes.string,
    handleDrop: PropTypes.func,
    defaultOverlay: PropTypes.element,
    activeOverlay: PropTypes.element,
    allowMultipleFiles: PropTypes.bool,
    maxSize: PropTypes.number,
    allowedTypes: PropTypes.objectOf(PropTypes.array),
    onDownload: PropTypes.func,
    onDelete: PropTypes.func,
    isUseRequest: PropTypes.bool,
    filesList: PropTypes.array,
    setFiles: PropTypes.func
  }
  Dropzone.defaultProps = {
    allowMultipleFiles: true,
    DefaultOverlay: <div>Чтобы загрузить файлы, перетащите их в это поле</div>,
    ActiveOverlay: <div>Оставьте свои файлы здесь</div>
  }

  const handleFileSize = files => {
    return files.filter(({ size }) => {
      return size < maxSize
    })
  }

  const handleFileType = files => {
    for (const allowedType of allowedTypes) {
      return files.filter(({ type }) => {
        return type.includes(allowedType)
      })
    }
  }

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const weightedFiles = maxSize ? handleFileSize(acceptedFiles) : acceptedFiles
    const filteredFiles = allowedTypes && allowedTypes.length ? handleFileType(weightedFiles) : weightedFiles

    if (handleDrop) {
      if (isUseRequest) {
        handleDrop(filteredFiles).then(files => setFiles([...files]))
      } else {
        handleDrop(filteredFiles)
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: allowMultipleFiles
  })

  const FilesPreview = filesList.map(file => {
    const handleDownload = () => {
      onDownload()
    }

    const handleDelete = () => {
      onDelete()
    }

    return (
      <Preview>
        <Name>{file.name}</Name>
        {(onDownload || onDelete) && (
          <Actions>
            {onDownload && <Download onClick={handleDownload} />}
            {onDelete && <Delete onClick={handleDelete} />}
          </Actions>
        )}
      </Preview>
    )
  })

  return (
    <Wrapper>
      {label && <Label htmlFor='dropzone'>{label}</Label>}
      <DropZoneWrapper isDragActive={isDragActive} {...getRootProps()}>
        <input id='dropzone' {...getInputProps()} />
        {isDragActive ? <ActiveOverlay isDragActive={isDragActive} /> : <DefaultOverlay isDragActive={isDragActive} />}
      </DropZoneWrapper>
      <PreviewWrapper>{FilesPreview}</PreviewWrapper>
    </Wrapper>
  )
}

export default Dropzone

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`

const DropZoneWrapper = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  transition: border-color 0.05s ease-in-out, background-color 0.05s ease-in-out, color 0.05s ease-in-out;
  outline: none;
  min-height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isDragActive }) => (isDragActive ? css`#6edbff` : css`white`)};
  ${({ isDragActive }) =>
    isDragActive &&
    css`
      background-color: #6edbff80;
      border-color: #6edbff;
    `}
  :hover {
    border-color: #6edbff;
  }
`

const PreviewWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1vw;
  margin-top: 5px;
  min-height: 90px;
`

const Preview = styled.div`
  border: 1px solid #afafaf;
  border-radius: 4px;
  padding: 0 10px;
  transition: transform 0.05s ease-out, border-color 0.05s ease-out;
  :hover {
    transform: scale(1.02);
    border-color: #6edbff;
  }
`

const Label = styled.h4`
  margin: 0;
  margin-bottom: 10px;
`

const Name = styled.h4`
  cursor: default;
  text-align: center;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Actions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  padding-top: 7px;
  border-top: 1px solid #afafaf;
  margin: 0 5px;
  transition: border-color 0.05s ease-out;
  ${Preview}:hover & {
    border-color: #6edbff;
  }
`

const iconsStyle = css`
  cursor: pointer;
  width: 28px;
  height: auto;
  padding: 5px;
  transition: transform 0.03s ease-out;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.97);
  }
`

const Download = styled(DownloadIcon)`
  ${iconsStyle}
  fill: #afafaf;
`

const Delete = styled(DeleteIcon)`
  ${iconsStyle}
  fill: red;
`
