export const maskAccountNumber = (name: string, mask: string) => {
  return name.length < 3 ? mask : `${mask}${name.slice(-2)}`;
};

export const maskNumber = (num: string) => {
  const maskedPart = num.slice(0, -4).replace(/./g, '*');
  return maskedPart.replace(/(.{4})/g, '$1 ') + num.slice(-4);
};
