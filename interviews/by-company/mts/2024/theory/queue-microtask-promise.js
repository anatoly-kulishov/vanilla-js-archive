// queueMicrotask(() => {
//   console.log("1");
// });
//
// Promise.reject("2")
//   .catch((res1) => {
//     console.log("res1", res1);
//     return "4";
//   })
//   .then((res2) => {
//     console.log("res2", res2);
//   });
//
// queueMicrotask(() => {
//   console.log("3");
// });
//
// Expected: 1 2 3 4
