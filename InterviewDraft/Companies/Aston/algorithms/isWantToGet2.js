const testCase = require("../../../../Helpers/testCase");

function isWantToGet2(amountRequired, limits) {
  function collect(amount, nominals) {
    if (amount === 0) return {};
    if (!nominals?.length) return;

    let currentNominal = nominals[0];
    let availableNotes = limits[currentNominal];
    let notesNeeded = Math.floor(amount / currentNominal);
    let numberOfNotes = Math.min(availableNotes, notesNeeded);

    for (let i = numberOfNotes; i >= 0; i--) {
      let result = collect(amount - i * currentNominal, nominals.slice(1));

      if (result) {
        return i ? { [currentNominal]: i, ...result } : result;
      }
    }
  }

  let nominals = Object.keys(limits)
    .map(Number)
    .sort((a, b) => b - a);

  return collect(amountRequired, nominals);
}

const limits = { 1000: 5, 500: 2, 100: 5, 50: 100, 30: 6 };

testCase(isWantToGet2(230, limits), { 30: 1, 100: 2 }, true);
testCase(isWantToGet2(150, limits), { 100: 1, 50: 1 });
testCase(isWantToGet2(1000, limits), { 1000: 1 });
testCase(isWantToGet2(200, limits), { 100: 2 });
testCase(isWantToGet2(120, limits), { 30: 4 });
testCase(isWantToGet2(275, limits), undefined);
testCase(isWantToGet2(50000, limits), undefined);
