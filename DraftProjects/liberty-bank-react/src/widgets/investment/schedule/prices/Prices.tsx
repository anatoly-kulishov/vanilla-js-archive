import { FC, memo, useEffect, useRef } from 'react';
import { getPriceRange } from '../lib';
import styles from './Prices.module.scss';

interface PricesProps {
  prices: number[];
  size: string;
}

export const Prices: FC<PricesProps> = memo(function Prices({ prices, size }) {
  const pricesRange: string[] = getPriceRange(prices, size);
  const ref = useRef<HTMLCanvasElement>(null);
  const ratio: number = window.devicePixelRatio;

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = ref.current;
    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (ctx) {
        const canvasWidth: number = ref.current!.getBoundingClientRect().width * ratio;
        const canvasHeight: number = ref.current!.getBoundingClientRect().height * ratio;
        const gap: number = (canvasHeight - 16 * ratio) / (pricesRange.length - 1);
        let yPos: number = 16 * ratio - 3;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.font = `400 ${16 * ratio}px Roboto`;
        ctx.fillStyle = '#7a7b7b';

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        pricesRange.forEach((price: string) => {
          ctx.fillText(
            price.replace('.', ','),
            (canvasWidth - ctx.measureText(price).width) / 2,
            yPos,
            60,
          );
          yPos += gap;
        });
      }
    }
  }, [prices]);

  return <canvas ref={ref} className={styles.canvas} />;
});
