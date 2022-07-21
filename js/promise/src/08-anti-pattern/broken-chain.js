/**
 * thenを実行してpromiseのオブジェクトが変わったので、promise変数とpromise.then()は関係がない
 */
const NotCorrectPromiseFn = () => {
  const promise = Promise.resolve(100);
  promise.then((v) => v + 100);
  return promise;
};
NotCorrectPromiseFn().then((v) => console.log({ v }));

/**
 * thenで生成されたpromiseオブジェクトを返すのが正しい
 */
const promiseFn = () => {
  return Promise.resolve(100).then((v) => v + 100);
};
promiseFn().then((v) => console.log({ v }));
