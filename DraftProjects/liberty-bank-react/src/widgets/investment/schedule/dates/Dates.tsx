import { FC, memo, useEffect, useRef } from 'react';
import styles from './Dtaes.module.scss';

interface DatesProps {
  dates: string[];
}

export const Dates: FC<DatesProps> = memo(function Dates({ dates }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const ratio: number = window.devicePixelRatio;

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = ref.current;
    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (ctx) {
        const canvasWidth: number = ref.current!.getBoundingClientRect().width * ratio;
        const canvasHeight: number = ref.current!.getBoundingClientRect().height * ratio;
        let xPos: number = 0;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.font = `400 ${16 * ratio}px Roboto`;
        ctx.fillStyle = '#7a7b7b';

        const gap: number =
          (canvasWidth -
            dates.reduce((acc, curr) => {
              return acc + ctx.measureText(curr).width;
            }, 0)) /
          (dates.length - 1);

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        dates.forEach((date: string) => {
          ctx.fillText(date, xPos, (canvasHeight - 16) / 2 + 16, canvasWidth / 5);
          xPos += ctx.measureText(date).width + gap;
        });
      }
    }
  }, [dates]);

  return (
    <div className={styles.dates}>
      <canvas ref={ref} className={styles.canvas} />
    </div>
  );
});
