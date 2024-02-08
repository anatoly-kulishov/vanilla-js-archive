const stripProperty = (obj, prop) => {
  for (let key in obj) {
    if (key === prop) {
      delete obj[key];
    }
  }
  return obj;
}

const someObj = {
  name: 'Anatoly',
  age: 22
}

console.log('Before', someObj) // Before { name: 'Anatoly', age: 23 }

stripProperty(someObj, 'age');

console.log('After', someObj) // After { name: 'Anatoly' }