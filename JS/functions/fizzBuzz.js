const fizzBuzz = (n) => {
  if (n % 3 === 0 && n % 5 === 0) console.log("FizzBuzz");
  else if (n % 3 === 0 && n % 5 !== 0) console.log("Fizz");
  else if (n % 5 === 0 && n % 3 !== 0) console.log("Buzz");
  else console.log(n);
}

fizzBuzz(15); // FizzBuzz
fizzBuzz(9); // Fizz
fizzBuzz(10); // Buzz
fizzBuzz(7); // 7