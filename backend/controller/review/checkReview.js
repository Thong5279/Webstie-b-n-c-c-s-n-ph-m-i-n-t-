const Review = require('../../models/reviewModel');

const checkReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const review = await Review.findOne({ userId, productId });
    
    res.json({
      success: true,
      hasReviewed: !!review
    });
    
  } catch (error) {
    console.error('Lỗi khi kiểm tra đánh giá:', error);
    res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi kiểm tra đánh giá'
    });
  }
};

module.exports = checkReview; 