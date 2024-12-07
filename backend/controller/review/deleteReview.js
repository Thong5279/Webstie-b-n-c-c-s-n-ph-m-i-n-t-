const Review = require('../../models/reviewModel');

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const review = await Review.findByIdAndDelete(reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đánh giá'
      });
    }

    res.json({
      success: true,
      message: 'Xóa đánh giá thành công'
    });
    
  } catch (error) {
    console.error('Lỗi khi xóa đánh giá:', error);
    res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi xóa đánh giá'
    });
  }
};

module.exports = deleteReview; 