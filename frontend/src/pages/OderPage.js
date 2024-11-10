import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayVNDCurrency from "../helpers/displayCurrency";

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

  // Handle star click and save the rating
  const handleRating = (productId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
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
                {moment(item.createdAt).format("DD/MM/YYYY")}
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
                      <div className="flex items-center mt-3 text-red-500">
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
                      </div>
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

              <div className="font-semibold text-xl mt-5 text-gray-900">
                <div>
                  Tổng tiền (VND): {displayVNDCurrency(item.totalAmount)}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
