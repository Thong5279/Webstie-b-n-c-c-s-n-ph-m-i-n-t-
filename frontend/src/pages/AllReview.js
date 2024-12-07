import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';

const AllReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    }
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(SummaryApi.getAllReviews.url, {
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        setReviews(data.data);
        setStats(data.stats);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi tải đánh giá:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData) => {
    // Nhóm đánh giá theo sản phẩm
    const productReviews = reviewsData.reduce((acc, review) => {
      if (!acc[review.productId._id]) {
        acc[review.productId._id] = {
          product: review.productId,
          reviews: [],
          averageRating: 0
        };
      }
      acc[review.productId._id].reviews.push(review);
      return acc;
    }, {});

    // Tính rating trung bình cho mỗi sản phẩm
    Object.values(productReviews).forEach(product => {
      product.averageRating = 
        product.reviews.reduce((sum, review) => sum + review.rating, 0) / 
        product.reviews.length;
    });

    // Sắp xếp theo rating
    const sortedProducts = Object.values(productReviews).sort(
      (a, b) => b.averageRating - a.averageRating
    );

    setStats({
      totalReviews: reviewsData.length,
      averageRating: reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length,
      ratingDistribution: reviewsData.reduce((acc, review) => {
        acc[review.rating]++;
        return acc;
      }, {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0
      })
    });
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Thống Kê Đánh Giá</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600">Tổng số đánh giá</p>
            <p className="text-2xl font-bold">{stats.totalReviews}</p>
          </div>
          <div>
            <p className="text-gray-600">Đánh giá trung bình</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</span>
              <FaStar className="text-yellow-400 text-2xl" />
            </div>
          </div>
          <div>
            <p className="text-gray-600">Phân bố đánh giá</p>
            <div className="space-y-1">
              {Object.entries(stats.ratingDistribution).reverse().map(([rating, count]) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${(count / stats.totalReviews) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllReview