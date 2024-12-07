const Review = require('../../models/reviewModel');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', ['name', 'email'])
      .populate('productId', ['productName', 'productImage'])
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: reviews
    });
    
  } catch (error) {
    console.error('Lỗi khi lấy tất cả đánh giá:', error);
    res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lấy đánh giá'
    });
  }
};

module.exports = getAllReviews;
