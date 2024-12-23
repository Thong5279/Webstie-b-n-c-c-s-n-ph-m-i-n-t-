import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { LuPhone } from "react-icons/lu";
import { TfiTimer } from "react-icons/tfi";
import { GoHome } from "react-icons/go";
import qrZalo from '../img/assest/footerLink/qrZalo.png'
const ZaloInformation = () => {
    const [show,setShow] = useState(false)

    const handleClick = () => {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 2000)
    }
  return (
    <div className='max-w-[960px] mx-auto py-6 pt-6 pb-[76px]'>
        {/* Main information */}
        <div className='flex flex-row p-10 mb-4 bg-white rounded-lg'>
            <div className='flex flex-col grow'>
                <div className='flex mr-10 mb-10'>
                {/* Main profile */}
                <div className='h-[80px] w-[80px] mr-6'>
                    {/* Main avatar */}
                    <svg className='w-full h-full' version="1.0" xmlns="http://www.w3.org/2000/svg" width="90" height="50" viewBox="0 0 585.000000 412.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,412.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M1653 4065 c-107 -29 -194 -92 -252 -183 -61 -97 -61 -94 -61 -779 0
                            -343 3 -623 6 -623 3 0 41 19 85 43 l79 42 0 418 0 417 953 -2 952 -3 7 -119
                            c4 -65 8 -120 10 -121 2 -2 47 -1 101 2 l98 6 -3 306 -3 306 -32 66 c-55 111
                            -155 192 -280 224 -83 22 -1580 21 -1660 0z m1062 -311 c8 -4 22 -19 30 -35
                            18 -33 7 -72 -24 -88 -12 -7 -106 -11 -247 -11 -198 0 -230 2 -246 17 -24 22
                            -24 77 2 103 19 19 33 20 244 20 123 0 232 -3 241 -6z"></path><path d="M3240 2964 c-19 -2 -87 -9 -150 -15 -415 -39 -923 -181 -1367 -382
                            l-93 -42 0 -77 c0 -43 2 -78 4 -78 1 0 55 25 119 55 966 455 1966 562 2374
                            254 47 -35 110 -105 138 -153 9 -16 18 -16 137 5 147 25 145 20 49 118 -145
                            149 -375 248 -686 296 -96 15 -452 28 -525 19z"></path><path d="M1054 2195 c-525 -359 -875 -771 -970 -1144 -43 -167 -30 -350 33
                            -476 112 -225 437 -380 943 -452 183 -26 753 -26 965 0 173 21 361 55 523 93
                            l114 26 -52 18 c-58 20 -106 60 -126 107 -18 42 -18 111 1 147 9 16 14 30 13
                            31 -2 1 -48 -11 -103 -26 -342 -99 -827 -158 -1190 -145 -424 15 -702 85 -867
                            220 -95 77 -148 217 -133 350 9 80 56 222 102 305 142 258 429 551 771 786
                            l101 70 1 83 c0 45 -4 82 -8 82 -5 0 -58 -34 -118 -75z"></path><path d="M1420 2147 l-75 -43 -3 -773 -2 -774 107 6 c105 6 308 48 327 67 7 7
                            -26 10 -90 10 -54 0 -116 3 -136 6 l-38 7 0 768 c0 423 -3 769 -7 769 -5 -1
                            -42 -20 -83 -43z"></path><path d="M4524 2010 c-33 -13 -64 -59 -64 -96 0 -43 41 -91 85 -100 42 -8 100
                            11 120 39 17 25 20 89 5 118 -22 40 -95 60 -146 39z"></path><path d="M3690 1570 l0 -430 85 0 85 0 0 29 c0 36 13 46 31 25 24 -29 93 -57
                            154 -62 185 -14 315 115 315 313 0 131 -54 231 -154 282 -42 22 -64 27 -131
                            27 -78 1 -93 -3 -187 -52 -5 -2 -8 64 -8 147 l0 151 -95 0 -95 0 0 -430z m426
                            -1 c44 -40 57 -76 52 -141 -4 -52 -9 -63 -40 -95 -31 -31 -45 -37 -90 -41 -44
                            -3 -59 0 -88 20 -19 13 -43 39 -52 58 -37 73 -14 164 52 208 47 32 127 27 166
                            -9z"></path><path d="M4820 1570 l0 -430 94 0 94 0 1 430 0 430 -94 0 -95 0 0 -430z"></path><path d="M2070 1739 c-24 -11 -53 -27 -62 -36 -14 -13 -18 -13 -22 -2 -16 52
                            -11 50 -93 47 l-78 -3 -3 -302 -2 -303 95 0 95 0 0 181 c0 147 3 187 16 215
                            32 68 115 85 165 35 l29 -29 0 -201 0 -201 95 0 95 0 0 180 c0 202 8 238 59
                            264 43 23 85 20 118 -8 l28 -24 3 -206 3 -206 95 0 94 0 0 214 c0 242 -7 276
                            -67 338 -49 50 -116 72 -202 66 -70 -5 -132 -31 -165 -67 l-20 -21 -30 29
                            c-64 62 -162 78 -246 40z"></path><path d="M3137 1750 c-133 -34 -214 -135 -224 -280 -7 -103 15 -174 73 -239
                            66 -74 125 -96 254 -96 99 0 110 2 172 33 109 54 161 143 161 277 0 135 -62
                            235 -178 286 -56 25 -192 35 -258 19z m173 -168 c40 -19 80 -88 80 -137 -1
                            -47 -35 -112 -72 -135 -21 -13 -51 -20 -81 -20 -42 0 -53 5 -89 39 -39 36 -42
                            42 -45 102 -3 51 0 70 16 97 43 67 121 90 191 54z"></path><path d="M5337 1746 c-142 -40 -230 -179 -213 -339 12 -118 72 -204 174 -249
                            70 -31 217 -36 300 -10 65 21 132 60 132 77 0 5 -21 31 -47 57 l-46 47 -39
                            -20 c-46 -24 -121 -34 -172 -25 -43 8 -106 60 -106 87 0 18 11 19 225 19 l225
                            0 0 58 c0 127 -55 226 -152 276 -47 23 -72 29 -145 32 -55 3 -106 -1 -136 -10z
                            m219 -179 c58 -63 53 -67 -101 -67 -145 0 -150 2 -124 51 21 40 69 60 133 56
                            53 -3 62 -7 92 -40z"></path><path d="M4480 1445 l0 -305 95 0 95 0 -2 303 -3 302 -92 3 -93 3 0 -306z"></path><path d="M1806 1029 c-32 -25 -35 -70 -7 -98 11 -11 39 -23 64 -26 60 -9 75
                            -20 61 -42 -15 -24 -57 -28 -94 -10 -27 14 -30 14 -44 -8 -15 -22 -14 -24 25
                            -39 49 -20 80 -20 124 -1 74 30 65 109 -15 134 -82 25 -90 30 -84 46 8 21 48
                            29 83 17 24 -8 32 -7 43 5 34 42 -105 62 -156 22z"></path><path d="M2130 925 l0 -125 25 0 c23 0 25 3 25 50 l0 50 55 0 55 0 0 -50 c0
                            -49 1 -50 30 -50 l30 0 0 126 0 125 -27 -3 c-26 -3 -28 -7 -31 -50 l-3 -48
                            -55 0 -54 0 0 50 c0 47 -2 50 -25 50 l-25 0 0 -125z"></path><path d="M2548 1032 c-59 -36 -74 -132 -30 -191 43 -59 145 -65 204 -12 59 53
                            47 170 -22 206 -39 20 -118 19 -152 -3z m136 -52 c28 -28 24 -89 -9 -117 -33
                            -29 -64 -29 -99 -2 -46 36 -29 131 27 142 31 6 59 -2 81 -23z"></path><path d="M2910 926 l0 -126 25 0 c22 0 25 4 25 35 0 35 0 35 45 35 55 0 90 15
                            104 47 17 38 13 69 -13 100 -22 25 -31 28 -105 31 l-81 4 0 -126z m134 68 c9
                            -4 16 -18 16 -34 0 -31 -15 -40 -66 -40 -33 0 -34 1 -34 40 0 39 1 40 34 40
                            19 0 41 -3 50 -6z"></path><path d="M3390 936 l0 -86 30 0 c17 0 140 4 273 10 133 5 602 24 1042 40 440
                            17 805 32 810 34 10 3 -136 9 -610 26 -685 25 -1339 50 -1437 56 l-108 6 0
                            -86z"></path></g>
                    </svg>
                </div>
                {/* Content */}
                <div>
                    <h1 className='inline-flex items-center font-[500] text-2xl mb-2'>
                        Mobile Store
                        <FaCheckCircle className='ml-2 text-blue-400'/>
                    </h1>
                    <div className='text-[16px] mb-4 text-red-400'>Công nghệ & Thiết bị</div>
                    <button className='inline-flex items-center justify-center h-12 w-60 bg-red-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300'>
                        <TiMessages className='mr-2'/>
                        <a href='https://chat.zalo.me'>Nhắn tin</a>
                    </button>
                </div>
                </div>
                 {/* thông tin chi tiết */}
                 <div>
                    <h2 className='mb-4 font-[500] text-xl'>Thông tin chi tiết</h2>
                    <ul className='mb-6 border-b'>
                        <li className='flex items-center mb-2'>
                            <LuPhone className='mr-3 text-[22px]'/>
                            <a href='tel:0869240149' className='text-blue-500 hover:text-red-500 hover:underline'>0869240149</a>
                        </li>
                        <li className='flex items-center mb-2'>
                            <TfiTimer className='mr-3 text-[22px]'/>
                            <p className='font-[500] text-blue-500'>Đang mở cửa</p>
                            <p className='mx-1'>•</p>
                            <p>Đóng cửa lúc 23:00</p>
                        </li>
                        <li className='flex items-center mb-6'>
                            <GoHome className='mr-3 text-[22px]'/>
                            <Link to={'/'}>
                                <p className='text-blue-500 hover:text-red-500 hover:underline'>http://localhost:3000/</p>
                            </Link>
                        </li>
                    </ul>
                    <span className='whitespace-pre-line'>Mobile Store chuyên cung cấp các thiết bị điện tử, laptop, Camera, Điện thoại... Mobile Store đã hoạt động và được tin tưởng trong suốt 3 năm qua, từ 2021 đến nay</span>
                </div>
            </div>
            
            <div>
                <div className='h-[200px] w-[200px] rounded'>
                    <img src={qrZalo} className='w-full h-full rounded'/>
                    <p className='text-xs text-center'>Mở zalo, bấm quét mã qr để quét và xem trên điện thoại</p>
                </div>
            </div>
        </div>
        {/* Dịch vụ cung cấp */}
        <div className='bg-white rounded-lg p-10'>
            <h2 className='font-[500] text-xl mb-6'>Dịch vụ cung cấp</h2>
            <div className='grid grid-cols-3'>
                <button onClick={handleClick} className='bg-white border rounded-lg py-[13px] px-4 text-left transition-all hover:border-red-500'>Gặp CSKH</button>
                {
                    show && (
                        <div className='fixed top-[50%] left-[50%] bg-black text-white translate-x-[-50%] translate-y-[-50%] rounded-lg animate-fadein'>
                            <span className='py-4 px-8 block'>Chức năng này tạm thời chưa được triển khai</span>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default ZaloInformation
