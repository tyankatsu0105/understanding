/**
 * Node.jsの世界ではcallbackの最初の引数をerrorを渡す慣習がある
 */
const getName = (lastName, callback) => {
  if (lastName !== "yamamoto")
    return callback(new Error("lastName must be yamamoto"), null);

  return callback(null, "katsuya");
};

getName("yamamoto", (error, result) => {
  console.log(`I'm yamamoto ${result}`);
});
getName("yamamotooooooooo", (error, result) => {
  console.log(`I'm yamamoto ${result}`);
});
