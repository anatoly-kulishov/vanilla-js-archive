import { Button, Spin, Col } from 'antd'
import ScanViewer from 'components/ScanViewer/ScanViewer'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Row } from 'antd/lib/grid'
import styled from 'styled-components'
import { getQueryParameters } from 'utils/helpers/queryParameters'
import RecognitionValuesForm from './components/Form'
import { useLocation } from 'react-router'
import { useForm } from 'antd/lib/form/Form'
import * as uuid from 'uuid'
import * as moment from 'moment'
import { bool, func } from 'prop-types'
import recognitionValuesPropType from 'constants/propTypes/recognitionValuesPropType'
import mnpScanFilesPropType from 'constants/propTypes/mnpScanFilesPropType'
import history from 'utils/createdHistory'

const Validation = props => {
  const {
    getScanFiles,
    mnpScanFiles,
    isMnpScanFilesLoading,
    isMnpScanFilesError,
    recognitionValues,

    getRecognitionValues,
    isRecognitionValuesLoading,
    isRecognitionValuesError,
    updateRecognitionValues
  } = props

  const [form] = useForm()

  const [selectedCoordinates, setSelectedCoordinates] = useState(undefined)
  const [isBoxInFocus, setIsBoxInFocus] = useState(false)
  const [formData, setFormData] = useState(undefined)
  const [leftBlockHeight, setLeftBlockHeight] = useState(0)

  const location = useLocation()

  const rightBlockTitleRef = useRef(null)
  const leftBlockRef = useRef(null)

  useEffect(() => {
    leftBlockRef.current && setLeftBlockHeight(leftBlockRef.current.offsetHeight)
  })

  useEffect(() => {
    document.title = 'CRM: Валидация распознанных значений'
    const { npId } = getQueryParameters(location.search)

    getScanFiles(npId)
    getRecognitionValues(npId)
  }, [])

  useEffect(() => {
    if (recognitionValues) {
      const { applicationForm, fieldTypeGroups } = recognitionValues
      const formattedFieldTypeGroups = fieldTypeGroups?.map(item => {
        const { recognizedItems, attributeName } = item
        const isDateField = attributeName.toLowerCase().includes('date')

        const newRecognizedItems = recognizedItems.map(recognizedItem => {
          const { value, images, recognizedItemId } = recognizedItem

          return {
            images,
            recognizedItemId,
            value: isDateField ? moment(value, 'DD.MM.YYYY') : value,
            id: uuid()
          }
        })
        return { ...item, recognizedItems: newRecognizedItems }
      })

      const newFormData = { applicationForm, fieldTypeGroups: formattedFieldTypeGroups }

      setFormData(newFormData)
    }
  }, [recognitionValues])

  const width = leftBlockRef.current?.offsetWidth
  const height = leftBlockHeight - rightBlockTitleRef.current?.offsetHeight

  const handleClickCancel = useCallback(() => {
    history.push(`/empty/mnp-order/manual-verification${location.search}`)
  }, [])

  const handleClickInfo = useCallback(coordinates => {
    if (coordinates) {
      setSelectedCoordinates(coordinates)
      setIsBoxInFocus(true)
    }
  }, [])

  const handleBlurBox = useCallback(() => {
    setIsBoxInFocus(false)
  }, [])

  const handleFocusBox = useCallback(() => {
    setIsBoxInFocus(true)
  })

  const handleSubmit = useCallback(() => {
    const { npId } = getQueryParameters(location.search)

    form.validateFields().then(values => {
      const { applicationForm, fieldTypeGroups } = values

      // Преобразовать изначальный массив в плоский массив с необходимыми полями для формирования переменных запроса
      const initialFields = formData.fieldTypeGroups.reduce((acc, item) => {
        const { recognizedItems, fieldTypeId, attributeName } = item
        const isDateField = attributeName.toLowerCase().includes('date')

        recognizedItems.forEach(item => {
          const { id, value, recognizedItemId } = item
          acc.push({ id, value: isDateField ? value.format('DD.MM.YYYY') : value, recognizedItemId, fieldTypeId })
        })
        return acc
      }, [])

      // Выполнить ту же операцию для массива из формы
      const formFields = fieldTypeGroups.reduce((acc, item) => {
        const { recognizedItems, fieldTypeId, attributeName } = item
        const isDateField = attributeName.toLowerCase().includes('date')

        recognizedItems.forEach(item => {
          const { id, value, recognizedItemId } = item
          acc.push({ id, value: isDateField ? value.format('DD.MM.YYYY') : value, recognizedItemId, fieldTypeId })
        })
        return acc
      }, [])

      /* Найти разницу между изначальными id и id формы
      В массиве значений из формы будут отсутствовать id, которые есть в изначальном массиве
      Сформировать массив удаленных значений для передачи в запрос **/
      const deletedValues = initialFields
        .filter(({ id }) => !formFields.find(({ id: formFieldId }) => id === formFieldId))
        .map(({ recognizedItemId }) => ({ recognizedItemId }))

      /* Найти разницу между id формы и изначальными id
      В массиве изначальных значений будут отсутствовать id, которые есть в массиве из формы
      Сформировать массив удаленных значений для передачи в запрос **/
      const addedValues = formFields
        .filter(({ id }) => !initialFields.find(({ id: initialFieldId }) => id === initialFieldId))
        .map(({ fieldTypeId, value }) => ({ fieldTypeId, fixedValue: value }))

      /* Найти разницу между изначальным массивом и массивом из формы в полях с одинаковыми id, но с разными значениями value
      Сформировать массив удаленных значений для передачи в запрос **/
      const editedValues = formFields
        .filter(({ id, value }) =>
          initialFields.find(
            ({ id: initialFieldId, value: initialFieldValue }) => id === initialFieldId && value !== initialFieldValue
          )
        )
        .map(({ recognizedItemId, value }) => ({ recognizedItemId, fixedValue: value }))

      const listsParams = {
        fixedValueList: editedValues.length > 0 ? editedValues : undefined,
        addedValueList: addedValues.length > 0 ? addedValues : undefined,
        rejectedValueList: deletedValues.length > 0 ? deletedValues : undefined
      }

      const data = { npId, applicationForm, ...listsParams }

      updateRecognitionValues(data)
    })
  }, [formData])

  return (
    <Content>
      <RowWrapper>
        <Col span={12}>
          <LeftBlock ref={leftBlockRef}>
            <LeftBlockFormWrapper>
              <LeftBlockTitle>Скан-копия заявления</LeftBlockTitle>
              {isRecognitionValuesError ? (
                <LeftBlockErrorContainer>
                  <p>Ошибка при загрузке распознанных значений</p>
                </LeftBlockErrorContainer>
              ) : (
                <RecognitionValuesForm
                  data={formData}
                  form={form}
                  loading={isRecognitionValuesLoading}
                  onClickInfo={handleClickInfo}
                />
              )}
            </LeftBlockFormWrapper>
            <ButtonWrapper>
              <StyledButton type='primary' onClick={handleSubmit}>
                Закончить проверку
              </StyledButton>
              <StyledButton type='ghost' onClick={handleClickCancel}>
                Отмена
              </StyledButton>
            </ButtonWrapper>
          </LeftBlock>
        </Col>
        <Col span={12}>
          <RightBlock>
            <RightBlockTitle ref={rightBlockTitleRef}>Скан-копия заявления</RightBlockTitle>
            {isMnpScanFilesError ? (
              <ErrorContainer width={width} height={height - 5}>
                <p>Ошибка при загрузке скана</p>
              </ErrorContainer>
            ) : (
              <Spin spinning={isMnpScanFilesLoading}>
                <ScanViewer
                  width={width}
                  height={height - 5}
                  pages={mnpScanFiles}
                  selectedCoordinates={selectedCoordinates}
                  onBlurBox={handleBlurBox}
                  onFocusBox={handleFocusBox}
                  isBoxInFocus={isBoxInFocus}
                />
              </Spin>
            )}
          </RightBlock>
        </Col>
      </RowWrapper>
    </Content>
  )
}

export default Validation

Validation.propTypes = {
  getScanFiles: func,
  mnpScanFiles: mnpScanFilesPropType,
  isMnpScanFilesLoading: bool,
  isMnpScanFilesError: bool,
  recognitionValues: recognitionValuesPropType,
  getRecognitionValues: func,
  isRecognitionValuesLoading: bool,
  isRecognitionValuesError: bool,
  updateRecognitionValues: func
}

const Content = styled.div`
  display: flex;
`
const RowWrapper = styled(Row)`
  padding: 0px 16px 0px 16px;
  width: 100%;
`
const LeftBlock = styled.div`
  margin-right: 20px;
`
const LeftBlockFormWrapper = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0px 10px rgba(32, 33, 36, 0.05);
`
const RightBlock = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0px 10px rgba(32, 33, 36, 0.05);
`
const RightBlockTitle = styled.div`
  border-bottom: 1px solid #d9d9d9;
  font-size: 16px;
  padding: 12px 0px 12px 24px;
  color: black;
  font-family: T2HalvarBreit_ExtraBold;
`
const LeftBlockTitle = styled.div`
  border-bottom: 1px solid #d9d9d9;
  font-size: 16px;
  padding: 12px 0px 12px 24px;
  color: black;
  font-family: T2HalvarBreit_ExtraBold;
`
const ButtonWrapper = styled.div`
  margin-top: 23px;
`

const StyledButton = styled(Button)`
  margin-right: 5px;
`

const LeftBlockErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
`

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`
