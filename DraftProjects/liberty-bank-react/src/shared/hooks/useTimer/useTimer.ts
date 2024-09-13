import { useEffect, useRef, useState } from 'react';

interface Timer {
  minutes: number;
  seconds: number;
  start: (time: number) => void;
  reset: () => void;
}

const getTimerDataFromLocalStorage = (
  time: number,
): {
  startTime: number;
} => {
  const storedStartTime = localStorage.getItem('timerStartTime');
  const storedInitialTime = localStorage.getItem('timerTime');

  if (storedStartTime && storedInitialTime) {
    const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime, 10)) / 1000);
    const remainingTime = parseInt(storedInitialTime, 10) - elapsedTime;

    if (remainingTime <= 0) {
      localStorage.removeItem('timerStartTime');
      localStorage.removeItem('timerTime');
    } else {
      time = remainingTime;
    }
  }

  if (!storedStartTime || !storedInitialTime) {
    const currentTime = Date.now().toString();
    localStorage.setItem('timerStartTime', currentTime);
    localStorage.setItem('timerTime', time.toString());
  }

  return {
    startTime: time,
  };
};

const getMinutesAndSeconds = (
  time: number,
): {
  min: number;
  sec: number;
} => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return {
    min: minutes,
    sec: seconds,
  };
};

export const useTimer = (initialTime: number): Timer => {
  const { startTime } = getTimerDataFromLocalStorage(initialTime);
  const { min, sec } = getMinutesAndSeconds(initialTime);
  const [minutes, setMinutes] = useState(min);
  const [seconds, setSeconds] = useState(sec);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const start = (time: number) => {
    if (intervalRef.current) return;
    const { min, sec } = getMinutesAndSeconds(time);
    setMinutes(min);
    setSeconds(sec);
    intervalRef.current = setInterval(() => {
      time -= 1;
      const { min, sec } = getMinutesAndSeconds(time);
      setMinutes(min);
      setSeconds(sec);

      if (time === 0) {
        reset();
      }
    }, 1000);
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    startTimeRef.current = null;
    setMinutes(0);
    setSeconds(0);
    localStorage.removeItem('timerStartTime');
    localStorage.removeItem('timerTime');
  };

  useEffect(() => {
    start(startTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        startTimeRef.current = null;
      }
    };
  }, []);

  return {
    minutes,
    seconds,
    start,
    reset,
  };
};
