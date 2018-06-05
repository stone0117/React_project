const arguments    = process.argv.splice(2);
const path         = process.argv.splice(1);
const node         = process.argv.splice(0);
const fs           = require("fs");
const childProcess = require('child_process');
const { exec }     = require('child_process');
const { execSync } = require('child_process');
const url          = require('url');
const http         = require('http');

let isWindows = null;

try {
  execSync('dir');
  console.log("It's a windows system");
  isWindows = true;
} catch (ex) {
  console.log('Not windows system');
  isWindows = false;
}

let www               = "www";
let entry             = `./${www}/app/main.js`;
let mongodb_load_data = "mongodb_load_data";
let unit_test         = "unit_test";
let app               = `${www}/app`;
let actions           = `${app}/actions`;
let components        = `${app}/components`;
let constants         = `${app}/constants`;
let containers        = `${app}/containers`;
let reducers          = `${app}/reducers`;
let sagas             = `${app}/sagas`;
let models            = `${app}/models`;
let utils             = `${app}/models/utils`;
let views             = 'views';
let publicPath        = '/assets/';
let json_server       = "json_server";

function sn_exec(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        if (stderr) { console.log(stderr); }
        if (stdout) { console.log(stdout); }
        resolve({ stderr, stdout });
      }
    });
  });
}

function sn_mkfile_force(content, filepath) {

  return new Promise((resolve, reject) => {

    if (fs.existsSync(filepath)) {
      if (isWindows) {execSync('del /f/s/q ' + filepath);} else {execSync('rm -rf ' + filepath);}
    }
    fs.writeFile(filepath, content, function (error) {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log("force data write success - " + filepath);
        resolve();
      }
    });
  });
}

async function main() {
  let content     = '';
  let projectName = '';

  if (isWindows) {
    let pathArr = path[ 0 ].split("\\");
    projectName = pathArr[ pathArr.length - 2 ]; //获取文件文件夹名=项目名
  } else {
    let pathArr = path[ 0 ].split("/");
    projectName = pathArr[ pathArr.length - 2 ]; //获取文件文件夹名=项目名
  }

  await sn_exec('npm init -y');
  await sn_exec('npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist install --save shelljs');
  /**
   * ###### package.json ######
   */
  content = (function () {
    return `{
  "private": true,
  "name": "${projectName}",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "js": "json-server --watch json_server/db.json --static ./www/ --snapshots ./json_server/ --port 3000",
    "exp": "webpack --mode development",
    "dev": "webpack-dev-server --content-base ./www --port 8080 --mode development",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-polyfill": "^6.26.0",
    "classnames": "^2.2.5",
    "dva": "^2.2.3",
    "ejs": "^2.5.9",
    "es6-promise": "^4.2.4",
    "express": "^4.16.3",
    "formidable": "^1.2.1",
    "immutable": "^3.8.2",
    "jquery": "^2.2.4",
    "lodash": "^4.17.10",
    "mockjs": "^1.0.1-beta3",
    "mongodb": "^3.0.7",
    "mongoose": "^5.0.17",
    "ramda": "^0.25.0",
    "react": "^16.3.2",
    "react-dom": "^16.3.2",
    "redux-logger": "^3.0.6",
    "shelljs": "^0.8.1"
  },
  "devDependencies": {
    "@types/express": "^4.11.1",
    "@types/mongoose": "^5.0.11",
    "@types/react": "^16.3.13",
    "@types/react-dom": "^16.0.5",
    "ajv": "^6.4.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.11",
    "less": "^3.0.2",
    "less-loader": "^4.1.0",
    "prop-types": "^15.6.1",
    "style-loader": "^0.21.0"
  },
  "description": ""
}
`;
  })();
  await sn_mkfile_force(content, 'package.json');
  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  /**
   * ###### webpack.config.js ######
   */
  content = (function () {
    return `// 内置path模块：获取到绝对路径
var path       = require('path');
// 暴露一个对象
module.exports = {
  // 设置入口文件
  entry  : '${entry}',
  // 设置打包文件的文件夹、文件的名字
  output : {
    // 设置你的打包的文件的文件夹的名字
    // path    : path.resolve(__dirname, 'dist'),
    path      : path.resolve(__dirname, '${www}/dist'),
    // 设置你的打包的文件的名字
    filename  : 'bundle.js',
    publicPath: '${publicPath}',
  },
  // 当你的js文件发生变化的时候，你在重新的保存的时候，会自动的再一次的打包
  watch  : false,
  // 其他模块的设置:翻译器（babel-loader）
  module : {
    // 其他模块的规则
    rules: [
      {
        // 翻译的文件的尾缀什么(.jsx)
        test   : /\\.jsx?$/,
        include: [ path.resolve(__dirname, '${app}') ],
        exclude: [ path.resolve(__dirname, './node_modules') ],
        // 翻译器的设置
        loader : 'babel-loader',
        // 其他的选项的设置：设置的预设值、插件
        options: {
          // es2015 翻译为ES5的语句, react翻译react的jsx语句
          // env : ecmascript new version
          presets: [ 'env', 'react' ],
          // 插件
          plugins: [ 'transform-object-rest-spread', 'transform-runtime' ],
        },
      },
      {
        test   : /\\.less$/,
        include: [ path.resolve(__dirname, '${app}') ],
        exclude: [ path.resolve(__dirname, './node_modules') ],
        use    : [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  devtool: "cheap-module-source-map",
};`;
  })();

  await sn_mkfile_force(content, './webpack.config.js');
  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  foo();
}

main();

function foo() {

  const shell     = require('shelljs');
  const { exec }  = require('shelljs');
  const { echo }  = require('shelljs');
  const { which } = require('shelljs');
  const { sed }   = require('shelljs');
  const { cat }   = require('shelljs');

  let npm = 'npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist';

  function downloadFile(fileURL, filePath, fileName) {

    filePathHandle:{
      if (filePath.charAt(filePath.length - 1) !== '/') {filePath += '/';}

      const regex = /\//simg;
      let m;
      while ((m = regex.exec(filePath)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {regex.lastIndex++;}
        let dir = filePath.substring(0, m.index);
        if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }
      }
    }

    download:{
      if (!fs.existsSync(filePath)) { fs.mkdirSync(filePath); }

      let options = { host: url.parse(fileURL).host, port: 80, path: url.parse(fileURL).pathname };

      let file = fs.createWriteStream(filePath + fileName);

      http.get(options, function (response) {
        response.on('data', function (data) {
          file.write(data);
        }).on('end', function () {
          console.log(fileName + ' 下载完毕, 数据写入成功');
        });
      });
    }
  }

  function cnpm(cmd) {
    exec(npm + " " + cmd);
  }

  function sn_mkdir(path) { if (!fs.existsSync(path)) { fs.mkdirSync(path); } }

  function sn_mkfile(content, filepath) {
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, content);
      console.log("data write success - " + filepath);
    }
  }

  function folders() {
    sn_mkdir(`${www}`);
    sn_mkdir(`${www}/css`);
    sn_mkdir(`${www}/img`);
    sn_mkdir(`${www}/js`);

    downloadFile('http://echarts.baidu.com/dist/echarts.common.min.js', `${www}/js`, 'echarts.common.min.js');
    downloadFile('http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js', `${www}/js`, 'jquery.min.js');

    // json
    sn_mkdir(json_server);
    sn_mkdir(json_server + '/public');

    sn_mkdir(mongodb_load_data);
    sn_mkdir(unit_test);
    sn_mkdir(views);

    // react
    sn_mkdir(app);
    sn_mkdir(components);

    // redux
    sn_mkdir(containers);

    // models
    sn_mkdir(models);
    sn_mkdir(utils);

  }

  function files() {
    let content = '';

    /**
     * ###### json-server ######
     */
    content = (function () {
      return `{
  "result": {
    "desc": "OK",
    "status": 1000,
    "data": {
      "wendu": "22",
      "ganmao": "风较大，较易发生感冒，注意防护。",
      "forecast": [
        {
          "fengxiang": "北风",
          "fengli": "5-6级",
          "high": "高温 24℃",
          "type": "晴",
          "low": "低温 11℃",
          "date": "3日星期六"
        },
        {
          "fengxiang": "北风",
          "fengli": "4-5级",
          "high": "高温 19℃",
          "type": "晴",
          "low": "低温 8℃",
          "date": "4日星期日"
        },
        {
          "fengxiang": "无持续风向",
          "fengli": "微风",
          "high": "高温 21℃",
          "type": "晴",
          "low": "低温 9℃",
          "date": "5日星期一"
        },
        {
          "fengxiang": "无持续风向",
          "fengli": "微风",
          "high": "高温 21℃",
          "type": "多云",
          "low": "低温 10℃",
          "date": "6日星期二"
        },
        {
          "fengxiang": "无持续风向",
          "fengli": "微风",
          "high": "高温 24℃",
          "type": "晴",
          "low": "低温 12℃",
          "date": "7日星期三"
        },
        {
          "fengxiang": "无持续风向",
          "fengli": "微风",
          "high": "高温 23℃",
          "type": "晴",
          "low": "低温 11℃",
          "date": "8日星期四"
        }
      ],
      "yesterday": {
        "fl": "微风",
        "fx": "无持续风向",
        "high": "高温 23℃",
        "type": "晴",
        "low": "低温 12℃",
        "date": "2日星期五"
      },
      "aqi": "59",
      "city": "北京"
    }
  }
}`;
    })();
    sn_mkfile(content, json_server + '/db.json');
    content = (function () {
      return `https://www.npmjs.com/package/json-server
全局安装 json-server
npm install -g json-server

## 根路径
json-server --watch ${json_server}/db.json --static ./www/ --snapshots ./${json_server}/ --port 3000

## 测试路径
cd ${json_server}
json-server --watch db.json --static ./public/ --port 3000`;
    })();
    sn_mkfile(content, json_server + '/README.md');
    content = (function () {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <h1>hello world</h1>
  <a href="/result">result</a>
</body>
</html>
`;
    })();
    sn_mkfile(content, json_server + '/public/index.html');
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * ###### mockinit.js ######
     * ###### app.js ######
     * ###### index.html ######
     * ###### index.ejs ######
     * ###### .babelrc ######
     */
    content = (function () {
      return `const Mock   = require('mockjs');
const Random = Mock.Random;
const fs     = require("fs");

const { exec }     = require('child_process');

Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

var data = Mock.mock({
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
        'unknown'
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
            'unknown'
          ]
        }
      ]
    }
  ]
});
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
//   'regexp': /^((https|http):\\/\\/)[^\\s]{20,}/
// }).regexp);

// 导入文件命令
// mongodb 导入数据命令
// mongoimport --db cardb --collection cars --file /Users/stone/cardata.json --drop
// --db cardb  想往哪个数据库里面导入
// --collection student  想往哪个集合中导入
// --drop 把集合清空
// --file primer-dataset.json  哪个文件

// mongoimport -d xsgl -c cars 路径 --drop
// mongoimport -d xsgl -c cars C:\\Users\\Administrator\\Desktop\\monishuju.json --drop

let content = \`// mongo --nodb ${mongodb_load_data}/insert.js // 非交互模式下
// load("${mongodb_load_data}/insert.js") // 交互模式下

conn = new Mongo("localhost:27017");

db = conn.getDB("studb");

db.students.drop();\`;

for (var i = 0; i < data.list.length; ++i) {

  let obj = data.list[i];

  content += \`\\ndb.students.insert({
  "id"      : "\${obj.id}",
  "name"    : "\${obj.name}",
  "age"     : \${obj.age},
  "sex"     : "\${obj.sex}",
  "friends" : \${JSON.stringify(obj.friends)}
})\\n\`;

}

fs.writeFile('${mongodb_load_data}/insert.js', content, { flag: 'w' }, function (err) {
  if (err) {
    return console.error(err);
  }
  exec('echo data write success - ${mongodb_load_data}/insert.js');
  exec('mongo --nodb ${mongodb_load_data}/insert.js');
});`;
    })();
    sn_mkfile(content, 'mockinit.js');
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    content = (function () {
      return `const express     = require("express");
const fs          = require("fs");
const url         = require("url");
const formidable  = require("formidable");
const path        = require("path");
const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');
const mongodbURL  = 'mongodb://localhost:27017';
const dbName      = 'studb';
const app         = express();

//app.use('/static', express.static('www'));
app.use(express.static('www'));

// app.set('views', 'templates'); //更换默认路径名
app.set('view engine', 'ejs');

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
  result[q] += 10;

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

  var form = new formidable.IncomingForm();
  form.parse(request, function (error, fields, files) {
    console.log(fields);
    response.send({ "money": "3000" });
  });
});

app.listen(3000, () => console.log("program running at http://localhost:3000/ press Ctrl+C to stop."));`;
    })();
    sn_mkfile(content, './app.js');
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    content = (function () {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <style>
    .main {
      width  : 600px;
      height : 400px;
      border : 1px dashed black;
    }

    button {
      height : 22px;
    }
  </style>
</head>
<body>
  <h1>hello node</h1>
  <p><a href="/hello">ejs test</a></p>
  <p><a href="/mock">mock test</a></p>
  <hr/>
  <hr/>
  <hr/>
  <div id="root"></div>
</body>
</html>
<script src="js/jquery.min.js" type="text/javascript"></script>
<script src="js/echarts.common.min.js" type="text/javascript"></script>
<script src="dist/bundle.js" type="text/javascript"></script>`;
    })();
    sn_mkfile(content, `${www}/index.html`);
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    content = (function () {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>hello <%= username %></h1>
    <ul>
        <% for (var i = 0; i < list.length; ++i) { %>
        <li><%= list[i] %></li>
        <% } %>
    </ul>
</body>
</html>
<script type="text/javascript">
</script>`;
    })();
    sn_mkfile(content, `${views}/index.ejs`);
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    content = (function () {
      return `{
  "presets": ["env"],
  "plugins": ["transform-object-rest-spread","transform-runtime"]
}`;
    })();
    sn_mkfile(content, './.babelrc');
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * ###### unit_test ######
     */
    content = (function () {
      return `{
  "presets": ["env"],
  "plugins": ["transform-object-rest-spread","transform-runtime"]
}`;
    })();
    sn_mkfile(content, `./${unit_test}/.babelrc`);

    content = (function () {
      return `exports.filename = "test001.js";`;
    })();
    sn_mkfile(content, `./${unit_test}/convert.js`);

    content = (function () {
      return `console.log('hello world')`;
    })();
    sn_mkfile(content, `./${unit_test}/test001.js`);

    content = (function () {
      return "const fs   = require('fs');\nconst url  = require('url');\nconst http = require('http');\n\nlet downloadFile = function (fileURL, filePath, fileName) {\n\n  filePathHandle:{\n    if (filePath.charAt(filePath.length - 1) !== '/') {filePath += '/';}\n\n    const regex = /\\//simg;\n    let m;\n    while ((m = regex.exec(filePath)) !== null) {\n      // This is necessary to avoid infinite loops with zero-width matches\n      if (m.index === regex.lastIndex) {regex.lastIndex++;}\n      let dir = filePath.substring(0, m.index);\n      if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }\n    }\n  }\n\n  download:{\n    if (!fs.existsSync(filePath)) { fs.mkdirSync(filePath); }\n\n    let options = { host: url.parse(fileURL).host, port: 80, path: url.parse(fileURL).pathname };\n\n    let file = fs.createWriteStream(filePath + '/' + fileName);\n\n    http.get(options, function (response) {\n      response.on('data', function (data) {\n        file.write(data);\n        console.log(data.toString());\n      }).on('end', function () {\n        console.log(fileName + ' 下载完毕, 数据写入成功');\n      });\n    });\n  }\n};\n\ndownloadFile('http://echarts.baidu.com/dist/echarts.common.min.js', 'js/aaa/bbb/ccc', 'echarts.common.min.js');";
    })();
    sn_mkfile(content, `./${unit_test}/test002_download.js`);

    content = (function () {
      return `require('es6-promise').polyfill();
require('isomorphic-fetch');

async function main() {
  return await fetch('http://localhost:3000/result').then(data => {
    return data.json();
  }).catch(err => {
    return { 'ERROR': err };
  });
}
main().then(data => {
  console.log(data);
});`;
    })();
    sn_mkfile(content, `./${unit_test}/test003_fetch.js`);

    content = (function () {
      return `console.log('hello world');`;
    })();
    sn_mkfile(content, `./${unit_test}/test004_immutable.js`);

    content = (function () {
      return `console.log('hello world');`;
    })();
    sn_mkfile(content, `./${unit_test}/test005_ramda.js`);

    content = (function () {
      return `console.log('hello world');

let _ = require('lodash');

export const foo = ()=>console.log();

console.log(_);`;
    })();
    sn_mkfile(content, `./${unit_test}/test006_lodash.js`);

    content = (function () {
      return `console.log('hello world');`;
    })();
    sn_mkfile(content, `./${unit_test}/test007_less.js`);

    content = (function () {
      return "let convert    = require(\"./convert\");\nlet entry      = convert.filename;\nlet path       = require('path');\nmodule.exports = {\n  entry  : `./${entry}`,\n  output : {\n    path      : path.resolve(__dirname),\n    filename  : 'bundle.js',\n    publicPath: '/assets/',\n  },\n  watch  : false,\n  module : {\n    rules: [\n      {\n        test   : /.jsx?$/,\n        include: [ path.resolve(__dirname) ],\n        loader : 'babel-loader',\n        options: {\n          presets: [ 'env', 'react' ],\n          plugins: [ 'transform-object-rest-spread', 'transform-runtime' ],\n        },\n      },\n      {\n        test   : /\\.less$/,\n        include: [ path.resolve(__dirname) ],\n        use    : [\n          { loader: \"style-loader\" },\n          { loader: \"css-loader\" },\n          { loader: \"less-loader\" },\n        ],\n      },\n    ],\n  },\n  devtool: \"cheap-module-source-map\",\n};";
    })();
    sn_mkfile(content, `./${unit_test}/webpack.config.js`);

    content = (function () {
      return `const childProcess = require('child_process');
const { exec }     = require('child_process');
const { execSync } = require('child_process');

execSync('webpack --mode development');`;
    })();
    sn_mkfile(content, `./${unit_test}/wp.js`);

    content = (function () {
      return `#!/usr/bin/env bash

#webpack $filename -o bundle.js --mode development --devtool cheap-module-source-map --module-bind babel-loader --plugin transform-object-rest-spread --display env
webpack --mode development`;
    })();
    sn_mkfile(content, `./${unit_test}/wp.sh`);

    content = (function () {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>

</body>
</html>

<script src="bundle.js" type="text/javascript"></script>
<script type="text/javascript">

</script>`;
    })();
    sn_mkfile(content, `./${unit_test}/index.html`);
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * ###### main.js ######
     */
    content = (function () {
      return `import React from 'react';
import dva from 'dva';
import App from './containers/App';
import counter from './models/counter';
import logger from 'redux-logger';

// 类似express, 用dva()产生一个app对象
const app = dva({
  onAction: logger,
});

//路由对象,
const router = () => {
  return (
    <App/>
  );
};

// 装饰模式, 装饰app对象, 给app上路由
app.router(router);

// 装饰模式, 装饰app对象, 给app上模型
app.model(counter);

// 挂载
app.start('#root');`;
    })();
    sn_mkfile(content, entry);
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * ###### actions ######
     */
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * ###### components ######
     */
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * ###### constants ######
     */
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * ###### containers ######
     */
    content = (function () {
      //noinspection UnterminatedStatementJS
      return `import React, {Component} from 'react';
import {connect} from 'dva';
import './App.less';

class App extends Component {

  constructor() {
    super();
  }

  render() {
    let { v, dispatch } = this.props;
    return (
      <div>
        <h1>{v}</h1>
        <button onClick={event=> { dispatch({ 'type': 'counter/plus', 'n': 2 }); }}>click plus +</button>
        {" "}
        <button onClick={event=> { dispatch({ 'type': 'counter/minus', 'n': 2 }); }}>click minus -</button>
        {" "}
        <button onClick={event=> { dispatch({ 'type': 'counter/server_plusA' }); }}>with server plusA</button>
        {" "}
        <button onClick={event=> { dispatch({ 'type': 'counter/server_plusB' }); }}>with server plusB</button>
        {" "}
        <button onClick={event=> { dispatch({ 'type': 'counter/server_plusAB' }); }}>with server plusAB</button>
        <br/>
        <button onClick={event=> { dispatch({ 'type': 'counter/plus_odd' }); }}>odd plus</button>
      </div>
    );
  }
}
export default connect(({ counter }) => ({ v: counter.v, }))(App);`;
    })();
    sn_mkfile(content, `${containers}/App.js`);

    content = (function () {
      return `h1{
  color : #FFA500;
  font-family :"Helvetica Neue", Helvetica, Microsoft Yahei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif; /*最前面 bold italic*/;
}`;
    })();
    sn_mkfile(content, `${containers}/App.less`);
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * ###### models and models/utils ######
     */
    content = (function () {
      return `import {
  util_fetch_server_result,
  util_fetch_server_result_A,
  util_server_plusA,
  util_server_plusB,
} from './utils/counterUtils';

export default {
  namespace: 'counter',
  state    : {
    'v': 100,
  },
  reducers : {
    plus(state, action){
      return {
        ...state,
        'v': state.v + (action.n || 1),
      };
    },
    minus(state, action){
      return {
        ...state,
        'v': state.v - (action.n || 1),
      };
    },
    // plus_odd(state, action){
    //   return {
    //     ...state,
    //     'v': state.v + (action.n || 0),
    //   };
    // },
  },
  effects  : {
    *plus_odd(action, { put, call, fork, select }){

      // let { v } = yield select(state => state.counter);
      let { v } = yield select(({ counter }) => counter);

      if (v & 1) { yield put({ 'type': 'plus' });}
    },
    *server_plusA(action, { put, call, fork }){
      yield fork(util_server_plusA, put);
    },
    *server_plusB(action, { put, call, fork }){
      yield fork(util_server_plusB, put);
    },
    *server_plusAB(action, { put, call, fork }){
      yield fork(util_server_plusA, put);
      yield fork(util_server_plusB, put);
    },
  },
  // effects  : {
  //   *server_plusA(action, { put, call }){
  //     yield call(util_fetch_server_result_A,put);
  //   },
  //   *server_plusB(action, { put, call }){
  //     let { a, b, c, d } = yield call(util_fetch_server_result);
  //     yield put({ 'type': 'plus', 'n': b });
  //   },
  //   *server_plusAB(action, { put, call }){
  //     let { a, b, c, d } = yield call(util_fetch_server_result);
  //     yield put({ 'type': 'plus', 'n': a });
  //     yield put({ 'type': 'plus', 'n': b });
  //   },
  // },
};`;
    })();
    sn_mkfile(content, `${models}/counter.js`);

    content = (function () {
      return `import $ from 'jquery';

function asyncFunc(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type       : "GET",
      url        : url,
      dataType   : "jsonp",
      traditional: true, //true表示不深度遍历,使用传统的传智方式, 默认false适配python ruby
      success    : function (result) {
        resolve(result);
      },
      error      : function (XMLHttpRequest, textStatus, errorThrown) {
        // alert(XMLHttpRequest.status);
        // alert(XMLHttpRequest.readyState);
        // alert(textStatus);
        reject({ XMLHttpRequest, textStatus, errorThrown });
      },
    });
  });
}

export const util_fetch_server_result   = function*() {
  // let { a, b, c, d } = yield fetch('http://localhost:3000/result').then(data => data.json());
  let { a, b, c, d } = yield asyncFunc('http://localhost:3000/result').then(data => data);
  return { a, b, c, d };
};
export const util_fetch_server_result_A = function*(put) {
  // let { a, b, c, d } = yield fetch('http://localhost:3000/result').then(data => data.json());
  let { a, b, c, d } = yield asyncFunc('http://localhost:3000/result').then(data => data);
  yield put({ 'type': 'plus', 'n': a });
};
export const util_server_plusA          = function*(put) {
  // let { a, b, c, d } = yield fetch('http://localhost:3000/result').then(data => data.json());
  let { a, b, c, d } = yield asyncFunc('http://localhost:3000/result').then(data => data);
  yield put({ 'type': 'plus', 'n': a });
};
export const util_server_plusB          = function*(put) {
  // let { a, b, c, d } = yield fetch('http://localhost:3000/result').then(data => data.json());
  let { a, b, c, d } = yield asyncFunc('http://localhost:3000/result').then(data => data);
  yield put({ 'type': 'plus', 'n': b });
};`;
    })();
    sn_mkfile(content, `${utils}/counterUtils.js`);
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * ###### reducers ######
     */
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * ###### sagas ######
     */
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  }

  function commands() {

    cnpm('install');
  }

  function next_function() {

    /**
     * ###### node服务器 ######
     */
    // console.log("program running at http://localhost:3000/ press Ctrl+C to stop.");
    // exec('node ./app.js');

    /**
     * ###### mockinit ######
     */
    // exec('node ./mockinit.js');
    exec('node mockinit.js', function (code, stdout, stderr) { console.log("insert.js 生成成功"); });

    /**
     * ###### webpack watch ######
     */
    exec('webpack --mode development', function (code, stdout, stderr) {
      // console.log('Exit code:', code);
      // console.log('Program output:', stdout);
      // console.log('Program stderr:', stderr);
      sed('-i', /watch\s*:\s*.*,/, "watch  : true,", 'webpack.config.js');

      console.log("watch : true 修改成功！");

      console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n");
      console.log('1. webpack 4.0以上版本使用以下命令开启打包');
      console.log();
      console.log('模式1:本地生成文件');
      console.log('webpack --mode development');
      console.log('或者');
      console.log('npm run exp');
      console.log();
      console.log('模式2:服务器请求文件');
      console.log('webpack-dev-server --content-base ./www --port 8080 --mode development');
      console.log('或者');
      console.log('npm run dev');
      console.log();
      console.log('如果安装了 json-server 可以使用以下命令来开启服务');
      console.log(`json-server --watch ./${json_server}/db.json --static ./${json_server}/public`);
      console.log();
      console.log('2. node ./app.js 开启本地服务器');
      console.log("\n■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
    });
  }

  folders();
  files();
  console.log();
  console.log('begin install ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■');
  console.log();
  commands();
  console.log();
  console.log('end install ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■');
  console.log();

  next_function();
}
