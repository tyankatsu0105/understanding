/**
 * callbackで処理を書くnode.jsのルールをより厳密化し、
 * resolveで正常な値を、rejectで異常時の値を返すPromiseというインターフェースで統一を図ることが可能
 */
const getName = (lastName) =>
  new Promise((resolve, reject) => {
    if (lastName === "yamamoto")
      reject(new Error("lastName must be not yamamoto"));

    resolve("katsuya");
  });

Promise.all([getName("tanaka"), getName("satou"), getName("yamamoto")]).then(
  (result) => {
    const [first, second, third] = result;
    console.log({ first, second, third });
  }
);
// getName("tanaka")
//   .then((result) => {
//     console.log(`I'm ${result}`);
//   })
//   .catch((error) => {
//     throw new Error(error);
//   });
