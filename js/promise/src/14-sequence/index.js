const sequenceTasks = (tasks) => {
  const recordValue = (results, value) => {
    results.push(value);
    return results;
  };

  const pushValue = recordValue.bind(null, []);
  return tasks.reduce(
    (promise, task) => promise.then(task).then(pushValue),
    Promise.resolve()
  );
};

const task1 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("This");
    }, 1000);
  });
const task2 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("is");
    }, 10);
  });
const task3 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("a");
    }, 500);
  });
const task4 = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("pen");
    }, 0);
  });

/**
 * 左から順番に処理が走っていき、値も左の値からthenに渡っていく
 */
sequenceTasks([task1, task2, task3, task4]).then((v) =>
  console.log(v.join(" "))
);

/**
 * 解決された値は呼ばれた順でthenに渡されるが、allの中は並列で実行されるため、逐次実行ではない
 */
Promise.all([task1(), task2(), task3(), task4()]).then((v) =>
  console.log(v.join(" "))
);
