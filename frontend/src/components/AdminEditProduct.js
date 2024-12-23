import React, { useState } from 'react'
import { RiCloseLargeFill } from "react-icons/ri";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadimage';
import { DisplayImage } from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify';

const AdminEditProduct = ({
            onClose,
            productData,
            fetchdata,
        }) => {

    const[data,setData] = useState({
        ...productData,
        productName : productData?.productName, //ten sp 
        brandName : productData?.brandName,     //ten hang
        category : productData?.category,     //so luong
        quantity : productData?.quantity,  
        productImage : productData?.productImage || [],
        description : productData?.description,
        price : productData?.price,
        sellingPrice : productData?.sellingPrice
    })
    const [openFullScreenImg, setOpenFullScreenImg] = useState(false)
    const [fullScreenImg, setFullScreenImg] = useState('')
    const handleOnChange =(e)=>{
        // Hàm sửa đổi thông tin sản phẩm trong mục thêm sản phẩm
        const { name, value} = e.target
        setData((preve) => {
            return{
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadProduct = async(e) => {
        // Hàm xử lý upload sản phẩm trong mục thêm sản phẩm
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)
        setData((preve) => {
            return{
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
    }
    const handlesDeleteProductImg = async(index) => {
        // Hàm xử lý logic xóa sản phẩm trong mục 
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setData((preve) => {
            return{
                ...preve,
                productImage: [...newProductImage]
            }
        })
    }

    // Submit
    const handlesSubmit = async(e) => {
        e.preventDefault()
        
        const response = await fetch(SummaryApi.updateProduct.url,{
            method : SummaryApi.updateProduct.method,
            credentials : 'include' ,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const responseData = await response.json()

        if(responseData.success){
            toast.success( responseData.message)
            onClose()
            fetchdata()
        }
        if(responseData.error){
            toast.error( responseData.message)
            
        }
    }


  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-3xl h-full max-h-[80%] overflow-hidden'>
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Chỉnh Sửa Sản Phẩm</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <RiCloseLargeFill />
                </div>
            </div>
            
            <form onSubmit={handlesSubmit} className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'>
                <label htmlFor='productName'>Tên Sản Phẩm :</label>
                <input 
                type='text' 
                id='ProductName' 
                placeholder='Nhập tên sản phẩm' 
                name='productName'
                value={data.productName} 
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
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
                required
                />

                <label htmlFor='category' className='mt-3'>Loại Sản Phẩm :</label>
                 <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                 <option value={''}>Chọn sản phẩm</option>
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
                    {
                        data?.productImage[0] ? (
                            <div className='flex gap-2 items-center'>
                                {
                                    data.productImage.map((el, index) => {
                                        return(
                                        <div className='relative group'>
                                            <img 
                                            src={el} 
                                            alt={el} 
                                            width={80}
                                            height={80} 
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() => {
                                            setOpenFullScreenImg(true)
                                            setFullScreenImg(el)
                                            }}
                                            />
                                            <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handlesDeleteProductImg(index)}>
                                                <MdDelete />
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <p className='text-red-600 text-xs mb-5'>Vui lòng tải ảnh lên</p>
                        )
                    }
                </div>
                        {/* Gia san pham */}
                        <label htmlFor='price' className='mt-3'>Giá gốc : </label>
                        <input 
                            type='number' 
                            id='price' 
                            placeholder='Nhập giá của sản phẩm' 
                            name='price'
                            value={data.price} 
                            onChange={handleOnChange}
                            className='p-2 bg-slate-100 border rounded'
                           
                        />

                        {/* Gia sale san pham */}
                        <label htmlFor='sellingPrice' className='mt-3'>Giá bán :</label>
                        <input 
                            type='number' 
                            id='sellingPrice' 
                            placeholder='Nhập giá bán' 
                            name='sellingPrice'
                            value={data.sellingPrice} 
                            onChange={handleOnChange}
                            className='p-2 bg-slate-100 border rounded'
                            required
                        />

                        <label htmlFor='quantity' className='mt-3'>Số lượng sản phẩm :</label>
                        <input 
                            type='number' 
                            id='quantity' 
                            placeholder='Nhập số lượng sản phẩm' 
                            name='quantity'
                            value={data.quantity} 
                            onChange={handleOnChange}
                            className='p-2 bg-slate-100 border rounded'
                            required
                        />

                        <label htmlFor='description' className='mt-3'>Mô tả của sản phẩm: </label>
                        <textarea 
                        className='h-28 bg-slate-100 border resize-none p-1' 
                        placeholder='Mô tả của sản phẩm' 
                        rows={3}
                        onChange={handleOnChange}
                        name='description'
                        value={data.description}
                        >
                        </textarea>

                         <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Chỉnh Sửa Sản Phẩm</button>
            </form>
        </div>
            {/* Hien thi hinh anh full man hinh */}
        {
            openFullScreenImg && (
                <DisplayImage onClose={() => setOpenFullScreenImg(false)} imgUrl={fullScreenImg}/>
            )
        }
            
    </div>
  )
}

export default AdminEditProduct