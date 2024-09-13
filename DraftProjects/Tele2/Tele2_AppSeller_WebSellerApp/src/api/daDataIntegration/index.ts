import axios from 'axios';

import { DaDataIntegrationService } from 'api/daDataIntegration/types';

const SERVICE_HOST = process.env.DADATA_INTEGRATION_SERVICE;

const methodsDaDataIntegrationService = {
  getSuggestionAddress: (params: DaDataIntegrationService.GetSuggestionAddress.Request) =>
    axios.get<DaDataIntegrationService.GetSuggestionAddress.Response>(
      `${SERVICE_HOST}/DadataIntegration/GetSuggestionAddress`,
      {
        params: { ...params, Count: params.Count || 5 }
      }
    )
};

export default methodsDaDataIntegrationService;
