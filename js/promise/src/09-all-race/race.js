const timerPromisify = (delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });

const start = Date.now();

/**
 * raceは並列実行で、PromiseがいずれかFulfilledかRejectedになると、すぐにthenかcatch  に移る
 */
// Promise.race([
//   timerPromisify(100),
//   timerPromisify(300),
//   timerPromisify(600),
//   timerPromisify(1000),
// ]).then((v) => {
//   console.log(Date.now() - start); // 約100ms
//   console.log({ v });
// });

const promise1 = (delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const str = "promise1";
      console.log({ str });
      resolve(str);
    }, delay);
  });

const promise2 = (delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const str = "promise2";
      console.log({ str });
      resolve(str);
    }, delay);
  });

/**
 * raceはthenとcatchに早く解決されたpromiseの値が渡ってくるが、終わらなかった処理はキャンセルになったわけではなくて、ちゃんと実行はされている
 */
Promise.race([promise1(1000), promise2(10)]).then((v) => {
  console.log({ v });
});
