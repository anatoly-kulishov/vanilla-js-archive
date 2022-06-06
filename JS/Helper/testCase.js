const testCase = (arg1, arg2, isStart = false) => {
  let flag = arg1 === arg2;

  if (isStart) console.log("Test Cases:");

  if (typeof arg1 === 'object' && typeof arg2 === 'object') {
    flag = JSON.stringify(arg1) === JSON.stringify(arg2);
  }

  console.log(`[ ${flag ? '✔' : `✘`} ]`, `(${arg1})`, '~', `(${arg2})`)
}

module.exports = testCase;