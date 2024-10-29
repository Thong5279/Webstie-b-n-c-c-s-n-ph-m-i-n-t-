import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {

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

  

    const [sortBy,setSortBy] = useState('')
    console.log('sortBy',sortBy);


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

      
    } 

    // Hàm xử lý khi chọn danh mục sản phẩm
    const handleSelectCategory = (e) => {
      // Lấy các thuộc tính từ sự kiện checkbox
      const { name, value, checked }  = e.target

      // Cập nhật state selecCategory với giá trị checkbox mới
      setSelectCategory((prev) => {
        return{
          ...prev,
          [value]: checked // Thêm/xóa danh mục được chọn
        }
      })      
    }

    // In ra console để kiểm tra các danh mục đã chọn
    console.log(selecCategory);

    useEffect(() => {
      fetchData() // Gọi API để lấy dữ liệu khi danh sách lọc thay đổi
    },[filterCategoryList])

    useEffect(() => {
      const arrayOfCategory = Object.keys(selecCategory).map(categoryKeyName => {
        if(selecCategory[categoryKeyName]){
            return categoryKeyName // Lấy tên danh mục nếu được chọn
        }
        return null
      }).filter(el => el)
      setFilterCategoryList(arrayOfCategory) // Cập nhật danh sách lọc
      // Tạo chuỗi query params từ danh sách danh mục đã chọn
      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1) === index){
          return `category=${el}` // Phần tử cuối không thêm &&
        }
        return `category=${el}&&` // Thêm && cho các phần tử không phải cuối
      })
      navigate("/product-category?" + urlFormat.join('')) // Cập nhật URL với query params mới


    },[selecCategory])
    // Xử lý sắp xếp sản phẩm theo giá
    const handleOnChangeSortBy = (e) => {
      const { name, value } = e.target
      setSortBy(value)
      // Sắp xếp giá từ thấp đến cao
      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }
      // Sắp xếp giá từ cao đến thấp 
      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    // Effect theo dõi thay đổi của sortBy
    useEffect(() => {
      // Để trống vì logic đã xử lý trong handleOnChangeSortBy
    },[sortBy])
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
                        <input type='radio' name='sortBy' checked={sortBy === 'asc'} value={'asc'} onChange={handleOnChangeSortBy}/>
                        <label>Giá - Thấp đến Cao</label>
                      </div>
                      <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy' checked={sortBy === 'dsc'} value={'dsc'} onChange={handleOnChangeSortBy}/>
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
            <div className='px-4'>
              <p className='text-lg my-2 font-medium text-slate-800'>Kết quả tìm kiếm: {data.length} sản phẩm</p>
                <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                  {
                    data.length !== 0 && !loading && (
                      <VerticalCard data={data} loading={loading} />
                    )
                  }
                </div>
            </div>


        </div>
    </div>
  )
}

export default CategoryProduct