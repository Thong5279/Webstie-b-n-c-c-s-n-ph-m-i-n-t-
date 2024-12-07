import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf, FaHeart, FaRegHeart } from "react-icons/fa";
import displayVNDCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "", // Tên sản phẩm
    brandName: "", // Tên hãng
    category: "", // Loại sản phẩm
    quantity: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImagecoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  // Trạng thái đánh giá
  const [rating, setRating] = useState(0); // Lưu trữ đánh giá của người dùng
  const [hoverRating, setHoverRating] = useState(0); // Lưu trữ trạng thái khi di chuột qua các sao

  // xử lý khi click vào trái tim
  const [likedItems, setLikedItems] = useState(() => {
    const savedLiked = localStorage.getItem("likedItems");
    return savedLiked ? JSON.parse(savedLiked) : {}; // Nếu có thì parse, nếu không thì trả về {}
  });
  const handleHeart = async (e, productId) => {
    e.preventDefault();

    // Cập nhật trạng thái yêu thích
    setLikedItems((prev) => {
      const newLikedItems = {
        ...prev,
        [productId]: !prev[productId],
      };

      // Lưu lại vào localStorage
      localStorage.setItem("likedItems", JSON.stringify(newLikedItems));

      return newLikedItems;
    });

    // Gửi yêu cầu POST lên API để thêm sản phẩm vào danh sách yêu thích
    await fetch(SummaryApi.favorites.url, {
      method: SummaryApi.favorites.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
  };

  const [zoomImg, setZoomImg] = useState(false);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();
    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImg(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y,
    });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImg(false);
  };

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  useEffect(() => {
    setRating(0);
  }, [data]);

  const handleStarClick = (value) => {
    setRating(value); // Lưu lại đánh giá của người dùng
  };

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  // Thêm function fetchReviews
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${SummaryApi.getReviews.url}/${params?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
        setAverageRating(data.averageRating);
      }
    } catch (error) {
      console.error('Lỗi khi tải đánh giá:', error);
    }
  };

  // Thêm useEffect để gọi fetchReviews
  useEffect(() => {
    fetchReviews();
  }, [params?.id]);

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Hình ảnh sản phẩm */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {zoomImg && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] px-1 -right-[510px] top-0 z-10">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] bg-slate-200 mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImagecoordinate.x * 100}%  ${
                      zoomImagecoordinate.y * 100
                    }%`,
                  }}
                />
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => (
                  <div
                    className="h-20 w-20 bg-slate-300 rounded animate-pulse"
                    key={"loadingImage" + index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => (
                  <div
                    className="h-20 w-20 bg-slate-300 rounded p-1"
                    key={imgURL}
                  >
                    <img
                      src={imgURL}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chi tiết sản phẩm */}
        {loading ? (
          // Loading skeleton khi đang tải dữ liệu
          <div className="grid gap-1 w-full">
            {/* Thêm các khung loading ở đây */}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 p-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <div className="flex items-center">
              <p className="capitalize text-slate-400">{data?.category}</p>
              {/* Trái tim */}
              <div
                className={`cursor-pointer ${
                  likedItems[data?._id] ? "text-red-500" : "text-slate-300"
                }`}
                onClick={(e) => handleHeart(e, data?._id)}
              >
                <FaHeart className="text-xl ml-5" />
              </div>
            </div>

            {/* Rating Section
            <div className="flex text-red-600 items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${
                    star <= rating ? "text-red-500" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div> */}

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">
                {displayVNDCurrency(data.sellingPrice)}
              </p>
              {data?.price !== data?.sellingPrice && (
                <p className="line-through opacity-45 text-xl">
                  {displayVNDCurrency(data?.price)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Mua
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:bg-white hover:text-red-600"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">
                Mô tả của sản phẩm:
              </p>
              <p>{data?.description}</p>
            </div>

            {/* Phần đánh giá sản phẩm */}
            <div className="mt-8 border-t pt-6">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold">Đánh giá từ khách hàng</h3>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`text-xl ${
                          index < Math.floor(averageRating) 
                            ? 'text-yellow-400' 
                            : index < averageRating 
                              ? 'text-yellow-300' 
                              : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">
                    {averageRating.toFixed(1)}/5 
                    <span className="text-gray-500 text-base ml-1">
                      ({reviews.length} đánh giá)
                    </span>
                  </span>
                </div>
              </div>
              
              {reviews.length === 0 ? (
                <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600">
                          {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      
                      <p className="text-gray-700">{review.comment}</p>
                      
                      <div className="mt-2 text-sm text-gray-500">
                        Đánh giá bởi: {review.userId.name || 'Người dùng ẩn danh'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {data?.category && (
        <>
          <CategoryWiseProductDisplay
            category={data?.category}
            heading={"Sản phẩm đề xuất"}
          />
          <CategoryWiseProductDisplay
            category={data?.category}
            heading={"Sản phẩm tương tự"}
          />
        </>
      )}
    </div>
  );
};

export default ProductDetails;
