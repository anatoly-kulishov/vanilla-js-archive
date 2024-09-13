import axios from 'axios';
import { DocumentService } from './types';

const SERVICE_HOST = process.env.DOCUMENT_SERVICE;

const methodsDocumentService = {
  prepareSimSellDocument: <Body>(simSellId: string, body: Body) =>
    axios.post<DocumentService.PrepareSimSellDocument.Response>(
      `${SERVICE_HOST}/api/v1/Documents/SimSell/${simSellId}`,
      body
    ),

  createDocument: (handlingId: string, body: DocumentService.CreateDocument.Request) =>
    axios.post<DocumentService.CreateDocument.Response>(
      `${SERVICE_HOST}/api/v1/Documents/Handlings/${handlingId}`,
      body
    )
};

export default methodsDocumentService;
