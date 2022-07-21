/**
 * promiseを内包したdeferredクラスを作ると、
 * - Promiseコンストラクタで処理を書かずに済むので、インデントが減る
 *  - deferredインスタンスを作って、resolveやrejectの処理を作って、deferred.promiseでpromiseインスタンスを返せば良くなる
 * - Promiseによって自動的に補足されるthrow new Errorを自動的にcatchに渡さないようにできる
 *   - Promiseはtry catchで囲われているようなものなので、コンストラクタ内でthrow new errorをするとcatchにerrorが渡る
 *   - deferredではPromiseコンストラクタに処理を書かないので、throw new errorしてもcatchにいかない
 *
 */
class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(value) {
    this._resolve(value);
  }

  reject(reason) {
    this._reject(reason);
  }
}

/**
 * errorをthrowしているのでcatchにerrorが渡る
 */
const promisedFn = (isRejected) =>
  new Promise((resolve, reject) => {
    if (isRejected) throw new Error("error at promisedFn");

    resolve("Hello from promisedFn");
  });

promisedFn(true)
  .then((v) => {
    console.log({ v });
  })
  .catch((err) => {
    console.error({ err });
  });

/**
 * Promiseコンストラクタが消えて、throw したerrorはどこにもcatchされない
 */
const deferredFn = (isRejected) => {
  const deferred = new Deferred();

  if (isRejected) throw new Error("error at deferredFn");

  deferred.resolve("Hello from deferredFn");

  return deferred.promise;
};

deferredFn(true)
  .then((v) => {
    console.log({ v });
  })
  .catch((err) => {
    console.error({ err });
  });
