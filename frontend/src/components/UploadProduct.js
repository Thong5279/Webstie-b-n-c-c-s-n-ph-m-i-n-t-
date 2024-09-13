import React, { useState } from 'react'
import { RiCloseLargeFill } from "react-icons/ri";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadimage';

const UploadProduct = ({
    onClose
}) => {
    const[data,setData] = useState({
        productName : "", //ten sp 
        brandName : "",     //ten hang
        category : "",     //so luong
        quantity : "",  
        productImage : [],
        description : "",
        price : "",
        selling : ""
    })
    const [UploadProductImageInput,setUploadProductImageInput] = useState("")
    const handleOnChange =(e)=>{

    }

    const handleUploadProduct = async(e) => {
        const file = e.target.files[0]
        setUploadProductImageInput(file.name)
        console.log("file",file)

        const uploadImageCloudinary = await uploadImage(file)

        console.log("upload Image",uploadImageCloudinary)
    }
    
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Thêm Sản Phẩm</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <RiCloseLargeFill />
                </div>
            </div>
            
            <from className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'>
                <label htmlFor='productName'>Tên Sản Phẩm :</label>
                <input 
                type='text' 
                id='ProductName' 
                placeholder='Nhập tên sản phẩm' 
                name='productName'
                value={data.productName} 
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                />

                <label htmlFor='brandName' className='mt-3'>Tên Thương Hiệu :</label>
                <input 
                type='text' 
                id='brandName' 
                placeholder='Nhập tên thương hiệu' 
                name='brandName'
                value={data.brandName} 
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                />

                <label htmlFor='category' className='mt-3'>Loại Sản Phẩm :</label>
                 <select value={data.category} className='p-2 bg-slate-100 border rounded'>
                    {
                         productCategory.map((el,index)=>{
                            return(
                                <option value={el.value}key={el.value+index}>{el.label}</option>
                         )
                         })
                    }
                 </select>
                
                 <label htmlFor='productImage' className='mt-3'>Ảnh sản phẩm:</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                                    <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                    <span className='text-4xl'><FaCloudUploadAlt/></span>
                                    <p className='text-sm'>Tải hình ảnh lên </p>
                                    <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                                    </div>
                        </div>
                    </label> 
                <div>
                    <img src='' width={80} height={80} className='bg-slate-100 border'/>
                </div>
                         {/*soluong*/}

            </from>

        </div>
    </div>
  )
}

export default UploadProduct