const callbackStyleFunction = (name, forceReject, callback) => {
  if (forceReject) {
    callback(new Error("rejectされました"));
    return;
  }

  callback(null, `Hi ${name}!! I'm Chuky, wanna play?`);
};

/**
 * 関数をPromise化することに成功したが、Promiseをサポートしていない環境もある。
 * そのときにthenableを使うことができる。
 *
 */
// const promisedCallbackStyleFunction = (name, forceReject = false) =>
//   new Promise((resolve, reject) => {
//     callbackStyleFunction(name, forceReject, (err, value) => {
//       if (forceReject) reject(err);

//       resolve(value);
//     });
//   });

// promisedCallbackStyleFunction("tyankatsu").then((v) => {
//   console.log({ v });
// });

/**
 * プロパティ名にthenを含めたオブジェクトをPromise.resolveにわたすと、promiseとして実行される。
 * この関数自体からPromiseの成約を取り除くことができる。
 */
const thenabledCallbackStyleFunction = (name, forceReject = false) => ({
  then: (resolve, reject) => {
    callbackStyleFunction(name, forceReject, (err, value) => {
      if (forceReject) reject(err);

      resolve(value);
    });
  },
  /**
   * thenプロパティを含んでいれば、他に何があってもいい
   */
  hoge: () => "hello",
});

Promise.resolve(thenabledCallbackStyleFunction("tyankatsu"))
  .then((v) => {
    console.log({ v });
  })
  .catch((err) => console.error({ err }));
