/* eslint-disable camelcase */
import { insuranceApi } from '@/shared';

type IUploadInfo = {
  applicationId: string;
  productId: string;
  productName: string;
  clientId: string;
  documentType: string;
};

type IUploadImage = {
  url: string;
  file: Blob;
  info: IUploadInfo;
};

type IImageUploadResponse =
  | {
      message: string;
    }
  | {
      uri: string;
      type: string;
      message: string;
      timestamp: string;
    };

export const uploadImageRequestApi = insuranceApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImageRequest: builder.mutation<IImageUploadResponse, IUploadImage>({
      query: ({
        url,
        file,
        info: { applicationId, productId, productName, clientId, documentType },
      }) => {
        const bodyFormData = new FormData();
        bodyFormData.append('files', file);
        bodyFormData.append(
          'info',
          JSON.stringify({
            application_id: applicationId,
            product_id: productId,
            product_name: productName,
            client_id: clientId,
            document_type: documentType,
          }),
        );
        return {
          url,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data;',
          },
          body: { bodyFormData },
          formData: true,
        };
      },
    }),
  }),
});

export const { useUploadImageRequestMutation } = uploadImageRequestApi;
