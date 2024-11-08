import React, { useState } from "react";
import axios from "axios";
import SummaryApi from "../common";
import displayVNDCurrency from "../helpers/displayCurrency";

const CheckoutPage = ({
  totalAmount,
  finalPrice,
  onVoucherStatusChange,
  onDiscountAmountChange,
}) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isVoucherValid, setIsVoucherValid] = useState(false);

  const handleApplyVoucher = async () => {
    try {
      const response = await axios({
        method: SummaryApi.applyVoucher.method,
        url: SummaryApi.applyVoucher.url,
        data: { code: voucherCode, totalAmount },
      });
      console.log(response.data);
      const totalDiscountAmount = totalAmount - discountAmount;
      console.log(totalDiscountAmount);
      onDiscountAmountChange(totalDiscountAmount);

      setDiscountAmount(response.data.discountAmount);
      setIsVoucherValid(true); //Neu user nhap ma hop le
      onVoucherStatusChange(true); //goi ham onVoucherStatusChange de cap nhat trang thai component cha
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi áp dụng mã giảm giá:", error);
      alert("Mã giảm giá không hợp lệ hoặc không thể áp dụng.");
      setIsVoucherValid(false); //Neu user nhap ma khong hop le
      onVoucherStatusChange(false);
    }
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
        >
          Áp dụng
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
