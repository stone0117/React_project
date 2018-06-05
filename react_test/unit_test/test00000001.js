// let obj = {
//   then(onFulfill, onReject) {
//     onFulfill("fulfilled!");
//   },
// };
//
// console.log(obj);
var obj   = {};
var proxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  },
});

proxy.count = 1;
++proxy.count;


console.log(obj);


function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3])