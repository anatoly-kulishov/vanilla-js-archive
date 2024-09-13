import api from 'api/index';
import { Api } from 'api/types';

export type GetSmsCodeSagaDecoratorArgs = {
  requestBody: Api.PepService.SendPepCode.Request;
};

export type PreflightRequest<Request, Body> = {
  request: Request;
  params: [string, Body];
  title: string;
};

export type GetDocumentCodeSagaDecoratorArgs<BodyPrepareSimSellDocument> = {
  preflightGetDocumentCode: () => PreflightRequest<
    typeof api.document.prepareSimSellDocument,
    BodyPrepareSimSellDocument
  >;
};

export type CheckPepCodeSagaDecoratorArgs = {
  requestData: Api.PepService.CheckPepCode.Request;
  handleSuccessfulCheck?: () => void;
};

// TODO Типизировать без any
export type GetPaperDocumentsSagaDecoratorArgs = {
  preflightGetPaperDocuments: () => PreflightRequest<typeof api.document.createDocument, any>[];
};

export type CreateHandlerSuccessfulPepCodeCheckArgs = {
  documentRequestData: Api.DocumentService.CreateDocument.Request;
  smsDocumentName: string;
};
