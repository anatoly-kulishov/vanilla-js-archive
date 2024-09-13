import React, { useMemo, useState } from 'react'
import { Input, Avatar } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Button } from 'webseller/components'
import { normalizeNumber, denormalizeNumber } from 'webseller/helpers/index'
import {
  AbonentFeePeriod,
  CallsPackageOtherRussiaUomMap,
  InternetPackageUom,
  SallingProcessTypes,
  SALLING_PROCESS_STEPS,
  // SimTypes,
  getTariffInfoRowText,
  useSumOfSimPrice
} from 'webseller/features/saleSim/helpers'
import {
  IconVK,
  IconOdn,
  IconWhatsApp,
  IconViber,
  IconTelegram,
  IconDiscord,
  IconTikTok,
  IconTwitch,
  IconYouTube
} from 'webseller/icons'

const ExpansionType = {
  NONE: 0,
  TARIFF: 1,
  NUMBER: 2
}

const NumberListMode = {
  DEFAULT: 'DEFAULT',
  SEARCH: 'SEARCH'
}

export default function SellSimStep ({
  sallingProcessType,
  addedSims,
  shopTariffs,
  shopNumbers,
  shopNumbersIndexSeed,
  foundShopNumbers,
  isSaleAddedSimsLoading,
  isSaleAddedSimsError,
  mainClientName,
  deleteSim,
  changeSimTariff,
  changeSimNumber,
  getShopNumbers,
  getSearchShopNumbers,
  sellAddedSims,
  onClickAddNewSim,
  toStep,
  toPrevStep
}) {
  const [expansionType, setExpansionType] = useState(ExpansionType.NONE)
  const [numberListMode, setNumberListMode] = useState(NumberListMode.DEFAULT)
  const [activeNumbersCategoryIdx, setActiveNumbersCategoryIdx] = useState(0)
  const [chosenSimId, setChosenSimId] = useState(null)
  const [searchNumberQuery, setSearchNumberQuery] = useState(null)

  const hasAddedSims = addedSims?.length > 0

  const sumOfSimAbonentFee = useSumOfSimPrice(addedSims, shopTariffs?.connectionFee, true)

  const isTransferToTele2 = sallingProcessType === SallingProcessTypes.TRANSFER
  // TODO temporary
  // const isShowAddSimButton = isTransferToTele2 ? addedSims.length === 0 : addedSims.length < 5
  const isShowAddSimButton = addedSims.length === 0

  const isValidQuerySearch = searchNumberQuery?.length > 2 || false

  const numbersForRender = useMemo(() => {
    const numbers = (numberListMode === NumberListMode.SEARCH ? foundShopNumbers : shopNumbers) || shopNumbers

    if (isTransferToTele2) {
      return numbers?.filter(({ categorySlug }) => categorySlug === 'normal')
    }

    return numbers
  }, [numberListMode, isTransferToTele2, foundShopNumbers, shopNumbers])

  const onClickSimTariff = e => {
    const newChosenSimId = e.currentTarget.dataset.simId
    const isSimAlreadyChosen = chosenSimId === newChosenSimId
    const isExpansionAlreadyOpen = expansionType === ExpansionType.TARIFF
    if (isSimAlreadyChosen && isExpansionAlreadyOpen) {
      setChosenSimId(null)
      setExpansionType(ExpansionType.NONE)
      return
    }
    setChosenSimId(newChosenSimId)
    setExpansionType(ExpansionType.TARIFF)
  }

  const onClickSimNumber = e => {
    const newChosenSimId = e.currentTarget.dataset.simId
    const isSimAlreadyChosen = chosenSimId === newChosenSimId
    const isExpansionAlreadyOpen = expansionType === ExpansionType.NUMBER
    if (isSimAlreadyChosen && isExpansionAlreadyOpen) {
      setChosenSimId(null)
      setExpansionType(ExpansionType.NONE)
      return
    }
    setChosenSimId(newChosenSimId)
    setExpansionType(ExpansionType.NUMBER)
  }

  const onClickDeleteSim = e => {
    const simId = e.currentTarget.dataset.simId
    deleteSim(simId)
  }

  const onChangeSearchNumberQuery = e => {
    const newQuery = normalizeNumber(e.target.value, { fallback: '' })
    setSearchNumberQuery(newQuery)
  }

  const onClickSearchNumber = () => {
    setNumberListMode(NumberListMode.SEARCH)
    getSearchShopNumbers({ query: searchNumberQuery })
  }

  const onPressEnterSearch = () => {
    if (isValidQuerySearch) {
      onClickSearchNumber()
    }
  }

  const onClickResetSearch = () => {
    if (numberListMode === NumberListMode.SEARCH) {
      getShopNumbers()
    }
    setSearchNumberQuery(null)
    setNumberListMode(NumberListMode.DEFAULT)
  }

  const onClickNumbersCategory = e => {
    const categoryIdx = Number(e.currentTarget.dataset.categoryIdx)
    setActiveNumbersCategoryIdx(categoryIdx)
  }

  const onClickNewTariff = e => {
    const newTariffName = e.currentTarget.dataset.tariffName
    changeSimTariff({
      simId: chosenSimId,
      tariffName: newTariffName
    })
    setExpansionType(ExpansionType.NONE)
  }

  const onClickNewNumber = e => {
    const { number, slug, price, salePrice } = e.currentTarget.dataset
    changeSimNumber({
      number,
      slug,
      price,
      salePrice,
      simId: chosenSimId
    })
    setExpansionType(ExpansionType.NONE)
  }

  const onClickToNextStep = () => {
    const areAlreadyBeenSold = addedSims.every(sim => {
      return sim.number === sim.soldData?.number
    })
    if (areAlreadyBeenSold) {
      const nextStep =
        isTransferToTele2
          ? SALLING_PROCESS_STEPS.TRANSFER_NUMBER
          : SALLING_PROCESS_STEPS.DOCUMENT_DATA

      toStep(nextStep)
    } else {
      sellAddedSims()
    }
  }

  return (
    <Container>
      <Main>
        <SimsContent>
          <div>
            <Title>Проверь тариф и номер</Title>
            <SimsList>
              {addedSims.map(sim => {
                const isActiveTariffExpansion = expansionType === ExpansionType.TARIFF
                const isActiveNumberExpansion = expansionType === ExpansionType.NUMBER
                const isChosenSim = chosenSimId === sim.id
                const isUntemplatedSim = sim.partyTypeId === 2 || sim.partyTypeId === 4
                const isNumberHasNotChanged = sim.number === sim.soldData?.number

                const tariffInfoRowText = getTariffInfoRowText(sim.tariff)

                return (
                  <SimItem key={sim.id}>
                    <SimItemHeader>
                      <ButtonGhost data-sim-id={sim.id} onClick={onClickDeleteSim}>
                        <Text>Удалить</Text>
                      </ButtonGhost>
                    </SimItemHeader>
                    <SimItemButton
                      data-sim-id={sim.id}
                      active={isChosenSim && isActiveTariffExpansion}
                      disabled={!isUntemplatedSim || isNumberHasNotChanged}
                      onClick={onClickSimTariff}
                    >
                      <Text large bold>
                        {sim.tariff?.name}
                      </Text>
                      <Text large>{tariffInfoRowText}</Text>
                    </SimItemButton>
                    <SimItemButton
                      data-sim-id={sim.id}
                      active={isChosenSim && isActiveNumberExpansion}
                      disabled={!isUntemplatedSim}
                      onClick={onClickSimNumber}
                    >
                      <Text large>{denormalizeNumber(sim.number)}</Text>
                      {sim.icc && <Text large>ICC {sim.icc}</Text>}
                    </SimItemButton>
                  </SimItem>
                )
              })}
            </SimsList>
            {mainClientName && (
              <MainClientName>
                <Text large bold>ГК ЛС</Text>
                <Text large bold>{mainClientName}</Text>
              </MainClientName>
            )}
            {isShowAddSimButton && (
              <AddSimButtonWrapper>
                <ButtonGhost onClick={onClickAddNewSim}>
                  <Text grey>Добавить SIM</Text>
                </ButtonGhost>
              </AddSimButtonWrapper>
            )}
          </div>
          <SimsContentFooter>
            <Text large bold>
              Стоимость
            </Text>
            <Text large bold>
              {sumOfSimAbonentFee} ₽
            </Text>
          </SimsContentFooter>
        </SimsContent>
        {expansionType === ExpansionType.NUMBER && (
          <NumberExpansion>
            <Title style={{ margin: '0 0 0 25px' }}>Выбор номера</Title>
            <NumberSearchWrapper>
              <Input
                placeholder='Поиск номера'
                value={searchNumberQuery}
                onChange={onChangeSearchNumberQuery}
                onPressEnter={onPressEnterSearch}
                suffix={
                  <CloseOutlined
                    style={{ color: 'grey', visibility: searchNumberQuery?.length ? 'inherit' : 'hidden' }}
                    onClick={onClickResetSearch}
                  />
                }
              />
              <Button type='primary' disabled={!isValidQuerySearch} onClick={onClickSearchNumber}>
                Найти
              </Button>
            </NumberSearchWrapper>
            <Navigation>
              {numbersForRender.map(({ price, salePrice, categorySlug }, categoryIdx) => {
                const isNormalSlug = categorySlug === 'normal'
                const isActiveCategory = categoryIdx === activeNumbersCategoryIdx
                return (
                  <NavButton
                    data-category-idx={categoryIdx}
                    key={categorySlug}
                    active={isActiveCategory}
                    onClick={onClickNumbersCategory}
                  >
                    {!isNormalSlug && (
                      <NavButtonText strikethrough active={isActiveCategory}>
                        {price} ₽
                      </NavButtonText>
                    )}
                    <NavButtonText active={isActiveCategory}>{!isNormalSlug ? salePrice : price} ₽</NavButtonText>
                  </NavButton>
                )
              })}
            </Navigation>
            <NumbersList>
              {numbersForRender[activeNumbersCategoryIdx].numbersList.map(number => {
                const activeNumbersCategory = numbersForRender[activeNumbersCategoryIdx]

                return (
                  <NumbersListItem
                    key={number}
                    data-number={number}
                    data-slug={activeNumbersCategory.categorySlug}
                    data-price={activeNumbersCategory.price}
                    data-sale-price={activeNumbersCategory.salePrice}
                    onClick={onClickNewNumber}
                  >
                    {denormalizeNumber(number)}
                  </NumbersListItem>
                )
              })}
              {numberListMode === NumberListMode.DEFAULT && Boolean(shopNumbersIndexSeed) && (
                <ShowMoreBtnWrapper>
                  <ButtonGhost onClick={getShopNumbers}>
                    <Text grey>Показать еще</Text>
                  </ButtonGhost>
                </ShowMoreBtnWrapper>
              )}
            </NumbersList>
          </NumberExpansion>
        )}
        {expansionType === ExpansionType.TARIFF && (
          <TariffExpansion>
            <Title style={{ margin: '0 25px 0 25px' }}>Выбор тарифа</Title>
            <TariffsList>
              {shopTariffs.tariffsList.map(tariff => {
                return (
                  <TariffsListItem key={tariff.name} data-tariff-name={tariff.name} onClick={onClickNewTariff}>
                    <TariffListItemRow style={{ alignItems: 'flex-end' }}>
                      <Text large bold>
                        {tariff.name}
                      </Text>
                      {tariff.abonentFee && (
                        <Text large bold>
                          {tariff.abonentFee} ₽ / {AbonentFeePeriod[tariff.abonentFeePeriod]}
                        </Text>
                      )}
                    </TariffListItemRow>
                    <TariffListItemRow>
                      {tariff.callsPackageOtherRussia && (
                        <PackageItemWrapper>
                          <Text bold>{tariff.callsPackageOtherRussia}</Text>
                          <Text>{CallsPackageOtherRussiaUomMap[tariff.callsPackageOtherRussiaUom]}</Text>
                        </PackageItemWrapper>
                      )}
                      {tariff.smsPackageRussia && (
                        <PackageItemWrapper>
                          <Text bold>{tariff.smsPackageRussia}</Text>
                          <Text>SMS</Text>
                        </PackageItemWrapper>
                      )}
                      {tariff.internetPackage && (
                        <PackageItemWrapper>
                          <Text bold>
                            {tariff.internetPackage} {InternetPackageUom[tariff.internetPackageUom]}
                          </Text>
                          <Text>интернета</Text>
                        </PackageItemWrapper>
                      )}
                    </TariffListItemRow>
                    <TariffListItemRow>
                      <Text>{tariff.unlimitedPhoneCallsTele2}</Text>
                      {Object.values(tariff.unlimitedMedia).some(Boolean) && (
                        <div>
                          <Text>+ безлимит</Text>
                          <Avatar.Group>
                            {tariff.unlimitedMedia?.unlimitedVK && (
                              <Avatar
                                size={24}
                                icon={<IconVK style={{ transform: 'scale(0.75) translate(-6px, -6px)' }} />}
                              />
                            )}
                            {tariff.unlimitedMedia?.unlimitedOdn && (
                              <Avatar
                                size={24}
                                icon={<IconOdn style={{ transform: 'scale(0.75) translate(-6px, -6px)' }} />}
                              />
                            )}
                            {tariff.unlimitedMedia?.unlimitedWhatsApp && (
                              <Avatar
                                size={24}
                                icon={<IconWhatsApp style={{ transform: 'scale(0.75) translate(-6px, -6px)' }} />}
                              />
                            )}
                            {tariff.unlimitedMedia?.unlimitedViber && (
                              <Avatar
                                size={24}
                                icon={<IconViber style={{ transform: 'scale(0.75) translate(-6px, -6px)' }} />}
                              />
                            )}
                            {tariff.unlimitedMedia?.unlimitedTelegram && (
                              <Avatar
                                size={24}
                                icon={<IconTelegram style={{ transform: 'scale(0.75) translate(-6px, -6px)' }} />}
                              />
                            )}
                            {tariff.unlimitedMedia?.unlimitedTikTok && (
                              <Avatar
                                size={24}
                                icon={<IconTikTok style={{ transform: 'scale(0.75) translate(-6px, -6px)' }} />}
                              />
                            )}
                            {tariff.unlimitedMedia?.unlimitedDiscord && (
                              <Avatar
                                size={24}
                                icon={<IconDiscord style={{ transform: 'scale(0.75) translate(-6px, -6px)' }} />}
                              />
                            )}
                            {tariff.unlimitedMedia?.unlimitedTwitch && (
                              <Avatar
                                size={24}
                                icon={<IconTwitch style={{ transform: 'scale(0.75) translate(-6px, -6px)' }} />}
                              />
                            )}
                            {tariff.unlimitedMedia?.unlimitedYoutube && (
                              <Avatar
                                size={24}
                                icon={<IconYouTube style={{ transform: 'scale(0.75) translate(-6px, -6px)' }} />}
                              />
                            )}
                          </Avatar.Group>
                        </div>
                      )}
                    </TariffListItemRow>
                  </TariffsListItem>
                )
              })}
            </TariffsList>
          </TariffExpansion>
        )}
      </Main>
      <Footer>
        <Button onClick={toPrevStep}>Назад</Button>
        <Button type='primary' loading={isSaleAddedSimsLoading} disabled={!hasAddedSims} onClick={onClickToNextStep}>
          Далее
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  max-width: 900px;
`

const Main = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 0px;
`

const SimsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  padding: 0 25px 10px;
`

const SimsContentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NumberExpansion = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ebebeb;
`

const NumberSearchWrapper = styled.div`
  display: flex;
  margin: 16px 25px 15px 25px;
`

const Navigation = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e4e9;
`

const NavButton = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  border: none;
  padding: 10px;
  background-color: ${({ active }) => (active ? '#40BFEE' : 'transparent')};

  &:hover {
    background-color: #d9f5ff;
  }
`

const NavButtonText = styled.span`
  color: ${({ active }) => (active ? '#fff' : '#000')};
  font-family: T2_Rooftop_Regular;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-decoration: ${({ strikethrough }) => (strikethrough ? 'line-through' : 'none')};
`

const NumbersList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedede;
    border-radius: 100px;
  }
`

const NumbersListItem = styled.li`
  padding: 12px 16px;
  font-family: T2_Rooftop_Regular;
  font-size: 12px;
  font-weight: 400;
  border-bottom: 1px solid #e4e4e9;
  background-color: transparent;
  cursor: default;

  &:hover {
    background-color: #d9f5ff;
  }
`

const ShowMoreBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TariffExpansion = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ebebeb;
`

const TariffsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedede;
    border-radius: 100px;
  }
`

const TariffsListItem = styled.li`
  padding: 16px 38px 31px 23px;
  border-bottom: 1px solid #e4e4e9;
  background-color: transparent;
  cursor: default;

  &:hover {
    background-color: #d9f5ff;
  }
`

const TariffListItemRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const PackageItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Title = styled.p`
  margin-bottom: 0px;
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 18px;
`

const Text = styled.p`
  margin-bottom: 0px;
  font-family: T2_Rooftop_Regular;
  font-size: ${({ large }) => (large ? 16 : 14)}px;
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  color: ${({ grey }) => (grey ? '#747474' : '#000')};
`

const ButtonGhost = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    text-decoration: underline;
  }
`

const SimsList = styled.ul`
  list-style: none;
  margin: 21px 0 19px;
  padding: 0px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedede;
    border-radius: 100px;
  }

  & > li:not(:last-of-type) {
    margin-bottom: 16px;
  }
`

const SimItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const SimItemHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 3px;
`

const SimItemButton = styled.button`
  width: 100%;
  text-align: start;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: ${({ active }) => (active ? 'rgba(63, 203, 255, 0.2)' : '#f1f1f1')};
  cursor: pointer;

  &:hover {
    background: rgba(63, 203, 255, 0.1);
  }

  &[disabled]:hover {
    background: #f1f1f1;
    cursor: default;
  }
`

const AddSimButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
`

const MainClientName = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: -10px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`
