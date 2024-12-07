import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import 'moment/locale/vi';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Allblog = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <div key={review._id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    <Link 
                      to={`/product/${review.productId._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {review.productId.productName}
                    </Link>
                  </h3>
                  <p className="text-gray-600">
                    Đánh giá bởi: {review.userId.name}
                  </p>
                </div>
                <span className="text-gray-500">
                  {moment(review.createdAt).format('LLL')}
                </span>
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