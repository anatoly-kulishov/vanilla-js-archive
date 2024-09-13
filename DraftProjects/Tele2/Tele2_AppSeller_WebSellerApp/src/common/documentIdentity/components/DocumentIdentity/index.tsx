import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, FormProps } from 'antd';

import { FieldsDocumentIdentity, StepDocumentIdentityForm } from 'common/documentIdentity/helpers';
import { DaDataIntegrationService } from 'api/daDataIntegration/types';
import { IdentityDocumentsService } from 'api/identityDocuments/types';
import actionDocumentIdentity from 'common/documentIdentity/actions';
import { getFormFieldName } from 'helpers/form';

import MainFormDocumentIdentity from '../MainFormDocumentIdentity';
import MigrationCardForm from '../MigrationCardForm';

import styledDocumentIdentity from '../styled';
const { Container, Main } = styledDocumentIdentity;

type Props = {
  isPrefill?: boolean;
  isNeedToUseMigrationCardForm?: boolean;
  parentFormName?: string;
  leftAdditional?: JSX.Element;
  rightAdditional?: JSX.Element;
  initialValues: FormProps['initialValues'];
  storeRegistrationAddress: (address: DaDataIntegrationService.Model.Address) => void;
  storeDocumentType: (documentType: IdentityDocumentsService.Model.DocumentType) => void;
  onFinish: FormProps['onFinish'];
  handleGoBack?: VoidFunction;
};

const DocumentIdentity: FC<Props> = ({
  isPrefill,
  isNeedToUseMigrationCardForm = false,
  parentFormName,
  leftAdditional,
  rightAdditional,
  initialValues,
  storeRegistrationAddress,
  storeDocumentType,
  onFinish,
  handleGoBack
}) => {
  const [formStep, setFormStep] = useState(StepDocumentIdentityForm.MAIN_FORM);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const handleSubmitMainForm = () => {
    if (!isNeedToUseMigrationCardForm) {
      form.submit();
      return;
    }

    dispatch(
      actionDocumentIdentity.getResidenceDocumentTypes({
        requestData: {
          countryId: form.getFieldValue(
            getFormFieldName({
              fieldName: FieldsDocumentIdentity.MainFields.CITIZENSHIP_ID,
              parentFormName
            })
          ),
          identityDocumentId: form.getFieldValue(
            getFormFieldName({
              fieldName: FieldsDocumentIdentity.MainFields.DOCUMENT_TYPE,
              parentFormName
            })
          )
        },
        handleNeedMigrationCardForm: () => {
          setFormStep(StepDocumentIdentityForm.MIGRATION_CARD);
        },
        handleNoNeedMigrationCardForm: form.submit
      })
    );
  };

  const handleGoBackMigrationCardForm = () => {
    setFormStep(StepDocumentIdentityForm.MAIN_FORM);
  };

  return (
    <Container>
      <Main>
        <Form
          style={{ width: '100%', height: '100%' }}
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <MainFormDocumentIdentity
            isActive={formStep === StepDocumentIdentityForm.MAIN_FORM}
            form={form}
            isPrefill={isPrefill}
            parentFormName={parentFormName}
            leftAdditional={leftAdditional}
            rightAdditional={rightAdditional}
            storeRegistrationAddress={storeRegistrationAddress}
            storeDocumentType={storeDocumentType}
            handleSubmit={handleSubmitMainForm}
            handleGoBack={handleGoBack}
          />
          <MigrationCardForm
            isActive={formStep === StepDocumentIdentityForm.MIGRATION_CARD}
            form={form}
            handleSubmit={form.submit}
            handleGoBack={handleGoBackMigrationCardForm}
          />
        </Form>
      </Main>
    </Container>
  );
};

export default DocumentIdentity;
