let express    = require("express");
var formidable = require("formidable");
let mongoose   = require("mongoose");
var fs         = require("fs");
let cors       = require('cors');
let path       = require('path');
var gm         = require("gm");
let app        = express();

mongoose.connect("mongodb://localhost/ershouche");

// mongoose.connect('mongodb://localhost/ershouche', { useMongoClient: true });

//保证mongod了，CMD没有关闭

//引入模型文件
let Car = require("./models/Car.js");

let { get, post } = app;

app.use(express.static('www'));
// app.use(cors());

app.set('view engine', 'ejs');

//allow custom header and CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // if ( req.method === 'OPTIONS' ) {
  //   res.send(200);
  // }
  // else {
  //   next();
  // }
  next();
});

//接口，查询某一个id的车的信息（包括images）
app.get("/carinfo/:id", (request, response) => {
    //得到:id的值
    let id = request.params.id;
    //查询数据库
    Car.find({ id }).exec((err, results) => {
      console.log(JSON.stringify(results[ 0 ], null, 2));
      console.log("/carinfo/:id ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
      response.json({ "result": results[ 0 ] });		//车只有一辆，0表示这辆车
    });
  },
);

//接口，查询和某一个id的车同品牌、同车系的车
app.get("/carlike/:id", (request, response) => {
  //得到:id的值
  let id = request.params.id;
  //先要知道查的这个车的品牌、车系
  Car.find({ id }).exec((err, results) => {
    //得到你查询的这个id的品牌和车系

    let brand  = results[ 0 ].brand;
    let series = results[ 0 ].series;
    //继续查询
    Car.find({ brand, series }).exec((err, results) => {
      console.log(JSON.stringify(results, null, 2));
      console.log("/carlike/:id ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
      response.json({ results });
    });
  });
});

//全部的品牌和车系
app.get("/brandandseries", function (request, response) {

  let json = {
    "A": [
      { "奥迪": [ "A6L", "Q5", "TT" ] },

    ],
    "B": [
      { "奔驰": [ "C级", "E级", "GLK级" ] },
      { "宝马": [ "5系", "3系", "X5", "X6" ] },
      { "标致": [ "308", "408" ] },

    ],
    "D": [
      { "大众": [ "高尔夫", "帕萨特" ] },
    ],
    "F": [
      { "丰田": [ "凯美瑞", "卡罗拉", "汉兰达" ] },
    ],
    "L": [
      { "路虎": [ "发现" ] },
    ],
    "M": [
      { "MINI": [ "Mini", "coupe" ] },
    ],
    "R": [
      { "日产": [ "天籁", "骐达", "逍客" ] },
    ],
    "T": [
      { "特斯拉": [ "MODELS", "MODELX" ] },
    ],
    "W": [
      { "五菱": [ "宏光" ] },
    ],
    "X": [
      { "雪佛兰": [ "科鲁兹", "迈锐宝" ] },
    ],

  };

  // console.log(JSON.stringify(json, null, 2));
  console.log("/brandandseries ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
  response.json(json);
});

//接口，查询车辆
app.post("/cars", function (request, response) {

  //fomidable语法
  let form = new formidable.IncomingForm();
  form.parse(request, (error, fields) => {

    let { filters, pageinfo, sortinfo } = fields;

    console.log("filters = ", filters);
    console.log("pageinfo = ", pageinfo);
    console.log("sortinfo = ", sortinfo);
    //查询对象
    let chaxunduixiang = {};

    //根据前端发来的对象，拼一个查询体

    Object.keys(filters).forEach(key => {
      if ( filters[ key ].length !== 0 ) {
        switch ( key ) {
          case "type":
          case "color":
          case "environmental":
          case "gearbox":
          case "displacement":
          case "fuel":
            chaxunduixiang[ key ] = filters[ key ];
            break;
          case "price":
          case "km":
          case "buydate":
            chaxunduixiang[ key ] = { "$gte": filters[ key ][ 0 ], "$lte": filters[ key ][ 1 ] };
            break;
          case "brand":
          case "series":
            chaxunduixiang[ key ] = filters[ key ];
            break;
          case "licence":
          case "locality":
            chaxunduixiang[ key ] = filters[ key ] === "是";
            break;
          default:
        }
      }
    });

    console.log('chaxunduixiang = ', chaxunduixiang);
    console.log("/cars ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");

    let count   = getCount(chaxunduixiang).then(data => data);
    let results = getResult(chaxunduixiang, pageinfo, sortinfo).then(data => data);
    Promise.all([ count, results ]).then(values => {

      extracted({
        'count'  : values[ 0 ],
        'results': values[ 1 ],
      });

      response.json({
        'count'  : values[ 0 ],
        'results': values[ 1 ],
      });
    });
  });
});

//上传 shangchuan
app.post("/shangchuan", function (req, res) {
  var form            = new formidable.IncomingForm();
  //上传文件夹
  form.uploadDir      = path.resolve(__dirname, "./www/uploads");
  //保留拓展名
  form.keepExtensions = true;
  form.parse(req, function (err, content, files) {
    if ( !files ) {
      return;
    }
    //不需要写任何语句
    //图片上传之后会被随机改名，此时将改变的名字发给前端
    //因为files.tutu.path形如c:\sdfadsf\asdf\adsf\adsf
    //所以我们要用path.parse()来得到最重要的文件名部分
    // console.log(path.parse(files.files.path));
    // res.send(path.parse(files.files.path).name);
    // console.log(files.files);
    console.log('http://localhost:3000/uploads/' + path.parse(files.files.path).base);
    res.send('http://localhost:3000/uploads/' + path.parse(files.files.path).base);
  });
});

//上传 uploadcarimages
app.post("/uploadcarimages", function (req, res) {
  var form            = new formidable.IncomingForm();
  //上传文件夹
  form.uploadDir      = path.resolve(__dirname, "./www/uploads");
  //保留拓展名
  form.keepExtensions = true;
  form.parse(req, function (err, content, files) {
    if ( !files ) {
      return;
    }
    //不需要写任何语句
    //图片上传之后会被随机改名，此时将改变的名字发给前端
    //因为files.tutu.path形如c:\sdfadsf\asdf\adsf\adsf
    //所以我们要用path.parse()来得到最重要的文件名部分
    // console.log(path.parse(files.files.path));
    // res.send(path.parse(files.files.path).name);
    // console.log(files.files);
    console.log('http://localhost:3000/uploads/' + path.parse(files.files.path).base);
    res.send(path.parse(files.files.path).base);
  });
});

app.post("/uploadziliao", function (req, res) {
  var form            = new formidable.IncomingForm();
  //上传文件夹
  form.uploadDir      = path.resolve(__dirname, "./www/uploads");
  //保留拓展名
  form.keepExtensions = true;
  form.parse(req, function (err, content, files) {
    if ( !files ) {
      return;
    }
    //不需要写任何语句
    //图片上传之后会被随机改名，此时将改变的名字发给前端
    //因为files.tutu.path形如c:\sdfadsf\asdf\adsf\adsf
    //所以我们要用path.parse()来得到最重要的文件名部分
    console.log('http://localhost:3000/uploads/' + path.parse(files.files.path).base);
    res.send(path.parse(files.files.path).base);
  });
});

//添加车辆
app.post("/addcar", function (req, res) {

  var form = new formidable.IncomingForm();

  form.parse(req, function (err, { step1, step2, step3 }, files) {
    var brand         = step1.brandandseries.value[ 1 ];
    var series        = step1.brandandseries.value[ 2 ];
    var color         = step1.color.value;
    var type          = step1.type.value;
    var price         = Number(step1.price.value);
    var km            = Number(step1.km.value * 1000);
    var gearbox       = step1.gearbox.value;
    var displacement  = step1.displacement.value;
    var fuel          = step1.fuel.value;
    var buydate       = step1.buydate.value;
    var licence       = Boolean(step1.licence.value);
    var locality      = Boolean(step1.locality.value);
    var environmental = step1.environmental.value;
    var images        = step2;
    var files         = step3;

    function mkdirSyncExtend(filePath) {

      if ( filePath.charAt(filePath.length - 1) !== '/' ) {filePath += '/';}
      const regex = /\//simg;
      let m;
      while ( (m = regex.exec(filePath)) !== null ) {
        // This is necessary to avoid infinite loops with zero-width matches
        if ( m.index === regex.lastIndex ) {regex.lastIndex++;}
        let dir = filePath.substring(0, m.index);
        if ( dir.length !== 0 ) { if ( !fs.existsSync(dir) ) { fs.mkdirSync(dir); } }
      }
    }

    //决定ID
    Car.find({}).sort({ "id": -1 }).limit(1).exec((err, docs) => {
      var id = docs[ 0 ].id + 1;

      // //创建文件夹
      mkdirSyncExtend(path.resolve(__dirname, "./www/carimages/" + id));
      mkdirSyncExtend(path.resolve(__dirname, "./www/carimages_small/" + id));
      mkdirSyncExtend(path.resolve(__dirname, "./www/carimages/" + id + "/view"));
      mkdirSyncExtend(path.resolve(__dirname, "./www/carimages/" + id + "/inner"));
      mkdirSyncExtend(path.resolve(__dirname, "./www/carimages/" + id + "/engine"));
      mkdirSyncExtend(path.resolve(__dirname, "./www/carimages/" + id + "/more"));
      mkdirSyncExtend(path.resolve(__dirname, "./www/carimages_small/" + id + "/view"));
      mkdirSyncExtend(path.resolve(__dirname, "./www/carimages_small/" + id + "/inner"));
      mkdirSyncExtend(path.resolve(__dirname, "./www/carimages_small/" + id + "/engine"));
      mkdirSyncExtend(path.resolve(__dirname, "./www/carimages_small/" + id + "/more"));
      //移动文件
      function foo(album) {
        for ( let i = 0; i < images[ album ].length; i++ ) {
          let oldPath   = path.resolve(__dirname, "./www/uploads/" + images[ album ][ i ]);
          let newPath   = path.resolve(__dirname, "./www/carimages/" + id + "/" + album + "/" + images[ album ][ i ]);
          let smallpath = path.resolve(__dirname, "./www/carimages_small/" + id + "/" + album + "/" + images[ album ][ i ]);
          fs.renameSync(oldPath, newPath);
          //改变为小图 //哦和? 没变形 500x500 变成 100x100, 好像取最小值
          gm(newPath).resize(150, 100).write(smallpath, function () {});
        }
      }

      //移动文件
      foo("view");
      foo("inner");
      foo("engine");
      foo("more");

      var obj = { id, brand, series, color, type, price, km, gearbox, displacement, fuel, buydate, licence, locality, environmental, images, files };

      //最终目的就是创建汽车：
      Car.create(obj, function () {
        console.log("ok");
        res.send("ok");
      });
    });
  });
});

app.listen(3000, () => console.log("program running at http://localhost:3000/ press Ctrl+C to stop."));

function getCount(chaxunduixiang) {
  return new Promise((resolve, reject) => {
    Car.count(chaxunduixiang, (err, count) => {
      if ( err ) { reject(err); } else { resolve(count); }
    });
  });
}

function getResult(chaxunduixiang, pageinfo, sortinfo) {
  return new Promise((resolve, reject) => {
    Car.find(chaxunduixiang).skip(pageinfo.pagesize * (pageinfo.page - 1)).limit(pageinfo.pagesize).sort({ [sortinfo.sortby]: sortinfo.sortdirection }).exec((err, docs) => {
      if ( err ) { reject(err); } else { resolve(docs); }
    });
  });
}

// 测试方法 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

function extracted(obj) {

  let path    = './result.json';
  let content = JSON.stringify(obj, null, 2);
  fs.writeFile(path, content, function (err) {
    if ( err ) { return console.error(err); }
    console.log('一共' + obj.count + '个数据');
  });
}