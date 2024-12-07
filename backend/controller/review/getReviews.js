const Review = require('../../models/reviewModel');

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const reviews = await Review.find({ productId })
      .populate('userId', ['name', 'email'])
      .sort({ createdAt: -1 });

    // Tính số sao trung bình
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
    
    res.json({
      success: true,
      data: reviews,
      averageRating: Math.round(averageRating * 10) / 10 // Làm tròn đến 1 chữ số thập phân
    });
    
  } catch (error) {
    console.error('Lỗi khi lấy đánh giá:', error);
    res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lấy đánh giá'
    });
  }
};

module.exports = getReviews; 