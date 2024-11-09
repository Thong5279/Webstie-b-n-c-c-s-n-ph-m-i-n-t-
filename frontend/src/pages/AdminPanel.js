import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaCircleUser, FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import { FaUsers } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiAlertFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRegMoneyBill } from "react-icons/fa";
import { FaHeartCircleCheck } from "react-icons/fa6";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col ">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              /> //them hinh anh
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>{" "}
          {/* chữ cái đầu viết hoacapitalize text-lg} */}
          <p className="text-sm">{user?.role}</p>
          {/* Hiện vai trò của người dùng} */}
        </div>
        {/*Điều hướng  */}
        <div>
          <nav className="grid">
            <Link
              to={"all-user"}
              className="px-2 py-1 flex items-center mt-2 transition hover:bg-red-400 hover:text-white"
            >
              <FaUsers className="mr-2 text-2xl text-blue-600" />
              Người dùng trên hệ thống
            </Link>
            <Link
              to={"all-product"}
              className="px-2 py-1 flex items-center mt-2 transition hover:bg-red-400 hover:text-white"
            >
              <MdProductionQuantityLimits className="mr-2 text-2xl text-green-600" />
              Sản phẩm Trên hệ thống
            </Link>
            <Link
              to={"low-stock-products"}
              className="px-2 py-1 flex items-center mt-2 transition hover:bg-red-400 hover:text-white"
            >
              <RiAlertFill className="mr-2 text-2xl text-red-600" />
              Sản phẩm sắp hết hàng
            </Link>
            <Link
              to={"all-order"}
              className="px-2 py-1 flex items-center mt-2 transition hover:bg-red-400 hover:text-white"
            >
              <FaShoppingCart className="mr-2 text-2xl text-blue-600" />
              Đơn hàng trên hệ thống
            </Link>
            <Link
              to={"all-voucher"}
              className="px-2 py-1 flex items-center mt-2 transition hover:bg-red-400 hover:text-white"
            >
              <FaTicketAlt className="mr-2 text-2xl text-green-600" />
              Mã giảm giá
            </Link>
            <Link
              to={"all-favorites"}
              className="px-2 py-1 flex items-center mt-2 transition hover:bg-red-400 hover:text-white"
            >
              <FaHeartCircleCheck className="mr-2 text-2xl text-red-600" />
              Sản phẩm được yêu thích
            </Link>
            <Link
              to={"all-review"}
              className="px-2 py-1 flex items-center mt-2 transition hover:bg-red-400 hover:text-white"
            >
              <FaRegComment className="mr-2 text-2xl text-red-600" />
              Đánh giá trên hệ thống
            </Link>
            <Link
              to={"all-contact"}
              className="px-2 py-1 flex items-center mt-2 transition hover:bg-red-400 hover:text-white"
            >
              <FaRegEnvelope className="mr-2 text-2xl text-blue-600" />
              Liên hệ trên hệ thống
            </Link>
            <Link
              to={"all-blog"}
              className="px-2 py-1 flex items-center mt-2 transition hover:bg-red-400 hover:text-white"
            >
              <FaRegNewspaper className="mr-2 text-2xl text-blue-600" />
              Bài viết trên hệ thống
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
