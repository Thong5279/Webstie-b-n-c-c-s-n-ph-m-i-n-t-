import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SummaryApi from "../common";
import forgotPass from "../img/Forgot password.gif";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting phone:", phone);

    try {
      console.log("Making request to:", SummaryApi.forgotPassword.url);
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        localStorage.setItem("resetPasswordPhone", phone);
        toast.success("Mã xác nhận đã được gửi đến email của bạn");
        navigate("/verify-code");
      } else {
        toast.error(data.message || "Số điện thoại không tồn tại");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-[200px] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Quên Mật Khẩu
        </h2>
        <div className="flex justify-center">
          <img src={forgotPass} className="w-[300px] h-[300px]" />
        </div>

        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
          Số điện thoại:
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="Nhập số điện thoại của bạn"
          required
          pattern="[0-9]{10}"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
        />
        <Link to={"/login"}>
          <p className="text-right mt-2 hover:text-red-500 hover:underline">
            Bạn đã có tài khoản ?
          </p>
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 disabled:bg-gray-400"
        >
          {isLoading ? "Đang xử lý..." : "Tiếp theo"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
