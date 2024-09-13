import React, { useCallback } from 'react';

export function useCombinedRef<T extends HTMLElement>(
  ...refs: Array<React.Ref<T> | null>
): React.RefCallback<T> {
  const combinedRef = useCallback((element: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(element);
      } else {
        (ref as React.MutableRefObject<T>).current = element;
      }
    });
  }, refs);

  return combinedRef;
}
