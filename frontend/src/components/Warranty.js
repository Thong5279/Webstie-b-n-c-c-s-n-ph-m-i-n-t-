import React, { useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'

const Warranty = () => {
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
        <div className='max-w-[1000px] mx-auto my-12 px-4'>
            <h1 class="text-4xl font-bold text-center text-black mb-8">
                Chính Sách Bảo Hành
            </h1>
            {/* <!-- Giới thiệu về chính sách bảo hành --> */}
            <p class="text-lg text-gray-600 leading-relaxed mb-8 px-2 text-justify">
            <strong className='text-black'>Mobile Store</strong> cam kết mang lại chất lượng sản phẩm tốt nhất cho khách hàng với chính sách bảo hành rõ ràng và thuận tiện. Tất cả các sản phẩm do Mobile Store cung cấp đều được bảo hành theo đúng tiêu chuẩn của nhà sản xuất.
            </p>

            {/* <!-- 1. Điều kiện bảo hành --> */}
            <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
                <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">1. Điều kiện bảo hành</h2>
                <ul class="list-disc pl-6 space-y-3 text-gray-600 group-hover:text-white">
                    <li>Sản phẩm còn trong thời hạn bảo hành (tính từ ngày mua hàng).</li>
                    <li>Sản phẩm có phiếu bảo hành hoặc hóa đơn mua hàng từ Mobile Store.</li>
                    <li>Sản phẩm gặp vấn đề kỹ thuật hoặc lỗi từ nhà sản xuất.</li>
                    <li>Sản phẩm không có dấu hiệu can thiệp hoặc sửa chữa từ bên thứ ba.</li>
                </ul>
            </div>

            {/* <!-- 2. Các trường hợp không áp dụng bảo hành --> */}
            <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
                <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">2. Các trường hợp không áp dụng bảo hành</h2>
                <ul class="list-disc pl-6 space-y-3 text-gray-600 group-hover:text-white">
                    <li>Sản phẩm đã hết thời hạn bảo hành.</li>
                    <li>Sản phẩm hư hỏng do va đập, rơi vỡ hoặc tác động bên ngoài.</li>
                    <li>Sản phẩm bị hư hại do nước hoặc các chất lỏng khác.</li>
                    <li>Sản phẩm bị thay đổi cấu trúc, sửa chữa tại nơi không phải Mobile Store.</li>
                </ul>
            </div>

            {/* <!-- 3. Thời gian bảo hành --> */}
            <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
                <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">3. Thời gian bảo hành</h2>
                <p class="text-gray-600 leading-relaxed group-hover:text-white">
                    Thời gian bảo hành thông thường từ 6 tháng đến 12 tháng, tùy thuộc vào loại sản phẩm và quy định của nhà sản xuất. Thời gian xử lý bảo hành dự kiến từ 7 đến 14 ngày làm việc kể từ khi nhận sản phẩm.
                </p>
            </div>

            {/* <!-- 4. Quy trình bảo hành --> */}
            <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
                <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">4. Quy trình bảo hành</h2>
                <ol class="list-decimal pl-6 space-y-3 text-gray-600 group-hover:text-white">
                    <li>Liên hệ với bộ phận chăm sóc khách hàng qua hotline <a href="tel:0337615279" class="text-blue-600 hover:underline">0337615279</a> hoặc email <a href="mailto:support@mobilestore.com" class="text-blue-600 hover:underline">thongdc2095n525@vlvh.ctu.edu.vn</a> để đăng ký yêu cầu bảo hành.</li>
                    <li>Cung cấp thông tin sản phẩm và mô tả vấn đề cần bảo hành.</li>
                    <li>Gửi sản phẩm về trung tâm bảo hành hoặc địa chỉ được chỉ định. Mobile Store sẽ hướng dẫn quy trình chi tiết khi tiếp nhận yêu cầu.</li>
                    <li>Sau khi kiểm tra, nếu đủ điều kiện, sản phẩm sẽ được sửa chữa hoặc thay thế linh kiện (nếu có) miễn phí trong thời gian bảo hành.</li>
                </ol>
            </div>

            {/* <!-- 5. Liên hệ hỗ trợ --> */}
            <div class="bg-gray-50 p-6 rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
                <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">5. Liên hệ hỗ trợ</h2>
                <p class="text-gray-600 leading-relaxed group-hover:text-white">
                    Nếu có bất kỳ câu hỏi nào về chính sách bảo hành, vui lòng liên hệ với chúng tôi qua email: 
                    <a href="mailto:thongdc2095n525@vlvh.ctu.edu.vn" class="text-blue-600 hover:underline hover:text-red-500">thongdc2095n525@vlvh.ctu.edu.vn</a> hoặc hotline: 
                    <a href="tel:0337615279" class="text-blue-600 hover:underline hover:text-red-500">0337615279</a>.
                </p>
            </div>
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

export default Warranty
