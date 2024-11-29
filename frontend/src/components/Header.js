import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { ImSearch, ImCross } from "react-icons/im";
import { FaCircleUser, FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import { toast } from "react-toastify";
import Context from "../context";
import { FaRegEnvelope } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"; 
import { FaCog } from "react-icons/fa";
import { FaBox, FaUsers, FaTicketAlt, FaExclamationTriangle, FaSignOutAlt } from "react-icons/fa";
import { 
  FaChartLine, 
  FaFileInvoiceDollar, 
  FaArrowUp, 
  FaShoppingCart 
} from "react-icons/fa";
import { 
  FaComments, 
} from "react-icons/fa";

const Header = () => {
  // Sử dụng hook useSelector để truy xuất dữ liệu người dùng từ Redux store
  // state?.user?.user: Truy cập vào state, có sử dụng optional chaining (?.) để tránh lỗi nếu state hoặc user không tồn tại
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();

  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");

  const [search, setSearch] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState([]);

  // Khi click ra ngoài thì ẩn gợi ý tìm kiếm
  const suggestionRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  console.log("searchInput", searchInput);

  // Định nghĩa hàm handleLogout để xử lý việc đăng xuất
  const handleLogout = async () => {
    // Gửi yêu cầu đăng xuất tới API
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method, // Sử dụng phương thức HTTP được định nghĩa trong API (ví dụ: POST)
      credentials: "include",
    });
    // Chuyển đổi phản hồi thành định dạng JSON
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message); // Cập nhật Redux store: xóa thông tin người dùng bằng cách gửi action setUserDetails(null)
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = async (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      // Gọi API gợi ý tìm kiếm
      const response = await fetch(
        `${SummaryApi.suggestProduct.url}?q=${value}`
      );
      const data = await response.json();
      setSuggestions(data.data); // Lưu gợi ý vào state
      navigate(`/search?q=${value}`);
    } else {
      setSuggestions([]); // Xóa gợi ý khi không có từ khóa
      navigate("/search");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.productName); // Ghi lại tên sản phẩm vào ô tìm kiếm
    setSuggestions([]); // Ẩn gợi ý
    navigate(`/search?q=${suggestion.productName}`); // Điều hướng đến trang tìm kiếm
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 relative hover:shadow-custom hover:border-1 hover:border-transparent hover:border-t hover:border-b hover:border-solid hover:border-r-0">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm ....."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <ImSearch />
          </div>

          {/* gợi ý tìm kiếm */}
          <div
            ref={suggestionRef}
            className=" top-full block w-full absolute mt-4"
          >
            {suggestions.length > 0 && (
              <div className="absolute bg-white w-80 shadow-lg rounded">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion._id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.productName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center" ref={menuRef}>
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  /> //them hinh anh
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 left-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {/* Hiển thị trên admin */}
                  {user?.role === ROLE.ADMIN && (
                    <div className="flex flex-col min-w-[250px] bg-white rounded-lg overflow-hidden shadow-xl border border-gray-100">
                      {/* Header của menu */}
                      <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <FaCog className="text-2xl text-white animate-spin-slow" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">Trang Quản Lý</h3>
                            <p className="text-white/80 text-sm">Xin chào, Admin!</p>
                          </div>
                        </div>
                      </div>

                      {/* Thêm phần thống kê nhanh */}
                      <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 border-b border-gray-100">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="text-sm text-gray-500">Doanh thu tháng</div>
                          <div className="text-lg font-semibold text-green-600">12.5M</div>
                          <div className="text-xs text-green-500 flex items-center gap-1">
                            <FaArrowUp /> +15.3%
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="text-sm text-gray-500">Đơn hàng mới</div>
                          <div className="text-lg font-semibold text-blue-600">25</div>
                          <div className="text-xs text-blue-500 flex items-center gap-1">
                            <FaShoppingCart /> Hôm nay
                          </div>
                        </div>
                      </div>

                      {/* Các mục quản lý */}
                      <div className="p-2">
                        <Link
                          to="/admin-panel/chat"
                          className="flex items-center gap-3 p-3 hover:bg-pink-50 rounded-lg group transition-all duration-300"
                          onClick={() => setMenuDisplay(false)}
                        >
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 relative">
                            <FaComments className="text-pink-500" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                              3
                            </span>
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="font-medium">Trò chuyện</span>
                            <span className="text-xs text-gray-500">Chat với khách hàng</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-green-500">2 online</span>
                            <span className="text-xs text-gray-400">1 tin nhắn mới</span>
                          </div>
                        </Link>

                        <Link
                          to="/admin-panel/all-product"
                          className="flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg group transition-all duration-300"
                          onClick={() => setMenuDisplay(false)}
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200">
                            <FaBox className="text-red-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Quản lý sản phẩm</span>
                            <span className="text-xs text-gray-500">Xem và chỉnh sửa sản phẩm</span>
                          </div>
                        </Link>

                        <Link
                          to="/admin-panel/all-user"
                          className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg group transition-all duration-300"
                          onClick={() => setMenuDisplay(false)}
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200">
                            <FaUsers className="text-blue-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Quản lý người dùng</span>
                            <span className="text-xs text-gray-500">Xem danh sách người dùng</span>
                          </div>
                        </Link>

                        <Link
                          to="/admin-panel/all-voucher"
                          className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg group transition-all duration-300"
                          onClick={() => setMenuDisplay(false)}
                        >
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200">
                            <FaTicketAlt className="text-green-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Quản lý voucher</span>
                            <span className="text-xs text-gray-500">Tạo và quản lý mã giảm giá</span>
                          </div>
                        </Link>

                        <Link
                          to="/admin-panel/low-stock-products"
                          className="flex items-center gap-3 p-3 hover:bg-yellow-50 rounded-lg group transition-all duration-300"
                          onClick={() => setMenuDisplay(false)}
                        >
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200">
                            <FaExclamationTriangle className="text-yellow-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Sản phẩm sắp hết</span>
                            <span className="text-xs text-gray-500">Kiểm tra tồn kho</span>
                          </div>
                        </Link>

                        <Link
                          to="/admin-panel/all-promotion"
                          className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg group transition-all duration-300"
                          onClick={() => setMenuDisplay(false)}
                        >
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200">
                            <FaChartLine className="text-purple-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Thống kê doanh thu</span>
                            <span className="text-xs text-gray-500">Báo cáo và phân tích</span>
                          </div>
                        </Link>

                        <Link
                          to="/admin-panel/all-order"
                          className="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-lg group transition-all duration-300"
                          onClick={() => setMenuDisplay(false)}
                        >
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200">
                            <FaFileInvoiceDollar className="text-indigo-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">Quản lý đơn hàng</span>
                            <span className="text-xs text-gray-500">Xem và xử lý đơn hàng</span>
                          </div>
                        </Link>
                      </div>

                      {/* Footer của menu */}
                      <div className="p-3 bg-gray-50 border-t border-gray-100">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Cập nhật lần cuối</span>
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                          <button 
                            onClick={handleLogout}
                            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <FaSignOutAlt /> Đăng xuất
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Hiển thị trên user */}
                  {user?._id && user?.role !== ROLE.ADMIN && (
                    <div className="flex flex-col min-w-[200px] border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-gradient-to-b from-white to-gray-50">
                      <Link
                        to="/profile"
                        className="whitespace-nowrap hover:bg-blue-50 p-3 border-b border-gray-200 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        <FaRegCircleUser className="text-lg text-blue-500" />
                        Trang cá nhân
                      </Link>

                      <Link
                        to="/order"
                        className="whitespace-nowrap hover:bg-green-50 p-3 border-b border-gray-200 flex items-center gap-2 text-gray-700 hover:text-green-600 transition-all duration-300"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        <FaCartShopping className="text-lg text-green-500" />
                        Đơn hàng của bạn
                      </Link>

                      <Link
                        to="/contact"
                        className="whitespace-nowrap hover:bg-purple-50 p-3 border-b border-gray-200 flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-all duration-300"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        <FaRegEnvelope className="text-lg text-purple-500" />
                        Liên hệ
                      </Link>

                      <Link
                        to="/favourite"
                        className="whitespace-nowrap hover:bg-red-50 p-3 flex items-center gap-2 text-gray-700 hover:text-red-600 transition-all duration-300"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        <FaHeart className="text-lg text-red-500" />
                        Sản phẩm yêu thích
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaCartShopping />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Đăng xuất
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
