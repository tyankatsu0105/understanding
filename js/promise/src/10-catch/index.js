const throwError = (v) => {
  throw new Error(v);
};

// const promise = (isError) =>
//   new Promise((resolve) => {
//     if (isError) throwError("error!");

//     resolve(100);
//   });

// /**
//  * new Promiseでerrorをthrowすると、catchで捕縛可能
//  */
// promise(true).then(
//   (v) => {
//     console.log({ v });
//   },
//   (err) => {
//     console.error({ err });
//   }
// );

const badPromise = (onRejected) =>
  Promise.resolve(100).then(throwError, onRejected);
const goodPromise = (onRejected) =>
  Promise.resolve(100).then(throwError).catch(onRejected);
/**
 * これでもいいが、catchで書いたほうが意図が明確になる
 */
// const goodPromise = (onRejected) =>
//   Promise.resolve(100).then(throwError).then(null, onRejected);

/**
 * thenのonFulfilledでerrorをthrowしても、onRejectedに処理が行かない
 * thenやcatchは都度呼び出し元のpromiseオブジェクトを継承したpromiseオブジェクトを生成する。
 * thenのonRejectedが扱うのは、そのpromiseオブジェクトに対してであり、同じthenのonFulfilledに対してではない。
 */
badPromise((err) => console.log("badPromiseでerror発生"));
/**
 * thenでthrow new Errorしたあとにcatchで捕縛するとちゃんとonRejectedの処理が動く
 * thenで生成されたpromiseオブジェクトでerrorがthrowされたので、catchで捕縛することができている
 */
goodPromise((err) => console.log("goodPromiseでerror発生"));
