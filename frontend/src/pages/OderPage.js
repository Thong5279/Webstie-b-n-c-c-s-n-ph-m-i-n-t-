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
    // <div>
    //    {
    //     !data[0] && (
    //      <p>Không có đơn hàng nào</p>
    //     )
    //    }
    //    <div className='p-4 w-full '>
    //     {
    //       data.map((item,index) => {
    //        return(
    //         <div key={index.userId+index} className=''>
    //          <div className='flex justify-between items-center'>
    //            <p className='font-medium text-lg'>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
    //            <p className='text-gray-600'>Mã đơn hàng: <span className='font-medium text-black'>{formatOrderId(item._id)}</span></p>
    //          </div>
    //          <div className='border rounded'>
    //          <div className='grid gap-2'>
    //              {
    //                item?.productDetails.map((product,index) => {
    //                  return(
    //                    <div key={product.productId+index} className='flex gap-3 bg-slate-100'>
    //                      <img src={product?.image && product.image.length > 0 ? product.image[0] : ''}
    //                      alt='product'
    //                      className='w-28 h-28 bg-slate-300 object-scale-down p-2 '
    //                      />
    //                        <div>
    //                            <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product?.name}</div>
    //                            <div className='flex items-center gap-5 mt-2'>
    //                            <div className='text-red-500 font-medium'>{displayVNDCurrency(product?.price)}</div>
    //                            <p>Số lượng: {product?.quantity}</p>
    //                            </div>
    //                        </div>
    //                    </div>
    //                  )
    //                })
    //              }
    //              <div className='flex flex-col lg:flex-row gap-3 p-4'>
    //                <div>
    //                  <div className='font-medium text-lg'>Chi tiết thanh toán</div>
    //                  <p className='mt-2 font-medium ml-1'>Phương thức thanh toán: {item.paymentDetails.payment_method_type[0]}</p>
    //                  <p className='mt-2 font-medium ml-1'>Trạng thái thanh toán: {translatePaymentStatus(item.paymentDetails.payment_status)}</p>
    //                </div>
    //              </div>
    //           </div>

    //           <div className='font-medium text-lg mt-2'>
    //             <div>Tổng tiền (VND): {displayVNDCurrency(item.totalAmount)}</div>

    //           </div>
    //          </div>
    //          </div>
    //         )
    //        })
    //      }
    //    </div>
    //  </div>
    <div className="p-6 w-full">
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
            <div className="flex justify-between items-center mb-5">
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
                    className="flex gap-5 items-center bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <img
                      src={product?.image?.[0] || ""}
                      alt="product"
                      className="w-24 h-24 bg-gray-200 object-contain rounded-lg shadow-sm transition-transform transform hover:scale-105"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg text-gray-800 truncate">
                        {product?.name}
                      </div>
                      <div className="flex items-center gap-8 mt-3 text-gray-700">
                        <div className="text-red-600 font-semibold">
                          {displayVNDCurrency(product?.price)}
                        </div>
                        <p className="text-gray-500">
                          Số lượng: {product?.quantity}
                        </p>
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
