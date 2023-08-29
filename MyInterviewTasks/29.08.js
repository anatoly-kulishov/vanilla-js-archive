Promise.reject('a')
  .then(p => p + 'b')
  .catch(p => p + 'c') // 'ac'
  .then(p => p + 'd') // 'acd'
  .catch(p => p + 'e')
  .then(p => p + 'f') // 'acdf'
  .then((p) => {
    console.log(p); // 'acdf'
    return p;
  })
  .finally(console.log); // undefined




// Необходимо дописать функцию в которой элементы массива будут
// последовательно выводиться в консоль спустя промежуток времени
// указанный в атрибуте timeout

const timeout = item => new Promise(resolve => {
  setTimeout(() => {
    resolve(item);
  }, item.timeout)
})

const sequence = async (items) => {
  let totalElapsedTime = 0;

  for(const item of items) {
    const res = await timeout(item);
    console.log(res);
    totalElapsedTime += res.timeout;
  }

  return totalElapsedTime;
};



// example
const items = [
  { name: 'first', timeout: 3000 }, // 3
  { name: 'second', timeout: 5000 }, // 8
  { name: 'third', timeout: 2000 } // 10
];

sequence(items)
  .then(res => console.log(res))
