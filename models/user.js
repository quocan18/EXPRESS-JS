/*
   Model để xác định người dùng phải nhập email và pasword
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false, // Gía trị này chưa phải admin
  },
});

module.exports = mongoose.model("User", User);
