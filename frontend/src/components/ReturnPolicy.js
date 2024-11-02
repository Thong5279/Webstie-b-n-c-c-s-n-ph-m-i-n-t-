import React, { useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'

const ReturnPolicy = () => {
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
        <section class="bg-gray-50 p-6 rounded-lg shadow-md mb-8 hover:shadow-lg transform hover:scale-105 transition duration-300 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-4 group-hover:text-white">1. Điều kiện đổi trả</h2>
            <ul class="list-disc pl-6 space-y-3 text-gray-700 group-hover:text-white">
                <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng, còn nguyên tem, mác và phụ kiện đi kèm.</li>
                <li>Sản phẩm không bị bể vỡ, trầy xước hoặc hư hỏng do người sử dụng.</li>
                <li>Yêu cầu đổi trả được gửi trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng.</li>
            </ul>
        </section>

        {/* <!-- Các trường hợp áp dụng đổi trả --> */}
        <section class="bg-gray-50 p-6 rounded-lg shadow-md mb-8 hover:shadow-lg transform hover:scale-105 transition duration-300 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-4 group-hover:text-white">2. Các trường hợp áp dụng đổi trả</h2>
            <ul class="list-disc pl-6 space-y-3 text-gray-700 group-hover:text-white">
                <li>Sản phẩm bị lỗi kỹ thuật từ nhà sản xuất.</li>
                <li>Sản phẩm giao không đúng mẫu mã, màu sắc hoặc kích thước mà khách hàng đã đặt.</li>
                <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển.</li>
            </ul>
        </section>

        {/* <!-- Quy trình đổi trả --> */}
        <section class="bg-gray-50 p-6 rounded-lg shadow-md mb-8 hover:shadow-lg transform hover:scale-105 transition duration-300 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-4 group-hover:text-white">3. Quy trình đổi trả</h2>
            <ol class="list-decimal pl-6 space-y-3 text-gray-700 group-hover:text-white">
                <li>Liên hệ với bộ phận chăm sóc khách hàng qua hotline <a href="tel:0337615279" class="text-blue-600 hover:underline hover:text-red-500">0337615279</a> hoặc email <a href="mailto:thongdc2096n525@vlvh.ctu.edu.vn" class="text-blue-600 hover:underline hover:text-red-500">thongdc2096n525@vlvh.ctu.edu.vn</a> để đăng ký yêu cầu đổi trả.</li>
                <li>Cung cấp các thông tin liên quan đến sản phẩm và lý do yêu cầu đổi trả.</li>
                <li>Gửi sản phẩm về địa chỉ kho của Mobile Store (chúng tôi sẽ thông báo địa chỉ cụ thể qua email hoặc hotline).</li>
                <li>Sau khi kiểm tra và xác nhận điều kiện đổi trả, chúng tôi sẽ tiến hành đổi sản phẩm mới hoặc hoàn tiền cho quý khách trong vòng <strong>5-7 ngày làm việc</strong>.</li>
            </ol>
        </section>

        {/* <!-- Chi phí đổi trả --> */}
        <section class="bg-gray-50 p-6 rounded-lg shadow-md mb-8 hover:shadow-lg transform hover:scale-105 transition duration-300 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-4 group-hover:text-white">4. Chi phí đổi trả</h2>
            <p class="text-gray-700 mb-3 group-hover:text-white">- Đối với sản phẩm bị lỗi do nhà sản xuất hoặc lỗi do Mobile Store, chúng tôi sẽ chịu toàn bộ chi phí đổi trả.</p>
            <p class="text-gray-700 group-hover:text-white">- Đối với trường hợp đổi trả không do lỗi từ phía Mobile Store, khách hàng sẽ chịu phí vận chuyển (nếu có).</p>
        </section>

        {/* <!-- Liên hệ hỗ trợ --> */}
        <section class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-4 group-hover:text-white">Liên hệ hỗ trợ</h2>
            <p class="text-gray-700 group-hover:text-white">Nếu có bất kỳ câu hỏi nào liên quan đến chính sách đổi trả, vui lòng liên hệ bộ phận chăm sóc khách hàng của chúng tôi qua email: <a href="mailto:thongdc2096n525@vlvh.ctu.edu.vn" class="text-blue-600 hover:underline hover:text-red-500">thongdc2096n525@vlvh.ctu.edu.vn</a> hoặc hotline: <a href="tel:0337615279" class="text-blue-600 hover:underline hover:text-red-500">0337615279</a>.</p>
        </section>
        </div>

        <div>
            <div className='py-10 border-t flex flex-col'>
                <div className='text-[24px] font-[500] mb-2 text-center'>Bài viết có hữu ít cho bạn không ?</div>
            <div className='flex space-x-4 justify-center'>
                <div 
                    onClick={handleLike}
                    className={`flex items-center space-x-2 cursor-pointer p-2 rounded border ${feeback === 'liked' ? 'bg-red-500 text-white' : ''}`}
                >
                    <BiLike />
                    <span>Có</span>
                </div>
                <div 
                    onClick={handleDisLike}
                    className={`flex items-center space-x-2 cursor-pointer p-2 rounded border ${feeback === 'disliked' ? 'bg-red-500 text-white' : ''}`}
                >
                    <BiDislike />
                    <span>Không</span>
                </div>
            </div>
            {/* Modal cam on */}
                {
                    showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className='flex justify-center mb-2'>
                            <svg className='' width="54" height="54" viewBox="0 0 54 54" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M27 53C41.3594 53 53 41.3594 53 27C53 12.6406 41.3594 1 27 1C12.6406 1 1 12.6406 1 27C1 41.3594 12.6406 53 27 53Z" fill="#30B566" stroke="#30B566" stroke-width="2"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M26.7985 36.098L40.3628 22.263C41.273 21.3528 41.1992 19.8032 40.198 18.802C39.1968 17.8007 37.6472 17.727 36.737 18.6372L24.7717 30.8413L17.263 24.0774C16.3528 23.1672 14.8032 23.241 13.802 24.2422C12.8008 25.2435 12.727 26.7931 13.6372 27.7033L23.2458 36.3588C24.156 37.269 25.7056 37.1952 26.7069 36.194C26.7383 36.1625 26.7689 36.1305 26.7985 36.098Z" fill="white"></path></svg>
                        </div>
                            <p className="text-lg font-semibold">Cảm ơn bạn đã chia sẻ ý kiến!</p>
                                <button 
                                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:border hover:border-red-500 hover:text-red-500 hover:bg-white"
                                    onClick={closeModal}
                                >
                                    Đóng
                                </button>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>

    </div>
  )
}

export default ReturnPolicy