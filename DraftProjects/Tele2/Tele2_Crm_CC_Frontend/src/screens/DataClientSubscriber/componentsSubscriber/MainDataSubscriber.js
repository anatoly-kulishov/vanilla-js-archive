/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Checkbox, Collapse, Row, Col, Select, Button, Popconfirm, Popover } from 'antd'
import { CheckOutlined, StopOutlined, InfoCircleOutlined } from '@ant-design/icons'
import MsisdnInput from 'components/MsisdnMask/MsisdnInput'
import { checkRight, formatDateWithMskZone } from 'utils/helpers'
import ChangeNumberRole from 'webseller/features/numberRoleManagment/components/ChangeNumberRole'
const { Panel } = Collapse
const { Option } = Select

const ContactNumberB2bName = 'ContactNumberB2b'
const SubscriberInformationPublicizeAgreement = 'SubscriberInformationPublicizeAgreement'
const DoNotAgreeWith8dot4OfTerms = 'DoNotAgreeWith8dot4OfTerms'

export default class MainDataSubscriber extends Component {
  static propTypes = {
    isAdminClientInformation: PropTypes.bool,
    isAdminPep: PropTypes.bool,
    dataClientSubscriber: PropTypes.object,
    ClientCategory: PropTypes.string,
    personalAccount: PropTypes.object,
    handlingId: PropTypes.number,
    mnpAbonentData: PropTypes.object,
    updateSubscriberData: PropTypes.func,
    updateClientData: PropTypes.func,
    revoke: PropTypes.func,
    deleteFromSpace: PropTypes.func,
    postSendAgree: PropTypes.func,
    user: PropTypes.object,
    isWebSeller: PropTypes.bool
  }

  state = {
    msisdn: null
  }

  static getDerivedStateFromProps (props, state) {
    const { msisdn } = state
    const {
      dataClientSubscriber: {
        dataSubscriber: { MainData }
      }
    } = props
    if (msisdn === null) {
      return {
        msisdn: MainData.ContactNumberB2b
      }
    }
    return null
  }

  handleEdit = (fieldName, fieldValue) => {
    const { updateSubscriberData, updateClientData } = this.props
    if (
      fieldName === ContactNumberB2bName ||
      fieldName === SubscriberInformationPublicizeAgreement ||
      fieldName === DoNotAgreeWith8dot4OfTerms
    ) {
      updateClientData({ [fieldName]: fieldValue })
    } else {
      updateSubscriberData({ [fieldName]: fieldValue })
    }
  }

  handleMsisdnEdit = value => {
    const msisdnToSet = value === '7' ? '' : value
    this.setState({ msisdn: msisdnToSet })
  }

  handleConfirmRoaming = () => {
    const {
      personalAccount: { Msisdn },
      deleteFromSpace,
      handlingId
    } = this.props
    deleteFromSpace({ msisdn: Msisdn, handlingId })
  }

  defaultActiveKey = ['0']
  selectWidth = { width: '100%' }

  render () {
    const {
      dataClientSubscriber,
      ClientCategory,
      mnpAbonentData,
      isAdminClientInformation,
      isAdminPep,
      revoke,
      personalAccount,
      handlingId,
      postSendAgree,
      user,
      isWebSeller
    } = this.props
    const { Msisdn, SubscriberId, BillingBranchId, ClientId } = personalAccount
    const {
      dataSubscriber: { MainData, Pep, FZ533Profile },
      paymentDeliveryTypes
    } = dataClientSubscriber
    const { donorOperatorName, recipientOperatorName, portingDate, transferStatus } = mnpAbonentData

    const { msisdn } = this.state

    const isShowChangeNumberRoleWebSeller = isWebSeller && checkRight(user, 'AS.B2bAccess:U')

    return (
      <Wrapper>
        <Row gutter={24}>
          <Col span={12}>
            {MainData.LoyalityCategory && MainData.LoyalityCategory.LoyalityCategoryName && (
              <KeyValueField>
                <Field>Категория надежности</Field>
                <Valuefield>{MainData.LoyalityCategory.LoyalityCategoryName}</Valuefield>
              </KeyValueField>
            )}
            <KeyValueField>
              <Field>Доступ в ЛК</Field>
              <Valuefield>
                {MainData.WebCareLevelAccessTypeId}
                {isShowChangeNumberRoleWebSeller && <ChangeNumberRoleWebSeller />}
              </Valuefield>
            </KeyValueField>
          </Col>
          <Col span={12}>
            <KeyValueField>
              <Field>Контактный номер абонента</Field>
              <Valuefield>{MainData.ContactNumberB2c}</Valuefield>
            </KeyValueField>
            <KeyValueField>
              <Field>Контактный номер клиента</Field>
              <Valuefield>
                <MsisdnInputWrapper>
                  <MsisdnInput
                    value={msisdn}
                    isActive
                    onChange={value => this.handleMsisdnEdit(value)}
                    onClickRemove={() => this.handleMsisdnEdit('')}
                  />
                  <Button
                    title='Изменить номер'
                    type='link'
                    icon={<CheckOutlined />}
                    onClick={() => this.handleEdit(ContactNumberB2bName, msisdn)}
                  />
                </MsisdnInputWrapper>
              </Valuefield>
            </KeyValueField>
          </Col>
        </Row>

        {isAdminClientInformation && (
          <Row gutter={24}>
            <Col span={12}>
              <KeyValueField>
                <Field>Не использовать личные данные в системах обслуживания</Field>
                <Valuefield>
                  <Checkbox
                    onChange={event => this.handleEdit(SubscriberInformationPublicizeAgreement, event.target.checked)}
                    defaultChecked={MainData.SubscriberInformationPublicizeAgreement}
                  />
                </Valuefield>
              </KeyValueField>
            </Col>
            <Col span={12}>
              <KeyValueField>
                <Field>Не согласен с п. 8.4. Условий</Field>
                <Valuefield>
                  <Checkbox
                    onChange={event => this.handleEdit(DoNotAgreeWith8dot4OfTerms, event.target.checked)}
                    defaultChecked={MainData.DoNotAgreeWith8dot4OfTerms}
                  />
                </Valuefield>
              </KeyValueField>
            </Col>
          </Row>
        )}

        <Col span={12}>
          <KeyValueField>
            <Field>Не отображать роуминг-режим</Field>
            <Valuefield>
              <Popconfirm
                title='Вы действительно хотите сбросить метосположение абонента?'
                okText='Да'
                cancelText='Нет'
                onConfirm={this.handleConfirmRoaming}
              >
                <StopRoamingIcon as={StopOutlined} />
              </Popconfirm>
            </Valuefield>
          </KeyValueField>
        </Col>

        {Pep && (
          <Row gutter={24}>
            <Col span={16}>
              <Collapse defaultActiveKey={['0']} bordered={false}>
                <StyledPanel header='Простая электронная подпись (ПЭП)'>
                  <KeyValueField>
                    <Field>Признак согласия</Field>
                    <Valuefield>
                      <Checkbox
                        onChange={event => {
                          Pep.SignAgree
                            ? revoke({
                              Msisdn,
                              Subsid: SubscriberId,
                              Branchid: BillingBranchId,
                              ClientId,
                              HandlingId: handlingId
                            })
                            : postSendAgree({
                              msisdn: Msisdn,
                              subscriberId: SubscriberId,
                              branchId: BillingBranchId,
                              clientId: ClientId,
                              handlingId: handlingId
                            })
                        }}
                        disabled={!isAdminPep || (!Pep.SignAgree && !!Pep.RevocationDate)}
                        checked={Pep.SignAgree}
                      />
                    </Valuefield>
                  </KeyValueField>
                  <KeyValueField>
                    <Field>Дата получения согласия</Field>
                    <Valuefield>{Pep.AgreeDate && moment(Pep.AgreeDate).format('DD.MM.YYYY[\n]HH:mm:ss')}</Valuefield>
                  </KeyValueField>
                  <KeyValueField>
                    <Field>Способ получения согласия</Field>
                    <Valuefield>{Pep.AgreeTypeName}</Valuefield>
                  </KeyValueField>
                  {!Pep.SignAgree && (
                    <KeyValueField>
                      <Field>Дата отзыва согласия</Field>
                      <Valuefield>
                        {Pep.RevocationDate && moment(Pep.RevocationDate).format('DD.MM.YYYY[\n]HH:mm:ss')}
                      </Valuefield>
                    </KeyValueField>
                  )}
                </StyledPanel>
              </Collapse>
            </Col>
          </Row>
        )}

        <Row gutter={24}>
          <Col span={16}>
            <Collapse defaultActiveKey={this.defaultActiveKey} bordered={false}>
              <StyledPanel header='Уведомления'>
                <KeyValueField>
                  <Field>Не отпр. SMS о нуле</Field>
                  <Valuefield>
                    <Checkbox
                      onChange={event => this.handleEdit('NotifyApproachingLimitFlag', event.target.checked)}
                      defaultChecked={MainData.NotifyApproachingLimit}
                    />
                  </Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>
                    Отказ от реклам. SMS
                    {MainData.StartDate && (
                      <Popover
                        placement='bottom'
                        content={`Дата отказа: ${formatDateWithMskZone(
                          moment.utc(MainData.StartDate, 'DD-MM-YYYY hh:mm:ss')
                        )}`}
                        trigger='click'
                      >
                        <InfoCircleIcon />
                      </Popover>
                    )}
                  </Field>
                  <Valuefield>
                    {MainData.AdvertisingAgreement ? (
                      <Popover
                        content={'Отключение отказа от рекламных SMS доступно только при обращении в офис'}
                        trigger='hover'
                      >
                        <Checkbox
                          onChange={event => this.handleEdit('AdvertisingAgreement', event.target.checked)}
                          defaultChecked={MainData.AdvertisingAgreement}
                          disabled={MainData.AdvertisingAgreement}
                        />
                      </Popover>
                    ) : (
                      <Checkbox
                        onChange={event => this.handleEdit('AdvertisingAgreement', event.target.checked)}
                        defaultChecked={MainData.AdvertisingAgreement}
                        disabled={MainData.AdvertisingAgreement}
                      />
                    )}
                  </Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Согласие на информирование об изменении тарификации в Личном кабинете</Field>
                  <Valuefield>
                    <Checkbox
                      onChange={event => this.handleEdit('RejectSms', event.target.checked)}
                      defaultChecked={MainData.RejectSms}
                    />
                  </Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Уведомление о платеже</Field>
                  <Valuefield>
                    <Select
                      style={this.selectWidth}
                      defaultValue={MainData.PaymentDeliveryTypeId}
                      onChange={value => this.handleEdit('PaymentDeliveryTypeId', value)}
                    >
                      {Array.isArray(paymentDeliveryTypes) &&
                        paymentDeliveryTypes.map(item => (
                          <Option key={item.TypeId} value={item.TypeId}>
                            {item.Name}
                          </Option>
                        ))}
                    </Select>
                  </Valuefield>
                </KeyValueField>
              </StyledPanel>
            </Collapse>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={16}>
            <Collapse bordered={false} defaultActiveKey={this.defaultActiveKey}>
              <StyledPanel header='Закон Матвиенко'>
                <KeyValueField>
                  <Field>Статус паспорта</Field>
                  <Valuefield>{MainData.CheckSmev}</Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Причина недействительности</Field>
                  <Valuefield>{MainData.Reason}</Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Дата проверки</Field>
                  <Valuefield>{MainData.ReviewSmev}</Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Запрет SMS с некач.ПД</Field>
                  <Valuefield>
                    <Checkbox defaultChecked={MainData.SubscriberBanSmsInsufficientPd} disabled />
                  </Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Дата SMS с некач.ПД</Field>
                  <Valuefield>{MainData.SubscriberSmsDateInsufficientPd}</Valuefield>
                </KeyValueField>
              </StyledPanel>
            </Collapse>
            {MainData.DonorOperator && (
              <KeyValueField>
                <Field>Принят от</Field>
                <Valuefield>{MainData.DonorOperator}</Valuefield>
              </KeyValueField>
            )}

            <Collapse bordered={false} defaultActiveKey={this.defaultActiveKey}>
              <StyledPanel header='Закон Кудрявцева'>
                <KeyValueField>
                  <Field>Статус</Field>
                  <Valuefield>{FZ533Profile?.Status533}</Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Подстатус</Field>
                  <Valuefield>{FZ533Profile?.SubStatus533}</Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Дата изменения</Field>
                  <Valuefield>
                    {FZ533Profile?.StatusDate533
                      ? moment(FZ533Profile?.StatusDate533).local().format('DD.MM.YYYY')
                      : ''}
                  </Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Время изменения</Field>
                  <Valuefield>
                    {FZ533Profile?.StatusDate533 ? moment(FZ533Profile?.StatusDate533).local().format('HH:mm') : ''}
                  </Valuefield>
                </KeyValueField>
              </StyledPanel>
            </Collapse>

            {ClientCategory === 'B2C' && (
              <Collapse bordered={false}>
                <StyledPanel header='ФЗ-115'>
                  <KeyValueField>
                    <Field>Гражданство</Field>
                    <Valuefield>{MainData.Citizenship}</Valuefield>
                  </KeyValueField>
                  <KeyValueField>
                    <Field>Признак ПДЛ</Field>
                    <Valuefield>
                      <Checkbox defaultChecked={MainData.Basis} disabled />
                    </Valuefield>
                  </KeyValueField>
                  <KeyValueField>
                    <Field>Признак отсутствия выгодоприобр.</Field>
                    <Valuefield>
                      <Checkbox defaultChecked={MainData.SignOfTheLackOfBeneficiary} disabled />
                    </Valuefield>
                  </KeyValueField>
                  <KeyValueField>
                    <Field>Отказ предоставить сведения ПДЛ</Field>
                    <Valuefield>
                      <Checkbox defaultChecked={MainData.FailureProvidePDLinformation} disabled />
                    </Valuefield>
                  </KeyValueField>

                  <Collapse bordered={false}>
                    <StyledPanel header='Публичное должностное лицо'>
                      <KeyValueField>
                        <Field>Государство</Field>
                        <Valuefield>{MainData.State}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <Field>Организация</Field>
                        <Valuefield>{MainData.Organization}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <Field>Должность</Field>
                        <Valuefield>{MainData.Position}</Valuefield>
                      </KeyValueField>
                    </StyledPanel>
                  </Collapse>

                  <KeyValueField>
                    <Field>Отказ предоставить сведения выгодоприобр.</Field>
                    <Valuefield>
                      <Checkbox defaultChecked={MainData.FailureProvideInformationBeneficiary} disabled />
                    </Valuefield>
                  </KeyValueField>

                  <Collapse bordered={false}>
                    <StyledPanel header='Выгодоприобретатель'>
                      <KeyValueField>
                        <Field>ФИО</Field>
                        <Valuefield>{MainData.Name}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <Field>Гражданство</Field>
                        <Valuefield>{MainData.BieCitizenship}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <Field>Дата рождения</Field>
                        <Valuefield>{MainData.BirthDate}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <Field>Документ, удост. личность</Field>
                        <Valuefield>{MainData.DocumentAwardedPersonality}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <SubField>Серия</SubField>
                        <Valuefield>{MainData.Series}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <SubField>Номер</SubField>
                        <Valuefield>{MainData.Number}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <SubField>Дата выдачи</SubField>
                        <Valuefield>{MainData.IssueDay}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <SubField>Кем выдан</SubField>
                        <Valuefield>{MainData.IssuedBy}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <Field>Адрес места жительства</Field>
                        <Valuefield>{MainData.ResidenceAddress}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <Field>Наименование юр.лица</Field>
                        <Valuefield>{MainData.Appellation}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <Field>ИНН/Код иностран. организации</Field>
                        <Valuefield>{MainData.InCodeOfForeignOrganization}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <Field>ОГРН</Field>
                        <Valuefield>{MainData.OgrnIp}</Valuefield>
                      </KeyValueField>
                      <KeyValueField>
                        <Field>Адрес местанахождения</Field>
                        <Valuefield>{MainData.LocationAddress}</Valuefield>
                      </KeyValueField>
                    </StyledPanel>
                  </Collapse>
                </StyledPanel>
              </Collapse>
            )}
          </Col>

          <Col span={16}>
            {portingDate && (
              <Collapse bordered={false}>
                <StyledPanel header='MNP'>
                  <KeyValueField>
                    <Field>Владелец нумерации</Field>
                    <Valuefield>{donorOperatorName}</Valuefield>
                  </KeyValueField>
                  <KeyValueField>
                    <Field>Переходит к</Field>
                    <Valuefield>{recipientOperatorName}</Valuefield>
                  </KeyValueField>
                  <KeyValueField>
                    <Field>Дата портации</Field>
                    <Valuefield>{portingDate}</Valuefield>
                  </KeyValueField>
                  <KeyValueField>
                    <Field>Причина отмены</Field>
                    <Valuefield>{transferStatus}</Valuefield>
                  </KeyValueField>
                </StyledPanel>
              </Collapse>
            )}
          </Col>
        </Row>
      </Wrapper>
    )
  }
}

const StyledPanel = styled(Panel)`
  border: 0 !important;

  .ant-collapse-header {
    padding-left: 20px !important;

    span {
      left: 0 !important;
    }
  }

  .ant-collapse-content-box {
    padding-left: 20px !important;
  }
`

const Wrapper = styled.div`
  padding-left: 20px;
  font-size: 14px;
`

const KeyValueField = styled.div`
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const Field = styled.div`
  width: 45%;
  color: '#000';
`

const SubField = styled.div`
  padding-left: 20px;
  width: 60%;
  color: #000;
`

const Valuefield = styled.div`
  margin-left: 10px;
  width: 52%;
  color: '#000';
`

const MsisdnInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const StopRoamingIcon = styled.div`
  margin-left: -6px;
`

const InfoCircleIcon = styled(InfoCircleOutlined)`
  cursor: pointer;
  margin-left: 6px;

  & svg {
    width: 20px;
    height: 20px;
  }

  color: rgba(0, 0, 0, 0.65);
`
const ChangeNumberRoleWebSeller = styled(ChangeNumberRole)`
  margin-left: 8px;
`
