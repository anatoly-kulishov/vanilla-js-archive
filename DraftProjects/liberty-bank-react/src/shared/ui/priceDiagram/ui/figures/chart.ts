export const drawChart = (
  ctx: CanvasRenderingContext2D,
  color: string,
  lineWidth: number,
  canvasHeight: number,
  prices: number[],
  start: {
    x: number;
    y: number;
  },
  ratio: number,
  gapX: number,
  gap: number,
  min: number,
) => {
  for (let i = 1; i < prices.length; i++) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(start.x + gapX, canvasHeight - 8 * ratio - (prices[i] - min) * gap);
    start.x = start.x + gapX;
    start.y = canvasHeight - 8 * ratio - (prices[i] - min) * gap;
    ctx.stroke();
    ctx.closePath();
  }
};
