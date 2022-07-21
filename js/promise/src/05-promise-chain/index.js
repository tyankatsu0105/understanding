function taskA() {
  throw new Error("error at A");
  console.log("Task A");
}
function taskB() {
  console.log("Task B");
}
function onRejected(error) {
  console.log("Catch Error: A or B", error);
}
function finalTask() {
  throw new Error("error at final");
  console.log("Final Task");
}
function onRejectedFinal(error) {
  console.log("Catch Error:", error);
}

/**
 * thenはchainでつなげることができる
 * catchのあとにもthenをつなげることができる
 * then => then => catch だと、thenのどこかでerrorが発生するとcatchに進む
 * catchのあとのthen以降は必ず実行される
 * catch => then => catch だと、thenで発生したerrorのみthen以降のcatchで捕縛する
 */
const promise = Promise.resolve();
promise
  .then(taskA)
  .then(taskB)
  .catch(onRejected)
  .then(finalTask)
  .catch(onRejectedFinal);

const promise2 = Promise.resolve(10);
promise2
  .then((value) => {
    return value + 10;
  })
  .then((value) => {
    throw new Error("err");
    console.log({ value });
  })
  .catch((error) => {
    console.log({ error });
  });
