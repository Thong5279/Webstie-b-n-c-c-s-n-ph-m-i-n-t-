import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
const AdminProductCard = ({
    data,
    fetchdata,
}) => {
    const [editProduct,setEditProduct] = useState(false);
  return (
      <div className='bg-white p-4 rounded '>
                <div className='w-40'>
                  <img src={data?.productImage[0]} width={120} height={120} className='w-fit mx-auto'/>
                  <h1> {data.productName}</h1>
                  <h1>Số lượng: {data.quantity}</h1> {/**số lượng*/}
                  <div>

                        <p className='font-semibold'>
                        {displayINRCurrency(data.sellingPrice)}
                        </p>

                        <div className='w-fit ml-auto p-2 bg-green-200 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'onClick={()=>setEditProduct(true)}>
                          <MdModeEditOutline />
                        </div>
                  </div>  
                  
                </div>
                    {
                        editProduct &&
                        <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)}fetchdata={fetchdata}/>
                    }
                 
      </div>
  )
}

export default AdminProductCard