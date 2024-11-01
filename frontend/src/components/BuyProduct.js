import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiDislike, BiLike } from "react-icons/bi";
import product1 from '../img/assest/footerLink/product1.png'
import product2 from '../img/assest/footerLink/product2.png'
import product3 from '../img/assest/footerLink/product3.png'
import product4 from '../img/assest/footerLink/product4.png'


const BuyProduct = () => {
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
        <div className='max-w-[1000px] mx-auto mt-[30px]'>
            <div className='flex justify-center flex-col'>
                <h2 className='mb-6 text-2xl font-[500] text-black text-center'>[Thành viên mới] Làm sao để mua hàng / đặt hàng trên ứng dụng Mobile Store</h2>
                <div>
                    <p className='mb-3'>
                        <span className='text-black text-center'>Người dùng có thể đặt mua một hay đồng thời nhiều sản phẩm một cách dễ dàng thông qua <Link to={'/'} className='hover:text-red-500 hover:underline text-blue-600 underline'>nền tảng web của Mobile Store</Link> </span>
                    </p>
                    <p className='mb-3'>
                        <span className='text-black mb-3'>Trước khi đặt mua sản phẩm, bạn cần:</span>
                    </p>
                    <ul className='pl-6 mt-5'>
                        <li>
                            <p>Đăng ký và đăng nhập thành công một tài khoản Mobile Store hợp lệ</p>
                        </li>
                        <li>
                            <p>Tham khảo và lựa chọn sản phẩm phù hợp.Một số thông tin cân thiết khi chọn sản phẩm:</p>
                        </li>
                        <li>
                            <p>Hình ảnh, tên sản phẩm</p>
                        </li>
                        <li>
                            <p>Giá sản phẩm (giá gốc / giá ưu đãi)</p>
                        </li>
                        <li>
                            <p>Nơi bán (tỉnh / thành phố)</p>
                        </li>
                        <li className='mb-4'>
                            <p>Đánh giá sản phẩm</p>
                        </li>
                    </ul>
                    <p className='text-justify mb-5'>
                        <img className='max-w-full' src={product1}/>
                    </p>
                    <p className='mb-3'>
                        Sau khi đã tìm kiếm và lựa chọn được sản phẩm muốn mua, bạn có thể tiến hành đặt hàng
                    </p>
                    <p className='mb-5'>
                        <span>Trên trang </span><strong>Thông tin sản phẩm</strong><span> của sản phẩm, bạn có thể tiến hành mua và thanh toán ngay cho sản phẩm đó bằng cách thực hiện theo những bước sau:</span>
                    </p>
                    <p className='mb-5 text-red-500 font-semibold'>
                        <span>1. Mua và thanh toán ngay</span>
                    </p>
                    <p className='mb-5'>
                        <span>Lựa chọn </span><strong>Mua </strong><span>chọn </span><strong>Số lượng sản phẩm </strong><span>chọn </span><strong>Voucher của shop </strong><span>nếu có, chọn </span><strong>Đơn vị vận chuyển </strong><span>chọn </span><strong>Phương thức thanh toán </strong><span>chọn </span><strong>Thanh toán </strong><span>và hoàn thành các bước xác minh tùy thuộc vào phương thức thanh toán để hoàn tất việc đặt hàng</span>
                    </p>
                    <p className='my-5'>
                        <img src={product2}/>
                    </p>
                    <p className='mb-5 text-red-500 font-semibold'>
                        <span>2. Thêm sản phẩm vào Giỏ hàng trước khi thanh toán</span>
                    </p>
                    <p>
                        <span>Trên trang <strong>Thông tin sản phẩm</strong> của sản phẩm, chọn <strong>Thêm vào giỏ hàng</strong> xong bấm vào giỏ hàng, thông tin sản phẩm muốn mua sẽ hiện lên.Kiểm tra thông tin trước khi thanh toán</span>
                    </p>
                    <p className='my-5'>
                        <img src={product3}/>
                    </p>
                    <p>
                        <span>Sau khi click vào <strong>Giỏ hàng </strong> trang thông tin thanh toán sẽ mở ra và kiểm tra thông tin của mình</span>
                    </p>
                    <p className='my-5'>
                        <img src={product4}/>
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
        </div>
    </div>
  )
}

export default BuyProduct