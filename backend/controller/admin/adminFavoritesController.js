const AdminFavorites = require("../../models/AdminFavorites");
const Product = require("../../models/productModel");

// Thêm hoặc bỏ sản phẩm trong danh sách yêu thích
const toggleFavoriteProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    // Tìm danh sách yêu thích của admin
    let favorites = await AdminFavorites.findOne();
    if (!favorites) {
      favorites = new AdminFavorites(); // Nếu chưa có, tạo mới
    }

    // Kiểm tra xem sản phẩm có trong danh sách yêu thích không
    if (favorites.favoriteProducts.includes(productId)) {
      // Nếu có, bỏ sản phẩm khỏi danh sách
      favorites.favoriteProducts = favorites.favoriteProducts.filter(
        (id) => id.toString() !== productId.toString()
      );
      await favorites.save();
      return res
        .status(200)
        .json({ message: "Sản phẩm đã bị loại khỏi danh sách yêu thích." });
    } else {
      // Nếu chưa có, thêm sản phẩm vào danh sách yêu thích
      favorites.favoriteProducts.push(productId);
      await favorites.save();
      return res
        .status(200)
        .json({ message: "Sản phẩm đã được thêm vào danh sách yêu thích." });
    }
  } catch (error) {
    res.status(500).json({
      error: "Có lỗi xảy ra khi cập nhật danh sách yêu thích.",
    });
  }
};

// Lấy danh sách sản phẩm yêu thích
const getFavoriteProducts = async (req, res) => {
  try {
    const favorites = await AdminFavorites.findOne();
    if (!favorites) {
      return res
        .status(404)
        .json({ message: "Không có sản phẩm yêu thích nào." });
    }

    // Lấy thông tin sản phẩm từ danh sách yêu thích
    const products = await Product.find({
      _id: { $in: favorites.favoriteProducts },
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: "Có lỗi xảy ra khi lấy danh sách sản phẩm yêu thích.",
    });
  }
};

const clearFavoriteProducts = async (req, res) => {
  try {
    let favorites = await AdminFavorites.findOne();
    if (favorites) {
      favorites.favoriteProducts = [];
      await favorites.save();
    }
    res.status(200).json({ message: "Danh sách yêu thích đã được xóa." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Có lỗi xảy ra khi xóa danh sách yêu thích." });
  }
};

module.exports = {
  toggleFavoriteProduct,
  getFavoriteProducts,
  clearFavoriteProducts,
};
