const Review = require('../../models/reviewModel');

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const reviews = await Review.find({ productId })
      .populate('userId', 'name') // Lấy thêm thông tin người dùng
      .sort({ createdAt: -1 }); // Sắp xếp theo thời gian mới nhất
      
    res.json({
      success: true,
      data: reviews
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