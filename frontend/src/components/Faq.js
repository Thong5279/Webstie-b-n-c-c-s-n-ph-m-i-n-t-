import React, { useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFAQ = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-gray-100 rounded-lg shadow-md mb-4 transition-all duration-300">
            <button
                className="w-full text-left flex items-center justify-between p-5 hover:bg-red-100"
                onClick={toggleFAQ}
            >
                <h2 className="text-lg font-semibold text-gray-800">{question}</h2>
                <span className="text-gray-600">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && (
                <div className="text-gray-700 mt-3 px-5 pb-4">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};
const Faq = () => {
    const faqData = [
        {
            question: '1. Làm thế nào để đặt hàng?',
            answer: `Để đặt hàng, bạn chỉ cần chọn sản phẩm muốn mua, nhấn vào nút "Thêm vào giỏ hàng", sau đó vào giỏ hàng và hoàn tất các bước thanh toán.`,
        },
        {
            question: '2. Chính sách đổi trả của cửa hàng như thế nào?',
            answer: 'Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm gặp lỗi từ nhà sản xuất hoặc giao sai mẫu mã. Liên hệ với bộ phận chăm sóc khách hàng để được hướng dẫn chi tiết.',
        },
        {
            question: '3. Tôi có thể thanh toán bằng cách nào?',
            answer: 'Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, QRPay, PayPal, chuyển khoản ngân hàng và thanh toán khi nhận hàng (COD).',
        },
        {
            question: '4. Làm sao để kiểm tra tình trạng đơn hàng?',
            answer: 'Sau khi đặt hàng, bạn có thể kiểm tra tình trạng đơn hàng qua email xác nhận hoặc vào mục "Lịch sử mua hàng" trên trang cá nhân của mình.',
        },
    ];
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
        <div className="max-w-[800px] mx-auto my-12 px-6">
                <h1 className="text-4xl font-bold text-center text-black mb-8">Câu Hỏi Thường Gặp</h1>
                {faqData.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
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
        
    </div>
  )
}


export default Faq
