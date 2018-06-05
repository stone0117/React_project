require('es6-promise').polyfill();
require('isomorphic-fetch');
// async function main() {
//   return await fetch('http://localhost:3000/result').then(data => {
//     return data.json();
//   }).catch(err => {
//     return { 'ERROR': err };
//   });
// }
// main().then(data => {
//   console.log(data);
// });

async function requestWithGET(urlString) {

  try {
    return await fetch(urlString).then(response => response.json());
  } catch ( err ) {
    throw new Error(err);
  }
  // return await fetch(urlString).then(response => response.json()).catch(err => { throw new Error(err); });
}

// requestWithGET('http://localhost:3000/brandandseries').then(data => {
//   // let newVar = Object.values(data)[ 0 ][ 0 ];
//   // let value  = Object.values(newVar)[ 0 ];
//   // setNowseries(value);
//   console.log(data);
// });

function *foo() {

  let newVar = yield requestWithGET('http://localhost:3000/brandandseries');
  console.log(newVar);
}

let g    = foo();
let next = g.next();
next.value.then(data => {
  // console.log('data = ', data);
  g.next(data);
})

// g.next();

// .then(data => console.log(data));