export default function (validators, value) {
  return Object.keys(validators)
    .reduce((acc, key) => {
      const valid = validators[key](value);
      if (acc === null){
        acc = !valid ? key : null;
      }
      return acc;
    }, null);
}