const Review = require('../../models/reviewModel');

const saveReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;

    // Kiểm tra xem người dùng đã đánh giá sản phẩm này chưa
    const existingReview = await Review.findOne({ userId, productId });
    
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Bạn đã đánh giá sản phẩm này rồi'
      });
    }

    // Tạo đánh giá mới
    const review = new Review({
      userId,
      productId, 
      rating,
      comment
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: 'Đánh giá sản phẩm thành công',
      data: review
    });

  } catch (error) {
    console.error('Lỗi khi lưu đánh giá:', error);
    res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lưu đánh giá'
    });
  }
};

module.exports = {
  saveReview
}; 