console.log('hello world');
let obj = {
  "A": [
    {
      "奥迪": [
        "A4",
        "A5",
        "Q5",
        "Q7",
        "Q9",
        "TT",
      ],
    },
    {
      "阿斯顿马丁": [
        "DB9",
        "V8",
        "Rapide",
        "Virage",
        "DBS",
      ],
    },
  ],
  "B": [
    {
      "本田": [
        "雅阁",
        "思域",
        "CR-V",
        "奥德赛",
        "飞度",
        "锋范",
        "凌派",
      ],
    },
  ],
  "D": [
    {
      "东风": [
        "雪铁龙",
        "东风1号",
      ],
    },
  ],
};

function getArray(result) {

  if ( Object.prototype.toString.call(result) === '[object Object]' ) {
    let item = result;
    return Object.keys(item).map(key => {
      return { value: key, label: key, children: getArray(item[ key ]) };
    });
  }
  if ( result instanceof Array ) {
    if ( Object.prototype.toString.call(result[ 0 ]) === '[object Object]' ) {
      return result.map((item) => {
        return { value: Object.keys(item)[ 0 ], label: Object.keys(item)[ 0 ], children: getArray(item[ Object.keys(item)[ 0 ] ]) };
      });
    } else {
      return result.map(item => {
        return { value: item, label: item };
      });
    }
  }
}

function getArray2() {

}

// console.log(JSON.stringify(getArray(obj), null, 2));
getArray2(Object.keys(obj).map(key => obj[ key ]));