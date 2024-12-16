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
  age: 25
}

console.log('Before', someObj) // Before { name: 'Anatoly', age: 25 }

stripProperty(someObj, 'age');

console.log('After', someObj) // After { name: 'Anatoly' }