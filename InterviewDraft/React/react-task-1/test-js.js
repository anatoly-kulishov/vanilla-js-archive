const user = {
  name: "Bob",
  roles: ["friend", "brother", "student"],
  getRoles: function () {
    return this.roles.map(function (role) {
      return this.name + " is " + role;
    });
  },
};

// console.log(user.getRoles()); // ?
