import React, { useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'

const Shipping = () => {
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
        <div class="max-w-[1000px] mx-auto my-10 px-4">
        <h1 class="text-3xl font-bold text-center text-red-500 mb-6">Chính Sách Vận Chuyển</h1>
        
        {/* <!-- Giới thiệu về chính sách vận chuyển --> */}
        <p class="text-lg mb-4">
            Mobile Store luôn cố gắng đem lại dịch vụ vận chuyển tốt nhất nhằm đảm bảo khách hàng nhận được sản phẩm trong thời gian nhanh chóng và an toàn nhất.
        </p>

        {/* <!-- 1. Phạm vi giao hàng --> */}
        <h2 class="text-2xl font-semibold mt-8 mb-4">1. Phạm vi giao hàng</h2>
        <p class="mb-3">
            Chúng tôi hỗ trợ giao hàng toàn quốc, bao gồm tất cả các tỉnh thành và khu vực ngoại thành, hải đảo, nhằm đảm bảo mọi khách hàng đều có thể nhận sản phẩm.
        </p>

        {/* <!-- 2. Thời gian giao hàng --> */}
        <h2 class="text-2xl font-semibold mt-8 mb-4">2. Thời gian giao hàng</h2>
        <p class="mb-3">
            - Nội thành (các thành phố lớn): 1-3 ngày làm việc kể từ ngày đặt hàng.
        </p>
        <p class="mb-3">
            - Ngoại thành và khu vực xa: 3-7 ngày làm việc, tùy thuộc vào khoảng cách địa lý và điều kiện vận chuyển.
        </p>
        <p class="mb-3">
            Lưu ý: Thời gian giao hàng có thể thay đổi trong các dịp lễ, Tết, hoặc trong trường hợp bất khả kháng như thiên tai, dịch bệnh.
        </p>

        {/* <!-- 3. Phí vận chuyển --> */}
        <h2 class="text-2xl font-semibold mt-8 mb-4">3. Phí vận chuyển</h2>
        <p class="mb-3">
            Phí vận chuyển sẽ được tính dựa trên địa chỉ giao hàng, trọng lượng và kích thước sản phẩm. Quý khách sẽ thấy mức phí cụ thể khi thanh toán đơn hàng.
        </p>
        <p class="mb-3">
            Mobile Store thường xuyên có các chương trình miễn phí vận chuyển cho đơn hàng đạt yêu cầu. Theo dõi trang web của chúng tôi để cập nhật thông tin khuyến mãi.
        </p>

        {/* <!-- 4. Chính sách kiểm tra hàng --> */}
        <h2 class="text-2xl font-semibold mt-8 mb-4">4. Chính sách kiểm tra hàng</h2>
        <p class="mb-3">
            Khách hàng được quyền mở hộp và kiểm tra sản phẩm trước khi thanh toán để đảm bảo sản phẩm không bị hỏng hóc hay lỗi từ nhà sản xuất. Nếu phát hiện vấn đề, quý khách vui lòng từ chối nhận hàng và liên hệ bộ phận chăm sóc khách hàng của Mobile Store để được hỗ trợ.
        </p>

        {/* <!-- 5. Chính sách đổi trả khi sản phẩm bị lỗi do vận chuyển --> */}
        <h2 class="text-2xl font-semibold mt-8 mb-4">5. Chính sách đổi trả khi sản phẩm bị lỗi do vận chuyển</h2>
        <p class="mb-3">
            Trong trường hợp sản phẩm bị hư hại hoặc lỗi do quá trình vận chuyển, Mobile Store cam kết hỗ trợ đổi sản phẩm mới cho khách hàng. Vui lòng liên hệ với chúng tôi trong vòng 48 giờ kể từ khi nhận hàng để được giải quyết.
        </p>

        {/* <!-- Liên hệ --> */}
        <h2 class="text-2xl font-semibold mt-8 mb-4">Liên hệ</h2>
        <p class="mb-3">
            Mọi thắc mắc hoặc khiếu nại về chính sách vận chuyển, vui lòng liên hệ bộ phận chăm sóc khách hàng của chúng tôi qua email: 
            <a href="mailto:thongdc2095n525@vlvh.ctu.edu.vn" class="text-blue-600 hover:underline hover:text-red-500">thongdc2095n525@vlvh.ctu.edu.vn</a> hoặc hotline: 
            <a href="tel:0337615279" class="text-blue-600 hover:underline hover:text-red-500">0337615279</a>.
        </p>
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

export default Shipping