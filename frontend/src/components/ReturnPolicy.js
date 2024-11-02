import React from 'react'

const ReturnPolicy = () => {
  return (
    <div>
        <div className='bg-red-500'>
            <div className='max-w-[1000px] pt-[40px] pb-[31px] mx-auto'>
                <h1 className='text-[36px] font-[400] text-center text-white'>Xin chào,Mobile Store có thể giúp gì được cho bạn</h1>
            </div>
        </div>
            <div class="max-w-[1000px] mx-auto my-12 px-4">
            <h1 class="text-4xl font-bold text-center text-black mb-8">
                Chính Sách Đổi Trả
            </h1>
        
        {/* <!-- Giới thiệu về chính sách đổi trả --> */}
        <p class="text-lg text-gray-700 mb-6">
            <strong className='text-black'>Mobile Store</strong> cam kết đảm bảo quyền lợi tối đa cho khách hàng với chính sách đổi trả rõ ràng. Nếu sản phẩm gặp vấn đề về chất lượng, quý khách có thể yêu cầu đổi trả theo các điều kiện dưới đây.
        </p>

        {/* <!-- Điều kiện đổi trả --> */}
        <section class="bg-gray-50 p-6 rounded-lg shadow-md mb-8 hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h2 class="text-2xl font-semibold text-black mb-4">1. Điều kiện đổi trả</h2>
            <ul class="list-disc pl-6 space-y-3 text-gray-700">
                <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng, còn nguyên tem, mác và phụ kiện đi kèm.</li>
                <li>Sản phẩm không bị bể vỡ, trầy xước hoặc hư hỏng do người sử dụng.</li>
                <li>Yêu cầu đổi trả được gửi trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng.</li>
            </ul>
        </section>

        {/* <!-- Các trường hợp áp dụng đổi trả --> */}
        <section class="bg-gray-50 p-6 rounded-lg shadow-md mb-8 hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h2 class="text-2xl font-semibold text-black mb-4">2. Các trường hợp áp dụng đổi trả</h2>
            <ul class="list-disc pl-6 space-y-3 text-gray-700">
                <li>Sản phẩm bị lỗi kỹ thuật từ nhà sản xuất.</li>
                <li>Sản phẩm giao không đúng mẫu mã, màu sắc hoặc kích thước mà khách hàng đã đặt.</li>
                <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển.</li>
            </ul>
        </section>

        {/* <!-- Quy trình đổi trả --> */}
        <section class="bg-gray-50 p-6 rounded-lg shadow-md mb-8 hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h2 class="text-2xl font-semibold text-black mb-4">3. Quy trình đổi trả</h2>
            <ol class="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Liên hệ với bộ phận chăm sóc khách hàng qua hotline <a href="tel:0337615279" class="text-blue-600 hover:underline hover:text-red-500">0337615279</a> hoặc email <a href="mailto:thongdc2096n525@vlvh.ctu.edu.vn" class="text-blue-600 hover:underline hover:text-red-500">thongdc2096n525@vlvh.ctu.edu.vn</a> để đăng ký yêu cầu đổi trả.</li>
                <li>Cung cấp các thông tin liên quan đến sản phẩm và lý do yêu cầu đổi trả.</li>
                <li>Gửi sản phẩm về địa chỉ kho của Mobile Store (chúng tôi sẽ thông báo địa chỉ cụ thể qua email hoặc hotline).</li>
                <li>Sau khi kiểm tra và xác nhận điều kiện đổi trả, chúng tôi sẽ tiến hành đổi sản phẩm mới hoặc hoàn tiền cho quý khách trong vòng <strong>5-7 ngày làm việc</strong>.</li>
            </ol>
        </section>

        {/* <!-- Chi phí đổi trả --> */}
        <section class="bg-gray-50 p-6 rounded-lg shadow-md mb-8 hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h2 class="text-2xl font-semibold text-black mb-4">4. Chi phí đổi trả</h2>
            <p class="text-gray-700 mb-3">- Đối với sản phẩm bị lỗi do nhà sản xuất hoặc lỗi do Mobile Store, chúng tôi sẽ chịu toàn bộ chi phí đổi trả.</p>
            <p class="text-gray-700">- Đối với trường hợp đổi trả không do lỗi từ phía Mobile Store, khách hàng sẽ chịu phí vận chuyển (nếu có).</p>
        </section>

        {/* <!-- Liên hệ hỗ trợ --> */}
        <section class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h2 class="text-2xl font-semibold text-black mb-4">Liên hệ hỗ trợ</h2>
            <p class="text-gray-700">Nếu có bất kỳ câu hỏi nào liên quan đến chính sách đổi trả, vui lòng liên hệ bộ phận chăm sóc khách hàng của chúng tôi qua email: <a href="mailto:thongdc2096n525@vlvh.ctu.edu.vn" class="text-blue-600 hover:underline hover:text-red-500">thongdc2096n525@vlvh.ctu.edu.vn</a> hoặc hotline: <a href="tel:0337615279" class="text-blue-600 hover:underline hover:text-red-500">0337615279</a>.</p>
        </section>
        </div>

    </div>
  )
}

export default ReturnPolicy