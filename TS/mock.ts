type MockType = {
  ["any"]: string;
};

const mockFunction = (any: MockType) => {
  return any;
};

console.log(mockFunction({ any: "Test" }));