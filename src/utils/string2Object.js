export default function(input) {
  return input.split('|').reduce(function (accumulator, validator) {
    var tuple = validator.trim().split(':');
    var name = tuple[0];
    var options = tuple.slice(1, tuple.length);
    accumulator[name] = options && options.length > 0 ? options : null;
    return accumulator;
  }, {});
}
