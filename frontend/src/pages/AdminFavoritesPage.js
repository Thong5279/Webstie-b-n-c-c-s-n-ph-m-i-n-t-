import React, { useEffect, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import displayVNDCurrency from "../helpers/displayCurrency"; // Giả sử bạn đã có helper này để hiển thị tiền
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminFavoritesPage = () => {
  const [favoriteStats, setFavoriteStats] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteStats = async () => {
      try {
        const response = await fetch(SummaryApi.getFavoriteStats.url);
        const data = await response.json();
        if (data.success) {
          setFavoriteStats(data.data);
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
