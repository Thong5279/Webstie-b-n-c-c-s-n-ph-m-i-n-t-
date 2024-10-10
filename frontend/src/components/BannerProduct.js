import React, { useEffect, useState } from 'react'
import image1 from '../img/assest/banner/desk_header_2ea6c5b3b2.png'
import image2 from '../img/assest/banner/H1_1440x242_1_d7eeefac93.png'
import image3 from '../img/assest/banner/LaptopBanner.png'
import image4 from '../img/assest/banner/SmartWatchBanner.png'
import image5 from '../img/assest/banner/TaingheBanner.png'


import imagesMobile1 from '../img/assest/banner/DienThoaiMobile.png'
import imagesMobile2 from '../img/assest/banner/DongHoMobile.png'
import imagesMobile3 from '../img/assest/banner/LapTopMobile.png'
import imagesMobile4 from '../img/assest/banner/TaingheGamingMobile.png'
import imagesMobile5 from '../img/assest/banner/TaiNgheMobile.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        imagesMobile1,
        imagesMobile2,
        imagesMobile3,
        imagesMobile4,
        imagesMobile5
    ]
    const nextImg = () => {
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(prev => prev + 1)
        }
    }

    const prevImg = () => {
        if(currentImage != 0){
            setCurrentImage(prev => prev - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(desktopImages.length - 1 > currentImage){
                nextImg()
            }else{
                setCurrentImage(0)
            }
        }, 5000)
        return () => clearInterval(interval)
    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded '>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2xl'>
                    <button onClick={prevImg} className='bg-white shadow-md rounded-full p-1 hover:bg-red-400 hover:text-white'><FaAngleLeft /></button>
                    <button onClick={nextImg} className='bg-white shadow-md rounded-full p-1 hover:bg-red-400 hover:text-white'><FaAngleRight /></button>
                </div>
            </div>
            {/* desktop and tablet */}
            <div className=' hidden md:flex h-full w-full overflow-hidden'>
                {
                    desktopImages.map((imageURL,index) => {
                        return (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURL} className='w-full h-full'/>
                            </div>
                        )
                    })
                }
            </div>

            {/* Mobile */}
            <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                    mobileImages.map((imageURL,index) => {
                        return (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURL} className='w-full h-full object-cover'/>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    </div>
  )
}

export default BannerProduct