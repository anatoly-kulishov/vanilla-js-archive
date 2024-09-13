export const getLinkWithParams = (link: string, params: Record<string, string | undefined>) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(`:${key}`, value ?? '');
  }, link);
};
