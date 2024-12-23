import React, { useState } from "react";
import axios from "axios";
import SummaryApi from "../common";
import displayVNDCurrency from "../helpers/displayCurrency";

const CheckoutPage = ({
  totalAmount,
  finalPrice,
  onVoucherStatusChange,
  onDiscountAmountChange,
  disabledInputVoucher,
  setIsVoucherValid,
  isVoucherValid,
}) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  // const [isVoucherValid, setIsVoucherValid] = useState(false);

  const handleApplyVoucher = async () => {
    try {
      const response = await axios({
        method: SummaryApi.applyVoucher.method,
        url: SummaryApi.applyVoucher.url,
        data: { code: voucherCode, totalAmount },
      });
      console.log(response.data.discountAmount);

      // Cập nhật discountAmount từ phản hồi API
      const newDiscountAmount = response.data.discountAmount;
      setDiscountAmount(newDiscountAmount);

      // Tính toán totalDiscountAmount sau khi cập nhật discountAmount
      const newTotalDiscountAmount = totalAmount - response.data.discountAmount;
      onDiscountAmountChange(
        newTotalDiscountAmount,
        newDiscountAmount,
        isVoucherValid
      ); // Gọi hàm với giá trị đã được tính toán
      // Cập nhật isVoucherValid
      setIsVoucherValid(true);
      onVoucherStatusChange(true);
    } catch (error) {
      console.error("Lỗi khi áp dụng mã giảm giá:", error);
      alert("Mã giảm giá không hợp lệ hoặc không thể áp dụng.");
      setIsVoucherValid(false);
      onVoucherStatusChange(false);
    }
  };
  const handleClearVoucher = () => {
    setVoucherCode(""); // Xóa mã voucher đã nhập
    setDiscountAmount(0); // Xóa số tiền giảm giá
    setIsVoucherValid(false); // Đặt trạng thái không hợp lệ
    onVoucherStatusChange(false); // Cập nhật trạng thái voucher với component cha
  };

  return (
    <div className=" p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between mb-6 gap-3">
        <input
          type="text"
          className="w-3/4 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Nhập mã giảm giá"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />
        <button
          className="w-1/4 p-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 "
          onClick={handleApplyVoucher}
          disabled={disabledInputVoucher}
        >
          Áp dụng
        </button>
      </div>
      <div className="flex justify-end">
        <button
          className="text-sm text-red-500 underline"
          onClick={handleClearVoucher} // Gọi hàm xóa mã voucher khi nhấn
        >
          Xóa mã giảm giá
        </button>
      </div>

      {isVoucherValid && discountAmount > 0 && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-300">
          <p className="text-lg text-green-700">
            Giảm giá: {displayVNDCurrency(discountAmount)}
          </p>
          {/* <p className="text-xl font-bold text-green-800">
            Tổng tiền sau giảm: {displayVNDCurrency(totalDiscountAmount)}
          </p> */}
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
