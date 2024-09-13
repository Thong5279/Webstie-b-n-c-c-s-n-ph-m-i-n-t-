import React from 'react'
import { RiCloseLargeFill } from "react-icons/ri";

export const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
        <div className='bg-white shadow-xl rounded max-w-5xl mx-auto p-4'>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <RiCloseLargeFill />
            </div>
            <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgUrl} className='w-full h-full'/>
            </div>
        </div>
        
    </div>
  )
}
