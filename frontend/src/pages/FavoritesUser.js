import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common"; // Đảm bảo rằng bạn có SummaryApi chứa URL của API
import displayVNDCurrency from "../helpers/displayCurrency";
import { FaHeart } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

const FavoritesUser = () => {
  const [favorites, setFavorites] = useState([]); // Lưu trữ sản phẩm yêu thích
  const [loading, setLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const response = await fetch(SummaryApi.getUserFavorites.url, {
          method: SummaryApi.getUserFavorites.method,
          credentials: "include", // Đảm bảo gửi cookie khi yêu cầu API
        });

        if (!response.ok) {
          const result = await response.json();
          console.error("Lỗi từ API:", result.message);
          return;
        }

        const result = await response.json();
        setFavorites(result); // Lưu sản phẩm yêu thích vào state
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy sản phẩm yêu thích:", error);
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchUserFavorites();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  const handleRemoveFavorite = async (productId) => {
    try {
      const response = await fetch(SummaryApi.userFavorites.url, {
        method: SummaryApi.userFavorites.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const result = await response.json();
        console.error("Lỗi từ API:", result.message);
        return;
      }

      setFavorites((prev) =>
        prev.filter((product) => product._id !== productId)
      ); // Cập nhật danh sách
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa sản phẩm yêu thích:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-3xl font-semibold py-4 text-center text-gray-800">
        Sản phẩm yêu thích của bạn
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">
            Không có sản phẩm yêu thích nào.
          </p>
        ) : (
          favorites.map((product, index) => (
            <div
              key={product._id}
              className="w-full bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative"
            >
              <Link to={`/product/${product._id}`} className="block">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="object-cover w-full h-48 hover:scale-110 transition-all duration-300"
                  />
                  <div className="absolute top-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full h-full"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-xl text-gray-800 truncate">
                    {product.productName}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 mt-2">{product.category}</p>
                    <div className="mt-2 text-red-500">
                      <FaHeart className="inline mr-2" />
                      Yêu thích
                    </div>
                  </div>
                  <p className="text-red-600 font-semibold text-lg mt-2 flex items-center justify-between">
                    {displayVNDCurrency(product.sellingPrice)}
                    <p className="text-slate-400 line-through">
                      {displayVNDCurrency(product.price)}
                    </p>
                  </p>
                </div>
              </Link>

              <div
                className="absolute top-0 right-0 p-3 rounded hover:bg-red-400 hover:text-white cursor-pointer group"
                onClick={() => handleRemoveFavorite(product._id)}
              >
                <BsTrash />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesUser;
