import { renderHook, act } from '@testing-library/react';
import { useTimer } from '../useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
    localStorage.clear();
  });

  test('should start the timer correctly', () => {
    const { result } = renderHook(() => useTimer(60));

    act(() => {
      result.current.start(60);
    });

    expect(result.current.minutes).toBe(1);
    expect(result.current.seconds).toBe(0);
  });

  test('should reset the timer', () => {
    const { result } = renderHook(() => useTimer(60));

    act(() => {
      result.current.start(60);
    });

    expect(result.current.minutes).toBe(1);
    expect(result.current.seconds).toBe(0);

    act(() => {
      result.current.reset();
    });

    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });

  test('should restore timer from localStorage if available', () => {
    const currentTime = Date.now();
    const storedStartTime = (currentTime - 5000).toString();
    const storedInitialTime = '30';

    localStorage.setItem('timerStartTime', storedStartTime);
    localStorage.setItem('timerTime', storedInitialTime);

    const { result } = renderHook(() => useTimer(60));

    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(25);

    act(() => {
      result.current.start(60);
    });

    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(25);
  });
});
