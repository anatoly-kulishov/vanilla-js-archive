import { Rule } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';
import { IdentityDocumentsService } from 'api/identityDocuments/types';

import { ValidationMessage } from 'helpers/form';

export enum StepDocumentIdentityForm {
  MAIN_FORM = 'MAIN_FORM',
  MIGRATION_CARD = 'MIGRATION_CARD'
}

export namespace FieldsDocumentIdentity {
  export enum MainFields {
    SIGNATORY = 'Signatory',
    DOCUMENT_TYPE = 'DocumentType',
    DOCUMENT_NAME = 'DocumentName',
    LAST_NAME = 'Surname',
    FIRST_NAME = 'Name',
    MIDDLE_NAME = 'Patronymic',
    SEX = 'Gender',
    BIRTH_DATE = 'BirthDate',
    BIRTH_PLACE = 'BirthPlace',
    CITIZENSHIP = 'Сitizenship',
    CITIZENSHIP_ID = 'СitizenshipId',
    DOCUMENT_NUMBER = 'DocumentNumber',
    DOCUMENT_SERIES = 'DocumentSeries',
    DOCUMENT_DATE = 'IssueDate',
    DOCUMENT_CODE = 'DepartmentCode',
    DOCUMENT_ADDRESS = 'IssuedBy',
    REGISTRATION_ADDRESS = 'RegistrationAddress',
    CONTACT_NUMBER = 'ContactNumber',
    EMAIL = 'Email'
  }

  export enum MigrationCardFields {
    APPROVED_STAYING_DOCUMENT = 'ApprovedStayingDocument',
    MIGRATION_CARD_NUMBER = 'Number',
    ARRIVING_DATE = 'DocumentStartDate',
    DEPARTURE_DATE = 'DocumentEndDate'
  }
}

export const RUSSIAN_PASSPORT_ID = 1;
export const RUSSIAN_FEDERATION = 'РОССИЯ';
export const RUSSIAN_PASSPORT_NAME = 'Паспорт гражданина РФ';

export const getValidationRules = ({
  documentFields,
  fieldName,
  additionalRule,
  isSkipDataTypeValidation = false
}: {
  documentFields: Array<IdentityDocumentsService.Model.DocumentField>;
  fieldName: NamePath;
  additionalRule?: Rule;
  isSkipDataTypeValidation?: boolean;
}): Array<Rule> => {
  const rules: Array<Rule> = [];

  const { isRequired, minLength, maxLength, dataType } =
    documentFields?.find((field) => field.nameEn === fieldName) || {};

  if (additionalRule) {
    rules.push(additionalRule);
  }
  if (isRequired) {
    rules.push({ required: isRequired, message: ValidationMessage.REQUIRED });
  }
  if (minLength) {
    rules.push({ min: minLength, message: ValidationMessage.MIN_LENGTH });
  }
  if (maxLength) {
    rules.push({ max: maxLength, message: ValidationMessage.MAX_LENGTH });
  }
  if (dataType && !isSkipDataTypeValidation) {
    rules.push({ pattern: new RegExp(dataType), message: ValidationMessage.PATTERN });
  }

  return rules;
};
