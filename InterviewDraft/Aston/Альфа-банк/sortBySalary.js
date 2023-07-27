const employees = [
  { title: "Max", salary: 2800 },
  { title: "Alex", salary: 2100 },
  { title: "Marin", salary: 2300 }
];

employees.sort((a, b) => b.salary - a.salary);

console.log(employees);
