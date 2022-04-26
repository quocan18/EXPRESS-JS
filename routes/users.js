var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var User = require("../models/user");

router.use(bodyParser.json());

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/**
 * Router để hỗ trợ người dùng đăng ký, đăng nhập và đăng xuất
 */
// Router để đăng ký người dùng
router.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        // Thông báo nếu tài khoản đã tồn tại
        var err = new Error("User" + req.body.username + " already exits");
        err.status = 403;
        next(err);
      } else {
        // Nếu không thì tạo tài khoản mới
        return User.create({
          username: req.body.username,
          password: req.body.password,
        });
      }
    })
    .then(
      (user) => {
        // Báo cáo đăng ký tài khoản thành công
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ status: "Registration Successful", user: user });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

// Router đăng nhập tài khoản
router.post("/login", (req, res, next) => {
  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }

    var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    var username = auth[0];
    var password = auth[1];

    User.findOne({ username: username })
      .then((user) => {
        if (user === null) {
          // Nếu tài khoản chưa được nhập thì thông báo lỗi
          var err = new Error("User" + username + "does not exist");
          err.status = 403;
          return next(err);
        } else if (user.password !== password) {
          // Thông báo lỗi nếu nhập sai mật khẩu
          var err = new Error("Your password is wrong");
          err.status = 403;
          return next(err);
        } else if (user.username === username && user.password === password) {
          // Nhập đúng cả username và mật khẩu thì cho phép truy cập
          req.session.user = "authenticated";
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("You are authenticated");
        }
      })
      .catch((err) => next(err));
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("You are already authenticated");
  }
});

/**
 * Router đăng xuất
 */
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(); // Xóa session khi đăng xuất
    res.clearCookie("session-id"); // Xóa cookie
    res.redirect("/"); // Redirect về một trang nào đó
  } else {
    // Nếu người dùng có back về trang sau khi đăng xuất báo lỗi này
    var err = new Error("You are not logged in");
    err.status = 403;
    next(err);
  }
});
module.exports = router;
