const promiseA = (isReject) =>
  new Promise((resolve, reject) => {
    if (isReject) reject(new Error("error at promiseA"));

    resolve(100);
  });

const promiseB = (isReject) =>
  new Promise((resolve, reject) => {
    if (isReject) reject(new Error("error at promiseB"));

    resolve(100);
  });

/**
 * これだとthenのonRejectedに、onFulfilledで発生したエラーが渡ってこない
 */
promiseA().then(
  () => promiseB(true),
  (error) => console.log({ error })
);

/**
 * これだとthenで発生したerrorが.catchで捕捉できるようになる
 */
promiseA()
  .then(() => promiseB(true))
  .catch((error) => console.log({ error }));
