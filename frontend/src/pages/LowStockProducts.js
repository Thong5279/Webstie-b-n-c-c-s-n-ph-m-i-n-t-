import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

function LowStockProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLowStockProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${SummaryApi.allProduct.url}?lowStock=true`)
      const data = await response.json()
      
      // Lọc sản phẩm có số lượng < 5
      const lowStockItems = data.data.filter(product => product.quantity < 5)
      setProducts(lowStockItems)
      setLoading(false)
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm sắp hết hàng:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLowStockProducts()
  }, [])

  return (
    <div>
      <div className='bg-white p-2 px-4'>
        <h2 className='font-bold text-lg'>Sản Phẩm Sắp Hết Hàng</h2>
      </div>

      <div className='flex flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll justify-center'>
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          products.map((product, index) => (
            <AdminProductCard 
              key={index+"lowStock"} 
              data={product}
              fetchdata={fetchLowStockProducts}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default LowStockProducts

