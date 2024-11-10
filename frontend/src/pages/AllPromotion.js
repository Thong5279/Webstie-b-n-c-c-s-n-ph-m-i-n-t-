import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { FaChartLine, FaMoneyBillWave, FaShoppingCart, FaUsers } from 'react-icons/fa';
import displayVNDCurrency from '../helpers/displayCurrency';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const AllPromotion = () => {
  const [orderStats, setOrderStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    totalCustomers: 0,
    revenueByMonth: [],
    paymentMethodStats: []
  });

  const fetchOrderStats = async () => {
    try {
      const response = await fetch(SummaryApi.getAllOrders.url, {
        method: SummaryApi.getAllOrders.method,
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        // Tính toán các thống kê
        const orders = data.data;
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const uniqueCustomers = new Set(orders.map(order => order.userId)).size;
        
        // Thống kê theo tháng
        const revenueByMonth = processRevenueByMonth(orders);
        
        // Thống kê phương thức thanh toán
        const paymentStats = processPaymentMethods(orders);

        setOrderStats({
          totalRevenue,
          totalOrders: orders.length,
          averageOrderValue: totalRevenue / orders.length,
          totalCustomers: uniqueCustomers,
          revenueByMonth,
          paymentMethodStats: paymentStats
        });
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };

  const processRevenueByMonth = (orders) => {
    const monthlyRevenue = {};
    orders.forEach(order => {
      const month = moment(order.createdAt).format('MM/YYYY');
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.totalAmount;
    });
    return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue
    }));
  };

  const processPaymentMethods = (orders) => {
    const paymentMethods = {};
    orders.forEach(order => {
      const method = order.paymentDetails.payment_method_type[0];
      paymentMethods[method] = (paymentMethods[method] || 0) + 1;
    });
    return Object.entries(paymentMethods).map(([method, count]) => ({
      method,
      count
    }));
  };

  useEffect(() => {
    fetchOrderStats();
  }, []);

  // Cấu hình biểu đồ doanh thu
  const revenueChartData = {
    labels: orderStats.revenueByMonth.map(item => item.month),
    datasets: [{
      label: 'Doanh thu theo tháng',
      data: orderStats.revenueByMonth.map(item => item.revenue),
      borderColor: 'rgb(220, 38, 38)',
      tension: 0.1
    }]
  };

  // Cấu hình biểu đồ phương thức thanh toán
  const paymentChartData = {
    labels: orderStats.paymentMethodStats.map(item => item.method),
    datasets: [{
      data: orderStats.paymentMethodStats.map(item => item.count),
      backgroundColor: [
        'rgb(220, 38, 38)',
        'rgb(59, 130, 246)',
        'rgb(34, 197, 94)'
      ]
    }]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Thống Kê Doanh Thu</h1>
      
      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaMoneyBillWave />}
          title="Tổng Doanh Thu"
          value={displayVNDCurrency(orderStats.totalRevenue)}
          color="text-red-600"
        />
        <StatCard
          icon={<FaShoppingCart />}
          title="Tổng Đơn Hàng"
          value={orderStats.totalOrders}
          color="text-blue-600"
        />
        <StatCard
          icon={<FaChartLine />}
          title="Giá Trị Trung Bình/Đơn"
          value={displayVNDCurrency(orderStats.averageOrderValue)}
          color="text-green-600"
        />
        <StatCard
          icon={<FaUsers />}
          title="Tổng Khách Hàng"
          value={orderStats.totalCustomers}
          color="text-purple-600"
        />
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Doanh Thu Theo Tháng</h2>
          <Line data={revenueChartData} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Phương Thức Thanh Toán</h2>
          <Pie data={paymentChartData} />
        </div>
      </div>
    </div>
  );
};

// Component thẻ thống kê
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className={`text-2xl ${color} mb-2`}>{icon}</div>
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </div>
);

export default AllPromotion;