/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons'
import { Icon } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'

import fromEnv from 'config/fromEnv'

import { getFileIcon, getFileExtension } from 'utils/helpers/filesHelper'

import { fileStorage } from 'constants/ports'

import AuthenticatedFileLink from 'hocs/AuthenticatedFileLink'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default function FileContainer ({ files, deleteFile, sessionId, filesRequired }) {
  FileContainer.propTypes = {
    files: PropTypes.array,
    deleteFile: PropTypes.func.isRequired,
    sessionId: PropTypes.string,
    filesRequired: PropTypes.number
  }

  const handleDelete = FileId => {
    const FileIdList = []
    FileIdList.push(FileId)
    deleteFile({ FileIdList, sessionId, getFileContent: false })
  }

  const filtredFiles = file => {
    const { TypeId: id } = file
    if (filesRequired) {
      if (id) {
        if (filesRequired === 'both') {
          return file
        } else if (id === filesRequired) {
          return file
        } else {
          return null
        }
      } else {
        return file
      }
    } else if (!id) {
      return file
    } else {
      return null
    }
  }

  const filesList = files
    .filter(file => filtredFiles(file))
    .map(item => {
      const url = `${http}${pathBe}:${fileStorage}/storage/downloadFile?fileId=${item.DocumentId}`
      const { FileName: fileName, DocumentId: documentId, TypeId: typeId } = item

      return (
        <File key={fileName}>
          <PreviewIcon type={getFileIcon(getFileExtension(fileName))} />
          <FileName>{fileName}</FileName>
          <Actions>
            <AuthenticatedFileLink url={url} fileName={fileName}>
              <ActionIcon />
            </AuthenticatedFileLink>
            {!typeId && <DeleteIcon onClick={() => handleDelete(documentId)} />}
          </Actions>
        </File>
      )
    })
  return filesList && <Wrapper>{filesList}</Wrapper>
}
const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5vw;
  min-height: 72px;
`
const File = styled.div`
  text-align: center;
  border-radius: 4px;
  border: 1px solid lightgray;
  padding: 10px 0 10px 0;
  display: flex;
  flex-flow: column nowrap;
  padding: 5px;
  transition: border-color 0.1s ease-in-out;
  &:hover {
    border-color: #48bfec;
  }
  white-space: nowrap;
  overflow: hidden;
`

const Actions = styled.div`
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid lightgray;
  transition: border-color 0.1s ease-in-out;
  ${File}:hover & {
    border-color: #48bfec;
  }
  > :not(:last-child) {
    margin-right: 10px;
  }
`

const FileName = styled.label`
  font-weight: normal;
  color: gray;
  text-overflow: ellipsis;
  overflow: hidden;
`

const PreviewIcon = styled(Icon)`
  font-size: 26px;
  color: gray;
  transition: color 0.1s ease-in-out;
`

const ActionIcon = styled(DownloadOutlined)`
  font-size: 20px;
  color: gray;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
  :hover {
    color: #48bfec;
  }
`

const DeleteIcon = styled(DeleteOutlined)`
  font-size: 20px;
  color: gray;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
  :hover {
    color: #ff7875;
  }
`
