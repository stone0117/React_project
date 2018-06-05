function demo1() {

  console.log('hello world');

  let immutable = require('immutable');

  let arr1 = ["William", "Daniel", "Olivia", "James"];

  let list1 = immutable.fromJS(arr1);

  let list2 = list1.push('楠木');
  let list3 = list1.pop();
  let list4 = list1.unshift('楠木');
  let list5 = list1.shift();

  console.log('arr1 = \t\t', list1.toJS());
  console.log('push = \t\t', list2.toJS());
  console.log('pop = \t\t', list3.toJS());
  console.log('unshift = \t', list4.toJS());
  console.log('shift = \t', list5.toJS());

}

function foo(a, b) {
  for (var i = 0; i < arguments.length; ++i) {
    var obj = arguments[i];
    console.log(obj);
  }
  console.log(a, b);
}

let arr1 = [1, 2];
let arr2 = [3, 4];

foo(...arr1, ...arr2);