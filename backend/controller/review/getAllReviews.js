const Review = require('../../models/reviewModel');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', ['name', 'email'])
      .populate('productId', ['productName', 'productImage', 'price'])
      .sort({ createdAt: -1 });

    // Tính toán thống kê
    const stats = {
      totalReviews: reviews.length,
      averageRating: 0,
      ratingDistribution: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0
      }
    };

    // Tính phân phối rating và trung bình
    reviews.forEach(review => {
      stats.ratingDistribution[review.rating]++;
      stats.averageRating += review.rating;
    });

    stats.averageRating = stats.averageRating / reviews.length || 0;
    
    res.json({
      success: true,
      data: reviews,
      stats: stats
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
