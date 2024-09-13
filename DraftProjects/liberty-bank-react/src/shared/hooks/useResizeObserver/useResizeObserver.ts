import { useEffect, useRef, useState } from 'react';

export const useResizeObserver = <T extends HTMLElement>() => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const observedElement = useRef<T>(null);

  useEffect(() => {
    const element = observedElement.current;

    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (element.offsetWidth !== width) {
        setWidth(element.offsetWidth);
      }
      if (element.offsetHeight !== height) {
        setHeight(element.offsetHeight);
      }
      if (element.offsetTop !== top) {
        setTop(element.offsetTop);
      }
      if (element.offsetLeft !== left) {
        setLeft(element.offsetLeft);
      }
    });

    resizeObserver.observe(element);

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [observedElement.current]);

  return {
    targetRef: observedElement,
    width,
    height,
    top,
    left,
  };
};
