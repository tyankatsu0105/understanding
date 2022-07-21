const timerPromisify = (delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });

const start = Date.now();

/**
 * allは並列実行で、すべてのPromiseがFulfilledかRejectedになるとthenかcatchに移る
 */
Promise.all([
  timerPromisify(100),
  timerPromisify(300),
  timerPromisify(600),
  timerPromisify(1000),
]).then((v) => {
  console.log(Date.now() - start); // 約1000ms
  console.log({ v });
});
