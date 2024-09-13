export const joinToString = (parts: string[], divider = ' ') =>
  parts.filter(Boolean).join(divider).trim() || undefined;
