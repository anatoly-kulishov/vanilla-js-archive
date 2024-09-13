export const drawVerticalDashLine = (
  ctx: CanvasRenderingContext2D,
  color: string,
  lineWidth: number,
  canvasHeight: number,
  xPos: number,
  segments: number[],
) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(segments);
  ctx.moveTo(xPos, 0);
  ctx.lineTo(xPos, canvasHeight);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.closePath();
};
