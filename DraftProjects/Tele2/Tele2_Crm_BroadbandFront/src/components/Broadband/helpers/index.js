export function undefToNull (obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === undefined ? null : v]))
}
