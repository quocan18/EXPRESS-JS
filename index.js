/*
   Authentication và Authorization trong Node JS
   Session và cookie nữa
*/

// Import module express
const express = require("express");

// Module express-session
const session = require("express-session");

// Import module file-store
const filestore = require("session-file-path")(session);

const path = require("path");

// Dựng server
var app = express();

var passport = require("passport");
var authenticate = require("./authenticate");

app.use(passport.initialize());
app.use(passport.session());

// Tạo phiên
app.use(
  session({
    name: "session-id",
    secret: "12345-67890-09876-54321", // Khóa cho phiên(lấy từ cookie parser)
    saveUninitialized: false,
    resave: false,
    store: new filestore(),
  })
);

// Yêu cầu được cấp quyền
function auth(res, req, next) {
  // Kiểm tra phiên
  console.log(req.user);

  // Kiểm tra thông tin để cấp quyền
  if (!req.user) {
    // Báo lỗi nếu có
    var err = new Error("You are not authenticated!");
    err.status = 403;
    next(err);
  } else {
    next();
  }
}

// Middleware
app.use(auth);
app.use(express.static(path.join(__dirname, "public")));

// Server sẽ chạy trên cổng 3000
app.listen(3000, () => {
  console.log("Server is Starting");
});
