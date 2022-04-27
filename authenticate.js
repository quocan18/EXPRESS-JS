var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");

passport.use(new LocalStrategy(User.authenticate()));

/**
 * Khi có request login sẽ gọi đến hàm này
 * Xác định xem phần nào của đối tượng sẽ lưu vào trong session
 */
passport.serializeUser(User.serializeUser());

/**
 * Khi request được xác thực sẽ gọi đến hàm này
 * Sử dụng thông tin trong session để lấy dữ liệu đầy đủ về user
 * rồi gắn vào req.user
 */
passport.deserializeUser(User.deserializeUser());
