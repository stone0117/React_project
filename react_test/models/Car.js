const mongoose = require("mongoose");

//这就是一个model文件
module.exports = mongoose.model("Car", {
  "id"           : Number,
  "brand"        : String,
  "series"       : String,
  "color"        : String,
  "price"        : Number,
  "km"           : Number,
  "gearbox"      : String,
  "displacement" : String,
  "fuel"         : String,
  "buydate"      : Number,
  "licence"      : Boolean,
  "locality"     : Boolean,
  "environmental": String,
  "images"       : Object,
  "type"         : String,
});