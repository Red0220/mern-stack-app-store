import React, { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../../redux/Api/product.slice.js'
import IsLoading from '../../components/ui/IsLoading.jsx'

const Products = () => {

  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery()
  const img = products?.products[0]?.images[0]
  console.log("img",img )

  console.log("Products data:", products);
  if (isLoading) return <IsLoading arg={isLoading} />
  if (!products) return <div className='text-center font-bold text-3xl text-slate-700'>{error?.data?.message}</div>
  if (error) return <div>Error loading products.</div>
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center text-slate-80">Products</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead> 
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left">ID</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Image</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Title</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Price</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Stock</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.products?.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b border-gray-300">{product._id}</td>   
              <td className="py-2 px-4 border-b border-gray-300"><img src={product.images[0]} className='w-10 h-10'/></td>   
              <td className="py-2 px-4 border-b border-gray-300">{product.title}</td>
              <td className="py-2 px-4 border-b border-gray-300">${product.price}</td>
              <td className="py-2 px-4 border-b border-gray-300">{product.stock}</td>
              <td className="py-2 px-4 border-b border-gray-300">
                
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default Products