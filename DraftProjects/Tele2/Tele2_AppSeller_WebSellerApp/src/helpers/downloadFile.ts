export enum Target {
  SELF = '_self',
  BLANK = '_blank',
  PARENT = '_parent',
  TOP = '_top',
  UNFENCED_TOP = '_unfencedTop'
}

export const downloadFile = (url: string, fileName: string = '', target: Target = Target.SELF) => {
  const link = document.createElement('a');
  link.setAttribute('download', fileName);
  link.href = url;
  link.target = target;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
