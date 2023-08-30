// Promise.reject('a')
//   .then(p => p + 'b')
//   .catch(p => p + 'c') // 'ac'
//   .then(p => p + 'd') // 'acd'
//   .catch(p => p + 'e')
//   .then(p => p + 'f') // 'acdf'
//   .then((p) => {
//     console.log(p); // 'acdf'
//     return p;
//   })
//   .finally(console.log); // undefined
/** **************************************************** */
// Необходимо дописать функцию в которой элементы массива будут
// последовательно выводиться в консоль спустя промежуток времени
// указанный в атрибуте timeout

// const items = [
//   { name: 'first', timeout: 3000 }, // 3
//   { name: 'second', timeout: 5000 }, // 8
//   { name: 'third', timeout: 2000 } // 10
// ];
//
// sequence(items)
//   .then(res => console.log(res))

/**
 const timeout = item => new Promise(resolve => {
   setTimeout(() => {
     resolve(item);
   }, item.timeout)
 })

 // const sequence = async (items) => {
 //   let totalElapsedTime = 0;
 //
 //   for(const item of items) {
 //     const res = await timeout(item);
 //     console.log(res);
 //     totalElapsedTime += res.timeout;
 //   }
 //
 //   return totalElapsedTime;
 // };

 // const sequence = (items) => {};
 */

// const findEmployeeWithMaxSalary = (employees) => {}
//
// const employees = {
//  firstDepartment: [
//   { name: "Employee1", salary: 2000 },
//   { name: "Employee2", salary: 4000 },
//   { name: "Employee3", salary: 3000 },
//   { name: "Employee4", salary: 6000 }
//  ],
//  secondDepartment: [
//   { name: "Employee5", salary: 1000 },
//   { name: "Employee6", salary: 2500 },
//   { name: "Employee7", salary: 5000 },
//   { name: "Employee8", salary: 6500 }
//  ],
//  thirdDepartment: [
//   { name: "Employee9", salary: 8000 },
//   { name: "Employee10", salary: 4000 }
//  ]
// };
//
// console.log(findEmployeeWithMaxSalary(employees)) // { name: "Employee8", salary: 6500 }

