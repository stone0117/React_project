const Mock     = require( 'mockjs' );
const _        = require( "lodash" );
const Random   = Mock.Random;
const fs       = require( "fs" );
const { exec } = require( 'child_process' );
const path     = require( "path" );

Array.prototype.contains = function ( obj ) {
  var i = this.length;
  while ( i-- ) {
    if ( this[ i ] === obj ) {
      return true;
    }
  }
  return false;
};

var data = Mock.mock( {
  'list|1-100': [
    {
      'id|+1'      : 1,
      'name'       : function () {
        return Random.cname();
      },
      'age|18-35'  : 25,
      'sex|1'      : [
        'man',
        'woman',
        'unknown',
      ],
      'friends|1-5': [
        {
          'fname'    : function () {
            return Random.name();
          },
          'age|18-35': 25,
          'sex|1'    : [
            'man',
            'woman',
            'unknown',
          ],
        },
      ],
    },
  ],
} );
// 输出结果
// console.log(JSON.stringify(data, null, 2));

// let obj = JSON.stringify(data, null, 2);

// db.students.insert({
//   "name": "stone",
//   "age" : 29,
//   "sex" : "man"
// });

// console.log(obj);

// console.log(Mock.mock({
//   'regexp': /^((https|http):\/\/)[^\s]{20,}/
// }).regexp);

// 导入文件命令
// mongoimport -d xsgl -c cars 路径 --drop
// mongoimport -d xsgl -c cars C:\Users\Administrator\Desktop\monishuju.json --drop

let arr = (function () {
  //基数据的文件的路径
  const carbasedataFilePath = path.resolve( __dirname, "./carbasedata.json" );
  //生成的文件的路径
  const writeDataFilePath   = path.resolve( __dirname, "./cardata.json" );
  //图集的目录的路径
  const carimagesPath       = path.resolve( __dirname, "../www/carimages/" );

  //用fs模块读取这个基数据文件，为了避免回调套回调，此时我们采用同步命令readFileSync
  let arr = JSON.parse( fs.readFileSync( carbasedataFilePath ).toString() );

  //arr是一个长度是100的数组，遍历，补充一些属性
  for ( let i = 0; i < arr.length; i++ ) {
    let dateString         = new Date( 2018, 0, 1 ).toString();
    arr[ i ].price         = _.random( 0, 1000 ) / 10;										      				              //售价（万元）
    arr[ i ].km            = _.random( 0, 1000000 );														      	              //公里数（公里）
    arr[ i ].gearbox       = _.sample( [
      "自动挡",
      "手动挡",
      "手自一体",
    ] );							                //变速箱
    arr[ i ].displacement  = _.sample( [
      "1.0L",
      "1.2L",
      "1.6L",
      "1.6T",
      "2.0L",
      "2.0T",
      "5.0L",
    ] );  //排量
    arr[ i ].fuel          = _.sample( [
      "纯电动",
      "油电混合",
      "汽油车",
      "柴油车",
    ] );							      //燃料
    arr[ i ].buydate       = Date.parse( dateString ) - _.random( 0, 20 * 365 * 86400 * 1000 );	        //购买日期（时间戳，是最近20年的一个随机日期）
    arr[ i ].licence       = _.sample( [
      true,
      false,
    ] );											                        //是否有牌照
    arr[ i ].locality      = _.sample( [
      true,
      false,
    ] );													                    //是否是本地车
    arr[ i ].environmental = _.sample( [
      "国一",
      "国二",
      "国三",
      "国四",
      "国五",
    ] );					            //环保等级
    arr[ i ].images        = {
      "view"  : fs.readdirSync( carimagesPath + "/" + arr[ i ].id + "/view" ),
      "inner" : fs.readdirSync( carimagesPath + "/" + arr[ i ].id + "/inner" ),
      "engine": fs.readdirSync( carimagesPath + "/" + arr[ i ].id + "/engine" ),
      "more"  : fs.readdirSync( carimagesPath + "/" + arr[ i ].id + "/more" ),
    };
  }
  return arr;
})();

let content = `// mongo --nodb mongodb_load_data/insert.js // 非交互模式下
// load("mongodb_load_data/insert.js") // 交互模式下

conn = new Mongo("localhost:27017");

db = conn.getDB("ershouche");

db.cars.drop();`;

for ( let i = 0; i < arr.length; ++i ) {

  let obj = arr[ i ];

  content += "\ndb.cars.insert({";

  Object.keys( obj ).forEach( ( key, index ) => {

    if ( Object.prototype.toString.call( obj[ key ] ) === '[object Object]' ) {
      content += `"${key}":${JSON.stringify( obj[ key ] )},`;
    }
    if ( Object.prototype.toString.call( obj[ key ] ) === '[object String]' ) {
      content += `"${key}":"${obj[ key ]}",`;
    }
    if ( Object.prototype.toString.call( obj[ key ] ) === '[object Boolean]' ) {
      content += `"${key}":${obj[ key ]},`;
    }
    if ( Object.prototype.toString.call( obj[ key ] ) === '[object Number]' ) {
      // 浮点数判断
      // https://www.cnblogs.com/YikaJ/p/4278004.html
      if ( obj[ key ] % 1 === 0 ) {

        if ( key === 'price' || key === 'buydate' ) {
          content += `"${key}":${obj[ key ]},`;
        } else {
          content += `"${key}":${obj[ key ]},`;
          // content += `"${key}":NumberInt(${obj[ key ]}),`;
        }
      } else {
        content += `"${key}":${obj[ key ]},`;
      }
    }
  } );
  content += "})\n";
}
console.log( content );

fs.writeFile( 'insert_copy.js', content, { flag: 'w' }, function ( err ) {
  if ( err ) {
    return console.error( err );
  }
  // exec('echo data write success - mongodb_load_data/insert.js');
  // exec('mongo --nodb mongodb_load_data/insert.js');
} );
