import React, { useEffect, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import displayVNDCurrency from "../helpers/displayCurrency"; // Giả sử bạn đã có helper này để hiển thị tiền
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminFavoritesPage = () => {
  const [favoriteStats, setFavoriteStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteStats = async () => {
      try {
        const response = await fetch(SummaryApi.getFavoriteStats.url);
        const data = await response.json();
        if (data.success) {
          setFavoriteStats(data.data);
          setCategoryStats(data.categoryStats);
          setTotalUsers(data.totalUsers);
        }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy thống kê:", error);
        setLoading(false);
      }
    };

    fetchFavoriteStats();
  }, []);

  // Cấu hình dữ liệu cho biểu đồ
  const chartData = {
    labels: categoryStats.map(cat => cat.category),
    datasets: [
      {
        data: categoryStats.map(cat => cat.likeCount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Thống kê lượt thích theo danh mục',
        font: {
          size: 16
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold mb-6">Thống kê sản phẩm yêu thích</h2>
      
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-gray-600">
              Tổng số người dùng: <span className="font-semibold">{totalUsers}</span>
            </p>
          </div>

          {/* Thêm biểu đồ tròn */}
          <div className="mb-8 bg-white p-4 rounded-lg shadow">
            <div className="w-full max-w-2xl mx-auto h-[400px]">
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Bảng thống kê chi tiết theo danh mục */}
          <div className="mb-8 overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3">Danh mục</th>
                  <th className="px-4 py-3">Số lượt thích</th>
                  <th className="px-4 py-3">Số sản phẩm</th>
                </tr>
              </thead>
              <tbody>
                {categoryStats.map((cat) => (
                  <tr key={cat.category} className="border-t">
                    <td className="px-4 py-3">{cat.category}</td>
                    <td className="px-4 py-3 text-center">{cat.likeCount}</td>
                    <td className="px-4 py-3 text-center">{cat.products}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Danh sách sản phẩm yêu thích hiện tại */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteStats.map((stat) => (
              <div key={stat.product._id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src={stat.product.productImage[0]}
                  alt={stat.product.productName}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{stat.product.productName}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span>Số lượt thích:</span>
                      <span className="font-semibold">{stat.likeCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tỷ lệ yêu thích:</span>
                      <span className="font-semibold">{stat.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-600 h-2.5 rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminFavoritesPage;
