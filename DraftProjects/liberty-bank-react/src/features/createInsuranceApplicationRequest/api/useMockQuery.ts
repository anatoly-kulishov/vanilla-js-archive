import { useState, useEffect } from 'react';

const useMockQuery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => resolve(true), 1500);
    })
      .then(() => setIsSuccess(true))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { isLoading, isSuccess, isError };
};

export default useMockQuery;
