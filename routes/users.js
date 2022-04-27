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
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        // Thông báo lỗi
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        // Nếu không có lỗi thì cho phép truy cập
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    }
  );
});

// Router đăng nhập tài khoản
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ success: true, status: "You are successfully logged in!" });
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
