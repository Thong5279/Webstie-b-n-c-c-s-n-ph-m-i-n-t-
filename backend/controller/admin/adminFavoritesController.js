const AdminFavorites = require("../../models/AdminFavorites");
const Product = require("../../models/productModel");
const UserFavorites = require("../../models/UserFavorites");
const UserModel = require("../../models/userModel");

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

const getFavoriteStats = async (req, res) => {
  try {
    const allFavorites = await UserFavorites.find().populate('favoriteProducts');
    const totalUsers = await UserModel.countDocuments();
    
    // Object để lưu thống kê theo doanh mục
    const categoryStats = {};
    const productStats = {};
    
    // Thống kê số lượt thích
    allFavorites.forEach(userFavorite => {
      userFavorite.favoriteProducts.forEach(product => {
        // Thống kê theo sản phẩm
        if (!productStats[product._id]) {
          productStats[product._id] = {
            product: product,
            likeCount: 1,
            percentage: 0
          };
        } else {
          productStats[product._id].likeCount += 1;
        }

        // Thống kê theo doanh mục
        if (!categoryStats[product.category]) {
          categoryStats[product.category] = {
            category: product.category,
            likeCount: 1,
            products: 1
          };
        } else {
          categoryStats[product.category].likeCount += 1;
          if (!categoryStats[product.category].productIds?.includes(product._id)) {
            categoryStats[product.category].products += 1;
          }
        }
      });
    });

    // Tính phần trăm yêu thích cho sản phẩm
    Object.values(productStats).forEach(stat => {
      stat.percentage = ((stat.likeCount / totalUsers) * 100).toFixed(1);
    });

    // Sắp xếp thống kê
    const sortedStats = Object.values(productStats).sort((a, b) => 
      b.likeCount - a.likeCount
    );

    const sortedCategoryStats = Object.values(categoryStats).sort((a, b) =>
      b.likeCount - a.likeCount
    );

    res.status(200).json({
      success: true,
      data: sortedStats,
      categoryStats: sortedCategoryStats,
      totalUsers
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Có lỗi xảy ra khi lấy thống kê yêu thích."
    });
  }
};

module.exports = {
  toggleFavoriteProduct,
  getFavoriteProducts,
  clearFavoriteProducts,
  getFavoriteStats,
};
