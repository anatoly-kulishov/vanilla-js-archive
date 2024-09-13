export const drawPoint = (
  ctx: CanvasRenderingContext2D,
  color: string,
  xPos: number,
  yPos: number,
  radius: number,
) => {
  const startAngle: number = Math.PI * 1.5;
  const endAngle: number = Math.PI * 3.5;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(xPos, yPos, radius, startAngle, endAngle);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};
