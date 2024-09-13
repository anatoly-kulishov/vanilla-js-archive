import React from 'react'
import styled from 'styled-components'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
import PropTypes from 'prop-types'

const MsisdnSubscribers = (props) => {
  MsisdnSubscribers.propTypes = {
    msisdn: PropTypes.object,
    msisdnEditRights: PropTypes.func,
    onChange: PropTypes.func,
    onPaste: PropTypes.func,
    onClickRemove: PropTypes.func
  }
  const { onChange, onPaste, msisdn, msisdnEditRights, onClickRemove } = props
  return (
    <Wrapper>
      <MsisdnWrapper>
        <Label>msisdn</Label>
        <InputGroup>
          <StyledMsisdnMaskedInput
            value={msisdn}
            onChange={onChange}
            onPaste={onPaste}
            onClickRemove={onClickRemove}
            disabled={!msisdnEditRights}
            noAutoFocus
          />
        </InputGroup>
      </MsisdnWrapper>
    </Wrapper>
  )
}

export default MsisdnSubscribers

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
  padding-left: 0;
`

const MsisdnWrapper = styled.div`
  margin-right: 10px;
  max-width: 660px;
`

const Label = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  color: #000;
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const StyledMsisdnMaskedInput = styled(MsisdnMaskedInput)`
  max-width: 170px;
  margin-right: 10px;
  margin-top: 10px;
`
