import React, { useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { BiPhone, BiEnvelope, BiMap } from "react-icons/bi";
import { ImCross } from "react-icons/im";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.createContact.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Gửi liên hệ thành công!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi liên hệ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-40 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Liên hệ với chúng tôi</h2>
      <p className="text-center mb-8">Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy để lại thông tin và chúng tôi sẽ liên hệ lại ngay.</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Thông tin liên hệ</h3>
          <p className="mb-2"><strong>Điện thoại:</strong> 0337 61 52 79</p>
          <p className="mb-2"><strong>Email:</strong> Thongdc2096n525@gmail.com</p>
          <p className="mb-2"><strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP.Cần Thơ</p>
          <h4 className="text-lg font-semibold mt-4">Theo dõi chúng tôi trên mạng xã hội:</h4>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com/profile.php?id=100079572182885" className="text-blue-600">Facebook</a>
            <a href="https://www.instagram.com/thongpham.huynh/" className="text-blue-600">Instagram</a>
            <a href="#" className="text-blue-600">Twitter</a>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Gửi liên hệ</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
              placeholder="Họ tên"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
              placeholder="Email"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
              placeholder="Số điện thoại"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
              rows="4"
              placeholder="Nội dung"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Đang gửi..." : "Gửi liên hệ"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
