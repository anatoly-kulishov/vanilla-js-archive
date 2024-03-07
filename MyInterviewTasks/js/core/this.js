"use strict";
/**
 * Output:
 * let that = this // 1
 * arrow func // 2
 * "this" as second params in filter // 3
 */
const userService = {
  currentFilter: "active",
  users: [
    { name: "Alex", status: "active" },
    { name: "Nick", status: "deleted" }
  ],
  getFilteredUsers: function() {
    return this.users.filter(function(user) {
      return user.status === this.currentFilter;
    });
  }
};

console.log(userService.getFilteredUsers());
