// console.log('hello world');
// var fetch = require('node-fetch');
var fs = require("fs");
require('es6-promise').polyfill();
require('isomorphic-fetch');

function asyncFunc(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function (err, data) {
      if ( err ) { reject(err); } else { resolve(data); }
    });
  });
}
// Promise.all(asyncFunc('convert.js'), asyncFunc('index.html')).then(values => {
//   console.log(values);
// });

function demo2() {

  function* main() {

    let newVar = yield fetch("http://localhost:3000/carinfo/" + 1000068).then(data => data.json());
    console.log(newVar);

  }

  let g = main();

  g.next(true);
  g.next(true);
}

function demo1() {

  function* numbers() {
    console.log('function start.');

    var v1 = yield 0;
    console.log('v1 = ' + v1);

    var v2 = yield 1;
    console.log('v2 = ' + v2);

    return 5;
  }

  var nums = numbers();

  // 第 1 次调用 next, v1 的值还没有返回.
  console.log(nums.next(2));
  // 第 2 次调用 next, next 参数作为上一次 yield 值返回给 v1.
  console.log(nums.next(3));
  // 第 3 次调用 next, 此时 done 的值为 true, 直接返回 return 的值.
  console.log(nums.next(4));
}

function demo3() {

  function* gen() {
    // var url    = 'http://www.weather.com.cn/data/sk/101010100.html';
    var result = yield fetch("http://localhost:3000/carinfo/" + 1000068);
    console.log(result);
  }

  var g      = gen();
  var result = g.next();

  result.value.then(data => data.json()).then(data => g.next(data));
}

function demo5() {

  function* gen() {
    // var url    = 'http://www.weather.com.cn/data/sk/101010100.html';

    yield Promise.all(fetch("http://localhost:3000/carinfo/" + 1000068), fetch("http://localhost:3000/carinfo/" + 1000069));

    console.log(result);
  }

  var g      = gen();
  var result = g.next();

  // result.value.then(data => data.json()).then(data => g.next(data));
  // console.log(result);
}

// a very basic async function, just outputting the argument each 5 ms
// function asyncFunc(arg) {
//   return new Promise(function (resolve) {
//     setTimeout(() => {
//       console.log(arg);
//       resolve();
//     }, 5);
//   });
// }

// function* generator(queue) {
//   console.log(queue);
//   yield Promise.all(queue);
// }
//
// let g = generator(fetch("http://localhost:3000/carinfo/" + 1000068).then(data => data.json()), fetch("http://localhost:3000/carinfo/" + 1000069).then(data => data.json()));
//
// let next = g.next();
// next.value.then((values)=>console.log(values));

// the generator
// function* generator(processNodes, task) {
//   var limit = 4,
//       queue = [];
//   for ( let i = 0; i < processNodes.length; i++ ) {
//     queue.push(task(processNodes[ i ]));
//     if ( queue.length >= limit ) {
//       yield Promise.all(queue);
//       // clears the queue after pushing
//       console.log('after queue');
//       queue = [];
//     }
//   }
//   // make sure the receiver gets the full queue :)
//   if ( queue.length !== 0 ) {
//     yield Promise.all(queue);
//   }
// }
//
// function runThroughArguments(args, task) {
//   return new Promise(function (resolve) {
//     setTimeout(() => {
//       var nodes    = generator(args, task),
//           iterator = nodes.next();
//
//       if ( !iterator.done ) {
//         // if it's not done, we have to recall the functionallity
//         iterator.value.then(function q() {
//           setTimeout(() => {
//             iterator = nodes.next();
//             if ( !iterator.done && iterator.value ) {
//               // call the named function (in this case called q) which is this function after the promise.all([]) completed
//               iterator.value.then(q);
//             } else {
//               // everything finished and all promises are through
//               resolve();
//             }
//           }, 2);
//         });
//       } else {
//         iterator.value.then(resolve);
//       }
//     }, 2);
//   });
// }
//
// runThroughArguments( [ 'hey', 'you', 'the', 'rock', 'steady', 'crew' ], asyncFunc, ).then(() => console.log('completed'));

// console.log('runs before everything');

// (async () => {
//   const promise1 = new Promise(resolve => {
//     setTimeout(() => { resolve(); }, 1000);
//   });
//
//   const promise2 = new Promise(resolve => {
//     setTimeout(() => { resolve(); }, 2000);
//   });
//
//   const promise3 = new Promise(resolve => {
//     setTimeout(() => { resolve(); }, 3000);
//   });
//
//   const promises = [ promise1, promise2, promise3 ];
//
//   await Promise.all(promises); // This already works as expected
//
//   console.log('This will output 10000 ms after the previous line was called.');
// })();

const promise1 = fetch("http://localhost:3000/carinfo/" + 1000068).then(data => data.json());

const promise2 = fetch("http://localhost:3000/carinfo/" + 1000069).then(data => data.json());

const promise3 = fetch("http://localhost:3000/carinfo/" + 1000070).then(data => data.json());

const promises = [ promise1, promise2, promise3 ];

function* foo() {

  let newVar = yield Promise.all(promises);
  console.log(newVar);

}

let g = foo();

let next = g.next();

next.value.then(data=>console.log(data))
