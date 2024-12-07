import React, { useState, useEffect } from 'react';
import { FaStar, FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import { BiComment, BiHappyHeartEyes } from 'react-icons/bi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Component thẻ thống kê
const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-600">{title}</h3>
        <span className="text-2xl text-gray-400">{icon}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

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

  // Thêm state cho thống kê theo thời gian
  const [timeStats, setTimeStats] = useState({
    daily: [],
    weekly: [],
    monthly: []
  });

  // Thêm state cho thống kê theo sản phẩm
  const [productStats, setProductStats] = useState([]);

  const fetchReviewStats = async () => {
    try {
      const response = await fetch(SummaryApi.getAllReviews.url, {
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        setReviews(data.data);
        calculateStats(data.data);
        calculateTimeStats(data.data);
        calculateProductStats(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi tải thống kê:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTimeStats = (reviewsData) => {
    const now = new Date();
    const daily = new Array(7).fill(0); // 7 ngày gần nhất
    const weekly = new Array(4).fill(0); // 4 tuần gần nhất
    const monthly = new Array(12).fill(0); // 12 tháng gần nhất

    reviewsData.forEach(review => {
      const reviewDate = new Date(review.createdAt);
      const dayDiff = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));
      
      if (dayDiff < 7) daily[dayDiff]++;
      if (dayDiff < 28) weekly[Math.floor(dayDiff / 7)]++;
      if (dayDiff < 365) monthly[reviewDate.getMonth()]++;
    });

    setTimeStats({ daily, weekly, monthly });
  };

  const calculateProductStats = (reviewsData) => {
    const productMap = reviewsData.reduce((acc, review) => {
      const productId = review.productId._id;
      if (!acc[productId]) {
        acc[productId] = {
          productId,
          productName: review.productId.productName,
          totalReviews: 0,
          averageRating: 0,
          ratings: []
        };
      }
      acc[productId].totalReviews++;
      acc[productId].ratings.push(review.rating);
      return acc;
    }, {});

    const productStatsArray = Object.values(productMap).map(product => ({
      ...product,
      averageRating: product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length
    }));

    setProductStats(productStatsArray.sort((a, b) => b.averageRating - a.averageRating));
  };

  // Tính toán thống kê cơ bản
  const calculateStats = (reviewsData) => {
    const totalReviews = reviewsData.length;
    const ratingSum = reviewsData.reduce((sum, review) => sum + review.rating, 0);
    const ratingDistribution = reviewsData.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0});

    setStats({
      totalReviews,
      averageRating: totalReviews > 0 ? ratingSum / totalReviews : 0,
      ratingDistribution
    });
  };

  // Tính phần trăm đánh giá tích cực (4-5 sao)
  const calculatePositivePercentage = () => {
    const total = stats.totalReviews;
    if (total === 0) return 0;
    
    const positiveReviews = stats.ratingDistribution[4] + stats.ratingDistribution[5];
    return Math.round((positiveReviews / total) * 100);
  };

  // Component phân tích cảm xúc
  const SentimentAnalysis = () => {
    const positiveCount = stats.ratingDistribution[4] + stats.ratingDistribution[5];
    const neutralCount = stats.ratingDistribution[3];
    const negativeCount = stats.ratingDistribution[1] + stats.ratingDistribution[2];
    const total = stats.totalReviews || 1;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Phân tích cảm xúc</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-green-500 text-2xl font-bold">
              {Math.round((positiveCount / total) * 100)}%
            </p>
            <p className="text-gray-600">Tích cực</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-500 text-2xl font-bold">
              {Math.round((neutralCount / total) * 100)}%
            </p>
            <p className="text-gray-600">Trung lập</p>
          </div>
          <div className="text-center">
            <p className="text-red-500 text-2xl font-bold">
              {Math.round((negativeCount / total) * 100)}%
            </p>
            <p className="text-gray-600">Tiêu cực</p>
          </div>
        </div>
      </div>
    );
  };

  // Component biểu đồ thống kê theo thời gian
  const TimeChart = () => {
    const data = {
      labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      datasets: [{
        label: 'Đánh giá theo ngày',
        data: timeStats.daily,
        backgroundColor: 'rgba(220, 38, 38, 0.5)',
        borderColor: 'rgb(220, 38, 38)',
      }]
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Thống kê theo thời gian</h3>
        <Line data={data} />
      </div>
    );
  };

  // Component bảng xếp hạng sản phẩm
  const ProductRankings = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Xếp hạng sản phẩm</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2">Sản phẩm</th>
                <th className="px-4 py-2">Số đánh giá</th>
                <th className="px-4 py-2">Điểm trung bình</th>
              </tr>
            </thead>
            <tbody>
              {productStats.map((product, index) => (
                <tr key={product.productId} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-4 py-2">{product.productName}</td>
                  <td className="px-4 py-2 text-center">{product.totalReviews}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center">
                      <span className="mr-2">{product.averageRating.toFixed(1)}</span>
                      <FaStar className="text-yellow-400" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchReviewStats();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Thống Kê & Phân Tích Đánh Giá</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Tổng số đánh giá"
          value={stats.totalReviews}
          icon={<BiComment />}
        />
        <StatCard
          title="Điểm trung bình"
          value={stats.averageRating.toFixed(1)}
          icon={<FaStar className="text-yellow-400" />}
        />
        <StatCard
          title="Đánh giá tích cực"
          value={`${calculatePositivePercentage()}%`}
          icon={<BiHappyHeartEyes className="text-green-500" />}
        />
        <StatCard
          title="Sản phẩm được đánh giá"
          value={productStats.length}
          icon={<FaBox />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <TimeChart />
        <SentimentAnalysis />
      </div>

      <ProductRankings />
    </div>
  );
};

export default AllReview