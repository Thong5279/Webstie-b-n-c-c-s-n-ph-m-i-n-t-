import React, { useState, useEffect } from "react";
import axios from "axios";
import SummaryApi from "../common";
import { IoTrashBin } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import displayVNDCurrency from "../helpers/displayCurrency";

const VoucherManager = () => {
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage"); // Loại giảm giá
  const [discountValue, setDiscountValue] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [vouchers, setVouchers] = useState([]); // Danh sách mã giảm giá

  // Ham update giam gia
  const [editVoucher, setEditVoucher] = useState(null); // Voucher đang chỉnh sửa
  const selectVoucherForEdit = (voucher) => {
    setEditVoucher(voucher);
  };

  // Hàm lấy tất cả mã giảm giá từ cơ sở dữ liệu
  const fetchVouchers = async () => {
    try {
      const response = await axios({
        method: SummaryApi.getAllVouchers.method,
        url: SummaryApi.getAllVouchers.url,
      });
      console.log(response.data);
      setVouchers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách mã giảm giá:", error);
    }
  };

  // Gọi fetchVouchers khi component được render lần đầu
  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleCreateVoucher = async () => {
    try {
      const response = await axios({
        method: SummaryApi.createVoucher.method,
        url: SummaryApi.createVoucher.url,
        data: {
          code,
          discountType,
          discountValue,
          minPurchase,
          expirationDate,
        },
      });
      alert(response.data.message);
      // Làm mới danh sách mã giảm giá và đặt lại các trường sau khi tạo thành công
      fetchVouchers();
      setCode("");
      setDiscountType("percentage");
      setDiscountValue("");
      setMinPurchase("");
      setExpirationDate("");
    } catch (error) {
      console.error("Lỗi khi tạo mã giảm giá:", error);
    }
  };
  const deleteVoucher = async (code) => {
    try {
      await axios({
        method: SummaryApi.deleteVoucher.method,
        url: `${SummaryApi.deleteVoucher.url}/${code}`,
      });
      alert("Đã xóa mã giảm giá");
      fetchVouchers();
    } catch (error) {
      console.error("Lỗi khi xóa mã giảm giá:", error);
    }
  };
  // Ham update ma giam gia
  const updateVoucher = async () => {
    try {
      const response = await axios({
        method: SummaryApi.updateVoucher.method, // Cập nhật dữ liệu nên dùng PUT
        url: `${SummaryApi.updateVoucher.url}/${editVoucher.code}`, // Đường dẫn cập nhật voucher, sử dụng mã voucher
        data: {
          code: editVoucher.code,
          discountType: editVoucher.discountType,
          discountValue: editVoucher.discount,
          minPurchase: editVoucher.minPurchase,
          expirationDate: editVoucher.expirationDate,
        },
      });
      alert(response.data.message); // Thông báo sau khi cập nhật thành công
      fetchVouchers(); // Làm mới danh sách mã giảm giá
      setEditVoucher(null); // Đặt lại trạng thái sau khi cập nhật thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật mã giảm giá:", error);
      alert("Cập nhật mã giảm giá thất bại");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-14">
      <h2 className="text-2xl font-bold mb-4">Tạo Mã Giảm Giá</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Mã giảm giá"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Cho phép chọn giảm giá theo phần trăm hoặc số tiền cụ thể */}
        <select
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-100 transition-all duration-200"
        >
          <option value="percentage">Giảm giá (%)</option>
          <option value="amount">Giảm giá theo số tiền</option>
        </select>
        <input
          type="number"
          placeholder="Số tiền giảm"
          value={discountValue}
          onChange={(e) => setDiscountValue(Number(e.target.value))}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-lg transition-all duration-200 hover:bg-gray-50"
        />

        <input
          type="number"
          placeholder="Giá trị tối thiểu"
          value={minPurchase}
          onChange={(e) => setMinPurchase(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="date"
          placeholder="Ngày hết hạn"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleCreateVoucher}
          className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md transition duration-200 hover:bg-red-400 hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105"
        >
          Tạo Mã Giảm Giá
        </button>
      </div>

      {/* Bảng danh sách mã giảm giá */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Danh Sách Mã Giảm Giá
        </h3>
        <table className="w-full table-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 w-full">
              <th className="px-6 py-3 text-left font-semibold">Mã</th>
              <th className="px-6 py-3 text-left font-semibold">
                Giảm Giá (%)
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                Số Tiền Tối Thiểu
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                Ngày Hết Hạn
              </th>
              <th className="px-6 py-3 text-left font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(vouchers) &&
              vouchers.map((voucher) => (
                <tr
                  key={voucher.code}
                  className="text-gray-800 text-sm border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-6 py-3">{voucher.code}</td>

                  <td className="px-6 py-3">
                    {/* Kiểm tra xem voucher là giảm giá theo phần trăm hay số tiền */}
                    {voucher.discountType === "percentage"
                      ? `${voucher.discountValue}%`
                      : voucher.discountValue
                      ? `${voucher.discountValue.toLocaleString("vi-VN")} VND`
                      : "Không có giá trị"}
                  </td>

                  <td className="px-6 py-3">
                    {/* Kiểm tra voucher.minPurchase có giá trị hợp lệ */}
                    {voucher.minPurchase
                      ? `${voucher.minPurchase.toLocaleString("vi-VN")} VND`
                      : "Không có giá trị"}
                  </td>

                  <td className="px-6 py-3">
                    {/* Kiểm tra voucher.expirationDate có giá trị hợp lệ */}
                    {voucher.expirationDate
                      ? new Date(voucher.expirationDate).toLocaleDateString(
                          "vi-VN"
                        )
                      : "Không có ngày hết hạn"}
                  </td>

                  <td className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => deleteVoucher(voucher.code)}
                        className="p-2 text-red-500 transition duration-200"
                      >
                        <IoTrashBin size={18} className="hover:text-red-700" />
                      </button>
                      <button
                        onClick={() => selectVoucherForEdit(voucher)}
                        className="p-2 text-red-500 transition duration-200"
                      >
                        <FaPen size={17} className="hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Ham update ma gia gia */}
      {editVoucher && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative max-w-md w-full p-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-2xl transform transition-all scale-100">
            {/* Nút đóng modal */}
            <button
              onClick={() => setEditVoucher(null)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
            >
              <IoMdClose size={24} />
            </button>

            <h3 className="text-2xl font-semibold mb-6 text-red-600 text-center">
              Chỉnh Sửa Mã Giảm Giá
            </h3>
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Mã giảm giá"
                value={editVoucher.code}
                onChange={(e) =>
                  setEditVoucher({ ...editVoucher, code: e.target.value })
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700 placeholder-gray-400"
              />

              {/* Trường chọn kiểu giảm giá */}
              <select
                value={editVoucher.discountType}
                onChange={(e) =>
                  setEditVoucher({
                    ...editVoucher,
                    discountType: e.target.value,
                  })
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700"
              >
                <option value="percentage">Giảm giá (%)</option>
                <option value="amount">Giảm giá theo số tiền</option>
              </select>

              {/* Trường nhập giá trị giảm giá */}
              <input
                type="number"
                placeholder={
                  editVoucher.discountType === "percentage"
                    ? "Giảm Giá (%)"
                    : "Giảm Giá (VND)"
                }
                value={editVoucher.discount}
                onChange={(e) =>
                  setEditVoucher({
                    ...editVoucher,
                    discount: Number(e.target.value),
                  })
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700 placeholder-gray-400"
              />

              {/* Trường nhập giá trị tối thiểu */}
              <input
                type="number"
                placeholder="Giá trị tối thiểu (VND)"
                value={editVoucher.minPurchase}
                onChange={(e) =>
                  setEditVoucher({
                    ...editVoucher,
                    minPurchase: Number(e.target.value),
                  })
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700 placeholder-gray-400"
              />

              {/* Trường chọn ngày hết hạn */}
              <input
                type="date"
                value={new Date(editVoucher.expirationDate)
                  .toISOString()
                  .slice(0, 10)}
                onChange={(e) =>
                  setEditVoucher({
                    ...editVoucher,
                    expirationDate: e.target.value,
                  })
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700"
              />

              <button
                onClick={updateVoucher}
                className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg transition duration-200 transform hover:bg-red-400 hover:shadow-xl hover:-translate-y-0.5 hover:scale-105"
              >
                Cập Nhật Mã Giảm Giá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherManager;
