// 'привет'.matchAll(/\[оеиыяу]/).length;

// console.log([...new Set('AAAAbbbbcccee332')].join(''));
// 'Abce32'


// console.log(['app4le', 'melon2', 'b5anana'].sort((a,b) => a.match(/\d/) - b.match(/\d/)));

// console.log(['melon2', 'app4le', 'b5anana']);

/*
console.log([
  {title: 'dsf', salary: 1800},
  {title: 'dsf', salary: 2100},
  {title: 'dsf', salary: 1900}].sort((a, b) => b.salary - a.salary);
*/


/*
https://www.youtube.com/watch?v=Fu4BzQNN0Qs&t=1s&ab_channel=Front-endScience%D1%96%D0%B7%D0%A1%D0%B5%D1%80%D0%B3%D1%96%D1%94%D0%BC%D0%9F%D1%83%D0%B7%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2%D0%B8%D0%BC


// 1 logn nlogn n n^2 n^3... n! 2^n

for {} //n
for {} //2n => n
for {} //3n => n


for {
  for { //n^2
    for { //n^3

    }
  }
}


function isPolyndrom(str) {
  let reversedStr = '';

  for(let i = str.length; i >= 0; i--) {
    const current = str[i];
    reversedStr += current;
  }

  return reversedStr === str; //O(1*n) = O(n)

  // return str === str.split('').reverse().join(''); // O(3*n) = O(n)
}

console.log(isPolyndrom('alla')) //true
console.log(isPolyndrom('шалаш')) //true
console.log(isPolyndrom('ягодая')) //false
*/


// виды полиморфизма
//

// приватные поля


// чистые функ-и, хок(фун-и высшего порядка), фу-и первого класса(FE), композиция,
// каррирование, частичное применение, рекурсия, замыкание


// infer
// type guards(typeof, in, instaceof, is)
// utility types
// Exclude vs Omit, declare, type vs interface
// let arr = [1,2,4,5,[4,5,[3,2,[5,6,],4,],6]];
// type Arr = number | Array<number> | Array<Arr>;

// function a(obj: Animal, key: ) {}
