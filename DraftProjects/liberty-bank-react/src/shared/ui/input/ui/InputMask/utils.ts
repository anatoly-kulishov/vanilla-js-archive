export const applyMask = (mask: string, value: string, isReverseMask: boolean = false) => {
  if (!value) return '';

  const maskChars = mask.split('');
  const valueChars = value.split('');

  let result = '';

  if (isReverseMask) {
    for (let i = mask.length - 1; i >= 0; i--) {
      if (!valueChars[0]) return result;
      if (maskChars[i] === '*' || maskChars[i] === valueChars[valueChars.length - 1])
        result = valueChars.pop() + result;
      else result = maskChars[i] + result;
      maskChars.pop();
    }
    return result;
  }

  for (let i = 0; i < mask.length; i++) {
    if (!valueChars[0]) return result;
    if (maskChars[0] === '*' || maskChars[0] === valueChars[0]) result += valueChars.shift();
    else result += maskChars[0];
    maskChars.shift();
  }

  return result;
};
