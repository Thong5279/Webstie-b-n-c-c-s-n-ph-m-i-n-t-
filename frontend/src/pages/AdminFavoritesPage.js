import React, { useEffect, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import displayVNDCurrency from "../helpers/displayCurrency"; // Giả sử bạn đã có helper này để hiển thị tiền
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const AdminFavoritesPage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm lấy danh sách sản phẩm yêu thích từ API
  const fetchFavoriteProducts = async () => {
    try {
      const response = await fetch(SummaryApi.getFavorites.url);
      const data = await response.json();
      setFavoriteProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Có lỗi khi lấy dữ liệu yêu thích:", error);
      setLoading(false);
    }
  };

  const clearFavorites = async () => {
    await fetch(SummaryApi.clearFavorites.url, {
      method: SummaryApi.clearFavorites.method,
    });
    setFavoriteProducts([]);
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold py-4">Sản phẩm yêu thích</h2>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          onClick={clearFavorites}
        >
          Xóa lịch sử yêu thích
        </button>
      </div>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoriteProducts.length === 0 ? (
            <p>Không có sản phẩm yêu thích nào.</p>
          ) : (
            favoriteProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-md p-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-md shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">
                    {product.productName}
                  </h3>
                  <p className="text-gray-600">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-red-600 font-medium">
                      {displayVNDCurrency(product.sellingPrice)}
                    </p>
                    {product.price !== product.sellingPrice && (
                      <p className="text-gray-400 line-through">
                        {displayVNDCurrency(product.price)}
                      </p>
                    )}
                  </div>

                  <div className="mt-2 text-red-500">
                    <FaHeart className="inline mr-2" />
                    Yêu thích
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminFavoritesPage;
