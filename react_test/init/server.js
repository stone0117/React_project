const express     = require("express");
const fs          = require("fs");
const url         = require("url");
const formidable  = require("formidable");
const path        = require("path");
const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');
const mongodbURL  = 'mongodb://localhost:27017';
const dbName      = 'studb';
const app         = express();

// app.use(express.static('www'));
// app.set('view engine', 'ejs');

app.get("/", function (request, response) {
  // 异步读取
  fs.readFile('index.html', function (err, data) {
    if (err) { return console.error(err); }
    response.send(data.toString());
  });
});
app.get("/bundle.js", function (request, response) {
  // 异步读取
  fs.readFile('bundle.js', function (err, data) {
    if (err) { return console.error(err); }
    response.send(data.toString());
  });
});

app.get("/json", function (request, response) {
  const _ = require("lodash");

  //基数据的文件的路径
  const carbasedataFilePath = path.resolve(__dirname, "./carbasedata.json");
  //生成的文件的路径
  const writeDataFilePath   = path.resolve(__dirname, "./cardata.json");
  //图集的目录的路径
  const carimagesPath       = path.resolve(__dirname, "../www/carimages/");

  //用fs模块读取这个基数据文件，为了避免回调套回调，此时我们采用同步命令readFileSync
  let arr = JSON.parse(fs.readFileSync(carbasedataFilePath).toString());

  //arr是一个长度是100的数组，遍历，补充一些属性
  for (let i = 0; i < arr.length; i++) {
    arr[ i ].price         = _.random(0, 1000) / 10;										      				                //售价（万元）
    arr[ i ].km            = _.random(0, 1000000);														      	                //公里数（公里）
    arr[ i ].gearbox       = _.sample([ "自动挡", "手动挡", "手自一体" ]);							              		//变速箱
    arr[ i ].displacement  = _.sample([ "1.0L", "1.2L", "1.6L", "1.6T", "2.0L", "2.0T", "5.0L" ]);		//排量
    arr[ i ].fuel          = _.sample([ "纯电动", "油电混合", "汽油车", "柴油车" ]);							        //燃料
    arr[ i ].buydate       = Date.parse(new Date(2018, 0, 1).toString()) - _.random(0, 20 * 365 * 86400 * 1000);	//购买日期（时间戳，是最近20年的一个随机日期）
    arr[ i ].licence       = _.sample([ true, false ]);											                      		//是否有牌照
    arr[ i ].locality      = _.sample([ true, false ]);													                      //是否是本地车
    arr[ i ].environmental = _.sample([ "国一", "国二", "国三", "国四", "国五" ]);					              //环保等级
    arr[ i ].images        = {
      "view"  : fs.readdirSync(carimagesPath + "/" + arr[ i ].id + "/view"),
      "inner" : fs.readdirSync(carimagesPath + "/" + arr[ i ].id + "/inner"),
      "engine": fs.readdirSync(carimagesPath + "/" + arr[ i ].id + "/engine"),
      "more"  : fs.readdirSync(carimagesPath + "/" + arr[ i ].id + "/more"),
    };
  }

  response.send(arr);

  // //写入一个文件
  // for (let i = 0; i < arr.length; i++) {
  //   fs.appendFileSync(writeDataFilePath, JSON.stringify(arr[ i ]) + "\r\n");
  // }
  //
  // console.log("文件创建完毕");
});

app.get("/hello", function (request, response) {

  response.render("index", {
    'username': 'stone',
    'list'    : [
      'baseball',
      'football',
      'basketball',
    ],
  });
});

let result = { a: 4, b: 3, c: 2, d: 2 };

app.get("/result", function (request, response) {

  let obj      = url.parse(request.url, true).query;
  let callback = obj.callback;

  if (callback) {
    delete obj.callback; //删除属性
    delete obj._;        //删除属性

    // let data = JSON.stringify(obj); //转json字符串
    let data = JSON.stringify(result); //转json字符串
    let r    = callback + '(' + data + ');';
    response.send(r);
  } else {
    response.json(result);
  }
});

app.get("/vote", function (request, response) {

  let obj = url.parse(request.url, true).query;

  let callback = obj.callback;

  let q = url.parse(request.url, true).query.q;
  result[ q ] += 10;

  if (callback) {
    delete obj.callback; //删除属性
    delete obj._;        //删除属性

    let data = JSON.stringify(result); //转json字符串
    response.send(callback + '(' + data + ');');

  } else {

    response.json(result);
  }

});

app.get("/mock", function (request, response) {

  MongoClient.connect(mongodbURL, function (err, client) {

    const db         = client.db(dbName);
    const collection = db.collection('students');

    collection.find({}).toArray(function (error, docs) {

      if (error) { return console.log(error); }
      client.close();
      response.send(JSON.stringify(docs, null, 2));
    });
  });

});

app.get("/shopping", function (request, response) {

  // response.send("hello world");
  let obj = url.parse(request.url, true).query;
  console.log(obj);
  response.send({ "money": "6000" });

});

app.post("/shopping", function (request, response) {

  let form = new formidable.IncomingForm();
  form.parse(request, function (error, fields, files) {
    console.log(fields);
    response.send({ "money": "3000" });

  });
});

app.listen(3000, ()=>console.log("program running at http://localhost:3000/ press Ctrl+C to stop."));