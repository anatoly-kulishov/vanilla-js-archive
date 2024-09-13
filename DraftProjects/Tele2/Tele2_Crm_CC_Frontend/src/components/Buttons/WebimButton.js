import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsWebSeller } from 'webseller/common/user/selectors'
import useWebim from './WebimButton/hooks/useWebim'

const WebimButton = () => {
  const user = useSelector(state => state.internal.userState.user)
  const msisdn = useSelector(state => state.personalInfo.personalAccountState.personalAccount?.Msisdn)
  const handlingId = useSelector(state => state.internal.handlingState?.Id)
  const hash = useSelector(state => state.webim.webimState.hash)
  const id = useSelector(state => state.webim.webimState.id)
  const dns = useSelector(state => state.webim.webimState.dns)
  const billingBranchId = useSelector(state => state.personalInfo.personalAccountState.personalAccount.BillingBranchId)

  const isWebSeller = useSelector(selectIsWebSeller)

  useWebim({ isWebSeller, user, msisdn, handlingId, hash, id, billingBranchId, dns })

  return (
    <>
      <a className='webim_button' href='#' rel='webim'>
        <img src={`https://${dns}/button.php?location=${isWebSeller ? 'webseller' : 'crmchat'}`} border='0' />
      </a>
    </>
  )
}

export default WebimButton
