const delayTimeout = (timer) =>
  new Promise((resolve) => {
    setTimeout(resolve, timer);
  });

/**
 * Promise.raceは早く解決したPromiseの値を処理するので、それを利用してsetTimeoutを使って、
 * 「あるPromiseを返す処理が?ms以内に終わればthen、終わらなければcatchへ移行する」
 * という処理をかける
 */
const timeoutPromise = (promise, timer) => {
  const timeout = delayTimeout(timer).then(() => {
    throw new Error(`Operation timed out after ${timer} ms`);
  });

  return Promise.race([promise, timeout]);
};

timeoutPromise(
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("pass");
    }, 3000);
  }),
  1000
)
  .then((v) => {
    console.log({ v });
  })
  .catch((err) => {
    console.error("fail:", { err });
  });
