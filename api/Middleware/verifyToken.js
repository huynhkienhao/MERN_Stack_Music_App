// // middleware/verifyToken.js
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1]; // Lấy token từ header

//   if (!token) {
//     return res.status(401).json({ error: "Access Denied" });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified; // Lưu thông tin user đã xác thực vào req
//     next(); // Chuyển sang hàm xử lý tiếp theo
//   } catch (error) {
//     res.status(400).json({ error: "Invalid Token" });
//   }
// };

// module.exports = verifyToken;
