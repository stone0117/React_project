const fs   = require('fs');
const url  = require('url');
const http = require('http');

let downloadFile = function (fileURL, filePath, fileName) {

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

    let file = fs.createWriteStream(filePath + '/' + fileName);

    http.get(options, function (response) {
      response.on('data', function (data) {
        file.write(data);
        console.log(data.toString());
      }).on('end', function () {
        console.log(fileName + ' 下载完毕, 数据写入成功');
      });
    });
  }
};

downloadFile('http://echarts.baidu.com/dist/echarts.common.min.js', 'js/aaa/bbb/ccc', 'echarts.common.min.js');