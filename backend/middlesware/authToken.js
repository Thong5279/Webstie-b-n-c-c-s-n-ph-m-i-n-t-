// const jwt = require("jsonwebtoken");
// async function authToken(req, res, next) {
//   try {
//     const token = req.cookies?.token;

//     console.log("token", token);
//     if (!token) {
//       return res.status(200).json({
//         message: "Vui lòng đăng nhập 😊",
//         error: true,
//         succes: false,
//       });
//     }
//     jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
//       console.log(err);
//       console.log("decoded", decoded);

//       if (err) {
//         console.log("error auth", err);
//       }

//       req.userId = decoded?._id;
//       next();
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: err.message || err,
//       data: [],
//       error: true,
//       succes: false,
//     });
//   }
// }

// module.exports = authToken;

const jwt = require("jsonwebtoken");

// Hàm này không thể sử dụng localStorage trực tiếp ở phía server
function saveRoleToLocalStorage(role) {
  if (role) {
    // Hàm này chỉ nên gọi phía client, khi response về client
    console.log("Vai trò đã được lưu vào localStorage:", role);
  } else {
    console.error(
      "Không thể lưu vai trò vào localStorage: Vai trò không tồn tại."
    );
  }
}

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    console.log("token", token);
    if (!token) {
      return res.status(200).json({
        message: "Vui lòng đăng nhập 😊",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      console.log("decoded", decoded);

      if (err) {
        console.log("error auth", err);
        return res.status(401).json({
          message: "Token không hợp lệ hoặc đã hết hạn.",
          error: true,
          success: false,
        });
      }

      req.userId = decoded?._id;
      req.role = decoded?.role; // Lấy vai trò từ token (nếu có)

      // Gửi vai trò về phía client để client có thể lưu vào localStorage
      res.role = req.role;

      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
