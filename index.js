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
  console.log(req.session);

  // Kiểm tra thông tin để cấp quyền
  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    console.log(authHeader);
    var err = new Error("You are not authenticated");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    next(err);

    var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");

    // Đọc username và password
    var user = auth[0];
    var pass = auth[1];

    // Nếu người dùng là admin thì cho phép truy cập
    if (user == "admin" && pass == "password") {
      req.session.user = "admin";
      next(); // Cho phép truy cập
    } else {
      // Nếu không thì báo lỗi
      var err = new Error("You are not authenticated");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    }
  } else {
    if (req.session.user === "admin") {
      console.log("req.session: ", req.session);
    } else {
      var err = new Error("You are not autheticated");
      err.status = 401;
      next(err);
    }
  }
}

// Middleware
app.use(auth);
app.use(express.static(path.join(__dirname, "public")));

// Server sẽ chạy trên cổng 3000
app.listen(3000, () => {
  console.log("Server is Starting");
});
