export const checkRight = (user, right) => {
  return user.Permissions?.includes(right)
}
