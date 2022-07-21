const promise = new Promise((resolve, reject) => {
  resolve(100);

  reject(new Error("error"));
});

const promiseA = promise.then((v) => console.log({ v }));
const promiseB = promise.catch((error) => console.log({ error }));

/**
 * thenやcatchを実行すると、新しいpromiseオブジェクトを生成するので違うオブジェクトとなる
 */
console.log(promise !== promiseA);
console.log(promise !== promiseB);
