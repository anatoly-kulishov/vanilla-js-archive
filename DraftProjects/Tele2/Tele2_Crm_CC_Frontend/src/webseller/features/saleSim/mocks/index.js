import { all, call, put, select, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  agreeOnPepWithoutSimSuccess,
  checkPepCodeSuccess,
  disagreeOnPepSuccess,
  setRegistrationSimData
} from 'reducers/saleSim/saleSimReducer'
import {
  RegistrationStatusIds,
  isESim,
  isFinalRegistartionSimStatus,
  isUntemplatedSim
} from 'webseller/features/saleSim/helpers'
import { selectSaleSim } from 'reducers/saleSim/selectors'
import { MimeTypes, convertBase64ToBlob } from 'webseller/helpers'

export function * mockAgreeOnPepWithoutSimSaga () {
  yield put(agreeOnPepWithoutSimSuccess())
}

export function * mockCheckPepCodeSaga ({ payload: code }) {
  yield put(checkPepCodeSuccess(code))
}

export function * mockDisagreeOnPepSaga () {
  yield put(disagreeOnPepSuccess([]))
}

export function * mockRegisterSimsSaga () {
  const { addedSims, soldSims } = yield select(selectSaleSim)

  yield all(
    addedSims.map((addedSim, idx) => {
      const effect = isUntemplatedSim(addedSim.partyTypeId) ? registerUntemplatedSim : registerTemplatedSim

      const sim = {
        ...addedSim,
        ...(soldSims?.[idx] || {}),
        id: addedSim.id
      }

      return call(effect, sim)
    })
  )
}

function * registerTemplatedSim (sim) {
  const isSuccess = Number(sim.icc.toString()[19]) > 4
  yield put(
    setRegistrationSimData({
      id: sim.id,
      data: { statusId: isSuccess ? RegistrationStatusIds.SUCCESS : RegistrationStatusIds.ERROR }
    })
  )
}

let isSuccessUntemplatedESimRegistartionStatus = true
const eSimQr =
  'https://api.tele2.ru/api/barcode?format=qr&data=TFBBOjEkcnNwLnRlbGUyLnJ1JDkzQkUwODM5QkZBODREQ0FCMDVCODE0QUQ4ODdCRDk0'
const paymentQrBase64 =
  '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'

function * registerUntemplatedSim (sim) {
  const isESimScenario = isESim(sim.simTypeId)
  const paymentQr = yield call(convertBase64ToBlob, paymentQrBase64, MimeTypes.PNG)

  const createSocketChannel = simId =>
    eventChannel(emit => {
      setTimeout(() => {
        emit({
          id: simId,
          data: { statusId: RegistrationStatusIds.ORDER_CREATION }
        })
      }, 1000)

      setTimeout(() => {
        emit({
          id: simId,
          data: { statusId: RegistrationStatusIds.PAYMENT_PENDING }
        })
      }, 2000)

      setTimeout(() => {
        if (isESimScenario) {
          const statusId = isSuccessUntemplatedESimRegistartionStatus
            ? RegistrationStatusIds.SUCCESS
            : RegistrationStatusIds.ERROR

          emit({
            id: simId,
            data: { statusId, eSimQr, payments: [{ paymentQr }] }
          })

          isSuccessUntemplatedESimRegistartionStatus = !isSuccessUntemplatedESimRegistartionStatus
        } else {
          const statusId =
            Number(sim.icc.toString()[19]) > 4 ? RegistrationStatusIds.SUCCESS : RegistrationStatusIds.ERROR

          emit({
            id: simId,
            data: { statusId, payments: [{ paymentQr }] }
          })
        }
      }, 3000)

      return () => {}
    })

  const socketChannel = yield call(createSocketChannel, sim.id)

  let isFinalStatus = false
  while (!isFinalStatus) {
    const simData = yield take(socketChannel)
    yield put(setRegistrationSimData(simData))

    isFinalStatus = isFinalRegistartionSimStatus(simData.data.statusId)
  }
}
