const employees = [
  { title: "Alex", salary: 2100 },
  { title: "Max", salary: 2800 },
  { title: "Marin", salary: 2300 },
];

/** #1 */
employees.sort((a, b) => a.salary - b.salary);

/** #2 */
employees.sort((a, b) => {
  if (a.salary < b.salary) {
    return 1;
  }
  if (a.salary > b.salary) {
    return -1;
  }
  // a must be equal to b
  return 0;
});

console.log(employees);
