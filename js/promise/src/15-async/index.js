const fn = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });

// (async () => {
//   console.log("start");
//   const v = await fn();
//   console.log({ v });
//   console.log("end");
// })();

(() => {
  console.log("start");
  fn().then((v) => {
    console.log({ v });
  });
  console.log("end");
})();
