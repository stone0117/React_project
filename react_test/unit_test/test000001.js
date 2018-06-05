function foo(a, b) {
  console.log(a, b);
}

foo(a = 1, b = 2);

function getValue(date) {
  let timestamp = Date.parse(date);
  return timestamp;
}

console.log(getValue(new Date(new Date().getFullYear()-1, new Date().getMonth(), new Date().getDate())));