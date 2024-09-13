import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const media = '(prefers-color-scheme: dark)';

const getIsDarkMode = () => window.matchMedia(media).matches;

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getIsDarkMode());

  useEffect(() => {
    const updateSystemTheme = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    const mediaQuery = window.matchMedia(media);

    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateSystemTheme);
    };
  }, []);

  return [isDarkMode, setIsDarkMode] as [boolean, Dispatch<SetStateAction<boolean>>];
};

export default useTheme;
