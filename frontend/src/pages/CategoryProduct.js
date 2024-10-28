import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const params = useParams()
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll('category')

    const urlCategoryListinOject = {}
    urlCategoryListinArray.forEach(el => {
       urlCategoryListinOject[el] = true
    })

    console.log("urlCategoryListinArray",urlCategoryListinArray);
    console.log("urlCategoryListinOject",urlCategoryListinOject);
    
    const [selecCategory,setSelectCategory] = useState(urlCategoryListinOject)
    const [filterCategoryList,setFilterCategoryList] = useState([])


    const fetchData = async() => {
      const response = await fetch(SummaryApi.filterProduct.url,{
        method: SummaryApi.filterProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category: filterCategoryList
        })
      })

      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
      console.log(dataResponse);
      
    } 

    const handleSelectCategory = (e) => {
      const { name, value, checked }  = e.target

      setSelectCategory((prev) => {
        return{
          ...prev,
          [value]: checked
        }
      })      
    }

    console.log(selecCategory);

    useEffect(() => {
      fetchData()
    },[filterCategoryList])

    useEffect(() => {
      const arrayOfCategory = Object.keys(selecCategory).map(categoryKeyName => {
        if(selecCategory[categoryKeyName]){
            return categoryKeyName
        }
        return null
      }).filter(el => el)
      setFilterCategoryList(arrayOfCategory)
      // Thay doi url khi click vao vao o checkbox
      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1) === index){
          return `category=${el}`
        }
        return `category=${el}&&`
      })

      console.log("urlforMate", urlFormat);
      
      navigate("/product-category?" + urlFormat.join(''))
      // product-category?category=laptops&&category=mouse&&category=Mobiles

    },[selecCategory])

    

    // {params?.categoryName}
  return (
    <div className='container mx-auto p-4'>
        {/* dessktop */}
        <div className='hidden lg:grid grid-cols-[200px,1fr]'>

            {/* Left side */}
            <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>

              {/* Sap xep theo */}

                <div className=''>
                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sắp xếp theo</h3>

                  <form className='text-sm flex flex-col gap-2 py-2'>
                      <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy'/>
                        <label>Giá - Thấp đến Cao</label>
                      </div>
                      <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy'/>
                        <label>Giá - Cao đến Thấp</label>
                      </div>
                  </form>
                </div>

              {/* Loc theo */}

                <div className=''>
                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Danh mục sản phẩm</h3>

                  <form className='text-sm flex flex-col gap-2 py-2'>
                      {
                        productCategory.map((categoryName,index) => {
                          return(
                            <div className='flex items-center gap-3'>
                              <input type='checkbox' className='cursor-pointer' name={'category'} value={categoryName?.value} checked={selecCategory[categoryName?.value]} id={categoryName?.value} onChange={handleSelectCategory}/>
                              <label className='cursor-pointer' htmlFor={categoryName?.value}>{categoryName?.label}</label>
                            </div>
                          )
                        })
                      }
                  </form>
                </div>


            </div>


            {/* right side(san pham) */}
            <div>
                {
                  data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading} />
                  )
                }
            </div>


        </div>
    </div>
  )
}

export default CategoryProduct