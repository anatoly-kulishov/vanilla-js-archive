/**
 * #1 (context)
 * Hint:
 * let that = this // 1 - option
 * this as second params in filter // 2 - option
 */
const userService = {
  currentFilter: "active",
  users: [
    { name: "Alex", status: "active" },
    { name: "Nick", status: "deleted" }
  ],
  getFilteredUsers: function() {
    return this.users.filter(function(user) {
      console.log(this.currentFilter);
      return user.status === this.currentFilter;
    });
  }
};

console.log(userService.getFilteredUsers());
