/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Collapse, Button, Input } from 'antd'
import { useBroadbandContext } from '../hooks/useBroadbandContext'
// import { InfoCircleOutlined } from '@ant-design/icons'

const amountOfShowingServices = 3

export default function OrderTariffInfo (props) {
  const {
    isHidden,
    changeTariffConstructorVisibility
  } = props

  const { orderState, setConstructorPrice } = useBroadbandContext()

  const [indexOfFullService, changeIndexOfFullService] = useState(null)
  const [activeKey, setActiveKey] = useState(null)
  const [priceValue, setPriceValue] = useState(null)

  // Информация по тарифу
  const info = useMemo(() => {
    if (orderState.Agreement) {
      return {
        services: orderState.Agreement?.Tariff,
        totalCost: orderState.Agreement?.TotalCost ?? '',
        totalFirstPayment: orderState.Agreement?.TotalFirstPayment ?? ''
      }
    } else {
      return {}
    }
  }, [orderState])

  const filtredServices = useMemo(() => {
    if (Object.keys(info).length < 1) {
      return []
    }

    const tariff = []
    const broadbandAccess = []
    const broadbandDevice = []
    const extraServices = []

    info?.services?.forEach((service) => {
      switch (service.Type) {
        case 'tariff':
          tariff.push(service)
          break
        case 'broadbandAccess':
          broadbandAccess.push(service)
          break
        case 'broadbandDevice':
          broadbandDevice.push(service)
          break
        default:
          extraServices.push(service)
          break
      }
    })

    return [
      { title: 'Тариф', data: tariff },
      { title: 'Доп. услуги', data: extraServices },
      { title: 'Услуга ШПД', data: broadbandAccess },
      { title: 'Оборудование', data: broadbandDevice }
    ]
  }, [info])

  const handleShowConstructor = useCallback((event) => {
    event.stopPropagation()
    changeTariffConstructorVisibility(true)
  }, [changeTariffConstructorVisibility])

  const handleServiceDisplaying = (index) => {
    if (indexOfFullService === index) {
      changeIndexOfFullService(null)
    } else {
      changeIndexOfFullService(index)
    }
  }

  const handlePriceChange = useCallback((event) => {
    // Оставляем только float с 2 цифрами после точки
    const inputValue = event.currentTarget.value?.replace(/[^\d.]/g, '').replace(/^([0-9]+\.{1}[0-9]{1,2}).*/g, '$1')
    setPriceValue(inputValue)
    setConstructorPrice(parseFloat(inputValue))
  }, [setConstructorPrice])

  const handleStopPropagation = useCallback((event) => {
    event.stopPropagation()
  }, [])

  const handleCollapseChange = useCallback((key) => {
    info && setActiveKey(key)
  }, [setActiveKey])

  const getSliceLength = (index) => {
    return indexOfFullService === index ? filtredServices[index].length : amountOfShowingServices
  }

  const formatTotalCost = (value) => !isNaN(value) ? Number(value) : ''

  return (
    <Wrapper hidden={!isHidden}>
      <StyledCollapse ghost onChange={handleCollapseChange} activeKey={activeKey}>
        <Collapse.Panel
          key='1'
          header={
            <PanelHeaderWrapper>
              { info
                ? <Cost>
                  <KeyValueField>
                    <Field>Тариф и дополнительные услуги</Field>
                    <Valuefield>{formatTotalCost(info?.totalCost)}</Valuefield>
                  </KeyValueField>
                  <KeyValueField>
                    <Field>Первоначальный платеж</Field>
                    <Valuefield>{info?.totalFirstPayment}</Valuefield>
                  </KeyValueField>
                </Cost>
                : <div />}
              <CostInputWrapper>
                <StyledInput
                  size='small'
                  placeholder='Общая стоимость'
                  value={priceValue}
                  onChange={handlePriceChange}
                  onClick={handleStopPropagation}
                />
                <Button size='small' type='text' onClick={handleShowConstructor}>Конструктор ЛК</Button>
              </CostInputWrapper>
            </PanelHeaderWrapper>
          }
        >
          <Services>
            {filtredServices.map((service, index) => {
              const amountOfHiddenItems = service.data.length - amountOfShowingServices
              const isCurrentShowing = index !== indexOfFullService
              const isMoreButtonNeeded = (service.data.length >= amountOfShowingServices) && isCurrentShowing && (amountOfHiddenItems > 0)
              return (
                service.data.length !== 0 &&
                <Service onClick={() => handleServiceDisplaying(index)}>
                  <Divider>{service.title}</Divider>
                  {service.data.slice(0, getSliceLength(index)).map(data => (
                    <ServiceInfo>
                      <Name>{data.Name}</Name>
                      <div>{`${data.Cost}`}</div>
                    </ServiceInfo>
                  ))}
                  <More>{isMoreButtonNeeded && `ещё ${amountOfHiddenItems}`}</More>
                </Service>
              )
            })}
          </Services>
        </Collapse.Panel>
      </StyledCollapse>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  top: 0;
  z-index: 3;
  position: sticky;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  overflow: auto;
  border-bottom: 1px solid #f0f0f0;
`
const Cost = styled.div`
  display: flex;
`
const KeyValueField = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 24px;
`
const Field = styled.div`
  font-size: 12px;
`
const Valuefield = styled.div`
  color: #000;
  font-size: 13px;
`
const PanelHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const CostInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
`

const Divider = styled.div`
  font-size: 13px;
  padding-bottom: 4px;
  color: black;
  grid-row-end: span 1;
`
const Services = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 50%);
  }
  @media (max-width: 760px) {
    grid-template-columns: repeat(1, 100%);
  }
`
const Service = styled.div`
  background-color: white;
  border: 1px solid #f0f0f0;
  margin: 5px;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  height: max-content;
  :hover {
    box-shadow: 0 0px 10px rgba(32, 33, 36, 0.1);
  }
  box-shadow: unset;
  transition: box-shadow 0.3s ease-in-out;
  transition: height 0.30s;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
`
const ServiceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`
const Name = styled.div`
  width: 70%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
const More = styled.div`
  font-size: 12px;
  color: gray;
`
const StyledCollapse = styled(Collapse)`
  .ant-collapse-content-box {
    padding-top: 0;
  }
`

const StyledInput = styled(Input)`
  margin-right: 8px;
`
