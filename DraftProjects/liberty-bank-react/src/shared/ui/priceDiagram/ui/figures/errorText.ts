export const drawErrorText = (
  ctx: CanvasRenderingContext2D,
  color: string,
  canvasWidth: number,
  canvasHeight: number,
  ratio: number,
) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.font = '500 30px Roboto';
  ctx.fillText(
    'Выберите другой промежуток',
    canvasWidth / 2,
    canvasHeight / 2,
    canvasWidth - 60 * ratio,
  );
  ctx.closePath();
};
