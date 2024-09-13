import { AxiosResponse } from 'axios';

import { delay } from 'api/helpers';

export default function getFinalPollingData<R>({
  interval,
  threshold,
  fetchData,
  checkOnSuccess,
  checkOnError
}: {
  interval: number;
  threshold: number;
  fetchData: () => Promise<AxiosResponse<R>>;
  checkOnSuccess: (response: AxiosResponse<R>) => boolean;
  checkOnError: (response: AxiosResponse<R>) => boolean;
}): Promise<R> {
  return new Promise(async (resolve, reject) => {
    let isExpiredTime = false;
    let finalResult = null;
    let error = null;

    const stopPollingTimer = setTimeout(() => {
      isExpiredTime = true;
    }, threshold);

    while (!isExpiredTime) {
      try {
        const response = await fetchData();

        if (checkOnError(response)) {
          error = response;
          clearTimeout(stopPollingTimer);
          break;
        }

        if (checkOnSuccess(response)) {
          finalResult = response;
          clearTimeout(stopPollingTimer);
          break;
        }

        await delay(interval);
      } catch {
        clearTimeout(stopPollingTimer);
        break;
      }
    }

    if (!finalResult) {
      reject(error);
      return;
    }

    resolve(finalResult);
  });
}
