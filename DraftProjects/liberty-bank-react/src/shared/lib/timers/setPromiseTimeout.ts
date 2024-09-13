export const setPromiseTimeout = <T>(
  timeout: number,
  options: {
    value?: T;
    isReject?: boolean;
  } = { isReject: false },
): Promise<T | undefined> => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      options.isReject ? reject(options.value) : resolve(options.value);
    }, timeout),
  );
};
