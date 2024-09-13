import { FC, useState, memo, useEffect, useMemo } from 'react';
import { PriceDiagram, useGetCandlesQuery, usePrefetch } from '@/shared';
import { useCandles, getCandlesParams } from '../lib';
import { FILTER_BUTTONS, INFO_POSITION, FIELDS } from '../constants';
import { Dates } from '../dates/Dates';
import { Prices } from '../prices/Prices';
import { formatNumber } from '@/shared/lib/formatNumber';
import { CandlesFilter, SearchCandlesParams, SheduleSize } from '../model/types';
import cn from 'classnames';
import styles from './Shedule.module.scss';

interface SheduleProps {
  activeTicker: string;
  size?: SheduleSize;
}

export const Shedule: FC<SheduleProps> = memo(function Shedule({ activeTicker, size = 'small' }) {
  const [filter, setFilter] = useState<CandlesFilter>('М');
  const [zoom, setZoom] = useState(0);
  const [params, setParams] = useState<SearchCandlesParams>(getCandlesParams(filter));
  const { data: candles = [] } = useGetCandlesQuery({ params, activeTicker });
  const prefetchCandles = usePrefetch('getCandles');
  const [dates, prices] = useCandles(candles, filter, size, zoom);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [info, setInfo] = useState({ value: 0, change: 0 });
  const [isHoverChart, setIsHoverChart] = useState(false);
  const [targetDate, setTargetDate] = useState<string>('');

  const targetPoint: number = useMemo(
    () => candles.findIndex((item) => item[1] === targetDate),
    [targetDate, candles],
  );

  useEffect(() => {
    setTargetDate('');
    setZoom(0);
  }, [activeTicker, size, filter]);

  // При наведении на график блокируем скролл и активируем onWheel
  useEffect(() => {
    if (isHoverChart) {
      document.addEventListener('wheel', blockMainEvent, { passive: false });
    }
    return () => {
      document.removeEventListener('wheel', blockMainEvent);
    };
  }, [isHoverChart]);

  const onChangeFilter = (filter: CandlesFilter): void => {
    const newParams: SearchCandlesParams = getCandlesParams(filter);
    setFilter(filter);
    setParams(newParams);
  };

  const onMouseMove = (e: unknown): void => {
    const event = e as MouseEvent;
    const canvas = event.target as HTMLCanvasElement;
    const xPoint = event.pageX - canvas.offsetLeft;
    const pointsCount = canvas.width / window.devicePixelRatio / prices.length;
    const currentPointNumber = Math.floor(xPoint / pointsCount);
    const targetCandle = candles.find((_item, index) => index === currentPointNumber) || '';
    setTargetDate(targetCandle[1]);
    setInfo({
      value: prices[currentPointNumber],
      change:
        currentPointNumber > 0
          ? ((prices[currentPointNumber] - prices[currentPointNumber - 1]) /
              prices[currentPointNumber - 1]) *
            100
          : 0,
    });
    setPoint({
      x: event.pageX - canvas.offsetLeft + INFO_POSITION.x,
      y: event.pageY - canvas.offsetTop + INFO_POSITION.y,
    });
  };

  const onMouseLeave = (): void => {
    setTargetDate('');
    setIsHoverChart(false);
    setPoint({ x: 0, y: 0 });
  };

  const onMouseEnter = (): void => {
    setIsHoverChart(true);
  };

  const onWheel = (e: unknown) => {
    const event = e as WheelEvent;
    if (event.deltaY > 0) {
      if (zoom < 100) {
        setZoom((prev) => prev + 1);
        const preFetchParamsStepTwo: SearchCandlesParams = getCandlesParams(filter, zoom + 2);
        const preFetchParamsStepThree: SearchCandlesParams = getCandlesParams(filter, zoom + 3);
        // Заранее подкачиваем график и кешируем для плавного отображения
        prefetchCandles({ params: preFetchParamsStepTwo, activeTicker });
        prefetchCandles({ params: preFetchParamsStepThree, activeTicker });
      }
    } else {
      if (prices.length > 10) {
        setZoom((prev) => prev - 1);
        const preFetchParamsStepTwo: SearchCandlesParams = getCandlesParams(filter, zoom - 2);
        const preFetchParamsStepThree: SearchCandlesParams = getCandlesParams(filter, zoom - 3);
        // Заранее подкачиваем график и кешируем для плавного отображения
        prefetchCandles({ params: preFetchParamsStepTwo, activeTicker });
        prefetchCandles({ params: preFetchParamsStepThree, activeTicker });
      }
    }
    const newParams: SearchCandlesParams = getCandlesParams(filter, zoom);
    setParams(newParams);
  };

  function blockMainEvent(e: Event) {
    e.preventDefault();
  }

  return (
    <div>
      <div className={styles.filter}>
        {FILTER_BUTTONS.map((button) => {
          return (
            <button
              key={button}
              className={cn(
                styles.filter_button,
                filter === button ? styles.filter_button_active : '',
              )}
              onClick={() => {
                onChangeFilter(button);
              }}
            >
              {button}
            </button>
          );
        })}
      </div>
      {isHoverChart && (
        <div className={styles.tooltip}>
          <div className={styles.info} style={{ left: point.x, top: point.y }}>
            <div className={styles.field}>
              <div>{FIELDS.price}</div>
              <div>{info.value + ' ₽'}</div>
            </div>
            <div className={styles.field}>
              <div>{FIELDS.change}</div>
              <div
                className={
                  info.change === 0
                    ? styles.zero
                    : info.change > 0
                    ? styles.positive
                    : styles.negative
                }
              >
                {formatNumber(info.change) + ' %'}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.schedule}>
        <div className={styles.top}>
          <PriceDiagram
            prices={prices}
            size={size}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            onWheel={onWheel}
            targetPoint={targetPoint}
          />
          <div className={styles.values}>
            <Prices prices={prices} size={size} />
          </div>
        </div>
        <Dates dates={dates} />
      </div>
    </div>
  );
});
