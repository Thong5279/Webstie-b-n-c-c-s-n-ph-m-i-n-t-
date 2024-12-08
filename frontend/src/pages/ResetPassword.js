import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { IoEye, IoEyeOff } from "react-icons/io5";
import forgotPass1 from "../img/Forgot password2.gif";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const phone = localStorage.getItem("resetPasswordPhone");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    if (password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(SummaryApi.resetPassword.url, {
        method: SummaryApi.resetPassword.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("resetPasswordPhone");
        toast.success("Đặt lại mật khẩu thành công");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="my-[200px]">
      <div className="container mx-auto p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-md">
          <h2 className="text-center text-2xl mb-2">Đặt lại mật khẩu</h2>
          <div className="flex justify-center">
            <img src={forgotPass1} className="w-[300px] h-[300px]" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-4">
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEye /> : <IoEyeOff />}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent outline-none"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full rounded-full transition-all disabled:bg-gray-400"
            >
              {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
