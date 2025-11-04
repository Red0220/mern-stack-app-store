
import React from 'react'
import { useMemo, useState, useCallback } from 'react';
import { useGetProductsQuery } from '../../redux/Api/product.slice.js';
import IsLoading from '../../components/ui/IsLoading.jsx';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi'

import { formatPrice} from "../../util/formatPrice.js"
const PAGE_SIZE = 10;
const Products = () => {

  const { data, error, isLoading } = useGetProductsQuery()
  const products = data?.products || []

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [action, setAction] = useState(false)

  const filtered = useMemo(()=> {
    let q = query.toLowerCase();
    let list = products.slice()

    if(q){
      list= list.filter(p => {
        const title = String(p.title || "").toLowerCase();
        const desc = String(p.description || "").toLowerCase();
        const id = String(p._id).toLowerCase();
        return title.includes(q) || desc.includes(q) || id.includes(q);
      })
    }

    list.sort((a,b) => {
      const aVal = sortBy === "price" ? Number(a.price || 0)
          : sortBy === "stock" ? Number(a.stock || 0)
          :String(a.title || "").toLowerCase();
      const bVal = sortBy === "price" ? Number(b.price || 0)
          : sortBy === "stock" ? Number(b.stock || 0)
          :String(b.title || "").toLowerCase();

          if(aVal < bVal) return sortOrder === "asc" ? -1 : 1;
          if(aVal > bVal) return sortOrder === "asc" ? 1 : -1;
          return 0;
    })
    return list;
  },[products, query, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const pageItems = useMemo(()=> {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  const handleToggleMenu = useCallback(id => {
    setAction(prev => (prev === id ? null : id))
  },[])

  const handleSort = (f) => {
    if(f === sortBy){
      setSortOrder(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(f)
      setSortOrder('asc')
    }
  }

   if (isLoading) return <IsLoading arg={isLoading} />;

  if (error) {
    return (
      <div className="text-center font-bold text-2xl text-red-600">
        {error?.data?.message || 'Error loading products.'}
      </div>
    );
  }

   if (!products.length) {
    return (
      <div className="text-center font-bold text-2xl text-gray-700">
        No products found.
      </div>
    );
  }
// log
console.log('page items', pageItems)
  return (
    <div className='p-4'>
      <h1 className="text-3xl font-bold mb-4 text-center text-slate-800">Products</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 bg-white border rounded-md px-3 py-1 shadow-sm maw-w-mid ww-full sm:w-auto">
          <FiSearch className='text-gray-500' />

          <input 
          aria-label='Search products'
          placeholder='search...'
          value={query}
          onChange={(e)=> {setQuery(e.target.value); setPage(1); }}
          className='w-full bg-transparent outline-none text-sm px-2'
          />
        </div>
        <div className="flex itmes-center gap-2">
          <label className='text-sm text-gray-600'>Sort:</label>
          <select 
          value={sortBy}
          onChange={(e)=> setSortBy(e.target.value)}
          className='border rounded px-2 py-1 text-sm'
          aria-label='Sort products'
          >
            <option value='title'>Title</option>
            <option value='price'>Price</option>
            <option value='stock'>Stock</option>
          </select>

          <button type='button'
          onClick={()=> setSortOrder(d => (d === 'asc' ? 'desc' : 'asc'))}
          className='border rounded px-1 py-1 text-sm'
          aria-label='Toggle sort order'>
            { sortOrder === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-visible bg-white border border-gra-200 rounded-md shadow-sm">
         <table className="min-w-full divide-y divide-gray-200 z-0">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Offer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer" onClick={() => handleSort('price')}>Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer" onClick={() => handleSort('stock')}>Stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {pageItems && pageItems.map(p => (
              <>
              <tr key={p._id} className='hover:bg-gray-50 transition-colors'>
                <td className='px-4 py-3'>
                  <div className="flex items-center gap-3">
                    <img 
                    src={p.images[0]}
                    alt={p.title || 'product images'}
                    loading='lazy'
                    width={48}
                    height={48}
                    onError={e => {e.currentTarget.src = 'some'}}
                    className='w-12 h-12 object-cover rounded'
                     />
                     <div className="min-w-0">
                      <div className="font-medium trucate">
                        {p.title ||"Untitled product"}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {p.description || ""}
                      </div>
                     </div>
                  </div>
                </td>
                <td className='px-4 py-3'>
                  {
                    p.offer ? (
                      <span className="bg-gren-100 text-green-800 px-2 py-0 5 rounded text-sm">
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-700 px-2 py-0 5 rounded text-sm">
                        No
                      </span>
                    )
                  }
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{p.stock ?? 0}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{p.rating ?? '_' }</td>

                <td className="px-4 py-3 relative">
                  <button 
                  aria-expanded={action === p._id}
                  aria-controls={`acion-${p._id}`}
                  className='text-gray-600 hover:text-gray-800 cursor-pointer'
                  onClick={()=> handleToggleMenu(p._id)}
                  >
                   <HiOutlineDotsHorizontal size={20} />
                  </button>
                  {
                    action == p._id && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 shodaw-sm cursor-pointer z-20"
                      id={`action-${p._id}`}
                      role='action'
                      >
                        <button role='actionitem' className='w-full text-left px-3 py-2 hover:bg-gray-50 text-sm' >Edit</button>
                        <button role='actionitem' className='w-full text-left px-3 py-2 hover:bg-gray-50 text-sm' >Delete</button>
                      </div>
                    )
                  }
                </td>
              </tr>
              </>
            ))}
          </tbody>
          </table>
      </div>

      {/* pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </div>

        <div className="flex items-center gap-2">
          <button 
          onClick={()=> setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className='px-3 py-1 border border-gray-100 disabled:opacity-50'>
            prev
          </button>
          <div className="px-3 py-1 border border-gray-100 bg-gray-50 text-sm">{page} / {totalPages}</div>
          <button 
          onClick={()=> setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className='px-3 py-1 border border-gray-100 rounded disabled:opacity-50'>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products
