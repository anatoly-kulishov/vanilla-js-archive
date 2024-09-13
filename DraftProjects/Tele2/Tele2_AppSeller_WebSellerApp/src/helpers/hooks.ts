import { useEffect, useRef } from 'react';

export const useMount = (cb: VoidFunction) => {
  useEffect(cb, []);
};

export const useUpdate = (cb: VoidFunction, deps: Array<unknown>) => {
  const isUpdate = useRef(false);

  useEffect(() => {
    if (isUpdate.current === true) {
      cb();
    } else {
      isUpdate.current = true;
    }
  }, deps);
};
