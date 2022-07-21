/**
 * `then`というメソッド名を持つと、Promise.resolveでそれを使うとpromiseオブジェクトに変換できる
 * このとき、thenメソッドの引数には (onFulfill, onReject) がくる
 */
const someMethod = (shouldError) => {
  const value = "value";

  return {
    then: (resolve, reject) => {
      if (shouldError) reject(new Error("error!!!!"));

      resolve(value);
    },
  };
};

const promise = Promise.resolve(someMethod(true));
// const promise = Promise.resolve(someMethod());

promise
  .then((value) => {
    console.log({ value });
  })
  .catch((error) => {
    console.log("errorだよ", { error });
  });
