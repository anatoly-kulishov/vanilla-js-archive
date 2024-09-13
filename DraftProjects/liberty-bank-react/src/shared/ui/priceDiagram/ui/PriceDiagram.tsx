import { FC, useEffect, useRef } from 'react';
import { drawVerticalDashLine, drawPoint, drawChart, drawErrorText } from './figures';
import { getPriceRange } from '@/widgets/investment/schedule/lib';
import s from './PriceDiagram.module.scss';

interface PriceDiagramProps {
  prices: number[];
  onMouseMove: (e: unknown) => void;
  onMouseLeave: () => void;
  onMouseEnter: () => void;
  onWheel: (e: unknown) => void;
  targetPoint: number | null;
  size: string;
}

export const PriceDiagram: FC<PriceDiagramProps> = ({
  prices,
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  onWheel,
  targetPoint,
  size,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const ratio: number = window.devicePixelRatio;

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = ref.current;
    const pricesRange = getPriceRange(prices, size).map((price) => +price);

    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (ctx) {
        const canvasWidth: number = canvas.getBoundingClientRect().width * ratio;
        const canvasHeight: number = canvas.getBoundingClientRect().height * ratio;
        const defaultColor: string = '#000000';
        const grayColor: string = '#d4d4d4';

        if (prices.length > 0) {
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
          const gapX: number = (canvasWidth - 13) / (prices.length - 1);
          const min: number = Math.min(...pricesRange);
          const max: number = Math.max(...pricesRange);
          const gap: number = (canvasHeight - 16 * ratio) / (max - min);
          const start: { x: number; y: number } = {
            x: 10,
            y: canvasHeight - 8 * ratio - (prices[0] - min) * gap,
          };

          ctx.clearRect(0, 0, canvasWidth, canvasHeight);

          if (targetPoint !== null) {
            const targetPointX = start.x + gapX * targetPoint;
            const targetPointY = canvasHeight - 8 * ratio - (prices[targetPoint] - min) * gap;

            drawVerticalDashLine(ctx, grayColor, 3, canvasHeight, targetPointX, [5, 5]);
            drawPoint(ctx, defaultColor, targetPointX, targetPointY, 6);
          }

          drawChart(ctx, defaultColor, 3, canvasHeight, prices, start, ratio, gapX, gap, min);
        } else {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          drawErrorText(ctx, defaultColor, canvasWidth, canvasHeight, ratio);
        }
      }
    }
  }, [prices, targetPoint]);

  return (
    <canvas
      ref={ref}
      className={s.canvas}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onWheel={onWheel}
    />
  );
};
