import { select, call, put, delay } from 'redux-saga/effects'
import { notification } from 'antd'
import { trimEnd } from 'lodash'

import { cardModes } from 'constants/cardModes'

import { findReason } from 'utils/helpers'
import { getCardMode } from 'utils/helpers/getCardMode'
import api from 'utils/api'
import isHandlingClosed from 'utils/helpers/isHandlingClosed'

import {
  FETCH_REASONS_SUCCESS,
  FETCH_REASONS_FAILURE,
  FETCH_COMPANY_MARKS_SUCCESS,
  FETCH_COMPANY_MARKS_FAILURE,
  SET_COMPANY_MARK_SUCCESS,
  SET_COMPANY_MARK_FAILURE,
  REMOVE_COMPANY_MARK_SUCCESS,
  REMOVE_COMPANY_MARK_FAILURE,
  FETCH_INTERACTIONS,
  FETCH_INTERACTIONS_SUCCESS,
  FETCH_INTERACTIONS_FAILURE,
  CREATE_INTERACTION_SUCCESS,
  CREATE_INTERACTION_FAILURE,
  DELETE_INTERACTION_SUCCESS,
  DELETE_INTERACTION_FAILURE,
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS,
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE,
  FETCH_INTERACTIONS_COMMENT_TEMPLATES_SUCCESS,
  FETCH_INTERACTIONS_COMMENT_TEMPLATES_FAILURE,
  CHANGE_REASON_CATEGORY,
  SET_REASONS_INITIAL,
  FETCH_COMPANY_MARKS_FOR_HANDLING_SUCCESS,
  FETCH_COMPANY_MARKS_FOR_HANDLING_FAILURE,
  EDIT_INTERACTION_COMMENT_SUCCESS,
  EDIT_INTERACTION_COMMENT_FAILURE
} from 'reducers/reasonsRegisteringReducer'

import {
  FETCH_OFFERS
} from 'reducers/offersReducer'

import {
  getRightModalReasonsRegisteringFilterFields,
  getRightModalReasonsRegisteringParameters,
  getRightModalReasonsRegisteringReasons,
  getRightModalReasonsRegisteringInteractions,
  getHandlingState,
  getPersonalAccountState,
  getRightModalReasonsRegisteringMarksToRemove,
  getRightModalReasonsRegisteringMarksToAdd,
  getProcessingParametersState,
  getAvailibleOffers
} from 'selectors'

const {
  fetchReasonCategoryCommentTemplates,
  fetchReasonsCategoriesList,

  fetchCompanyMarks,
  setCompanyMark,
  removeCompanyMark,
  fetchCompanyMarksForHandling,

  fetchInteractions,
  createInteraction,
  deleteInteraction,
  editInteractionComment
} = api

export function * filterReasonsDelaySaga ({ payload }) {
  yield delay(500)

  const filterFields = yield select(getRightModalReasonsRegisteringFilterFields)
  const reasonsParams = yield select(getRightModalReasonsRegisteringParameters)

  const reasonSearchLength =
    reasonsParams && parseInt(reasonsParams.find(item => item.ParamName === 'MinLength').ParamValue)

  const { field, value } = payload
  const { reasonName, categoryId } = filterFields

  const isReasonNameLengthValid = value.length >= reasonSearchLength
  const isReasonNameLengthEqualZero = value.length === 0
  const isInitialReasonsToSet = reasonName === '' && (categoryId === undefined || categoryId === null)

  if (isInitialReasonsToSet) yield put({ type: SET_REASONS_INITIAL })

  if (field === 'reasonName' && (isReasonNameLengthValid || isReasonNameLengthEqualZero)) {
    yield call(fetchReasonsCategoriesSaga)
  }

  if (field === 'categoryId') {
    yield call(fetchReasonsCategoriesSaga)
  }
}
export function * fetchReasonsCategoriesSaga () {
  const filterFields = yield select(getRightModalReasonsRegisteringFilterFields)
  const personalAccount = yield select(getPersonalAccountState)
  const processingParameters = yield select(getProcessingParametersState)
  const { BaseFunctionalParams = { } } = personalAccount
  const channelId = processingParameters?.ServiceChannel?.Id
  const {
    InteractionDirectionId: directionId,
    ClientCategoryId: clientCategoryId
  } = BaseFunctionalParams

  try {
    let requestParams = {
      ...filterFields,
      userRoleAffects: true,
      channelId,
      directionId,
      clientCategoryId
    }

    if (filterFields.reasonName) {
      const reasonsParams = yield select(getRightModalReasonsRegisteringParameters)

      const reasonSearchLength =
        reasonsParams && parseInt(reasonsParams.find(item => item.ParamName === 'MinLength').ParamValue)
      const isReasonNameLengthValid = filterFields.reasonName.length >= reasonSearchLength

      const { reasonName } = filterFields

      requestParams = {
        ...requestParams,
        reasonName: isReasonNameLengthValid ? trimEnd(reasonName) : ''
      }
    }

    const { data } = yield call(fetchReasonsCategoriesList, requestParams)
    const { Data: { Reasons, Categories, GlobalParameters } } = data

    if (data.IsSuccess) {
      yield put({ type: FETCH_REASONS_SUCCESS, payload: { Reasons, Categories, GlobalParameters } })
    } else {
      yield put({ type: FETCH_REASONS_FAILURE, payload: data.MessageText })

      notification.error({
        message: `Ошибка причин категорий `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_REASONS_FAILURE, payload: { data: exception.message } })

    notification.error({
      message: `Ошибка причин категорий `,
      description: exception.message
    })
  }
}

export function * fetchCompanyMarksSaga ({ payload }) {
  const { requestType } = payload

  try {
    const { data } = yield call(fetchCompanyMarks, requestType)

    if (data.IsSuccess) {
      yield put({ type: FETCH_COMPANY_MARKS_SUCCESS, payload: { companyMarks: data.Data.CompanyMarks } })
    } else {
      yield put({ type: FETCH_COMPANY_MARKS_FAILURE, payload: { companyMarks: data.Data.CompanyMarks } })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_COMPANY_MARKS_FAILURE, payload: { data: exception.message } })

    notification.error({
      message: `Ошибка `,
      description: exception.message
    })
  }
}

export function * fetchCompanyMarksForHandlingSaga () {
  const handling = yield select(getHandlingState)

  try {
    const { data } = yield call(fetchCompanyMarksForHandling, handling.Id)

    if (data.IsSuccess) {
      yield put({ type: FETCH_COMPANY_MARKS_FOR_HANDLING_SUCCESS,
        payload: {
          companyMarksForHandling: data.Data.SessionMarks
        } })
    } else {
      yield put({ type: FETCH_COMPANY_MARKS_FOR_HANDLING_FAILURE,
        payload: {
          companyMarksForHandling: data.Data.SessionMarks
        } })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_COMPANY_MARKS_FOR_HANDLING_FAILURE, payload: { data: exception } })

    notification.error({
      message: `Ошибка `,
      description: exception.message
    })
  }
}

export function * setCompanyMarkSaga (markToAdd) {
  const handling = yield select(getHandlingState)

  try {
    const { data } = yield call(setCompanyMark, handling.Id, markToAdd)

    if (data.IsSuccess) {
      yield put({ type: SET_COMPANY_MARK_SUCCESS, payload: { markId: markToAdd } })
    } else {
      yield put({ type: SET_COMPANY_MARK_FAILURE })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: SET_COMPANY_MARK_FAILURE })

    notification.error({
      message: `Ошибка `,
      description: exception.message
    })
  }
}

export function * removeCompanyMarkSaga (markToRemove) {
  const handling = yield select(getHandlingState)

  try {
    const { data } = yield call(removeCompanyMark, handling.Id, markToRemove)

    if (data.IsSuccess) {
      yield put({ type: REMOVE_COMPANY_MARK_SUCCESS })
    } else {
      yield put({ type: REMOVE_COMPANY_MARK_FAILURE })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: REMOVE_COMPANY_MARK_FAILURE })

    notification.error({
      message: `Ошибка `,
      description: exception.message
    })
  }
}

export function * changeCompanyMarksSaga () {
  const markToRemove = yield select(getRightModalReasonsRegisteringMarksToRemove)
  const markToAdd = yield select(getRightModalReasonsRegisteringMarksToAdd)

  if (markToRemove.length > 0) {
    yield removeCompanyMarkSaga(markToRemove[0])
  }
  if (markToAdd.length > 0) {
    yield setCompanyMarkSaga(markToAdd[0])
  }
}

export function * fetchInteractionsSaga () {
  const handlingState = yield select(getHandlingState)
  const personalAccountState = yield select(getPersonalAccountState)
  const reasons = yield select(getRightModalReasonsRegisteringReasons)
  const availibleOffers = yield select(getAvailibleOffers)
  const email = personalAccountState.Email && encodeURIComponent(personalAccountState.Email)

  if (handlingState && handlingState.Id) {
    try {
      const { data } =
        yield call(
          fetchInteractions,
          handlingState.Id,
          personalAccountState.Msisdn,
          email,
          true
        )

      if (data.IsSuccess) {
        const { Data } = data
        const interactions = Data?.Interactions || []

        yield put({ type: FETCH_INTERACTIONS_SUCCESS, payload: { interactions } })

        yield * interactions.map(interaction => {
          const reason = findReason(reasons, interaction.ReasonId)
          const category =
            reason &&
            !!reason.Categories &&
            !!reason.Categories.length &&
            reason.Categories.find(item => item.CategoryId === interaction.CategoryId)
          const isRegisteringCaseOne = interaction.RegisteringCaseId === 1

          if (reason && category && isRegisteringCaseOne) {
            return put({ type: CHANGE_REASON_CATEGORY, payload: { reason, category, field: 'active', value: true } })
          }
        })

        const isAnonymous = getCardMode(personalAccountState.ClientCategory, personalAccountState.Msisdn) === cardModes.anonymous

        if (!isAnonymous && (availibleOffers === null || Data?.IsOfferRerequestNeeded)) {
          yield put({ type: FETCH_OFFERS })
        }
      } else {
        yield put({ type: FETCH_INTERACTIONS_FAILURE, payload: { error: data.Data } })
      }

      if (!data.IsSuccess) {
        notification.error({
          message: `Ошибка `,
          description: data.MessageText
        })
      }
    } catch (exception) {
      yield put({ type: FETCH_INTERACTIONS_FAILURE, payload: { error: exception.message } })

      notification.error({
        message: `Ошибка `,
        description: exception.message
      })
    }
  }
}

export function * createInteractionSaga ({ payload }) {
  const { interactionData } = payload

  const reasons = yield select(getRightModalReasonsRegisteringReasons)

  const reason = findReason(reasons, interactionData?.reasonId)
  const category =
    reason &&
    !!reason.Categories &&
    !!reason.Categories.length &&
    reason.Categories.find(item => item.CategoryId === interactionData.categoryId)

  try {
    const { data } = yield call(createInteraction, interactionData)

    if (data.IsSuccess) {
      yield put({ type: CREATE_INTERACTION_SUCCESS })
      yield put({ type: FETCH_INTERACTIONS })
    } else {
      yield put({ type: CREATE_INTERACTION_FAILURE, payload: { error: data } })
      yield put({ type: CHANGE_REASON_CATEGORY, payload: { reason, category, field: 'active', value: 'error' } })
    }

    if (!data.IsSuccess) {
      isHandlingClosed(data.MessageText) && notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: CREATE_INTERACTION_FAILURE, payload: { error: exception.message } })
    if (reason) {
      yield put({ type: CHANGE_REASON_CATEGORY, payload: { reason, category, field: 'active', value: 'error' } })
    }
  }
}

export function * deleteInteractionSaga ({ payload }) {
  const { interactionId } = payload

  const interactions = yield select(getRightModalReasonsRegisteringInteractions)
  const reasons = yield select(getRightModalReasonsRegisteringReasons)
  const { Id: handlingId } = yield select(getHandlingState)

  const interaction = interactions && interactions.find(item => item.InteractionNoteId === interactionId)
  const reason = findReason(reasons, interaction.ReasonId)
  const category = reason && reason.Categories.find(item => item.CategoryId === interaction.CategoryId)

  try {
    const { data } = yield call(deleteInteraction, interactionId, handlingId)

    if (data.IsSuccess) {
      yield put({ type: DELETE_INTERACTION_SUCCESS })
      yield put({ type: FETCH_INTERACTIONS })

      if (reason && category) {
        yield put({ type: CHANGE_REASON_CATEGORY, payload: { reason, category, field: 'active', value: false } })
      }
    } else {
      yield put({ type: DELETE_INTERACTION_FAILURE, payload: { error: data } })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: DELETE_INTERACTION_FAILURE, payload: { error: exception.message } })

    notification.error({
      message: `Ошибка `,
      description: exception.message
    })
  }
}

export function * editInteractionCommentSaga ({ payload }) {
  try {
    const { data } = yield call(editInteractionComment, payload)

    if (data.IsSuccess) {
      yield put({ type: EDIT_INTERACTION_COMMENT_SUCCESS })
      yield put({ type: FETCH_INTERACTIONS })
    } else {
      yield put({ type: EDIT_INTERACTION_COMMENT_FAILURE, payload: { error: data } })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: EDIT_INTERACTION_COMMENT_FAILURE, payload: { error: exception.message } })

    notification.error({
      message: `Ошибка `,
      description: exception.message
    })
  }
}

export function * fetchReasonCategoryCommentTemplatesSaga ({ payload }) {
  try {
    const { data } = yield call(fetchReasonCategoryCommentTemplates, payload)

    if (data.IsSuccess) {
      const { reasonId, categoryId } = payload
      yield put({
        type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS,
        payload: { reasonId, categoryId, commentTemplates: data.Data.ResponseModel }
      })
    } else {
      yield put({ type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE, payload: { error: data } })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE, payload: { error: exception.message } })

    notification.error({
      message: `Ошибка `,
      description: exception.message
    })
  }
}

export function * fetchInteractionsCommentTemplatesSaga ({ payload }) {
  try {
    const { data } = yield call(fetchReasonCategoryCommentTemplates, payload)

    if (data.IsSuccess) {
      const { reasonId, categoryId } = payload

      yield put({
        type: FETCH_INTERACTIONS_COMMENT_TEMPLATES_SUCCESS,
        payload: { reasonId, categoryId, commentTemplates: data.Data.ResponseModel }
      })
    } else {
      yield put({ type: FETCH_INTERACTIONS_COMMENT_TEMPLATES_FAILURE, payload: { error: data } })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_INTERACTIONS_COMMENT_TEMPLATES_FAILURE, payload: { error: exception.message } })

    notification.error({
      message: `Ошибка `,
      description: exception.message
    })
  }
}
