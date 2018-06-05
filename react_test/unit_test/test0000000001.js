var fs       = require("fs");
let path     = require('path');
let Car      = require("../models/Car.js");
let mongoose = require("mongoose");
var gm       = require("gm");
mongoose.connect("mongodb://localhost/ershouche");

let json = (function () {
  return `{
  "step1": {
    "brandandseries": {
      "value": [
        "A",
        "奥迪",
        "A6L"
      ]
    },
    "color": {
      "value": "红"
    },
    "type": {
      "value": "高档轿车"
    },
    "price": {
      "value": "11"
    },
    "km": {
      "value": "111"
    },
    "gearbox": {
      "value": "自动挡"
    },
    "displacement": {
      "value": "1.0L"
    },
    "fuel": {
      "value": "纯电动"
    },
    "buydate": {
      "value": 1420041600000
    },
    "licence": {
      "value": 1
    },
    "locality": {
      "value": 1
    },
    "environmental": {
      "value": "国一"
    }
  },
  "step2": {
    "view": [
      "upload_90d8f07c8bd59bb94908fd95c002c7f8.jpg",
      "upload_eb7c7a580f3b3510182852f25a2a80fb.jpg",
      "upload_e5e9890adab830e3f090bcbb29c969ae.jpg"
    ],
    "inner": [
      "upload_391c16e662f8d7110fbfbf727d1f87c2.jpg",
      "upload_fc2ba7948be81226abea9f54bc09335d.jpg",
      "upload_093ac2a2769c293e868dd787e1d4a7ca.jpg"
    ],
    "engine": [
      "upload_35be3cccd7d7ff2294bed5009079cf81.jpg",
      "upload_0083244ac3d25752c0ccf24a867d1aeb.jpg",
      "upload_3f4bb690a2e245e8a430fa211103a505.jpg"
    ],
    "more": [
      "upload_3a49a76ec807497afffe25808b3d4cdc.jpg",
      "upload_a57bcc7a6226aaf034e4ade02702feba.jpg",
      "upload_39c6a335a57663bfbe13846ffd954b95.jpg"
    ]
  },
  "step3": {
    "files": [
      {
        "filename": "aa.doc#upload_9829a0f375a5cd9bb5b96a57bd711bb7.doc",
        "realpath": "upload_9829a0f375a5cd9bb5b96a57bd711bb7.doc",
        "type": "doc"
      },
      {
        "filename": "abc006.jpg#upload_3a9b1084a0f78033e65a794b3f888e79.jpg",
        "realpath": "upload_3a9b1084a0f78033e65a794b3f888e79.jpg",
        "type": "jpg"
      },
      {
        "filename": "aa.zip#upload_34e28e0a770104ca0838ba9e1e2e3ffd.zip",
        "realpath": "upload_34e28e0a770104ca0838ba9e1e2e3ffd.zip",
        "type": "zip"
      }
    ]
  }
}`;
})();

// console.log(JSON.parse(json));

let fields = JSON.parse(json);

let { step1, step2, step3 } = fields;

var brand         = step1.brandandseries.value[ 1 ];
var series        = step1.brandandseries.value[ 2 ];
var color         = step1.color.value;
var type          = step1.type.value;
var price         = Number(step1.price.value);
var km            = Number(step1.km.value);
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
mkdirSyncExtend(path.resolve(__dirname, "./www/carimages/"));

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

  var obj = {
    id,
    brand,
    series,
    color,
    type,
    price,
    km,
    gearbox,
    displacement,
    fuel,
    buydate,
    licence,
    locality,
    environmental,
    images,
    files,
  };

  //最终目的就是创建汽车：
  Car.create(obj, function (a, b, c) {
    console.log(a, b, c);
    mongoose.disconnect();
  });
});




