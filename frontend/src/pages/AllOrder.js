import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import 'moment/locale/vi';
import displayVNDCurrency from '../helpers/displayCurrency';

const translatePaymentStatus = (status) => {
  const statusMap = {
    paid: "Đã thanh toán",
    unpaid: "Chưa thanh toán",
    pending: "Đang xử lý",
    failed: "Thanh toán thất bại"
  };
  return statusMap[status] || status;
};

const formatOrderId = (id) => {
  return `#${id.slice(-8).toUpperCase()}`;
};

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch(SummaryApi.getAllOrders.url, {
        method: SummaryApi.getAllOrders.method,
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Đang tải...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Quản Lý Đơn Hàng</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Mã đơn hàng</th>
              <th className="px-6 py-3 text-left">Thời gian</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Sản phẩm</th>
              <th className="px-6 py-3 text-left">Trạng thái</th>
              <th className="px-6 py-3 text-right">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{formatOrderId(order._id)}</td>
                <td className="px-6 py-4">
                  {moment(order.createdAt).format('DD/MM/YYYY HH:mm')}
                </td>
                <td className="px-6 py-4">{order.email}</td>
                <td className="px-6 py-4">
                  {order.productDetails.map((product, index) => (
                    <div key={index} className="mb-2">
                      {product.name} x {product.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {translatePaymentStatus(order.paymentDetails.payment_status)}
                </td>
                <td className="px-6 py-4 text-right">
                  {displayVNDCurrency(order.totalAmount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          Chưa có đơn hàng nào
        </div>
      )}
    </div>
  );
};

export default AllOrder;