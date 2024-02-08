const partitionLabels = function(S) {
  let lastIndex = {};

  for (let i = 0; i < S.length; i++) {
    lastIndex[S[i]] = i;
  }

  let partitions = [];
  let start = 0;
  let end = 0;

  for (let i = 0; i < S.length; i++) {
    end = Math.max(end, lastIndex[S[i]]);
    if (i === end) {
      partitions.push(i - start + 1);
      start = i + 1;
    }
  }

  return partitions;
};
