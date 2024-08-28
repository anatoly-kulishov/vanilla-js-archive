const testCase = require("../../../../Helpers/testCase");

function isStringRotated(source, test) {
    /** 1 **/
    if (source.length !== test.length) {
      return false;
    }
    for (let i = 0; i < source.length; i++) {
      const rotate = source.slice(i, source.length) + source.slice(0, i);
      if (rotate === test) {
        return true;
      }
    }
    return false;

    /** 2 **/
    return (source + source).includes(test) && source.length === test.length;
}

testCase(isStringRotated('javascript', 'scriptjava'), true, true);
testCase(isStringRotated('javascript', 'iptjavascr'), true);
testCase(isStringRotated('javascript', 'java'), false);
