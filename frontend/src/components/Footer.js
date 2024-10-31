import React, { useEffect, useRef } from 'react'
import banner1 from '../img/assest/bannerfooter/Apple-Logo.png'
import banner2 from '../img/assest/bannerfooter/asus.png'
import banner3 from '../img/assest/bannerfooter/dell.png'
import banner4 from '../img/assest/bannerfooter/logoMsi.png'
import banner5 from '../img/assest/bannerfooter/playStation.png'
import banner6 from '../img/assest/bannerfooter/Razer.png'
import banner7 from '../img/assest/bannerfooter/Samsung.png'
import banner8 from '../img/assest/bannerfooter/test.png'
import banner9 from '../img/assest/bannerfooter/xiaomi.png'
const Footer = () => {

  const bannerRef = useRef(null)

  useEffect(() => {
    const banner = bannerRef.current
    const bannerContent = Array.from(banner.children)

    bannerContent.forEach(item => {
      const duplicateNode = item.cloneNode(true)
      duplicateNode.setAttribute('aria-hidden', true)
      banner.appendChild(duplicateNode)
    })
  },[])
  return (
    <div>
        <div className='banner py-16 overflow-hidden bg-red-500'>
          <div className='banner__container max-w-max flex items-center gap-32 animate-scroll' ref={bannerRef}>
              <img src={banner1} className='h-[40px]'/>
              <img src={banner2} className='h-[40px]'/>
              <img src={banner3} className='h-[40px]'/>
              <img src={banner4} className='h-[40px]'/>
              <img src={banner5} className='h-[40px]'/>
              <img src={banner6} className='h-[40px]'/>
              <img src={banner7} className='h-[40px]'/>
              <img src={banner8} className='h-[40px]'/>
              <img src={banner9} className='h-[40px]'/>
          </div>
        </div>
      
    </div>
    // <footer className='bg-slate-200'>
    //   <div className='container mx-auto p-4'>
    //    <p className='text-center font-bold' title="">nhóm 3 wed thương mại điện tử</p>
    //   </div>
    // </footer>
  )
}

export default Footer