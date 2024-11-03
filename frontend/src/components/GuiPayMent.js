import React, { useState } from 'react'



function GuiPayMent() {
    const [feeback,setFeeback] = useState(null)
    const [showModal,setShowModal] = useState(false)

    const handleLike = () => {
        setFeeback('liked')
        setShowModal(true)
    }

    const handleDisLike = () => {
        setFeeback('disliked')
    }
    const closeModal = () => {
        setShowModal(false)
    }
  return (
    <div>   <div className='bg-red-500'>
        <div className='max-w-[1000px] pt-[40px] pb-[31px] mx-auto'>
            <h1 className='text-[36px] font-[400] text-center text-white'>Xin chào,Mobile Store có thể giúp gì được cho bạn</h1>
        </div>
    </div>

    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md m-10 rounded-lg">
      <h1 className="text-3xl font-bold text-center text-black mb-6">Hướng Dẫn Thanh Toán</h1>

      {/* Giới thiệu */}
      <section className="mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong className='text-red-500'>Mobile Store</strong> hỗ trợ nhiều phương thức thanh toán tiện lợi và an toàn. Hãy làm theo các bước sau để hoàn tất thanh toán cho đơn hàng của bạn.
        </p>
      </section>

      {/* Bước 1: Chọn sản phẩm */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Bước 1: Chọn Sản Phẩm</h2>
        <p className="text-gray-700">
          Truy cập trang web Mobile Store, chọn sản phẩm bạn muốn mua và thêm vào giỏ hàng. Sau khi hoàn tất chọn sản phẩm, hãy vào giỏ hàng để kiểm tra các mặt hàng.
        </p>
      </section>

      {/* Bước 2: Kiểm thông tin giao hàng */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Bước 2: Kiểm Thông Tin Giao Hàng</h2>
        <p className="text-gray-700">
          Kiểm đầy đủ các chính xác thông tin giao hàng bao gồm họ tên, địa chỉ, số điện thoại, và email. Thông tin này sẽ giúp chúng tôi giao hàng chính xác và nhanh chóng.
        </p>
      </section>

      {/* Bước 3: Chọn phương thức thanh toán */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Bước 3: Chọn Phương Thức Thanh Toán</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong className='text-black'>Thanh toán khi nhận hàng:</strong> Bạn sẽ thanh toán bằng tiền mặt khi nhận được hàng từ nhân viên giao hàng.</li>
          <li><strong className='text-black'>Thanh toán qua thẻ ngân hàng:</strong> Chúng tôi chấp nhận thẻ ghi nợ và thẻ tín dụng từ các ngân hàng nội địa và quốc tế.</li>
          <li><strong className='text-black'>Thanh toán qua ví điện tử:</strong> Mobile Store hỗ trợ các ví điện tử phổ biến như PayPal, QR Pay.</li>
        </ul>
      </section>

      {/* Bước 4: Xác nhận đơn hàng */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Bước 4: Xác Nhận Đơn Hàng</h2>
        <p className="text-gray-700">
          Kiểm tra lại thông tin giao hàng và phương thức thanh toán. Sau đó, nhấn nút <strong className='text-black'>"Xác Nhận Đơn Hàng"</strong> để hoàn tất quy trình thanh toán.
        </p>
      </section>

      {/* Lưu ý khi thanh toán */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Lưu Ý Khi Thanh Toán</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Kiểm tra kỹ thông tin giao hàng và phương thức thanh toán trước khi xác nhận đơn hàng.</li>
          <li>Nếu chọn thanh toán qua thẻ, hãy đảm bảo rằng thẻ của bạn còn hiệu lực và đủ số dư.</li>
          <li>Trong trường hợp cần hỗ trợ, vui lòng liên hệ bộ phận chăm sóc khách hàng của chúng tôi qua hotline: <a href="tel:0337615279" className="text-blue-600 hover:underline hover:text-red-500">0337615279</a>.</li>
        </ul>
      </section>

      {/* Liên hệ hỗ trợ */}
      <section className="text-center">
        <p className="text-gray-700">
          Nếu bạn gặp bất kỳ vấn đề nào trong quá trình thanh toán, vui lòng liên hệ với chúng tôi qua email: 
          <a href="mailto:support@mobilestore.com" className="text-blue-600 hover:underline hover:text-red-500"> Thongdc2096n525@gmail.com</a>
        </p>
      </section>
    </div>
    </div>
  )
}

export default GuiPayMent
