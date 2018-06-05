console.log('hello world');

let obj = {
  user   : {
    username: 'stone',
  },
  country: 'China',
};

let { country, user: { username } } = obj;

console.log(username);
console.log(country);
// console.log(user);