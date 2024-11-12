import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import axios from "axios";

const Allmember = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(SummaryApi.getUserTier.url);
        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    // <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    //   <h2 className="text-3xl font-bold text-center text-gray-800 py-6">
    //     Danh Sách Người Dùng
    //   </h2>
    //   <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
    //     <thead className="bg-red-500 text-white uppercase text-sm leading-normal">
    //       <tr>
    //         <th className="py-4 px-6 text-left">Tên</th>
    //         <th className="py-4 px-6 text-left">Email</th>
    //         <th className="py-4 px-6 text-left">Hạng</th>
    //         <th className="py-4 px-6 text-center">Điểm</th>
    //         <th className="py-4 px-6 text-center">Tiến Trình Lên Hạng</th>
    //       </tr>
    //     </thead>
    //     <tbody className="text-gray-600 text-sm font-light">
    //       {users.map((user) => (
    //         <tr
    //           key={user._id}
    //           className="border-b border-gray-200 hover:bg-red-100"
    //         >
    //           <td className="py-4 px-6 text-left whitespace-nowrap">
    //             {user.name}
    //           </td>
    //           <td className="py-4 px-6 text-left whitespace-nowrap">
    //             {user.email}
    //           </td>
    //           <td
    //             className={`py-4 px-6 text-left font-semibold ${user.tierColor}`}
    //           >
    //             <span className="inline-block">{user.tierIcon}</span>{" "}
    //             {user.tier}
    //           </td>
    //           <td className="py-4 px-6 text-center font-semibold">
    //             {user.points}
    //           </td>
    //           <td className="py-4 px-6 text-center">
    //             {user.nextTierProgress.nextTier
    //               ? `${user.nextTierProgress.progress.toFixed(1)}% đến ${
    //                   user.nextTierProgress.nextTier.name
    //                 }`
    //               : "Đã đạt hạng cao nhất"}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 py-6">
        Danh Sách Người Dùng
      </h2>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="py-4 px-6 text-left">Tên</th>
            <th className="py-4 px-6 text-left">Email</th>
            <th className="py-4 px-6 text-left">Hạng</th>
            <th className="py-4 px-6 text-center">Điểm</th>
            <th className="py-4 px-6 text-center">Tiến Trình Lên Hạng</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light cursor-default">
          {users.map((user) => (
            <tr
              key={user._id}
              className="relative border-b border-gray-200 hover:bg-gray-100 group"
            >
              <td className="py-4 px-6 text-left whitespace-nowrap">
                {user.name}
              </td>
              <td className="py-4 px-6 text-left whitespace-nowrap">
                {user.email}
              </td>
              <td
                className={`py-4 px-6 text-left font-semibold ${user.tierColor}`}
              >
                <span className="inline-block">{user.tierIcon}</span>{" "}
                {user.tier}
              </td>
              <td className="py-4 px-6 text-center font-semibold">
                {user.points}
              </td>
              <td className="py-4 px-6 text-center">
                {user.nextTierProgress.nextTier
                  ? `${user.nextTierProgress.progress.toFixed(1)}% đến ${
                      user.nextTierProgress.nextTier.name
                    }`
                  : "Đã đạt hạng cao nhất"}
              </td>

              {/* Tooltip */}
              <div className="absolute left-1/2 top-full mt-2 w-64 bg-red-400 text-white rounded-lg shadow-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform -translate-x-1/2 z-30">
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Điểm: {user.points}</p>
                <p>Hạng: {user.tier}</p>
                <p>
                  Tiến Trình Lên Hạng:{" "}
                  {user.nextTierProgress.nextTier
                    ? `${user.nextTierProgress.progress.toFixed(1)}% đến ${
                        user.nextTierProgress.nextTier.name
                      }`
                    : "Đã đạt hạng cao nhất"}
                </p>
                <p>Địa Chỉ: {user.address || "Chưa cập nhật"}</p>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allmember;
