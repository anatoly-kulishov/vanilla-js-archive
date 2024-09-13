import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsLoadingGetInitialPersonalDataDuplicateRfa, selectPersonalDataDuplicateRfa } from '../selectors'
import { getInitialPersonalDataDuplicateRfa, submitPersonalDataDuplicateRfa } from '../reducer'
import PersonalDataForm from 'webseller/common/personalData/components/PersonalDataForm'
import { Loader } from 'webseller/components'

export default function PersonalData () {
  const personalData = useSelector(selectPersonalDataDuplicateRfa)
  const isLoading = useSelector(selectIsLoadingGetInitialPersonalDataDuplicateRfa)

  const dispatch = useDispatch()

  const getInitialPersonalData = () => dispatch(getInitialPersonalDataDuplicateRfa())
  const submitPersonalData = payload => dispatch(submitPersonalDataDuplicateRfa(payload))

  useLayoutEffect(() => {
    if (personalData === null) {
      getInitialPersonalData()
    }
  }, [])

  if (isLoading) {
    return <Loader title='Загрузка персональных данных абонента' />
  }

  return <PersonalDataForm initialPersonalData={personalData} handleSubmit={submitPersonalData} />
}
