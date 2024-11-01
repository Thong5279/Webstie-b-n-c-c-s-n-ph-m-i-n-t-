import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Cột 1: Thông tin liên hệ */}
          <div className="hover:transform hover:scale-105 transition-all duration-300">
            <h4 className="text-lg font-semibold mb-4 text-red-600">Thông Tin Liên Hệ</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2 hover:text-red-600 transition-colors">
                <MdLocationOn className="text-red-600" />
                123 Đường ABC, Quận XYZ, TP.Cần Thơ
              </li>
              <li className="flex items-center gap-2 hover:text-red-600 transition-colors">
                <MdPhone className="text-red-600" />
                0337 61 52 79
              </li>
              <li className="flex items-center gap-2 hover:text-red-600 transition-colors">
                <MdEmail className="text-red-600" />
                Thongdc2096n525@gmail.com
              </li>
            </ul>
          </div>

          {/* Cột 2: Chính sách */}
          <div className="hover:transform hover:scale-105 transition-all duration-300">
            <h4 className="text-lg font-semibold mb-4 text-red-600">Chính Sách</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/policy/shipping" className="hover:text-red-600 transition-colors hover:translate-x-2 inline-block">
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link to="/policy/return" className="hover:text-red-600 transition-colors hover:translate-x-2 inline-block">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link to="/policy/warranty" className="hover:text-red-600 transition-colors hover:translate-x-2 inline-block">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link to="/policy/privacy" className="hover:text-red-600 transition-colors hover:translate-x-2 inline-block">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div className="hover:transform hover:scale-105 transition-all duration-300">
            <h4 className="text-lg font-semibold mb-4 text-red-600">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/guide/shopping" className="hover:text-red-600 transition-colors hover:translate-x-2 inline-block">
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link to="/guide/payment" className="hover:text-red-600 transition-colors hover:translate-x-2 inline-block">
                  Hướng dẫn thanh toán
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-red-600 transition-colors hover:translate-x-2 inline-block">
                  Thành viên
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-red-600 transition-colors hover:translate-x-2 inline-block">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Kết nối với chúng tôi */}
          <div className="hover:transform hover:scale-105 transition-all duration-300">
            <h4 className="text-lg font-semibold mb-4 text-red-600">Kết Nối Với Chúng Tôi</h4>
            <div className="flex gap-4">
              <a href="#" className="text-2xl text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-125">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-125">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-125">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-125">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Phần bản quyền */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500">© 2024 Tech Store. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;