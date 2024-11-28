const UserFavorites = require("../../models/UserFavorites");
const Product = require("../../models/productModel");

// Lấy danh sách sản phẩm yêu thích của user

const getUserFavoriteProducts = async (req, res) => {
  try {
    const userId = req.userId; // Lấy từ middleware authToken
    console.log("UserId: ", userId);

    const favorites = await UserFavorites.findOne({ userId }).populate(
      "favoriteProducts"
    );

    console.log("Favorites: ", favorites);
    console.log("Favorite Products: ", favorites?.favoriteProducts);

    if (!favorites || favorites.favoriteProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "Bạn chưa có sản phẩm yêu thích." });
    }

    res.status(200).json(favorites.favoriteProducts);
  } catch (error) {
    console.error("Lỗi server: ", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy danh sách yêu thích.", error });
  }
};

// Thêm/Bỏ sản phẩm khỏi danh sách yêu thích
const toggleFavoriteUserProduct = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId; // Lấy từ middleware authToken

  try {
    let favorites = await UserFavorites.findOne({ userId });

    if (!favorites) {
      favorites = new UserFavorites({ userId, favoriteProducts: [] });
    }

    if (favorites.favoriteProducts.includes(productId)) {
      // Xóa sản phẩm khỏi danh sách yêu thích
      favorites.favoriteProducts = favorites.favoriteProducts.filter(
        (id) => id.toString() !== productId.toString()
      );
      await favorites.save();
      return res.status(200).json({
        message: "Đã xóa sản phẩm khỏi danh sách yêu thích.",
        liked: false,
      });
    } else {
      // Thêm sản phẩm vào danh sách yêu thích
      favorites.favoriteProducts.push(productId);
      await favorites.save();
      return res.status(200).json({
        message: "Đã thêm sản phẩm vào danh sách yêu thích.",
        liked: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Có lỗi xảy ra khi cập nhật danh sách yêu thích.",
      error,
    });
  }
};

module.exports = {
  getUserFavoriteProducts,
  toggleFavoriteUserProduct,
};
