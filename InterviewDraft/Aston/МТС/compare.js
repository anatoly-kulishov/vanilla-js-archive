const compare = (obj, first, second) => {
  // Разбиваем строку first на массив ключей свойств
  const firstValue = first.split(".").reduce((acc, key) => acc[key], obj);

  // Разбиваем строку second на массив ключей свойств
  const secondValue = second.split(".").reduce((acc, key) => acc[key], obj);

  // Сравниваем значения и возвращаем результат сравнения (true или false)
  return firstValue === secondValue;
};

const o = {
  f: {
    s: "second"
  },
  t: {
    f: {
      x: "second"
    }
  }
};

console.log(compare(o, "f.s", "t.f.x")); // Output: true
