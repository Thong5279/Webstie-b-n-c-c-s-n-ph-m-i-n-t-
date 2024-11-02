import React, { useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'

const Privacy = () => {
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
        <div class="max-w-[1000px] mx-auto my-12 px-6 lg:px-10 lg:pb-10 bg-white shadow-lg rounded-lg overflow-hidden">  
            <h1 class="text-4xl font-extrabold text-center text-black-500 my-8">
                Chính Sách Bảo Mật
            </h1>
            {/* <!-- Giới thiệu về chính sách bảo mật --> */}
            <p class="text-lg text-gray-600 leading-relaxed mb-8 px-2 text-justify">
               <strong className='text-black'>Mobile Store</strong> cam kết bảo vệ thông tin cá nhân của khách hàng. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin mà bạn cung cấp khi sử dụng dịch vụ của chúng tôi.
            </p>

        {/* <!-- 1. Thu thập thông tin --> */}
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">1. Thu thập thông tin</h2>
            <p class="text-gray-600 leading-relaxed group-hover:text-white">
                Chúng tôi thu thập thông tin cá nhân của khách hàng khi bạn đặt hàng, đăng ký tài khoản hoặc liên hệ với bộ phận chăm sóc khách hàng. Các thông tin bao gồm:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-600 group-hover:text-white">
                <li>Họ tên, địa chỉ email, số điện thoại, và địa chỉ giao hàng.</li>
                <li>Thông tin thanh toán, nếu có, để hoàn tất giao dịch.</li>
                <li>Dữ liệu khác liên quan đến trải nghiệm mua sắm của bạn (như lịch sử mua hàng, sản phẩm ưa thích).</li>
            </ul>
        </div>

        {/* <!-- 2. Sử dụng thông tin --> */}
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">2. Sử dụng thông tin</h2>
            <p class="text-gray-600 leading-relaxed group-hover:text-white">
                Thông tin cá nhân của bạn được chúng tôi sử dụng để:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-600 group-hover:text-white">
                <li>Xử lý và quản lý các đơn hàng của bạn.</li>
                <li>Cải thiện dịch vụ khách hàng và hỗ trợ kịp thời khi cần.</li>
                <li>Gửi thông tin khuyến mãi, chương trình giảm giá nếu bạn đăng ký nhận thông báo.</li>
                <li>Phân tích và tối ưu hóa trải nghiệm người dùng trên website.</li>
            </ul>
        </div>

        {/* <!-- 3. Chia sẻ thông tin với bên thứ ba --> */}
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">3. Chia sẻ thông tin với bên thứ ba</h2>
            <p class="text-gray-600 leading-relaxed group-hover:text-white">
                Mobile Store cam kết không bán hoặc chia sẻ thông tin cá nhân của khách hàng cho bên thứ ba, trừ các trường hợp sau:
            </p>
            <ul class="list-disc pl-6 space-y-3 text-gray-600 group-hover:text-white">
                <li>Các đơn vị vận chuyển nhằm hoàn tất việc giao hàng.</li>
                <li>Đối tác xử lý thanh toán trong trường hợp cần thiết.</li>
                <li>Trường hợp pháp luật yêu cầu, hoặc để bảo vệ quyền lợi hợp pháp của Mobile Store.</li>
            </ul>
        </div>

        {/* <!-- 4. Bảo mật thông tin --> */}
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">4. Bảo mật thông tin</h2>
            <p class="text-gray-600 leading-relaxed group-hover:text-white">
                Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và quản lý để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát hoặc rò rỉ. Tuy nhiên, không có biện pháp nào đảm bảo tuyệt đối an toàn, do đó Mobile Store khuyến khích khách hàng tự bảo vệ thông tin cá nhân khi sử dụng dịch vụ.
            </p>
        </div>

        {/* <!-- 5. Quyền của khách hàng --> */}
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">5. Quyền của khách hàng</h2>
            <p class="text-gray-600 leading-relaxed group-hover:text-white">
                Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bằng cách liên hệ với Mobile Store qua các phương thức bên dưới. Chúng tôi sẽ hỗ trợ trong thời gian sớm nhất có thể.
            </p>
        </div>

        {/* <!-- 6. Liên hệ hỗ trợ --> */}
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-105 hover:bg-red-400 group">
            <h2 class="text-2xl font-semibold text-black mb-3 group-hover:text-white">6. Liên hệ hỗ trợ</h2>
            <p class="text-gray-600 leading-relaxed group-hover:text-white">
                Nếu có bất kỳ câu hỏi nào liên quan đến chính sách bảo mật, vui lòng liên hệ với chúng tôi qua email: 
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

export default Privacy
