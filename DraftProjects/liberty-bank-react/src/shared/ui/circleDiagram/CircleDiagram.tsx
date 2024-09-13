import { FC, useEffect, useRef, memo } from 'react';
import { colors } from './constants';
import styles from './CircleDiagram.module.scss';

interface CircleDiagramProps {
  sectors: number[];
  borderWidth?: number;
  diameter?: number;
  fontSize?: number;
}

export const CircleDiagram: FC<CircleDiagramProps> = memo(
  ({ sectors, borderWidth = 6, diameter = 144, fontSize = 20 }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const ratio = window.devicePixelRatio;

    useEffect(() => {
      const canvas = ref.current;

      if (!canvas) return;

      const ctx = canvas.getContext('2d')!;
      const canvasWidth = diameter * ratio;
      const canvasHeight = diameter * ratio;
      const dataSum = sectors.reduce((acc, curr) => acc + curr, 0);
      let startPosition = Math.PI * 1.5;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.lineWidth = borderWidth < diameter ? borderWidth : 6;
      ctx.fillStyle = '#4D5F71';
      ctx.textAlign = 'center';
      ctx.font = `500 ${fontSize * ratio}px Roboto`;
      ctx.fillText(
        `${dataSum} ₽`,
        canvasWidth / 2 + 2,
        canvasHeight / 2 + fontSize / 3,
        canvasWidth - 4 * borderWidth,
      );

      if (!sectors.length) {
        ctx.beginPath();
        ctx.strokeStyle = '#005afe1a';
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          canvasWidth / 2 - borderWidth,
          startPosition,
          Math.PI * 3.5,
        );
        ctx.stroke();
      }

      sectors.forEach((item, index) => {
        const percent = item / dataSum;
        ctx.beginPath();
        ctx.strokeStyle = colors[index];
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          canvasWidth / 2 - borderWidth,
          startPosition,
          startPosition + Math.PI * percent * 2,
        );
        ctx.stroke();
        startPosition = startPosition + Math.PI * percent * 2;
      });
    }, [sectors, borderWidth, diameter, fontSize]);

    return (
      <div className={styles.container}>
        <canvas
          ref={ref}
          style={{ width: `${diameter}px`, height: `${diameter}px` }}
          width={diameter * ratio}
          height={diameter * ratio}
        />
      </div>
    );
  },
);

CircleDiagram.displayName = 'CircleDiagram';
