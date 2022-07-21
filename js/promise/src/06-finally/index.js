const promise = (isReject) =>
  new Promise((resolve, reject) => {
    if (isReject) reject(new Error("error"));

    resolve("success!!!!");
  });

/**
 * finallyはthenやcatchのあとに最後に呼ばれる
 */
// promise(false)
//   .then((v) => {
//     return v;
//   })
//   .finally((v) => {
//     console.log({ v });
//   });

const onFinally = () => {
  console.log("aaaaaaaaa");
};
/**
 * finallyは新しいpromiseオブジェクトを返し、そのとき呼び出し元のpromiseの状態を引き継ぐ
 * この場合はfinallyで呼び出し元のpromiseを引き継いだpromise、つまりresolveに100を渡したpromiseオブジェクトを作成し、thenでそのresolveの値が渡ってくる
 */
// Promise.resolve(100)
//   .finally(onFinally)
//   .then((v) => console.log({ v }));

/**
 * この場合は最初のthenでresolveの値をそのまま返却しているので、finallyで状態を引き継いだpromiseオブジェクトを再生成して、finallyのあとのthenの引数に値が渡ってくる
 */
Promise.resolve(100)
  .then((v) => v)
  .finally(onFinally)
  .then((v) => console.log({ v }));
