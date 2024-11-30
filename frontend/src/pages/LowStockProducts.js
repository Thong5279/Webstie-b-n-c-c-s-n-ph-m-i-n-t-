import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
import { FaExclamationTriangle } from 'react-icons/fa'

function LowStockProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [stockCategories, setStockCategories] = useState({
    outOfStock: [], // Sản phẩm hết hàng (số lượng = 0)
    critical: [], // Sản phẩm sắp hết hàng (số lượng = 1)
    warning: [] // Sản phẩm cần nhập thêm (số lượng 2-5)
  })

  const fetchLowStockProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${SummaryApi.allProduct.url}?lowStock=true`)
      const data = await response.json()
      
      // Phân loại sản phẩm theo số lượng tồn kho
      const categorizedProducts = data.data.reduce((acc, product) => {
        if (product.quantity === 0) {
          acc.outOfStock.push(product)
        } else if (product.quantity === 1) {
          acc.critical.push(product)
        } else if (product.quantity < 5) {
          acc.warning.push(product)
        }
        return acc
      }, {
        outOfStock: [],
        critical: [],
        warning: []
      })

      setStockCategories(categorizedProducts)
      setProducts(data.data.filter(product => product.quantity < 5))
      setLoading(false)
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm sắp hết hàng:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLowStockProducts()
  }, [])

  const StockSection = ({ title, products, alertLevel }) => (
    <div className="mb-8">
      <div className={`flex items-center gap-2 mb-4 ${
        alertLevel === 'outOfStock' ? 'text-red-600' :
        alertLevel === 'critical' ? 'text-orange-500' :
        'text-yellow-500'
      }`}>
        <FaExclamationTriangle />
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
          {products.length} sản phẩm
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <AdminProductCard 
            key={`${alertLevel}-${index}`}
            data={product}
            fetchdata={fetchLowStockProducts}
            alertLevel={alertLevel}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h2 className="font-bold text-xl mb-2">Quản Lý Tồn Kho</h2>
        <p className="text-gray-600">
          Theo dõi và quản lý sản phẩm có số lượng tồn kho thấp
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {stockCategories.outOfStock.length > 0 && (
            <StockSection 
              title="Sản Phẩm Hết Hàng" 
              products={stockCategories.outOfStock}
              alertLevel="outOfStock"
            />
          )}
          
          {stockCategories.critical.length > 0 && (
            <StockSection 
              title="Sản Phẩm Cực Kỳ Thấp" 
              products={stockCategories.critical}
              alertLevel="critical"  
            />
          )}
          
          {stockCategories.warning.length > 0 && (
            <StockSection 
              title="Sản Phẩm Cần Nhập Thêm" 
              products={stockCategories.warning}
              alertLevel="warning"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default LowStockProducts

