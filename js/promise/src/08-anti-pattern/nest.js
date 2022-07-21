const promiseA = Promise.resolve(100);
const promiseB = Promise.reject(new Error("error at promiseB"));
// const promiseB = Promise.resolve(200);
const promiseC = Promise.reject(new Error("error at promiseC"));
// const promiseC = Promise.resolve(300);

let result;

/**
 * nestするのは
 * - 可読性が下がる
 * -
 */
promiseA.then((resultA) => {
  promiseB
    .then((resultB) => {
      promiseC
        .then((resultC) => {
          console.log({ resultA, resultB, resultC });
          result = resultA + resultB + resultC;
          console.log({ result });
        })
        .catch((error) => console.log({ error }));
    })
    .catch((error) => console.log({ error }));
});

/**
 * allで代用できる
 * どれかrejectされると先にreject舌値がcatchの引数に行く
 */
Promise.all([promiseA, promiseB, promiseC])
  .then((v) => {
    const [resultA, resultB, resultC] = v;
    console.log({ resultA, resultB, resultC });

    result = resultA + resultB + resultC;
    console.log({ result });
  })
  .catch((error) => console.log({ error }));
