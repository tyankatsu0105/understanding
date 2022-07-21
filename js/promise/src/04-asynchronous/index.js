/**
 * たとえ同期的にresolveできたとしても、promiseは常に非同期で実行する。
 * そのため、resolveの値を返すのが同期的ではない。
 * これは同期的にたとえできたとしても、場合によっては非同期になってしまうと、同期非同期が混在し、コードの実行順序がわからなくなるため。
 */
const promise = new Promise((resolve) => {
  console.log("inner Promise");
  resolve(100);
  console.log("next resolve");
});

promise.then((value) => {
  console.log("inner promise then");
  console.log({ value });
});

console.log("outer Promise");

/**
 *
 * inner Promise
 * next resolve
 * outer Promise
 * inner promise then
 * { value: 100 }
 *
 */
