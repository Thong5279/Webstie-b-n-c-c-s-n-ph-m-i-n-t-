import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayVNDCurrency from "../helpers/displayCurrency";
import { toast } from 'react-toastify';
import { FaHeart, FaStar, FaCheckCircle, FaBox } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';
import { BiHappyHeartEyes } from 'react-icons/bi';
import { BiComment } from 'react-icons/bi';

const translatePaymentStatus = (status) => {
  const statusMap = {
    paid: "Đã thanh toán",
    unpaid: "Chưa thanh toán",
    pending: "Đang xử lý",
    failed: "Thanh toán thất bại",
  };
  return statusMap[status] || status;
};

const formatOrderId = (id) => {
  // Lấy 8 ký tự cuối của ID
  return `#${id.slice(-8).toUpperCase()}`;
};

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [ratings, setRatings] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [comment, setComment] = useState('');
  const [reviewedProducts, setReviewedProducts] = useState({});

  const openReviewModal = (product) => {
    console.log('Product data:', product);
    // Lấy thông tin sản phẩm từ productDetails
    const productToReview = {
      productId: product.productDetails[0].productId, // Lấy ID sản phẩm từ productDetails
      name: product.productDetails[0].name
    };
    console.log('Product to review:', productToReview);
    setCurrentProduct(productToReview);
    setShowModal(true);
  };

  // Handle star click and save the rating
  const handleRating = (productId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };

  const handleRatingChange = (value) => {
    if (!currentProduct?.productId) return;
    
    setRatings(prev => ({
      ...prev,
      [currentProduct.productId]: value
    }));
  };

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();

    setData(responseData.data);

    console.log("danh sách đơn hàng", responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    const checkReviewedProducts = async () => {
      try {
        const reviewedStatus = {};
        
        // Kiểm tra từng sản phẩm trong đơn hàng
        for (const order of data) {
          const productId = order.productDetails[0].productId;
          const response = await fetch(`${SummaryApi.checkReview.url}/${productId}`, {
            credentials: 'include'
          });
          
          const result = await response.json();
          if (result.success && result.hasReviewed) {
            reviewedStatus[productId] = true;
          }
        }
        
        setReviewedProducts(reviewedStatus);
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đánh giá:', error);
      }
    };

    if (data.length > 0) {
      checkReviewedProducts();
    }
  }, [data]);

  useEffect(() => {
    // Khôi phục trạng thái từ localStorage
    const savedReviewedProducts = localStorage.getItem('reviewedProducts');
    if (savedReviewedProducts) {
      setReviewedProducts(JSON.parse(savedReviewedProducts));
    }
  }, []);

  const handleSubmitReview = async () => {
    try {
      if (!currentProduct?.productId) {
        toast.error('Không tìm thấy thông tin sản phẩm!');
        return;
      }

      if (!ratings[currentProduct.productId]) {
        toast.error('Vui lòng chọn sao đánh giá!');
        return;
      }
      
      if (!comment.trim()) {
        toast.error('Vui lòng nhập nhận xét của bạn!');
        return;
      }

      const response = await fetch(SummaryApi.review.url, {
        method: SummaryApi.review.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: currentProduct.productId,
          rating: ratings[currentProduct.productId],
          comment: comment
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setReviewedProducts(prev => {
            const newState = {
              ...prev,
              [currentProduct.productId]: true
            };
            localStorage.setItem('reviewedProducts', JSON.stringify(newState));
            return newState;
          });
          
          toast.success('Đánh giá sản phẩm thành công');
          setShowModal(false);
          setComment('');
          setRatings(prev => ({
            ...prev,
            [currentProduct.productId]: 0
          }));
        } else {
          toast.error(data.message || 'Đã xảy ra lỗi khi gửi đánh giá');
        }
      } else {
        toast.error('Lỗi kết nối với server');
      }

    } catch (error) {
      console.error('Lỗi khi gửi đánh giá:', error);
      toast.error('Đã xảy ra lỗi khi gửi đánh giá');
    }
  };

  return (
    <div className="p-6 container w-full max-w-full mx-auto">
      {!data[0] ? (
        <p className="text-center text-xl font-semibold text-gray-600">
          Không có đơn hàng nào
        </p>
      ) : (
        data.map((item, index) => (
          <div
            key={item.userId + index}
            className="mb-8 p-6 border rounded-xl shadow-lg bg-gradient-to-r from-white via-gray-50 to-gray-100"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start mb-5">
              <p className="font-semibold text-lg text-gray-700">
                {moment(item.createdAt).format(
                  "dddd, [ngày] DD [tháng] MM [năm] YYYY, HH:mm"
                )}
              </p>
              <p className="text-gray-600">
                Mã đơn hàng:{" "}
                <span className="font-semibold text-black">
                  {formatOrderId(item._id)}
                </span>
              </p>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <div className="space-y-5">
                {item?.productDetails.map((product, index) => (
                  <div
                    key={product.productId + index}
                    className="flex flex-col lg:flex-row gap-4 items-center bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <img
                      src={product?.image?.[0] || ""}
                      alt="product"
                      className="w-24 h-24 bg-gray-200 object-contain rounded-lg shadow-sm transition-transform transform hover:scale-105"
                    />
                    <div className="flex-1 mt-4 lg:mt-0 w-full text-center lg:text-left">
                      <div className="font-semibold text-lg text-gray-800 truncate">
                        {product?.name}
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-gray-700">
                        <div className="text-red-600 font-semibold">
                          {displayVNDCurrency(product?.price)}
                        </div>
                        <p className="text-gray-500">
                          Số lượng: {product?.quantity}
                        </p>
                      </div>

                      {/* Rating Section with Clickable Stars */}
                      {/* <div className="flex items-center mt-3 text-red-500">
                        {Array.from({ length: 5 }, (_, i) => (
                          <svg
                            key={i}
                            onClick={() =>
                              handleRating(product.productId, i + 1)
                            }
                            className={`w-6 h-6 cursor-pointer ${
                              ratings[product.productId] &&
                              i < ratings[product.productId]
                                ? "fill-current"
                                : "fill-gray-300"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10 15l-3.09 1.637 0.586-3.421-2.518-2.458 3.464-0.504L10 6l1.557 3.25 3.464 0.504-2.518 2.458 0.586 3.421L10 15z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-600">
                          {ratings[product.productId] || "Chưa đánh giá"}
                        </span>
                      </div> */}
                    </div>
                  </div>
                ))}

                <div className="flex flex-col lg:flex-row gap-6 p-5 border-t border-gray-200">
                  <div className="lg:w-1/2">
                    <div className="font-semibold text-lg text-gray-800">
                      Chi tiết thanh toán
                    </div>
                    <p className="mt-3 text-gray-600">
                      Phương thức thanh toán:{" "}
                      {item.paymentDetails.payment_method_type[0]}
                    </p>
                    <p className="mt-2 text-gray-600">
                      Trạng thái thanh toán:{" "}
                      {translatePaymentStatus(
                        item.paymentDetails.payment_status
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="font-semibold text-xl mt-5 text-gray-900 flex items-center justify-between">
                <div>
                  Tổng tiền (VND): {displayVNDCurrency(item.totalAmount)}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  {reviewedProducts[item.productDetails[0].productId] ? (
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-not-allowed flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                      disabled
                    >
                      <BiHappyHeartEyes className="text-xl" />
                      <span>Cảm ơn đã đánh giá</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openReviewModal(item)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaBox className="text-xl" />
                      <span>Đã nhận được hàng</span>
                    </button>
                  )}
                </div>
              </div>

              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg w-96">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <MdRateReview className="text-red-500" />
                      Đánh giá sản phẩm
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-600">Đánh giá:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`text-2xl cursor-pointer transition-colors ${
                              (ratings[currentProduct?.productId] || 0) >= star 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                            onClick={() => setRatings(prev => ({
                              ...prev,
                              [currentProduct?.productId]: star
                            }))}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-600 mb-2 flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        Nhận xét của bạn:
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows="4"
                        placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleSubmitReview}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                      >
                        <FaCheckCircle />
                        Gửi đánh giá
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
