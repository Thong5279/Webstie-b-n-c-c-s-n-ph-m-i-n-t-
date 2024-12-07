import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import 'moment/locale/vi';
import { FaStar, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Allblog = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      try {
        const response = await fetch(`${SummaryApi.review.url}/${reviewId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        const data = await response.json();
        if (data.success) {
          toast.success('Xóa đánh giá thành công');
          setReviews(reviews.filter(review => review._id !== reviewId));
        } else {
          toast.error(data.message || 'Có lỗi xảy ra khi xóa đánh giá');
        }
      } catch (error) {
        console.error('Lỗi khi xóa đánh giá:', error);
        toast.error('Có lỗi xảy ra khi xóa đánh giá');
      }
    }
  };

  const fetchAllReviews = async () => {
    try {
      const response = await fetch(SummaryApi.getAllReviews.url, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi tải đánh giá:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Tất Cả Đánh Giá</h1>

      <div className="grid gap-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">Chưa có đánh giá nào</p>
        ) : (
          reviews.map((review) => (
            <div 
              key={review._id}
              onClick={() => handleReviewClick(review.productId)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    <Link 
                      to={`/product/${review.productId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {review.productName}
                    </Link>
                  </h3>
                  <p className="text-gray-600">
                    Đánh giá bởi: {review.userName}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">
                    {moment(review.createdAt).format('LLL')}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteReview(review._id);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>

              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Allblog;