/*
   Model để xác định người dùng phải nhập email và pasword
   Sử dụng passport để authenticate người dùng
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
  // username và password sẽ tự động tạo
  admin: {
    type: Boolean,
    default: false, // Gía trị này chưa phải admin
  },
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
