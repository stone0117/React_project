// mongo --nodb mongodb_load_data/insert.js // 非交互模式下
// load("mongodb_load_data/insert.js") // 交互模式下

conn = new Mongo("localhost:27017");

db = conn.getDB("studb");

db.students.drop();
db.students.insert({
  "id"      : "1",
  "name"    : "汤杰",
  "age"     : 33,
  "sex"     : "unknown",
  "friends" : [{"age":25,"sex":"woman","fname":"Susan Thomas"},{"age":27,"sex":"woman","fname":"Lisa Williams"},{"age":33,"sex":"unknown","fname":"Ronald Hall"},{"age":23,"sex":"man","fname":"Nancy White"}]
})

db.students.insert({
  "id"      : "2",
  "name"    : "黎军",
  "age"     : 23,
  "sex"     : "woman",
  "friends" : [{"age":35,"sex":"woman","fname":"Margaret Lewis"},{"age":25,"sex":"woman","fname":"Maria Hall"}]
})

db.students.insert({
  "id"      : "3",
  "name"    : "宋超",
  "age"     : 19,
  "sex"     : "woman",
  "friends" : [{"age":22,"sex":"man","fname":"Jeffrey Williams"},{"age":25,"sex":"woman","fname":"William Rodriguez"},{"age":29,"sex":"unknown","fname":"Susan Brown"},{"age":32,"sex":"woman","fname":"Michelle Martinez"}]
})

db.students.insert({
  "id"      : "4",
  "name"    : "戴刚",
  "age"     : 33,
  "sex"     : "woman",
  "friends" : [{"age":34,"sex":"woman","fname":"Karen Anderson"},{"age":20,"sex":"man","fname":"Frank Moore"},{"age":30,"sex":"woman","fname":"Margaret Smith"},{"age":23,"sex":"unknown","fname":"Paul Jones"},{"age":25,"sex":"unknown","fname":"Sharon Allen"}]
})

db.students.insert({
  "id"      : "5",
  "name"    : "戴涛",
  "age"     : 32,
  "sex"     : "woman",
  "friends" : [{"age":20,"sex":"unknown","fname":"Maria Allen"}]
})

db.students.insert({
  "id"      : "6",
  "name"    : "吴娟",
  "age"     : 29,
  "sex"     : "man",
  "friends" : [{"age":22,"sex":"woman","fname":"Anna Williams"},{"age":18,"sex":"unknown","fname":"Cynthia Jackson"},{"age":27,"sex":"woman","fname":"Maria Moore"},{"age":21,"sex":"woman","fname":"Gary Jackson"},{"age":34,"sex":"woman","fname":"Edward Young"}]
})

db.students.insert({
  "id"      : "7",
  "name"    : "邵芳",
  "age"     : 27,
  "sex"     : "unknown",
  "friends" : [{"age":19,"sex":"woman","fname":"Scott Thompson"},{"age":27,"sex":"woman","fname":"Melissa Robinson"},{"age":18,"sex":"man","fname":"Kenneth Clark"},{"age":20,"sex":"unknown","fname":"Sarah Walker"}]
})

db.students.insert({
  "id"      : "8",
  "name"    : "秦桂英",
  "age"     : 21,
  "sex"     : "woman",
  "friends" : [{"age":25,"sex":"woman","fname":"David Martin"},{"age":31,"sex":"man","fname":"Jennifer White"}]
})

db.students.insert({
  "id"      : "9",
  "name"    : "吕秀英",
  "age"     : 27,
  "sex"     : "man",
  "friends" : [{"age":32,"sex":"man","fname":"Ronald Thomas"},{"age":30,"sex":"unknown","fname":"Donald Gonzalez"},{"age":20,"sex":"woman","fname":"Frank Martinez"}]
})

db.students.insert({
  "id"      : "10",
  "name"    : "孔勇",
  "age"     : 30,
  "sex"     : "woman",
  "friends" : [{"age":31,"sex":"man","fname":"Michael Brown"},{"age":30,"sex":"unknown","fname":"Jose Martin"}]
})

db.students.insert({
  "id"      : "11",
  "name"    : "汪强",
  "age"     : 27,
  "sex"     : "woman",
  "friends" : [{"age":26,"sex":"man","fname":"Carol Hernandez"},{"age":33,"sex":"unknown","fname":"Kenneth Davis"},{"age":20,"sex":"woman","fname":"Nancy Williams"}]
})

db.students.insert({
  "id"      : "12",
  "name"    : "钱洋",
  "age"     : 19,
  "sex"     : "man",
  "friends" : [{"age":35,"sex":"unknown","fname":"George Johnson"},{"age":34,"sex":"man","fname":"Paul Johnson"},{"age":18,"sex":"woman","fname":"Matthew Thompson"}]
})

db.students.insert({
  "id"      : "13",
  "name"    : "薛洋",
  "age"     : 24,
  "sex"     : "unknown",
  "friends" : [{"age":29,"sex":"woman","fname":"Edward Thomas"},{"age":30,"sex":"unknown","fname":"James Rodriguez"}]
})

db.students.insert({
  "id"      : "14",
  "name"    : "魏娜",
  "age"     : 27,
  "sex"     : "unknown",
  "friends" : [{"age":29,"sex":"unknown","fname":"Scott Lee"}]
})

db.students.insert({
  "id"      : "15",
  "name"    : "萧涛",
  "age"     : 33,
  "sex"     : "man",
  "friends" : [{"age":20,"sex":"unknown","fname":"Sandra Lee"},{"age":28,"sex":"unknown","fname":"David Young"}]
})

db.students.insert({
  "id"      : "16",
  "name"    : "廖秀英",
  "age"     : 23,
  "sex"     : "unknown",
  "friends" : [{"age":26,"sex":"woman","fname":"Jessica Harris"},{"age":22,"sex":"woman","fname":"Ronald Hernandez"},{"age":23,"sex":"woman","fname":"Jennifer Miller"},{"age":22,"sex":"unknown","fname":"Anthony Lopez"}]
})

db.students.insert({
  "id"      : "17",
  "name"    : "刘磊",
  "age"     : 33,
  "sex"     : "woman",
  "friends" : [{"age":23,"sex":"woman","fname":"Helen Perez"},{"age":22,"sex":"man","fname":"David Walker"},{"age":24,"sex":"man","fname":"Thomas Walker"}]
})

db.students.insert({
  "id"      : "18",
  "name"    : "曹静",
  "age"     : 26,
  "sex"     : "woman",
  "friends" : [{"age":30,"sex":"woman","fname":"Michelle Jackson"},{"age":29,"sex":"woman","fname":"Paul Young"},{"age":34,"sex":"unknown","fname":"Brenda Thompson"},{"age":30,"sex":"woman","fname":"Ruth Lee"}]
})

db.students.insert({
  "id"      : "19",
  "name"    : "曹磊",
  "age"     : 22,
  "sex"     : "woman",
  "friends" : [{"age":31,"sex":"woman","fname":"Maria Hernandez"},{"age":22,"sex":"man","fname":"Sharon Jackson"},{"age":29,"sex":"man","fname":"Steven Davis"}]
})

db.students.insert({
  "id"      : "20",
  "name"    : "金强",
  "age"     : 19,
  "sex"     : "unknown",
  "friends" : [{"age":29,"sex":"woman","fname":"Christopher Gonzalez"},{"age":32,"sex":"woman","fname":"Dorothy Lopez"},{"age":30,"sex":"woman","fname":"Margaret Johnson"},{"age":27,"sex":"woman","fname":"Donna Young"},{"age":19,"sex":"man","fname":"Brian Jones"}]
})

db.students.insert({
  "id"      : "21",
  "name"    : "朱静",
  "age"     : 22,
  "sex"     : "unknown",
  "friends" : [{"age":29,"sex":"unknown","fname":"Donna Garcia"},{"age":23,"sex":"man","fname":"Brenda Brown"},{"age":26,"sex":"unknown","fname":"Margaret Miller"},{"age":20,"sex":"woman","fname":"Cynthia Thompson"},{"age":27,"sex":"woman","fname":"Amy Harris"}]
})

db.students.insert({
  "id"      : "22",
  "name"    : "刘芳",
  "age"     : 25,
  "sex"     : "man",
  "friends" : [{"age":26,"sex":"woman","fname":"Nancy Gonzalez"}]
})

db.students.insert({
  "id"      : "23",
  "name"    : "任敏",
  "age"     : 29,
  "sex"     : "man",
  "friends" : [{"age":34,"sex":"woman","fname":"Patricia Moore"},{"age":27,"sex":"woman","fname":"Margaret Martin"},{"age":29,"sex":"unknown","fname":"Scott Jackson"}]
})

db.students.insert({
  "id"      : "24",
  "name"    : "吴娟",
  "age"     : 22,
  "sex"     : "unknown",
  "friends" : [{"age":24,"sex":"unknown","fname":"Matthew Davis"},{"age":27,"sex":"man","fname":"Matthew Moore"}]
})

db.students.insert({
  "id"      : "25",
  "name"    : "董敏",
  "age"     : 31,
  "sex"     : "woman",
  "friends" : [{"age":22,"sex":"woman","fname":"William Miller"},{"age":23,"sex":"unknown","fname":"Sandra Taylor"},{"age":23,"sex":"man","fname":"George Walker"},{"age":24,"sex":"woman","fname":"Linda Thomas"},{"age":28,"sex":"unknown","fname":"Jennifer Thomas"}]
})

db.students.insert({
  "id"      : "26",
  "name"    : "袁艳",
  "age"     : 31,
  "sex"     : "woman",
  "friends" : [{"age":20,"sex":"woman","fname":"Helen Hall"},{"age":22,"sex":"unknown","fname":"Larry Martin"}]
})

db.students.insert({
  "id"      : "27",
  "name"    : "程强",
  "age"     : 25,
  "sex"     : "man",
  "friends" : [{"age":21,"sex":"man","fname":"Angela Lopez"},{"age":32,"sex":"woman","fname":"Maria Jones"},{"age":28,"sex":"unknown","fname":"Margaret Johnson"},{"age":19,"sex":"woman","fname":"Steven Lopez"},{"age":28,"sex":"woman","fname":"Helen Anderson"}]
})

db.students.insert({
  "id"      : "28",
  "name"    : "林勇",
  "age"     : 26,
  "sex"     : "unknown",
  "friends" : [{"age":19,"sex":"unknown","fname":"Linda Jackson"},{"age":21,"sex":"unknown","fname":"David Perez"},{"age":28,"sex":"unknown","fname":"Betty Harris"}]
})

db.students.insert({
  "id"      : "29",
  "name"    : "崔磊",
  "age"     : 33,
  "sex"     : "woman",
  "friends" : [{"age":34,"sex":"woman","fname":"Melissa Wilson"},{"age":21,"sex":"woman","fname":"Gary Wilson"},{"age":24,"sex":"woman","fname":"Frank Lopez"},{"age":26,"sex":"unknown","fname":"Laura Thompson"}]
})

db.students.insert({
  "id"      : "30",
  "name"    : "刘秀兰",
  "age"     : 35,
  "sex"     : "woman",
  "friends" : [{"age":29,"sex":"woman","fname":"Linda Jones"},{"age":30,"sex":"unknown","fname":"Kenneth Jones"},{"age":32,"sex":"woman","fname":"Karen Jackson"},{"age":19,"sex":"woman","fname":"Brian Martinez"},{"age":31,"sex":"woman","fname":"Patricia Walker"}]
})

db.students.insert({
  "id"      : "31",
  "name"    : "田涛",
  "age"     : 24,
  "sex"     : "woman",
  "friends" : [{"age":25,"sex":"unknown","fname":"William Hernandez"},{"age":27,"sex":"woman","fname":"Dorothy Garcia"}]
})

db.students.insert({
  "id"      : "32",
  "name"    : "毛芳",
  "age"     : 28,
  "sex"     : "unknown",
  "friends" : [{"age":24,"sex":"man","fname":"Carol Garcia"},{"age":20,"sex":"unknown","fname":"Angela Brown"},{"age":23,"sex":"unknown","fname":"Angela Lopez"},{"age":22,"sex":"unknown","fname":"Melissa Lee"},{"age":33,"sex":"man","fname":"Angela Jackson"}]
})

db.students.insert({
  "id"      : "33",
  "name"    : "周超",
  "age"     : 19,
  "sex"     : "woman",
  "friends" : [{"age":20,"sex":"woman","fname":"Helen Jackson"},{"age":27,"sex":"man","fname":"James Gonzalez"}]
})

db.students.insert({
  "id"      : "34",
  "name"    : "何芳",
  "age"     : 29,
  "sex"     : "woman",
  "friends" : [{"age":21,"sex":"woman","fname":"Thomas Lee"}]
})

db.students.insert({
  "id"      : "35",
  "name"    : "杨艳",
  "age"     : 18,
  "sex"     : "unknown",
  "friends" : [{"age":30,"sex":"man","fname":"Karen Davis"},{"age":30,"sex":"woman","fname":"George Brown"},{"age":28,"sex":"woman","fname":"Carol Harris"}]
})

db.students.insert({
  "id"      : "36",
  "name"    : "贾芳",
  "age"     : 31,
  "sex"     : "man",
  "friends" : [{"age":23,"sex":"unknown","fname":"Gary Garcia"},{"age":22,"sex":"woman","fname":"William Robinson"},{"age":22,"sex":"unknown","fname":"Eric Harris"},{"age":27,"sex":"unknown","fname":"John Miller"}]
})

db.students.insert({
  "id"      : "37",
  "name"    : "秦军",
  "age"     : 34,
  "sex"     : "man",
  "friends" : [{"age":24,"sex":"man","fname":"Daniel Johnson"},{"age":20,"sex":"unknown","fname":"Thomas Williams"}]
})

db.students.insert({
  "id"      : "38",
  "name"    : "黄秀兰",
  "age"     : 25,
  "sex"     : "man",
  "friends" : [{"age":33,"sex":"man","fname":"Margaret Martin"},{"age":32,"sex":"man","fname":"Michelle Jackson"}]
})

db.students.insert({
  "id"      : "39",
  "name"    : "秦娟",
  "age"     : 28,
  "sex"     : "unknown",
  "friends" : [{"age":32,"sex":"woman","fname":"Angela Jones"},{"age":28,"sex":"unknown","fname":"William Garcia"},{"age":24,"sex":"woman","fname":"Nancy Anderson"},{"age":25,"sex":"woman","fname":"Thomas Taylor"}]
})

db.students.insert({
  "id"      : "40",
  "name"    : "罗磊",
  "age"     : 20,
  "sex"     : "woman",
  "friends" : [{"age":31,"sex":"unknown","fname":"Anthony Jackson"},{"age":24,"sex":"woman","fname":"Susan Robinson"}]
})

db.students.insert({
  "id"      : "41",
  "name"    : "龙平",
  "age"     : 31,
  "sex"     : "woman",
  "friends" : [{"age":34,"sex":"woman","fname":"Patricia Taylor"},{"age":19,"sex":"woman","fname":"Kimberly Brown"},{"age":27,"sex":"unknown","fname":"Laura Walker"},{"age":18,"sex":"woman","fname":"Deborah Wilson"},{"age":33,"sex":"woman","fname":"Ronald Taylor"}]
})

db.students.insert({
  "id"      : "42",
  "name"    : "何霞",
  "age"     : 27,
  "sex"     : "woman",
  "friends" : [{"age":29,"sex":"man","fname":"Dorothy Allen"},{"age":21,"sex":"man","fname":"Susan Walker"},{"age":29,"sex":"woman","fname":"Mark Lewis"},{"age":31,"sex":"unknown","fname":"Barbara Perez"},{"age":28,"sex":"woman","fname":"Barbara Wilson"}]
})

db.students.insert({
  "id"      : "43",
  "name"    : "徐勇",
  "age"     : 34,
  "sex"     : "man",
  "friends" : [{"age":25,"sex":"woman","fname":"Sarah Wilson"},{"age":24,"sex":"woman","fname":"Karen White"},{"age":24,"sex":"unknown","fname":"Patricia Thomas"},{"age":20,"sex":"woman","fname":"Jeffrey Davis"}]
})

db.students.insert({
  "id"      : "44",
  "name"    : "丁霞",
  "age"     : 35,
  "sex"     : "unknown",
  "friends" : [{"age":32,"sex":"woman","fname":"Michelle Gonzalez"},{"age":25,"sex":"woman","fname":"William White"},{"age":32,"sex":"man","fname":"Kenneth Moore"},{"age":21,"sex":"man","fname":"Patricia Robinson"},{"age":20,"sex":"man","fname":"Angela Johnson"}]
})

db.students.insert({
  "id"      : "45",
  "name"    : "黄娟",
  "age"     : 33,
  "sex"     : "woman",
  "friends" : [{"age":35,"sex":"man","fname":"James Lee"},{"age":33,"sex":"woman","fname":"Michelle Thomas"}]
})

db.students.insert({
  "id"      : "46",
  "name"    : "黎军",
  "age"     : 23,
  "sex"     : "man",
  "friends" : [{"age":24,"sex":"woman","fname":"Jose Smith"},{"age":35,"sex":"unknown","fname":"Patricia Martin"},{"age":25,"sex":"woman","fname":"Frank Gonzalez"},{"age":30,"sex":"man","fname":"Jessica Jackson"},{"age":25,"sex":"man","fname":"Melissa Perez"}]
})

db.students.insert({
  "id"      : "47",
  "name"    : "杨洋",
  "age"     : 26,
  "sex"     : "man",
  "friends" : [{"age":33,"sex":"woman","fname":"Brenda Thomas"},{"age":20,"sex":"unknown","fname":"Dorothy Johnson"},{"age":24,"sex":"woman","fname":"Daniel Hernandez"},{"age":20,"sex":"woman","fname":"Donna Williams"}]
})

db.students.insert({
  "id"      : "48",
  "name"    : "董刚",
  "age"     : 25,
  "sex"     : "unknown",
  "friends" : [{"age":29,"sex":"woman","fname":"Kevin Perez"}]
})

db.students.insert({
  "id"      : "49",
  "name"    : "杜强",
  "age"     : 20,
  "sex"     : "man",
  "friends" : [{"age":27,"sex":"man","fname":"Kimberly Martinez"},{"age":32,"sex":"man","fname":"Gary Jackson"}]
})

db.students.insert({
  "id"      : "50",
  "name"    : "许秀英",
  "age"     : 26,
  "sex"     : "woman",
  "friends" : [{"age":23,"sex":"unknown","fname":"Sharon Brown"},{"age":30,"sex":"woman","fname":"Sharon Williams"},{"age":20,"sex":"woman","fname":"Elizabeth Hall"},{"age":19,"sex":"unknown","fname":"Charles Williams"},{"age":27,"sex":"woman","fname":"Elizabeth Young"}]
})

db.students.insert({
  "id"      : "51",
  "name"    : "熊磊",
  "age"     : 18,
  "sex"     : "unknown",
  "friends" : [{"age":25,"sex":"woman","fname":"Kevin Taylor"},{"age":31,"sex":"unknown","fname":"Betty Hall"}]
})

db.students.insert({
  "id"      : "52",
  "name"    : "冯杰",
  "age"     : 32,
  "sex"     : "woman",
  "friends" : [{"age":34,"sex":"woman","fname":"Scott Taylor"},{"age":24,"sex":"unknown","fname":"Jeffrey Harris"},{"age":23,"sex":"woman","fname":"David Brown"},{"age":27,"sex":"woman","fname":"Eric White"}]
})

db.students.insert({
  "id"      : "53",
  "name"    : "谢磊",
  "age"     : 19,
  "sex"     : "woman",
  "friends" : [{"age":29,"sex":"woman","fname":"Karen Williams"},{"age":32,"sex":"unknown","fname":"Michelle Young"}]
})

db.students.insert({
  "id"      : "54",
  "name"    : "杜勇",
  "age"     : 33,
  "sex"     : "man",
  "friends" : [{"age":29,"sex":"unknown","fname":"Daniel Jackson"},{"age":24,"sex":"man","fname":"John Clark"},{"age":21,"sex":"unknown","fname":"Eric Thompson"}]
})

db.students.insert({
  "id"      : "55",
  "name"    : "汪军",
  "age"     : 24,
  "sex"     : "man",
  "friends" : [{"age":26,"sex":"woman","fname":"Laura Miller"},{"age":25,"sex":"woman","fname":"Daniel Smith"},{"age":21,"sex":"woman","fname":"Amy Young"}]
})

db.students.insert({
  "id"      : "56",
  "name"    : "邓丽",
  "age"     : 30,
  "sex"     : "woman",
  "friends" : [{"age":30,"sex":"woman","fname":"Jose Brown"},{"age":22,"sex":"woman","fname":"Ruth Williams"},{"age":27,"sex":"woman","fname":"Jennifer Clark"}]
})

db.students.insert({
  "id"      : "57",
  "name"    : "李芳",
  "age"     : 23,
  "sex"     : "woman",
  "friends" : [{"age":20,"sex":"man","fname":"Shirley Hernandez"},{"age":30,"sex":"unknown","fname":"Thomas Lewis"},{"age":25,"sex":"unknown","fname":"Sandra Martin"},{"age":22,"sex":"man","fname":"Kevin Garcia"},{"age":26,"sex":"man","fname":"Angela Smith"}]
})

db.students.insert({
  "id"      : "58",
  "name"    : "石涛",
  "age"     : 29,
  "sex"     : "man",
  "friends" : [{"age":26,"sex":"unknown","fname":"Jennifer Wilson"},{"age":20,"sex":"man","fname":"Charles Miller"},{"age":18,"sex":"man","fname":"Cynthia Harris"}]
})

db.students.insert({
  "id"      : "59",
  "name"    : "郑丽",
  "age"     : 24,
  "sex"     : "woman",
  "friends" : [{"age":21,"sex":"woman","fname":"Brian Brown"},{"age":29,"sex":"man","fname":"Maria Gonzalez"},{"age":18,"sex":"woman","fname":"Mary Thompson"},{"age":32,"sex":"woman","fname":"Carol White"}]
})
